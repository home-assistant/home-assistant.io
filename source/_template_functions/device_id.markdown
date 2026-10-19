---
title: "Get a device ID: device_id"
function_name: "device_id"
description: "Returns the device ID for a given entity ID or device name."
available_as:
  - function
  - filter
category: device
return_type: "string or None"
limited: false
since: "2021.11"
related_functions:
  - device_entities
  - device_name
  - device_attr
  - is_device_attr
---

The `device_id` template function returns the {% term device %} ID associated with an {% term entity %} ID or a device name. If you pass an entity ID, it looks up which device that entity belongs to. If you pass a device name, it searches for a device with that exact name. It returns `None` if no matching device is found.

This is the starting point for most device-related template work. Since many device functions require a device ID, you'll often use `device_id` to get that ID from something more human-readable. For example, you might know the entity ID of your thermostat sensor but need the device ID to look up the manufacturer or firmware version with [`device_attr`](/template-functions/device_attr/). Or you might want to find all entities on the same device as a particular sensor using [`device_entities`](/template-functions/device_entities/).

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ device_id("sensor.living_room_temperature") }}'
type: string
output: "a1b2c3d4e5f6a1b2c3d4e5f6"

---
filter: '{{ "sensor.living_room_temperature" | device_id }}'
type: string
output: "a1b2c3d4e5f6a1b2c3d4e5f6"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
device_id(
    entity_id_or_device_name: str,
) -> str | None
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
entity_id_or_device_name:
  description: >
    The entity ID or the name of the device. When using a device name, it matches against the custom name you set first, then falls back to the default device name.
  required: true
  type: string
{% endfunction_parameters %}

## Good to know

- Returns `None` when no device matches or when the entity does not belong to a device.
- Name lookups need an exact match, including capitalization and spaces.
- When you set a custom device name, that name takes precedence over the default device name.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Look up a device ID by device name

You can also pass a device name instead of an entity ID. This is handy when you know the name of the device but not its ID.

{% example %}
template: '{{ device_id("Living Room Thermostat") }}'
type: string
output: "a1b2c3d4e5f6a1b2c3d4e5f6"
{% endexample %}

### Chain with device_entities to find sibling entities

Find all entities that share the same device as a known entity. This is useful when you know one entity on a device and want to discover the rest.

{% example %}
template: |
  {{
    device_id("sensor.living_room_temperature")
    | device_entities
  }}
type: list
output: |
  [
    "sensor.living_room_temperature",
    "sensor.living_room_humidity",
    "binary_sensor.living_room_battery",
  ]
{% endexample %}

### Get the manufacturer of a device from an entity ID

Combine `device_id` with [`device_attr`](/template-functions/device_attr/) to look up device attributes starting from an entity ID.

{% example %}
template: |
  {{
    device_attr(
      device_id("sensor.living_room_temperature"),
      "manufacturer"
    )
  }}
type: string
output: "Aqara"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
