---
title: "Test device attribute: is_device_attr"
function_name: "is_device_attr"
description: "Tests if a specific attribute of a device has a given value."
available_as:
  - function
  - test
category: device
return_type: boolean
limited: false
since: "2021.11"
related_functions:
  - device_attr
  - device_id
  - device_name
  - device_entities
---

The `is_device_attr` template function checks whether a specific attribute of a {% term device %} matches a given value. It returns `true` or `false`. This is the device-level equivalent of [`is_state_attr`](/template-functions/is_state_attr/), working with the device registry instead of entity states.

This is useful when you want to make decisions in {% term automations %} or {% term templates %} based on device properties. For example, you could check if a device is made by a specific manufacturer, runs a particular firmware version, or matches a certain model. You might use it to apply different logic depending on the hardware vendor, or to trigger an alert when a device's software version doesn't match the expected value after an update.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ is_device_attr("a1b2c3d4e5f6a1b2c3d4e5f6", "manufacturer", "Philips") }}'
type: boolean
output: "true"

---
test: |
  {% if "a1b2c3d4e5f6a1b2c3d4e5f6" is is_device_attr("manufacturer", "Philips") %}
    This is a Philips device!
  {% endif %}
type: string
output: "This is a Philips device!"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
is_device_attr(
    device_or_entity_id: str,
    attr_name: str,
    attr_value: Any,
) -> bool
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
device_or_entity_id:
  description: >
    The device ID or entity ID to check. When using an entity ID, the function first resolves the device the entity belongs to.
  required: true
  type: string
attr_name:
  description: >
    The name of the device attribute to test. Common attributes include `manufacturer`, `model`, `sw_version`, `hw_version`, and `serial_number`.
  required: true
  type: string
attr_value:
  description: The value to compare the attribute against.
  required: true
  type: any
{% endfunction_parameters %}

## Good to know

- Returns `false` (not an error) when the device or attribute does not exist.
- String comparison is case-sensitive. `is_device_attr(id, "manufacturer", "philips")` does not match `"Philips"`.
- Accepts either a device ID or an entity ID. With an entity ID, the device is resolved first.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Check if a device is a specific model

Verify that a device matches an expected model, for example to apply model-specific logic in an automation.

{% example %}
template: '{{ is_device_attr("light.living_room", "model", "LCA001") }}'
type: boolean
output: "true"
{% endexample %}

### Use in an automation condition

Only run the rest of the {% term automation %} if the device is from a specific manufacturer.

{% example %}
automation: |
  condition:
    - condition: template
      value_template: >
        {{ is_device_attr("sensor.front_door", "manufacturer", "Aqara") }}
{% endexample %}

### Check firmware version across devices in an area

Combine with [`area_devices`](/template-functions/area_devices/) to find devices in an area that are running a specific firmware version.

{% example %}
template: |
  {% for dev_id in area_devices("Living Room") %}
    {% if is_device_attr(dev_id, "sw_version", "1.104.2") %}
      {{ device_name(dev_id) }}
    {% endif %}
  {% endfor %}
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
