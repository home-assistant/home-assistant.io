## Using this condition in YAML

If you work directly in YAML, or you want to know exactly what Home Assistant does under the hood, this section has the technical reference. It lists the field names you use in YAML, their types, and which ones are required. For how an automation is built in YAML, refer to [Automations in YAML](/docs/automation/yaml/).
{%- if page.condition contains "." %}

In YAML, put the settings that are specific to this condition under `options`. Keep `target`, if the condition uses one, and general settings such as `alias` and `enabled` at the top level, next to `condition`.
{%- endif %}
