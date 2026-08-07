---
title: Research
permalink: /research/
---
<h1 class="page-title">Research</h1>
<p class="page-sub">Active and past projects. Filter by tag &mdash; projects that span more than one area show up under each.</p>

<div class="section" style="background:#F5F5F6; border-radius:10px; padding:22px 24px; margin-bottom:32px;">
  <h2 style="margin-bottom:14px;">What is the research field of AI in Health Care Decision Making, in one sentence?</h2>
  <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:20px;">
    <div>
      <div style="width:100%; height:80px; border-radius:8px; background:#16234A; margin-bottom:10px;"></div>
      <p style="font-size:.92rem; margin:0;">It's the use of machine learning and statistical models to help clinicians make faster, more accurate decisions from complex patient data.</p>
    </div>
    <div>
      <div style="width:100%; height:80px; border-radius:8px; background:#22346B; margin-bottom:10px;"></div>
      <p style="font-size:.92rem; margin:0;">It spans everything from triage and diagnosis to dosing and risk prediction, wherever a clinical decision needs to be made under time pressure or uncertainty.</p>
    </div>
    <div>
      <div style="width:100%; height:80px; border-radius:8px; background:#0B0C10; margin-bottom:10px;"></div>
      <p style="font-size:.92rem; margin:0;">Our lab's contribution is building and evaluating these tools specifically for stroke, sepsis, drug dosing, and EHR-based decision support.</p>
    </div>
  </div>
  <p style="font-size:.8rem; color:#5A5D63; margin:16px 0 0;">
    Placeholder / static version of this feature. A live version (a real question box that queries an AI model on demand) needs a small backend &mdash; calling an AI API directly from the browser on a public GitHub Pages site would expose the API key to anyone who views the page source. Happy to help wire up a serverless function for this if you want the live version.
  </p>
</div>

{% assign all_tags = "" | split: "" %}
{% for project in site.projects %}
  {% for t in project.tags %}
    {% unless all_tags contains t %}{% assign all_tags = all_tags | push: t %}{% endunless %}
  {% endfor %}
{% endfor %}

<div class="filter-bar" id="filter-bar">
  <a data-tag="all" class="active">All</a>
  {% for t in all_tags %}<a data-tag="{{ t }}">{{ t }}</a>{% endfor %}
</div>

<div id="project-list">
  {% for project in site.projects %}
  <div class="project-card" data-tags="{{ project.tags | join: ',' }}">
    <div class="project-card__top">
      <div>
        <div class="project-card__title"><a href="{{ project.url | relative_url }}">{{ project.title }}</a></div>
        <div class="project-card__meta">{% if project.github %}github.com/{{ site.github_org }}/{{ project.github }}{% else %}no code repository yet{% endif %}</div>
      </div>
      <span class="status status--{{ project.status | downcase }}">{{ project.status }}</span>
    </div>
    <p class="project-card__summary">{{ project.summary }}</p>
    <div>{% for t in project.tags %}<span class="tag">{{ t }}</span>{% endfor %}</div>
  </div>
  {% endfor %}
</div>

<script>
document.getElementById('filter-bar').addEventListener('click', function(e){
  if (e.target.tagName !== 'A') return;
  var tag = e.target.getAttribute('data-tag');
  document.querySelectorAll('#filter-bar a').forEach(function(a){ a.classList.remove('active'); });
  e.target.classList.add('active');
  document.querySelectorAll('#project-list .project-card').forEach(function(card){
    var tags = card.getAttribute('data-tags').split(',');
    card.style.display = (tag === 'all' || tags.indexOf(tag) !== -1) ? '' : 'none';
  });
});
</script>
