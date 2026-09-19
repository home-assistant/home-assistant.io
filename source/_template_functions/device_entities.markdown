---
title: "Get entities for a device: device_entities"
function_name: "device_entities"
description: "Returns a list of entity IDs associated with a given device."
available_as:
  - function
  - filter
category: device
return_type: "list of strings"
limited: true
since: "2021.11"
related_functions:
  - device_id
  - device_name
  - device_attr
  - is_device_attr
---

The `device_entities` template function returns a list of {% term entity %} IDs that belong to a given {% term device %}. You pass it a device ID, and it gives you every entity that is tied to that device in Home Assistant.

This is useful when you want to work with all the entities that a single device provides. For example, a smart plug might expose a switch entity, an energy sensor, and a signal strength sensor. With `device_entities`, you can loop through all of those at once. You could use it to check if any entity on a device is unavailable, build a summary card for a specific device, or find all sensors on a particular piece of hardware.

{% tip %}
The device's page in {% my integrations title="**Settings** > **Devices & services**" %} lists all entities that belong to it. Reach for `device_entities()` when you need that list inside a template expression.
{% endtip %}

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ device_entities("a1b2c3d4e5f6a1b2c3d4e5f6") }}'
type: list
output: |
  [
    "switch.smart_plug",
    "sensor.smart_plug_energy",
    "sensor.smart_plug_signal",
  ]

---
filter: '{{ "a1b2c3d4e5f6a1b2c3d4e5f6" | device_entities }}'
type: list
output: |
  [
    "switch.smart_plug",
    "sensor.smart_plug_energy",
    "sensor.smart_plug_signal",
  ]
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
device_entities(
    device_id: str,
) -> list[str]
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
device_id:
  description: >
    The ID of the device. You can find device IDs by using the [`device_id`](/template-functions/device_id/) function with an entity ID or device name.
  required: true
  type: string
{% endfunction_parameters %}

## Good to know

- Returns an empty list when the device ID does not match. It does not raise an error.
- Only accepts a device ID, not an entity ID or device name. Use [`device_id`](/template-functions/device_id/) to resolve those first.
- Hidden and disabled entities are included in the result.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Count entities on a device

Find out how many entities a specific device has registered.

{% example %}
template: '{{ device_entities("a1b2c3d4e5f6a1b2c3d4e5f6") | count }}'
type: integer
output: "3"
{% endexample %}

### Check if any entity on a device is unavailable

This checks whether any entity belonging to a device is currently in an unavailable state. Useful for monitoring device health.

{% example %}
template: |
  {{
    device_entities("a1b2c3d4e5f6a1b2c3d4e5f6")
    | select("is_state", "unavailable")
    | list
    | count > 0
  }}
type: boolean
output: "false"
{% endexample %}

### Get all sensor entities from a device

Filter the device's entities to only include sensors.

{% example %}
template: |
  {{
    device_entities("a1b2c3d4e5f6a1b2c3d4e5f6")
    | select("match", "sensor.")
    | list
  }}
type: list
output: |
  [
    "sensor.smart_plug_energy",
    "sensor.smart_plug_signal",
  ]
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
