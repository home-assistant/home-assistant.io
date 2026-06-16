---
title: "Test state attribute: is_state_attr"
function_name: "is_state_attr"
description: "Tests if a specific attribute of an entity has a given value."
available_as:
  - function
  - test
category: state
return_type: boolean
limited: false
since: "0.7"
related_functions:
  - state_attr
  - is_state
  - states
  - has_value
---

The `is_state_attr` template function checks whether a specific attribute of an {% term entity %} matches a given value. It returns `true` or `false`. This is the attribute equivalent of [`is_state`](/template-functions/is_state/), which checks the main state.

You'll use this when you need to make decisions based on an entity's attributes rather than its main state. For example, checking if a light's color mode is set to `color_temp`, if a media player's source is a specific input, or if a {% term device %}'s battery level is at a certain value. Like [`is_state`](/template-functions/is_state/), it safely returns `false` if the entity doesn't exist.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ is_state_attr("light.desk", "color_mode", "color_temp") }}'
type: boolean
output: "true"

---
test: |
  {% if "light.desk" is is_state_attr("color_mode", "color_temp") %}
    Light is in color temperature mode
  {% endif %}
type: string
output: "Light is in color temperature mode"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
is_state_attr(
    entity_id: str,
    attribute: str,
    value: Any,
) -> bool
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
entity_id:
  description: The entity ID to check.
  required: true
  type: string
attribute:
  description: The name of the attribute to test.
  required: true
  type: string
value:
  description: The value to compare the attribute against.
  required: true
  type: any
{% endfunction_parameters %}

{% tip %}

To find the exact attribute names and values for an entity, go to {% my developer_states title="**Developer Tools** > **States**" %} and select the entity.

{% endtip %}

## Good to know

- Returns `false` (not an error) when the entity or attribute does not exist.
- The comparison is type-strict. `is_state_attr("light.x", "brightness", "255")` is `false` when the attribute is the integer `255`.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Check if a media player is playing from a specific source

{% example %}
template: '{{ is_state_attr("media_player.tv", "source", "HDMI 1") }}'
type: boolean
output: "true"
{% endexample %}

### Use in an {% term automation %} {% term condition %}

Only proceed if the climate system is in heating mode.

{% example %}
automation: |
  condition:
    - condition: template
      value_template: >
        {{ is_state_attr("climate.living_room", "hvac_action", "heating") }}
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
