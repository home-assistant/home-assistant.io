---
layout: page
title: "Configuration Cookbook"
description: "Community maintained list of configuration exmaples."
date: 2015-10-08 19:05
sidebar: false
comments: false
sharing: true
footer: true
regenerate: true
---

This is a community currated list of `configuration.yaml` examples. New recipes can be added via the [home-assistant.io repository](https://github.com/balloob/home-assistant.io/tree/master/source/_cookbook).

{% for recipe in site.cookbook %}
  * [{{recipe.title}}]({{recipe.url}})
{% endfor %}

### {% linkable_title Configuration.yaml Gists %} 

Some users keep a public scrubbed copy of their `configuration.yaml` to learn from.

- [Configuration.yaml by Carlo Costanzo](https://gist.github.com/CCOSTAN/9934de973a293b809868)
