---
title: "Date and time template functions"
description: "Template functions for working with dates, times, timestamps, and durations."
sidebar: false
feedback: false
---

These template functions help you work with dates, times, and durations. Use them to get the current time, format timestamps for display, calculate how long ago something happened, or convert between different time representations.

Home Assistant extends the [Jinja2 template engine](https://jinja.palletsprojects.com/en/latest/templates/) with many custom functions, filters, and tests. Each function on this page has its own page with detailed descriptions, parameters, and practical examples.

New to templates? Start with the [templating documentation](/docs/templating/) to learn the basics.

{%- assign cat_functions = site.template_functions | where: 'category', 'datetime' | sort: 'function_name' -%}

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
