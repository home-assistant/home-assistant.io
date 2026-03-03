---
title: "Glossary"
description: "Home Assistant's Glossary."
---

The glossary covers terms which are used around Home Assistant.

{% assign entries = site.data.glossary | sort: 'term' %}
{% assign current_letter = '' %}

{% for entry in entries %}

{% assign first_letter = entry.term | slice: 0 %}
{% if first_letter != current_letter %}
{% assign current_letter = first_letter | upcase %}

## {{ current_letter }}

---

{% endif %}

### {{ entry.term }}

{{ entry.definition | markdownify }}

{%- if entry.link -%}

{{ "[Read more about " | append: "_" | append: entry.term | append: "_](" | append: entry.link | append: ")" | markdownify }}

{%- endif -%}

{% endfor %}
