---
title: "Test entity state: is_state"
function_name: "is_state"
description: "Tests if an entity is in a specific state."
available_as:
  - function
  - test
category: state
return_type: boolean
limited: false
since: "0.7"
related_functions:
  - states
  - state_attr
  - is_state_attr
  - has_value
---

The `is_state` template function tests if an {% term entity %} is in a specific state. It returns `true` or `false`. This is probably the template function you'll use most often, and it's the recommended way to check what state something is in.

Whenever you need to make a decision based on the current state of a {% term device %} or {% term sensor %}, `is_state` is the way to do it. Is the alarm armed? Is someone home? Is a door open? Is the washing machine still running? These are all yes/no questions about the state of an entity, and `is_state` answers them. It's also safer than comparing states directly, because it will never throw an error if the entity doesn't exist yet (for example, during Home Assistant startup). It returns `false`.

{% tip %}
Automation conditions and triggers already let you check an entity's state through the visual editor, no template needed. Reach for `is_state()` when you need the result inside a template expression, notification message, or template sensor.
{% endtip %}

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ is_state("device_tracker.phone", "home") }}'
type: boolean
output: "true"

---
test: |
  {% if "device_tracker.phone" is is_state("home") %}
    Phone is home!
  {% endif %}
type: string
output: "Phone is home!"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
is_state(
    entity_id: str,
    state: str | list[str],
) -> bool
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
entity_id:
  description: The entity ID to check.
  required: true
  type: string
state:
  description: >
    The state value to compare against. Can be a single string or a list of strings to match against any of them.
  required: true
  type: [string, list]
{% endfunction_parameters %}

## Checking against multiple states

You can pass a list of states to check against. The function returns `true` if the entity's state matches any value in the list.

{% example %}
template: '{{ is_state("vacuum.roborock", ["cleaning", "returning"]) }}'
type: boolean
output: "true"
{% endexample %}

## Good to know

- Returns `false` (not an error) when the entity does not exist, making it safer than string comparison during startup.
- The state to compare against is always a string. Numeric states need to be wrapped in quotes, like `is_state("sensor.x", "25")`.
- Passing a list of states returns `true` if any of them match, acting like an OR check.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Use in an automation {% term condition %}

Only run the rest of the {% term automation %} if the alarm is armed away.

{% example %}
automation: |
  condition:
    - condition: template
      value_template: >
        {{ is_state("alarm_control_panel.home", "armed_away") }}
{% endexample %}

### Combine with iif in a notification

Send a {% term notification %} that includes the current state of the front door, using [`iif`](/template-functions/iif/) to convert the state into a human-readable word.

{% example %}
action: |
  action:
    - action: notify.mobile
      data:
        message: >
          The front door is
          {{
            iif(is_state("binary_sensor.front_door", "on"),
            "open", "closed")
          }}
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
