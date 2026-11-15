{%- assign domain = include.domain | default: page.ha_domain -%}
{%- assign domain_actions = site.actions | where: "domain", domain | sort: "action" -%}

## List of actions

{% if domain_actions.size > 0 %}

The {{ page.title }} {% term integration %} provides the following actions. Each link below opens a dedicated page with examples, parameters, and a step-by-step UI walkthrough.

{% for act in domain_actions %}
- [{{ act.title }}]({{ act.url }}) (`{{ act.action }}`)
    {{ act.description }}
{% endfor %}

For an overview of every action across all integrations, see the [actions reference](/actions/).

{% else %}

This integration does not provide any documented actions yet. See the [actions reference](/actions/) for actions from other integrations.

{% endif %}
