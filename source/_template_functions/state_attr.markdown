---
title: "Get state attribute: state_attr"
function_name: "state_attr"
description: "Returns the value of a specific attribute from an entity's state."
available_as:
  - function
  - filter
category: state
return_type: any
limited: false
since: "0.7"
related_functions:
  - states
  - is_state_attr
  - is_state
  - has_value
---

The `state_attr` template function returns the value of a specific attribute from an {% term entity %}'s state. Entities in Home Assistant often have more information than their main state. For example, a climate entity's state might be `heating`, but it also has attributes like `temperature`, `current_temperature`, and `hvac_modes`.

You'll use this whenever you need information beyond the main state of an entity. Common examples include reading the brightness of a light, the battery level of a {% term device %}, the friendly name of an entity, or the list of options available on a select entity. If the entity or attribute doesn't exist, it returns `None` instead of causing an error.

{% tip %}
For dashboards, a [Tile card](/dashboards/tile/) can show attributes as badges without a template. Reach for `state_attr()` when you need the value inside an automation, a notification message, or another template.
{% endtip %}

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ state_attr("climate.living_room", "temperature") }}'
type: float
output: "21.0"

---
filter: '{{ "climate.living_room" | state_attr("temperature") }}'
type: float
output: "21.0"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
state_attr(
    entity_id: str,
    attribute: str,
) -> Any
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
entity_id:
  description: The entity ID to get the attribute from.
  required: true
  type: string
attribute:
  description: >
    The name of the attribute to retrieve. Returns `None` if the entity or attribute does not exist.
  required: true
  type: string
{% endfunction_parameters %}

{% tip %}

To see all available attributes for an entity, go to {% my developer_states title="**Settings** > **Tools** > **States**" %} and select the entity. The attributes are listed below the state value.

{% endtip %}

## Good to know

- Returns `None` when the entity or attribute does not exist. Chain with [`| default(value)`](/template-functions/default/) for a fallback.
- Attribute values keep their original type, so numeric attributes like `brightness` come back as numbers without conversion.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Get the brightness of a light

Read how bright a light is currently set.

{% example %}
template: '{{ state_attr("light.living_room", "brightness") }}'
type: integer
output: "178"
{% endexample %}

### Get battery level

Check the battery percentage of a device.

{% example %}
template: '{{ state_attr("sensor.phone_battery", "battery_level") }}'
type: integer
output: "85"
{% endexample %}

### Use an attribute in a {% term condition %}

Check if the current temperature is below the target temperature.

{% example %}
template: |
  {{
    state_attr("climate.living_room", "current_temperature")
    < state_attr("climate.living_room", "temperature")
  }}
type: boolean
output: "true"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
