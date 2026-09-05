---
title: "Get device attribute: device_attr"
function_name: "device_attr"
description: "Returns the value of a specific attribute from a device."
available_as:
  - function
  - filter
category: device
return_type: any
limited: false
since: "2021.11"
related_functions:
  - is_device_attr
  - device_id
  - device_name
  - device_entities
---

The `device_attr` template function returns the value of a specific attribute from a {% term device %} in the device registry. You can pass either a device ID or an {% term entity %} ID along with the attribute name you want to retrieve. If the device or attribute doesn't exist, it returns `None`.

This is useful when you need device-level information that isn't available through entity states or attributes. For example, you might want to check the manufacturer, model, software version, or serial number of a device. You could use this to track which devices need firmware updates, build a hardware inventory, or include model information in a support request notification. Common attribute names include `manufacturer`, `model`, `sw_version`, `hw_version`, `serial_number`, and `identifiers`.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ device_attr("a1b2c3d4e5f6a1b2c3d4e5f6", "manufacturer") }}'
type: string
output: "Philips"

---
filter: '{{ "a1b2c3d4e5f6a1b2c3d4e5f6" | device_attr("manufacturer") }}'
type: string
output: "Philips"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
device_attr(
    device_or_entity_id: str,
    attr_name: str,
) -> Any
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
device_or_entity_id:
  description: >
    The device ID or entity ID to look up. When using an entity ID, the function first resolves the device the entity belongs to.
  required: true
  type: string
attr_name:
  description: >
    The name of the device attribute to retrieve. Common attributes include `manufacturer`, `model`, `sw_version`, `hw_version`, `serial_number`, and `identifiers`.
  required: true
  type: string
{% endfunction_parameters %}

{% tip %}

Device attributes are stored in the device registry and are separate from entity state attributes. You can view commonly used device information, such as the manufacturer, model, firmware version, hardware version, and serial number, by going to {% my integrations title="**Settings** > **Devices & services**" %} > **Devices** and selecting a device. Not every device registry attribute is shown in the user interface.

{% endtip %}

## Good to know

- Returns `None` when the device or attribute does not exist, so chain with [`| default(value)`](/template-functions/default/) for display fallbacks.
- This reads from the device registry, not the entity state. Attributes like `manufacturer` and `sw_version` live here, not in [`state_attr`](/template-functions/state_attr/).
- Accepts either a device ID or an entity ID. When given an entity ID, it resolves to the device first.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Get the model of a device from an entity ID

You can pass an entity ID directly. The function automatically resolves the device behind the entity.

{% example %}
template: '{{ device_attr("light.living_room", "model") }}'
type: string
output: "LCA001"
{% endexample %}

### Check the firmware version of a device

Read the software version to see if a device is up to date.

{% example %}
template: '{{ device_attr("a1b2c3d4e5f6a1b2c3d4e5f6", "sw_version") }}'
type: string
output: "1.104.2"
{% endexample %}

### Include device info in a notification

Send a {% term notification %} with the manufacturer and model when a device goes offline.

{% example %}
action: |
  action:
    - action: notify.mobile
      data:
        message: >
          {{ device_name("sensor.garage_door_battery") }} is offline.
          Device:
          {{ device_attr("sensor.garage_door_battery", "manufacturer") }}
          {{ device_attr("sensor.garage_door_battery", "model") }}
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
