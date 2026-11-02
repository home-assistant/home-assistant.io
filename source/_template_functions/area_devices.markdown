---
title: "Get devices in an area: area_devices"
function_name: "area_devices"
description: "Returns a list of device IDs associated with a given area."
available_as:
  - function
  - filter
category: area
return_type: list
limited: true
since: "2021.11"
related_functions:
  - area_entities
  - areas
  - area_id
  - area_name
---

The `area_devices` template function returns a list of device IDs that belong to a given {% term area %}. You can specify the area by its name or by its internal ID. While [`area_entities`](/template-functions/area_entities/) gives you individual {% term entity %} IDs, `area_devices` gives you the {% term devices %} themselves.

This is useful when you need to work at the device level rather than the entity level. For example, you might want to count how many physical devices are in a room, check if a specific device is assigned to an area, or loop through all devices to find their attributes. Each device can have multiple entities, so the device list is typically shorter than the entity list for the same area.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ area_devices("Living Room") }}'
type: list
output: |
  [
    "a1b2c3d4e5f6a1b2c3d4e5f6",
    "f6e5d4c3b2a1f6e5d4c3b2a1",
  ]

---
filter: '{{ "Living Room" | area_devices }}'
type: list
output: |
  [
    "a1b2c3d4e5f6a1b2c3d4e5f6",
    "f6e5d4c3b2a1f6e5d4c3b2a1",
  ]
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
area_devices(
    area_name_or_id: str,
) -> list[str]
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
area_name_or_id:
  description: >
    The name or ID of the area. You can find area IDs in {% my areas title="**Settings** > **Areas, labels & zones**" %}.
  required: true
  type: string
{% endfunction_parameters %}

## Good to know

- Returns an empty list when the area has no devices or when the name does not match. It does not raise an error.
- A device can only belong to one area. Entities assigned directly to an area but not through a device are not included here.
- The list contains device IDs, not entity IDs. Use [`device_entities`](/template-functions/device_entities/) to get entities from each device.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Count how many devices are in a room

Find out how many physical devices are assigned to an area.

{% example %}
template: '{{ area_devices("Kitchen") | count }}'
type: integer
output: "5"
{% endexample %}

### Get the name of each device in an area

Loop through all devices in an area and display their names using [`device_name`](/template-functions/device_name/).

{% example %}
template: |
  {% for device_id in area_devices("Living Room") %}
    {{ device_name(device_id) }}
  {% endfor %}
{% endexample %}

### Check if any device in an area has a firmware update

Combine `area_devices` with entity lookups to see if any device in a room has a pending update.

{% example %}
template: |
  {{
    area_devices("Office")
    | map("device_entities")
    | sum(start=[])
    | select("match", "update.")
    | select("is_state", "on")
    | list
    | count > 0
  }}
type: boolean
output: "true"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
