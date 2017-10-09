---
layout: page
title: "Glossary"
description: "Home Assistant's Glossary."
date: 2017-10-08 08:30
sidebar: true
comments: false
sharing: true
footer: true
---

{% assign entries = site.data.glossary | sort: 'topic'  %}

<ul>
{% for entry in entries %}
  <li>
      <b>{{ entry.topic }}</b>: {{ entry.description | markdownify }}
  </li>
{% endfor %}
</ul>
