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

This is a community currated list of different ways to use Home Assistant. New recipes can be added via the [home-assistant.io repository](https://github.com/balloob/home-assistant.io/tree/master/source/_cookbook).

{% assign cookbook = site.cookbook | sort: 'title' %}
{% assign categories = cookbook | sort: 'ha_category' | map: 'ha_category' | uniq %}

{% for category in categories %}
### {% linkable_title {{ category }} %}

  {% if category == 'Automation Examples' %}

  {% elsif category == 'Full configuration.yaml examples' %}
Some users keep a public scrubbed copy of their `configuration.yaml` to learn from.
  {% elsif category == '' %}

  {% endif %}

  {% for recipe in site.cookbook %}
    {% if recipe.ha_category == category %}
      {% if recipe.ha_external_link %}
  * [{{recipe.title}}]({{recipe.ha_external_link}})
      {% else %}
  * [{{recipe.title}}]({{recipe.url}})
      {% endif %}
    {% endif %}
  {% endfor %}
{% endfor %}
