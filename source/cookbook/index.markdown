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

#### Recipes

{% directory path:cookbook exclude:index %}
  * [{{ file.slug | replace: '_',' ' | capitalize }}]({{ file.slug | prepend: '/cookbook/' | append: '.html' }})
{% enddirectory %}

#### Configuration.yaml Gists

- [Carlo Costanzo](https://github.com/CCOSTAN) - [Configuration.yaml](https://gist.github.com/CCOSTAN/9934de973a293b809868) 

<p class='note warning'>
  Please be sure to properly scrub your configuration.yaml of usernames, passwords and other personal information you do not want public before sharing on this page.
</p>
