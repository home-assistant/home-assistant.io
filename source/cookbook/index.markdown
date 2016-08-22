---
layout: page
title: "Cookbook"
description: "Community maintained list of different ways to use Home Assistant."
date: 2015-10-08 19:05
sidebar: false
comments: false
sharing: true
footer: true
regenerate: true
hide_github_edit: true
---

This is a community curated list of different ways to use Home Assistant. Most of these examples are using the [automation] component and other built-in [automation related][sec-automation] and [organization] components available.

[automation]: /getting-started/automation/
[sec-automation]: /components/#automation
[organization]: /components/#organization

New recipes can be added via the [home-assistant.io repository](https://github.com/home-assistant/home-assistant.github.io/tree/current/source/_cookbook).

{% assign cookbook = site.cookbook | sort: 'title' %}
{% assign categories = cookbook | map: 'ha_category' | uniq | sort %}

{% for category in categories %}
### {% linkable_title {{ category }} %}

  {% if category == 'Automation Examples' %}

  {% elsif category == 'Full configuration.yaml examples' %}
Some users keep a public scrubbed copy of their `configuration.yaml` to learn from.
  {% elsif category == '' %}

  {% endif %}

  {% for recipe in cookbook %}
    {% if recipe.ha_category == category %}
      {% if recipe.ha_external_link %}
  * [{{recipe.title}} <i class="icon-external-link"></i>]({{recipe.ha_external_link}})
      {% else %}
  * [{{recipe.title}}]({{recipe.url}})
      {% endif %}
    {% endif %}
  {% endfor %}
{% endfor %}
