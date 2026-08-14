---
title: Research
permalink: /research/
---
<h1 class="page-title">Research</h1>
<p class="page-sub">Active and past projects. Filter by tag &mdash; projects that span more than one area show up under each.</p>

<div class="explainer-box" id="qa-box">
  <h2>Ask about our research field</h2>
  <p style="font-size:.9rem; color:#5B6368; margin:0 0 16px;">Ask a question about AI in health care decision making, and get a short, three-part answer back.</p>

  <form id="qa-form" style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:18px;">
    <input
      id="qa-input"
      type="text"
      value="What is the research field of AI in Health Care Decision Making, in one sentence?"
      style="flex:1 1 320px; padding:10px 14px; border:1px solid #E1E4E3; border-radius:6px; font-family:'IBM Plex Sans',sans-serif; font-size:.92rem;"
      maxlength="300"
    >
    <button type="submit" class="btn" id="qa-submit">Ask</button>
  </form>

  <div id="qa-answers" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:22px; min-height:20px;"></div>
  <p id="qa-status" style="font-family:'IBM Plex Mono',monospace; font-size:.78rem; color:#868D91; margin:14px 0 0;"></p>
</div>

<script>
(function () {
  var WORKER_URL = "https://tootooni-qa.YOUR-SUBDOMAIN.workers.dev"; // <-- replace after deploying the Worker

  var form = document.getElementById("qa-form");
  var input = document.getElementById("qa-input");
  var answersEl = document.getElementById("qa-answers");
  var statusEl = document.getElementById("qa-status");
  var submitBtn = document.getElementById("qa-submit");
  var borderColors = ["#1B7A80", "#14213D", "#9AA1A5"];

  function renderAnswers(answers) {
    answersEl.innerHTML = "";
    answers.forEach(function (text, i) {
      var div = document.createElement("div");
      div.style.borderLeft = "3px solid " + (borderColors[i] || "#9AA1A5");
      div.style.paddingLeft = "14px";
      var p = document.createElement("p");
      p.style.fontSize = ".93rem";
      p.style.margin = "0";
      p.textContent = text;
      div.appendChild(p);
      answersEl.appendChild(div);
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var question = input.value.trim();
    if (!question) return;

    submitBtn.disabled = true;
    submitBtn.textContent = "Asking...";
    statusEl.textContent = "";
    answersEl.innerHTML = "";

    fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: question }),
    })
      .then(function (r) { return r.json().then(function (data) { return { ok: r.ok, data: data }; }); })
      .then(function (result) {
        if (!result.ok || result.data.error) {
          statusEl.textContent = "Couldn't get an answer right now (" + (result.data.error || "unknown error") + "). Try again in a bit.";
          return;
        }
        renderAnswers(result.data.answers || []);
      })
      .catch(function () {
        statusEl.textContent = "Couldn't reach the question service. Check your connection and try again.";
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "Ask";
      });
  });
})();
</script>

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
