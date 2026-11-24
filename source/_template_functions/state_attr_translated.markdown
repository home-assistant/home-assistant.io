---
title: "Get translated attribute value: state_attr_translated"
function_name: "state_attr_translated"
description: "Returns the translated value of a specific attribute from an entity's state."
available_as:
  - function
  - filter
category: state
return_type: any
limited: false
since: "2024.8"
related_functions:
  - state_attr
  - state_translated
  - states
---

The `state_attr_translated` template function returns the value of an {% term entity %}'s attribute translated into your configured language. While [`state_attr`](/template-functions/state_attr/) returns the raw attribute value, this function returns the localized version shown in the interface.

This is useful when you display attribute values that have been translated by {% term integrations %}, such as HVAC modes, fan modes, or preset names. For example, if your Home Assistant is set to French, `state_attr_translated("climate.living_room", "hvac_action")` might return _"Chauffage"_ instead of `heating`.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ state_attr_translated("climate.living_room", "hvac_action") }}'
type: string
output: Heating

---
filter: '{{ "climate.living_room" | state_attr_translated("hvac_action") }}'
type: string
output: Heating
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
state_attr_translated(
    entity_id: str,
    attribute: str,
) -> Any
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
entity_id:
  description: The entity ID to get the translated attribute from.
  required: true
  type: string
attribute:
  description: >
    The name of the attribute to retrieve. Returns the translated value if a translation is available, otherwise returns the raw value. Returns `None` if the entity or attribute does not exist.
  required: true
  type: string
{% endfunction_parameters %}

## Good to know

- Returns `None` when the entity or attribute does not exist. A badly formed entity ID causes an error.
- Only attributes that integrations provide translations for are localized. If your language has no translation, the English text is used. If no translation exists at all, you get the raw value.
- Only text values are translated. Numbers, lists, and other values are returned unchanged.
- The output uses the language configured in Home Assistant under **Settings** > **System** > **General**. The language in your user profile has no effect.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Show the translated HVAC action

Display the current action of a climate {% term entity %} in your language.

{% example %}
template: |
  The heater is currently: {{ state_attr_translated(
      "climate.living_room", "hvac_action") }}
type: string
output: "The heater is currently: Heating"
{% endexample %}

### Show the translated fan mode

Show a media player's or climate device's mode in a friendly, localized way.

{% example %}
template: 'Fan mode: {{ state_attr_translated("climate.bedroom", "fan_mode") }}'
type: string
output: "Fan mode: Auto"
{% endexample %}

### Build a localized status message

Combine the translated state with the translated attribute to build a status line in your language.

{% example %}
template: |
  {% set entity = "climate.living_room" %}
  The thermostat is {{ state_translated(entity) }} and {{
    state_attr_translated(entity, "preset_mode") | lower }}.
type: string
output: "The thermostat is Heat and eco."
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
