---
title: "Get area ID: area_id"
function_name: "area_id"
description: "Returns the area ID for a given area name, entity ID, or device ID."
available_as:
  - function
  - filter
category: area
return_type: string
limited: false
since: "2021.11"
related_functions:
  - area_devices
  - area_entities
  - area_humidity_sensor
  - area_name
  - area_temperature_sensor
  - areas
---

The `area_id` template function returns the unique area ID for a given area name, {% term entity %} ID, or {% term device %} ID. Every {% term area %} in Home Assistant has an internal ID that stays the same even if you rename the area, and this function lets you look it up.

This is useful when you need the area ID to pass to other area functions like [`area_entities`](/template-functions/area_entities/) or [`area_devices`](/template-functions/area_devices/), or when you want to find out which area a particular entity or device belongs to. For example, you could use it in an {% term automation %} to determine which room triggered a motion {% term sensor %} and then act on all devices in that room.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ area_id("Living Room") }}'
type: string
output: "living_room"

---
filter: '{{ "Living Room" | area_id }}'
type: string
output: "living_room"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
area_id(
    lookup_value: str,
) -> str | None
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
lookup_value:
  description: >
    The area name, entity ID, or device ID to look up. If an area name is given, the matching area ID is returned. If an entity ID or device ID is given, the area ID of that entity or device is returned.
  required: true
  type: string
{% endfunction_parameters %}

## Good to know

- Returns `None` when no matching area is found for the lookup value.
- The area ID is stable and does not change when you rename the area, so it is safe to hard-code in templates.
- When an entity or device has no area assigned, the result is `None` even if the entity itself exists.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Find the area of an entity

Look up which area a specific entity belongs to.

{% example %}
template: '{{ area_id("sensor.living_room_temperature") }}'
type: string
output: "living_room"
{% endexample %}

### Find the area of a device

Look up which area a device is assigned to by passing its device ID.

{% example %}
template: '{{ area_id("deadbeefdeadbeefdeadbeef") }}'
type: string
output: "kitchen"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
