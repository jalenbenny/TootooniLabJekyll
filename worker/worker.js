// Tootooni Lab — Research page question box backend
// Deploy this as a Cloudflare Worker. It holds the API key server-side
// so it's never exposed in the browser, and only answers short questions
// about the lab's research field.

const ALLOWED_ORIGIN = "https://jalenbenny.github.io"; // change if you move to a custom domain

const SYSTEM_PROMPT = `You answer visitor questions on the Tootooni Lab website (Health Informatics & Data Science, Loyola University Chicago). The lab's work spans stroke triage, drug dosing, clinical NLP, multimodal EHR modeling, and AI evaluation in healthcare.

Rules:
- Answer in exactly 3 short sentences, each under 25 words, one per line, no numbering or bullets.
- Sentence 1: a general, accessible definition relevant to the question.
- Sentence 2: how that idea shows up in real clinical practice.
- Sentence 3: how it connects to Tootooni Lab's actual work specifically.
- Plain text only. No preamble, no markdown, no quotation marks.
- If the question is unrelated to health informatics, AI in healthcare, or the lab's research, politely redirect to what the lab does instead of answering the off-topic question.`;

export default {
  async fetch(request, env) {
    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders() });
    }

    if (request.method !== "POST") {
      return json({ error: "Use POST" }, 405);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON body" }, 400);
    }

    const question = (body.question || "").toString().trim().slice(0, 300);
    if (!question) {
      return json({ error: "Missing 'question'" }, 400);
    }

    // Basic per-IP rate limit: 10 requests/hour using Workers KV.
    // Requires a KV namespace bound as env.RATE_LIMIT (see README).
    if (env.RATE_LIMIT) {
      const ip = request.headers.get("CF-Connecting-IP") || "unknown";
      const key = `rl:${ip}`;
      const count = parseInt((await env.RATE_LIMIT.get(key)) || "0", 10);
      if (count >= 10) {
        return json({ error: "Rate limit reached. Try again later." }, 429);
      }
      await env.RATE_LIMIT.put(key, String(count + 1), { expirationTtl: 3600 });
    }

    try {
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 220,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: question }],
        }),
      });

      if (!resp.ok) {
        const errText = await resp.text();
        return json({ error: "Upstream error", detail: errText.slice(0, 300) }, 502);
      }

      const data = await resp.json();
      const text = data.content?.[0]?.text || "";
      const answers = text
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 3);

      return json({ answers });
    } catch (err) {
      return json({ error: "Server error", detail: String(err).slice(0, 200) }, 500);
    }
  },
};

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders() },
  });
}
