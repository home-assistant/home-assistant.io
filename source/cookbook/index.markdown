---
layout: page
title: "Configuration Cookbook"
description: "Community maintained list of configuration exmaples."
date: 2015-10-08 19:05
sidebar: false
comments: false
sharing: true
footer: true
---

This is a community currated list of `configuration.yaml` examples. New recipes can be added via
the [home-assistant.io repository](https://github.com/balloob/home-assistant.io/tree/master/source/cookbook).

{% directory path:cookbook exclude:index %}
  * [{{ file.slug | replace: '_',' ' | capitalize }}]({{ file.slug | prepend: '/cookbook/' | append: '.html' }})
{% enddirectory %}
