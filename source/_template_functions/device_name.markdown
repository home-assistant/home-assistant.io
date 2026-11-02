---
title: "Get a device name: device_name"
function_name: "device_name"
description: "Returns the name of a device from a device ID or entity ID."
available_as:
  - function
  - filter
category: device
return_type: "string or None"
limited: false
since: "2021.11"
related_functions:
  - device_id
  - device_entities
  - device_attr
  - is_device_attr
---

The `device_name` template function returns the human-readable name of a {% term device %}. You can pass it either a device ID or an {% term entity %} ID. If a user-set name exists for the device, that name is returned; otherwise, the default device name is used. It returns `None` if no matching device is found.

This is useful whenever you want to display or include a device's name in a {% term notification %}, dashboard card, or log message. For example, you could loop through all devices in an {% term area %} and list their names, or include the device name in an alert so you know exactly which device reported a problem. Since it accepts both device IDs and entity IDs, you can use whichever you happen to have available.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ device_name("a1b2c3d4e5f6a1b2c3d4e5f6") }}'
type: string
output: "Living Room Thermostat"

---
filter: '{{ "a1b2c3d4e5f6a1b2c3d4e5f6" | device_name }}'
type: string
output: "Living Room Thermostat"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
device_name(
    device_id_or_entity_id: str,
) -> str | None
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
device_id_or_entity_id:
  description: >
    The device ID or entity ID to look up. When using an entity ID, the function finds the device the entity belongs to and returns that device's name.
  required: true
  type: string
{% endfunction_parameters %}

## Good to know

- Returns `None` when no device matches the lookup value.
- Uses the custom name if you set one, otherwise returns the default name the integration provided.
- Renaming a device updates the output immediately, so the result can change over time.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Get a device name from an entity ID

Pass an entity ID to find out the name of the device it belongs to.

{% example %}
template: '{{ device_name("sensor.living_room_temperature") }}'
type: string
output: "Living Room Thermostat"
{% endexample %}

### Include device name in a notification

Send a {% term notification %} that includes the name of the device reporting low battery.

{% example %}
action: |
  action:
    - action: notify.mobile
      data:
        message: >
          {{ device_name("binary_sensor.front_door_battery") }}
          has a low battery!
{% endexample %}

### List all device names in an area

Combine with [`area_devices`](/template-functions/area_devices/) to display the names of all devices in an area.

{% example %}
template: |
  {% for dev_id in area_devices("Kitchen") %}
    {{ device_name(dev_id) }}
  {% endfor %}
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
