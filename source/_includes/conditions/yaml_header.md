## Using this condition in YAML

If you work directly in YAML, or you want to know exactly what Home Assistant does under the hood, this section has the technical reference. It lists the field names you use in YAML, their types, and which ones are required.
{%- if page.condition contains "." -%}
{%- assign condition_domain = page.condition | split: "." | first -%}
{%- if condition_domain == "zwave_js" %}

In YAML, put all settings of the condition under `options`, not at the top level next to `condition`.
{%- else %}

In YAML, use `target` to choose what the condition checks. Put all other settings of the condition under `options`, not at the top level next to `condition` and `target`.
{%- endif -%}
{%- endif %}
