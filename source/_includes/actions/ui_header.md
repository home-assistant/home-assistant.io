{% if page.response == "required" %}
This action returns data that you can use in later steps of the same automation or script.
{% elsif page.response == "optional" %}
This action can return data that you can use in later steps of the same automation or script.
{% endif %}

## Using this action from the user interface

If you prefer building automations and scripts visually, Home Assistant walks you through this action step by step. {% if page.domain == "built_in" %}You fill in a few options and save.{% else %}You pick what to target, tweak a few options, and save.{% endif %} No YAML knowledge required.
