---
title: "Label template functions"
description: "Template functions for working with labels and finding labeled entities, devices, and areas."
sidebar: false
feedback: false
---

These template functions let you work with {% term labels %} in Home Assistant. Labels are tags you can assign to {% term entities %}, {% term devices %}, and {% term areas %} to organize them. Use these functions to look up labels, find items with specific labels, and build {% term automations %} that act on labeled groups of items.

Home Assistant extends the [Jinja2 template engine](https://jinja.palletsprojects.com/en/latest/templates/) with many custom functions, filters, and tests. Each function on this page has its own page with detailed descriptions, parameters, and practical examples.

New to templates? Start with the [templating documentation](/docs/templating/) to learn the basics.

{%- assign cat_functions = site.template_functions | where: 'category', 'label' | sort: 'function_name' -%}

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
