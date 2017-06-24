---
layout: page
title: "FAQ"
description: "Home Assistant's FAQ"
date: 2015-10-08 19:05
sidebar: true
comments: false
sharing: true
footer: true
regenerate: true
hide_github_edit: true
---

This is a community curated list of frequently asked questions (FAQ) about the installation, setup, and usage of Home Assistant.

{% assign faq = site.faq | sort: 'title' %}
{% assign categories = faq | map: 'ha_category' | uniq | sort %}

{% for category in categories %}
## {% linkable_title {{ category }} %}

  {% for entry in faq %}
    {% if entry.ha_category == category %}
### {% linkable_title {{ entry.title }} %}
{{entry.content}}
    {% endif %}
  {% endfor %}
{% endfor %}

