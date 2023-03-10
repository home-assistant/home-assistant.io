---
title: "Glossary"
description: "Home Assistant's Glossary."
---

{% assign entries = site.data.glossary | sort: 'term'  %}

The glossary covers terms which are used around Home Assistant.

{% configuration_basic %}

{% for entry in entries %}
  "{{ entry.term }}":
    description: "{{ entry.definition }}
      {% if entry.url %}<br />[Read more about: {{ entry.term }}]({{ entry.url }}){% endif %}"
{% endfor %}

{% endconfiguration_basic %}
