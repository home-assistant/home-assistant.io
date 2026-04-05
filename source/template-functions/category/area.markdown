---
title: "Area template functions"
description: "Template functions for working with areas, their entities, and devices."
sidebar: false
feedback: false
---

These template functions let you work with the areas you've set up in Home Assistant. Look up which entities or devices belong to an area, get area names and IDs, and build automations that operate on entire rooms at once.

Home Assistant extends the [Jinja2 template engine](https://jinja.palletsprojects.com/en/latest/templates/) with many custom functions, filters, and tests. Each function on this page has its own page with detailed descriptions, parameters, and practical examples.

New to templates? Start with the [templating documentation](/docs/templating/) to learn the basics.

{%- assign cat_functions = site.template_functions | where: 'category', 'area' | sort: 'function_name' -%}

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
