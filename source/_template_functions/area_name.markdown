---
title: "Get area name: area_name"
function_name: "area_name"
description: "Returns the friendly name of an area from its ID, entity ID, or device ID."
available_as:
  - function
  - filter
category: area
return_type: string
limited: false
since: "2021.11"
related_functions:
  - area_id
  - area_entities
  - area_devices
  - areas
---

The `area_name` template function returns the friendly, human-readable name of an {% term area %}. You can give it an area ID, an {% term entity %} ID, or a {% term device %} ID, and it tells you the name of the area it belongs to.

This is especially useful for building dynamic messages and {% term notifications %}. Instead of showing a technical area ID like `living_room`, you can show the actual name _"Living Room"_ that you (or whoever receives the message) recognize. For example, when motion is detected, your notification can say _"Motion detected in the Living Room"_ by looking up the area name of the {% term sensor %} that triggered.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ area_name("living_room") }}'
type: string
output: "Living Room"

---
filter: '{{ "living_room" | area_name }}'
type: string
output: "Living Room"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
area_name(
    lookup_value: str,
) -> str | None
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
lookup_value:
  description: >
    The area ID, entity ID, or device ID to look up. Returns the friendly name of the area, or `None` if no matching area is found.
  required: true
  type: string
{% endfunction_parameters %}

## Good to know

- Returns `None` when the lookup value does not match an area, entity, or device.
- When an entity or device has no area assigned, the result is `None`.
- The name reflects the current area label, so renaming an area updates the output immediately.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Get the area name from an entity

Find out which room a sensor is in by passing its entity ID.

{% example %}
template: '{{ area_name("sensor.living_room_temperature") }}'
type: string
output: "Living Room"
{% endexample %}

### Use in a notification with the trigger area

A very common pattern: when a sensor triggers an {% term automation %}, include the room name in the notification. This works with any {% term trigger %} that provides `trigger.entity_id`, such as state or motion triggers.

{% example %}
action: |
  action:
    - action: notify.mobile
      data:
        title: >
          {{ area_name(trigger.entity_id) }}
        message: >
          Motion detected in {{ area_name(trigger.entity_id) }}
{% endexample %}

### List all area names

Loop through all areas and display their names.

{% example %}
template: |
  {% for area_id in areas() %}
    {{ area_name(area_id) }}
  {% endfor %}
type: string
output: |
  Living Room
  Kitchen
  Bedroom
  Hallway
{% endexample %}

### List rooms with open windows

A common use case: build a message listing which rooms have open windows or doors. This uses `area_name` as a filter to convert each open sensor's entity ID into a room name, then removes duplicates.

{% example %}
template: |
  {{
    states.binary_sensor
    | selectattr('attributes.device_class', 'in',
        ('window', 'door'))
    | map(attribute='entity_id')
    | select('is_state', 'on')
    | map('area_name')
    | select
    | unique
    | list
    | join(', ')
  }}
type: string
output: "Kitchen, Bedroom"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
