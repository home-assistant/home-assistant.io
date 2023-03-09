---
title: "Glossary"
description: "Home Assistant's Glossary."
---

{% assign entries = site.data.glossary | sort: 'topic'  %}

The glossary covers terms which are used around Home Assistant.

{% configuration_basic %}

{% for entry in entries %}
  "{{ entry.topic }}":
    description: "{{ entry.description }}"
{% endfor %}

{% endconfiguration_basic %}
