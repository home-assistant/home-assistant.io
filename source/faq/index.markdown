---
title: "FAQ"
description: "Home Assistant's FAQ"
regenerate: true
feedback: false
---

This is a community curated list of frequently asked questions (FAQ) about the installation, setup, and usage of Home Assistant. If you want to get details about a term, please check the [glossary](/docs/glossary/).

{% assign faq = site.faq | sort: 'title' %}
{% assign categories = faq | map: 'ha_category' | uniq | sort %}

{% for category in categories %}

## {{ category }}

  {% for entry in faq %}
    {% if entry.ha_category == category %}

### {{ entry.title }}

{{entry.content}}
    {% endif %}
  {% endfor %}
{% endfor %}
