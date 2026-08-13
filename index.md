---
title: Home
---
<div class="hero">
  <p class="hero-eyebrow">Loyola University Chicago &middot; Health Informatics &amp; Data Science</p>
  <h1 class="page-title">Tootooni Lab</h1>
  <p class="lede">We work at the intersection of artificial intelligence, clinical data, and patient care &mdash; spanning stroke triage, drug dosing, clinical NLP, and AI evaluation in healthcare settings.</p>
</div>

<div class="waveform-divider"></div>

<div class="section">
  <h2>Meet the Team</h2>
  <p>Our lab brings together graduate research assistants, medical students, and undergraduates working across AI, NLP, and clinical informatics.</p>
  <p><a href="{{ '/people/' | relative_url }}">See the full team &rarr;</a></p>
</div>

<div class="section">
  <h2>All Projects, by Month</h2>
  {% assign sorted_projects = site.projects | sort: "date" | reverse %}
  {% assign current_label = "" %}
  {% for project in sorted_projects %}
    {% assign this_label = project.date | date: "%B %Y" %}
    {% if this_label != current_label %}
      {% unless forloop.first %}</ul>{% endunless %}
      <h3 style="font-family:'IBM Plex Mono',monospace; font-size:.8rem; text-transform:uppercase; letter-spacing:.05em; color:#1B7A80; margin:22px 0 8px; font-weight:500;">{{ this_label }}</h3>
      <ul style="margin-top:0;">
      {% assign current_label = this_label %}
    {% endif %}
    <li>
      <a href="{{ project.url | relative_url }}">{{ project.title }}</a>
      <span class="status status--{{ project.status | downcase }}" style="margin-left:6px;">{{ project.status }}</span>
    </li>
    {% if forloop.last %}</ul>{% endif %}
  {% endfor %}
  <p><a href="{{ '/research/' | relative_url }}">See all research, filterable by tag &rarr;</a></p>
</div>
