# Tootooni Lab Website

Jekyll source for the lab site, built from the content already in
`TootooniLab.github.io` (research write-ups, people bios, grants, teaching,
contact info), restructured around the repo-structure proposal.

Updated against the "Website/Repo Optimization" planning notes and real
CV content:
- Nav renamed to match the current site: **Sponsors** (not Grants),
  **Contact** at `/contact/` (not `/about/`)
- Home page groups all projects by month/year, plus a "Meet the Team"
  section linking to People
- People bios updated to the real first-person write-ups where provided
- 18 projects now (added the Multi-Institutional Vancomycin Dosing
  Pipeline, which was in the CVs but not yet on the site)
- Dhruvin's six projects and the Michael/Adnan collaborative projects
  now carry real detail and a `tools:` field from their CVs
- Publications page links out to Dr. Tootooni's real Google Scholar
- Contact page has an embedded map
- Research page has a static version of the "field explainer" Q&A
  feature described in the planning notes &mdash; see `TODO.md` for why
  it's static and not live
- See `TODO.md` for the planning-doc items that need you or Dr.
  Tootooni, not more building (GitHub org member visibility, real
  project dates, etc.)

- Every research project is now one file in `_projects/`, with front
  matter for `title`, `status`, `tags`, `team`, `github`, and `summary`.
- `research.md` loops over `_projects/` and lets visitors filter by tag.
- `github:` is blank on every project right now &mdash; fill it in with the
  repo name once each project has one, and a "View Repository" button
  appears automatically on that project's page.

## Structure

```
_config.yml            site settings, collection config
Gemfile                 dependencies matching GitHub Pages
_layouts/               default.html, project.html
_includes/              header.html, footer.html, publications.html
_projects/              17 real projects pulled from your research.md
_data/publications.yml  publication list (currently placeholder entries)
index.md, people.md, research.md, publications.md, grants.md,
teaching.md, about.md    site pages (real content from your current site)
assets/css/style.scss   theme (navy / black / white)
images/                 drop in the member photos referenced in people.md
```

## Adding a project

Create `_projects/your-project-slug.md`:

```yaml
---
title: Your Project Title
status: Active        # Active / Completed / Archived
tags:
  - tag1
  - tag2
team: "Names here"
github: your-repo-name  # leave blank if there's no repo yet
summary: >
  2-4 sentence abstract.
---
```

## Images

`people.md` references `/images/ale.jpg`, `/images/maryum.jpg`,
`/images/ubeyd.jpg`, `/images/pharel.jpg`, `/images/adnan.jpg`,
`/images/michael.jpg`, `/images/dhruvin.jpg` &mdash; same filenames as your
current site's `images/` folder, so you can copy those files straight
over into this `images/` folder.

## Publications

`_data/publications.yml` currently has two placeholder entries. Replace
them with your real publication list &mdash; each one becomes a line on
`/publications/` automatically.

## Running locally

This has been built and verified with Jekyll 4.3.2 (all 17 project pages
generate correctly, tag filtering works, CSS compiles). To run it
yourself:

```bash
bundle install
bundle exec jekyll serve
```

Then open `http://localhost:4000`. If you don't have Ruby/Jekyll set up
locally yet, easiest path: install Ruby, then `gem install bundler`,
then the commands above.

## Publishing

Copy these files into your `TootooniLab.github.io` repo (or push this
as-is if you're replacing it wholesale), commit, and push. GitHub Pages
builds Jekyll sites automatically on push &mdash; no local Ruby needed to
go live.
