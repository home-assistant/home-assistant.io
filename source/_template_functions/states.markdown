---
title: "Get entity state: states"
function_name: "states"
description: "Returns the state value of an entity, or lets you iterate over all entity states."
available_as:
  - function
  - filter
category: state
return_type: string
limited: false
since: "0.7"
related_functions:
  - is_state
  - state_attr
  - has_value
  - expand
---

The `states` template function returns the current state of an {% term entity %} as a text value. For example, a light might return `on` or `off`, a temperature {% term sensor %} might return `21.5`, and a person might return `home` or `away`.

This is the most fundamental template function in Home Assistant. Every time you want to read what a sensor is showing, check if a {% term device %} is on, or use a value in a {% term notification %} or calculation, you'll use `states()`. It's also the safest way to read a state because it returns `unknown` if the entity doesn't exist, instead of causing an error.

{% tip %}
For dashboards, a [Tile card](/dashboards/tile/) shows an entity's state without any template. Reach for `states()` when you need the value inside an automation, a notification message, or another template.
{% endtip %}

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ states("sensor.living_room_temperature") }}'
type: string
output: "21.5"

---
filter: '{{ "sensor.living_room_temperature" | states }}'
type: string
output: "21.5"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
states(
    entity_id: str,
    rounded: bool = False,
    with_unit: bool = False,
) -> str
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
entity_id:
  description: >
    The entity ID to get the state from. Returns the state as a string, or `unknown` if the entity does not exist.
  required: true
  type: string
rounded:
  description: >
    When `true`, numeric states are rounded according to the entity's display precision (the same rounding shown in the UI). When omitted, it follows `with_unit`.
  required: false
  default: "false"
  type: boolean
with_unit:
  description: >
    When `true`, appends the entity's unit of measurement to the state. Implies `rounded` unless `rounded` is set explicitly.
  required: false
  default: "false"
  type: boolean
{% endfunction_parameters %}

## Iterating over states

You can also use `states` without an argument to loop through all entities, or use `states.domain` to loop through entities of a specific domain.

{% example %}
template: |
  {% for state in states.sensor %}
    {{ state.entity_id }}: {{ state.state }}
  {% endfor %}
{% endexample %}

{% tip %}

Not sure what state an entity has? Go to {% my developer_states title="**Developer Tools** > **States**" %} to see the current state and all attributes of every entity in your system.

{% endtip %}

## Important: states are always strings

The value returned by `states()` is always a text string, even for numeric sensors. If you need to do math with it, convert it using `| float` or `| int` first.

{% example %}
template: '{{ states("sensor.temperature") | float + 1 }}'
type: float
output: "22.5"
{% endexample %}

## Good to know

- Returns the text `unknown` when the entity does not exist, not `None` and not an error.
- The result is always a string, even for numeric sensors. Convert with [`float`](/template-functions/float/) or [`int`](/template-functions/int/) before doing math.
- Using `states.sensor.name` (dotted notation) raises an error when the entity is missing, while `states("sensor.name")` does not.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Use a sensor value in a notification

Include the current temperature reading in a notification message. Use `with_unit=true` to automatically append the entity's unit of measurement, so the output uses whatever unit the sensor reports (°C, °F, K) without hardcoding it.

{% example %}
action: |
  action:
    - action: notify.mobile
      data:
        message: >
          The temperature is {{ states("sensor.outside_temperature", with_unit=true) }}
{% endexample %}

### Check a value before acting

Read a sensor value, convert it to a number, and use it in a {% term condition %}.

{% example %}
template: '{{ states("sensor.humidity") | float > 70 }}'
type: boolean
output: "true"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
