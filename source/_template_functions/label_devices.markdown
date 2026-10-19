---
title: "Get devices with a label: label_devices"
function_name: "label_devices"
description: "Returns a list of device IDs that have a specific label assigned."
available_as:
  - function
  - filter
category: label
return_type: list
limited: true
since: "2024.4"
related_functions:
  - label_areas
  - label_entities
  - labels
  - label_id
  - label_name
---

The `label_devices` template function returns a list of {% term device %} IDs that have a specific {% term label %} assigned. You can specify the label by its name or by its internal ID. This gives you all devices tagged with that label.

This is useful when you organize your devices using labels and want to act on or inspect a specific group. For example, if you label battery-powered devices as _"Battery"_, you could use `label_devices` to find them all and check their battery levels, or if you label certain devices as _"Guest Room"_, you could quickly find and control all devices for your guests. As you add or remove labels from devices, the list automatically updates, so your {% term automations %} and {% term templates %} always reflect the current state.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ label_devices("Battery") }}'
type: list
output: |
  [
    "a1b2c3d4e5f6a1b2c3d4e5f6",
    "f6e5d4c3b2a1f6e5d4c3b2a1",
  ]

---
filter: '{{ "Battery" | label_devices }}'
type: list
output: |
  [
    "a1b2c3d4e5f6a1b2c3d4e5f6",
    "f6e5d4c3b2a1f6e5d4c3b2a1",
  ]
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
label_devices(
    label_id_or_name: str,
) -> list[str]
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
label_id_or_name:
  description: >
    The label name or ID to look up. Returns the device IDs that have this label assigned. You can find labels in {% my labels title="**Settings** > **Areas, labels & zones**" %}.
  required: true
  type: string
{% endfunction_parameters %}

## Good to know

- Only returns devices with the label assigned directly. Labels applied to entities or areas do not roll up to their devices.
- Returns an empty list when the label does not match any devices.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Count devices with a specific label

Find out how many devices are tagged with a given label.

{% example %}
template: '{{ label_devices("Battery") | count }}'
type: integer
output: "2"
{% endexample %}

### Get device names for a label

List the friendly names of all devices that have a specific label by combining `label_devices` with [`device_name`](/template-functions/device_name/).

{% example %}
template: |
  {% for device_id in label_devices("Battery") %}
    {{ device_name(device_id) }}
  {% endfor %}
type: string
output: |
  Living Room Motion Sensor
  Front Door Sensor
{% endexample %}

### Check battery levels of labeled devices

Find all devices with a _"Battery"_ label and check their battery sensor entities. This collects the battery-level entities for all labeled devices.

{% example %}
template: |
  {% for device_id in label_devices("Battery") %}
    {% set batteries = device_entities(device_id)
      | select("match", "sensor.")
      | select("search", "battery")
      | list %}
    {% for entity_id in batteries %}
      {{ device_name(device_id) }}: {{ states(entity_id) }}%
    {% endfor %}
  {% endfor %}
type: string
output: |
  Living Room Motion Sensor: 85%
  Front Door Sensor: 42%
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
