---
title: "Check if entity has a value: has_value"
function_name: "has_value"
description: "Tests if an entity exists and has a valid state (not unavailable or unknown)."
available_as:
  - function
  - filter
  - test
category: state
return_type: boolean
limited: false
since: "2023.3"
related_functions:
  - states
  - is_state
  - state_attr
---

The `has_value` template function checks whether an {% term entity %} exists and has a meaningful state. It returns `false` if the entity doesn't exist, is `unavailable`, or is `unknown`. Otherwise it returns `true`.

This is essential for building robust {% term templates %} that don't break when a {% term sensor %} goes offline or hasn't reported yet. Sensors can temporarily become `unavailable` (for example, when a battery-powered {% term device %} goes to sleep) or `unknown` (during Home Assistant startup). By checking with `has_value` first, you can avoid errors in calculations or show a fallback message instead of displaying confusing values.

{% tip %}
Automation triggers and conditions let you require an entity to have a valid state through the visual editor. Reach for `has_value()` when you need the check inside a template expression.
{% endtip %}

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ has_value("sensor.temperature") }}'
type: boolean
output: "true"

---
filter: '{{ "sensor.temperature" | has_value }}'
type: boolean
output: "true"

---
test: |
  {% if "sensor.temperature" is has_value %}
    Sensor is available
  {% endif %}
type: string
output: "Sensor is available"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
has_value(
    entity_id: str,
) -> bool
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
entity_id:
  description: >
    The entity ID to check. Returns `true` if the entity exists and its state is not `unavailable` or `unknown`.
  required: true
  type: string
{% endfunction_parameters %}

{% tip %}

You can check if an entity is `unavailable` or `unknown` by looking it up in {% my developer_states title="**Settings** > **Tools** > **States**" %}. The state column shows the current value.

{% endtip %}

## Good to know

- Returns `false` for missing entities, so use this before reading a state with [`states`](/template-functions/states/) to avoid chasing `unknown` or `unavailable` downstream.
- Treats both `unavailable` and `unknown` the same. If you only want to exclude one, compare to the specific state with [`is_state`](/template-functions/is_state/).

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Safely read a sensor value with a fallback

Only use the sensor value if it's available, otherwise show a default message.

{% example %}
template: |
  {% if has_value("sensor.outdoor_temperature") %}
    It's {{ states("sensor.outdoor_temperature") }}°C outside
  {% else %}
    Temperature sensor is not available
  {% endif %}
type: string
output: "It's 18.5°C outside"
{% endexample %}

### Guard a calculation

Prevent errors by checking that a sensor has a value before doing math with it.

{% example %}
template: |
  {% if has_value("sensor.power_usage") %}
    {{ states("sensor.power_usage") | float * 0.25 }}
  {% else %}
    0
  {% endif %}
type: float
output: "62.5"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
