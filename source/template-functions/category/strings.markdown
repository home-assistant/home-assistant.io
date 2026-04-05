---
title: "String template functions"
description: "Template functions for text manipulation and formatting."
sidebar: false
feedback: false
---

These template functions help you format, transform, and shape text. Use them to build friendly messages, clean up sensor values, or prepare text for dashboards and notifications.

Home Assistant extends the [Jinja2 template engine](https://jinja.palletsprojects.com/en/latest/templates/) with many custom functions, filters, and tests. Each function on this page has its own page with detailed descriptions, parameters, and practical examples.

New to templates? Start with the [templating documentation](/docs/templating/) to learn the basics.

{%- assign cat_functions = site.template_functions | where: 'category', 'strings' | sort: 'function_name' -%}

<ul class="tf-list">
{% for func in cat_functions %}
<li class="tf-item">
  <a href="{{ func.url }}">
    <span class="tf-title">{{ func.title | remove: func.function_name | remove: ': ' | strip }}</span>
    <code class="tf-fn">{{ func.function_name }}</code>
  </a>
  <span class="tf-desc">{{ func.description }}</span>
</li>
{% endfor %}
</ul>
