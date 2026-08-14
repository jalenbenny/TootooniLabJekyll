---
title: Research
permalink: /research/
---
<h1 class="page-title">Research</h1>
<p class="page-sub">Active and past projects. Filter by tag &mdash; projects that span more than one area show up under each.</p>

<div class="explainer-box">
  <h2>What is the research field of AI in Health Care Decision Making, in one sentence?</h2>
  <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:22px;">
    <div style="border-left:3px solid #1B7A80; padding-left:14px;">
      <p style="font-size:.93rem; margin:0;">It's the use of machine learning and statistical models to help clinicians make faster, more accurate decisions from complex patient data.</p>
    </div>
    <div style="border-left:3px solid #14213D; padding-left:14px;">
      <p style="font-size:.93rem; margin:0;">It spans everything from triage and diagnosis to dosing and risk prediction, wherever a clinical decision needs to be made under time pressure or uncertainty.</p>
    </div>
    <div style="border-left:3px solid #9AA1A5; padding-left:14px;">
      <p style="font-size:.93rem; margin:0;">Our lab's contribution is building and evaluating these tools specifically for stroke, sepsis, drug dosing, and EHR-based decision support.</p>
    </div>
  </div>
  <p class="note">
    Static version of question box feature
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
