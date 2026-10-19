{%- assign domain = include.domain | default: page.ha_domain -%}
{%- assign domain_triggers = site.triggers | where: "domain", domain | sort: "trigger" -%}

## List of triggers

{% if domain_triggers.size > 0 %}

The {{ page.title }} {% term integration %} provides the following triggers. Each link below opens a dedicated page with examples, fields, and a step-by-step UI walkthrough.

{% for trg in domain_triggers %}
- [{{ trg.title }}]({{ trg.url }}) (`{{ trg.trigger }}`)
    {{ trg.description }}
{% endfor %}

For an overview of every trigger across all integrations, see the [triggers reference](/triggers/).

{% else %}

This integration does not provide any documented triggers yet. See the [triggers reference](/triggers/) for triggers from other integrations.

{% endif %}
