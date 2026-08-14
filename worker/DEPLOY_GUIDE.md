# Deploying the live question box

This makes the Research page question box actually query an AI model,
without ever exposing an API key in the browser. It has two parts:

1. `worker.js` — a small serverless function (Cloudflare Worker) that
   holds your API key and forwards questions to Claude.
2. The question box on `research.md`, already wired to call it (you
   just need to plug in the Worker's URL once it's deployed).

Cost: Cloudflare Workers' free tier is 100,000 requests/day, no credit
card required to sign up. The Anthropic API calls themselves cost a
small fraction of a cent per question with Haiku — realistically
pennies a month for a lab site's traffic.

## 1. Get an Anthropic API key

If you don't already have one:
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up / log in, add a small amount of credit (a few dollars covers
   a very large number of questions on this feature)
3. Go to **API Keys** → **Create Key**, copy it somewhere safe

## 2. Create a Cloudflare account and Worker

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → sign up
   (free, no credit card needed for this tier)
2. In the left sidebar: **Workers & Pages** → **Create** → **Create
   Worker**
3. Give it a name, e.g. `tootooni-qa` → **Deploy** (it deploys a
   default "Hello World" worker first, that's fine)
4. Click **Edit code** — this opens an in-browser code editor
5. Delete everything in the editor and paste in the full contents of
   `worker.js` (in this same folder)
6. Click **Deploy**

Your Worker's URL will look like:
```
https://tootooni-qa.YOUR-SUBDOMAIN.workers.dev
```
Copy that exact URL — you'll need it in step 4.

## 3. Add your API key as a secret

Never paste the API key directly into the code. Instead:

1. In your Worker's page, go to **Settings** → **Variables and
   Secrets**
2. Click **Add** → Type: **Secret**, Name: `ANTHROPIC_API_KEY`, Value:
   paste your key from step 1
3. Save and deploy

## 4. (Recommended) Add rate limiting

Without this, someone could hammer the endpoint and run up your
Anthropic bill. This adds a 10-questions-per-hour-per-visitor limit:

1. In Cloudflare dashboard: **Workers & Pages** → **KV** → **Create
   namespace** → name it `RATE_LIMIT`
2. Back in your Worker → **Settings** → **Bindings** → **Add binding**
   → **KV Namespace**
3. Variable name: `RATE_LIMIT`, KV namespace: pick the one you just
   created
4. Save and deploy

The `worker.js` code already checks for this binding and rate-limits
automatically if it's present, so no code changes needed.

## 5. Point the website at your Worker

In `research.md`, find this line near the top of the `<script>` block:

```js
var WORKER_URL = "https://tootooni-qa.YOUR-SUBDOMAIN.workers.dev";
```

Replace it with your actual Worker URL from step 2.

## 6. Update the allowed origin in the Worker

At the top of `worker.js`, this line restricts which website is allowed
to call your Worker from a browser:

```js
const ALLOWED_ORIGIN = "https://jalenbenny.github.io";
```

If your site ends up living at a different URL (a custom domain, or
under the `TootooniLab` org instead of `jalenbenny`), update this to
match exactly, then redeploy the Worker (paste the updated code into
the Cloudflare editor again and click Deploy).

## 7. Push and test

```bash
cd ~/Downloads/jekyll_site_v2
# replace research.md with the updated version
git add research.md
git commit -m "Wire up live question box"
git push
```

Once GitHub Pages rebuilds, go to `/research/`, type a question, click
**Ask**. You should see 3 short sentences appear within a couple
seconds.

## Honest limitation

CORS (the `ALLOWED_ORIGIN` check) stops other *websites'* JavaScript
from calling your Worker on a visitor's behalf, but it doesn't stop
someone from calling the Worker URL directly with a tool like `curl` —
CORS is a browser-enforced rule, not a server-side wall. The rate limit
in step 4 is the real protection against abuse; without it, a
determined person could still run up API costs by hitting the endpoint
directly. If you want stronger protection later (a CAPTCHA-style
challenge before each question, for instance), Cloudflare Turnstile is
free and I can help wire that in.
