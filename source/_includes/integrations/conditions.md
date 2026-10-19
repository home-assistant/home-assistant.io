{%- assign domain = include.domain | default: page.ha_domain -%}
{%- assign domain_conditions = site.conditions | where: "domain", domain | sort: "condition" -%}

## List of conditions

{% if domain_conditions.size > 0 %}

The {{ page.title }} {% term integration %} provides the following conditions. Each link below opens a dedicated page with examples, fields, and a step-by-step UI walkthrough.

{% for cnd in domain_conditions %}
- [{{ cnd.title }}]({{ cnd.url }}) (`{{ cnd.condition }}`)
    {{ cnd.description }}
{% endfor %}

For an overview of every condition across all integrations, see the [conditions reference](/conditions/).

{% else %}

This integration does not provide any documented conditions yet. See the [conditions reference](/conditions/) for conditions from other integrations.

{% endif %}
