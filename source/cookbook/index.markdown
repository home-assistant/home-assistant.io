---
title: "Cookbook"
description: "Community maintained list of different ways to use Home Assistant."
sidebar: false
regenerate: true
hide_github_edit: true
---

This is a community curated list of different ways to use Home Assistant. Most of these examples are using the [automation] integration and other built-in [automation related][sec-automation] and [organization] integrations available.

For [`python_script:` examples](/integrations/python_script/) visit the [Scripts section](https://community.home-assistant.io/c/projects/scripts) in our forum.

[automation]: /getting-started/automation/
[sec-automation]: /integrations/#automation
[organization]: /integrations/#organization

New recipes can be added via the [home-assistant.io repository](https://github.com/home-assistant/home-assistant.io/tree/current/source/_cookbook).

<div class='note'>

A great place to find popular configurations is on this [GitHub search](https://github.com/search?q=topic%3Ahome-assistant-config&type=Repositories) for repositories with the `home-assistant-config` topic.

</div>

{% assign cookbook = site.cookbook | sort: 'title' %}
{% assign categories = cookbook | map: 'ha_category' | uniq | sort %}

{% for category in categories %}
### {{ category }}

  {% if category == 'Automation Examples' %}

  {% elsif category == 'Full configuration.yaml examples' %}
Some users keep a public scrubbed copy of their `configuration.yaml` to learn from.
  {% elsif category == '' %}

  {% endif %}

  {% for recipe in cookbook %}
    {% if recipe.ha_category == category %}
      {% if recipe.ha_external_link %}
  * [{{recipe.title}} <i class="icon-external-link"></i>]({{recipe.ha_external_link}})
      {% else %}
  * [{{recipe.title}}]({{recipe.url}})
      {% endif %}
    {% endif %}
  {% endfor %}
{% endfor %}
