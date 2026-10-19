---
title: "Glossary"
description: "Definitions of the most common terms used in Home Assistant: integrations, entities, devices, automations, and more."
---

Home Assistant has a vocabulary of its own. Most of it comes up in everyday use: integrations, entities, devices, automations, dashboards. This page is a quick reference for what every term means and how the pieces fit together. Whenever you see a term you do not recognize in the documentation or in the user interface, you can come back here.

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
