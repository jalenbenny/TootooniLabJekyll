# Open items from the planning doc

Carried over from the "TootooniLab Website/Repo Optimization" notes.
Things I could act on are already reflected in the site. These are the
ones that need you or Dr. Tootooni, not more site-building:

- **Check public members in the org.** Whether a person shows up as a
  public/visible member of the TootooniLab GitHub org is a setting each
  member controls individually (their GitHub profile -> Organizations ->
  "Publicize/Privatize" toggle). I can't set this for people.

- **Check top languages.** GitHub's "top languages" bar on a repo is
  generated automatically from the code that's actually pushed to it.
  It'll populate itself once real project code lives in each repo &mdash;
  nothing to configure.

- **Ask Samie about another website builder.** I built this as Jekyll
  since that's what the current site already runs on and what GitHub
  Pages supports natively for free. If the lab moves to something else
  (Wix, Squarespace, custom React, etc.) the content here (bios, project
  write-ups, grants) transfers over as plain text regardless of platform.

- **Real dates (Aug 2023 - Jun 2026).** Every project file now has a
  `date:` field so the home page can group things by month/year, but the
  actual dates are my estimates based on context (when someone joined,
  when a grant started). Go through `_projects/*.md` and correct them.

- **Live "field explainer" Q&A on the Research page.** The static
  version is in place. Making it actually dynamic (calling an AI model
  live) needs a small backend/serverless function &mdash; can't be done
  by calling an API directly from a public page without exposing a key.
  Flag if you want help setting that up.
