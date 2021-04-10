---
title: "Examples"
description: "Community maintained list of different ways to use Home Assistant."
sidebar: false
feedback: false
---

This is a community curated list of different ways to use Home Assistant. Most
of these examples are using [the automation integration][automations].

<div class='note'>

A great place to find popular configurations is on this
[GitHub search][github-search] for repositories with the
`home-assistant-config` topic.

</div>

[automations]: /getting-started/automation/
[github-search]: https://github.com/search?q=topic%3Ahome-assistant-config&type=Repositories

## Popular blueprints

This is a list of the most popular [blueprints](/integrations/blueprint) in the [Blueprint Exchange category on the forums](https://community.home-assistant.io/c/blueprints-exchange/53/l/top/all).

{% for post in site.data.blueprint_exchange_data limit:25 %}

- [{{post.title}}](https://community.home-assistant.io/t/{{post.id}})

{%- for tag in post.tags %}
  [`{{tag}}`](https://community.home-assistant.io/tag/{{tag}})
  {%- endfor -%}
{% endfor %}

{% assign examples = site.examples | sort: 'title' %}
{% assign categories = examples | map: 'ha_category' | uniq | sort %}

{% for category in categories %}

## {{ category }}

  {% for recipe in examples %}
    {% if recipe.ha_category == category %}
      {% if recipe.ha_external_link %}
  * [{{recipe.title}} <i class="icon-external-link"></i>]({{recipe.ha_external_link}})
      {% else %}
  * [{{recipe.title}}]({{recipe.url}})
      {% endif %}
    {% endif %}
  {% endfor %}
{% endfor %}
