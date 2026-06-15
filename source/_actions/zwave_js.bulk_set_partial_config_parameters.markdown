---
title: "Bulk set partial configuration parameters"
action: zwave_js.bulk_set_partial_config_parameters
domain: zwave_js
description: "Sets multiple partial configuration parameters on a Z-Wave device at once."
related_actions:
  - zwave_js.set_config_parameter
---

Use this action to set several partial configuration parameters that share one parameter number on a Z-Wave device in a single call. This is useful when a device packs multiple settings into one parameter and you want to change more than one of them at the same time.

Correctly using this action requires advanced knowledge of Z-Wave. For a single parameter, use the [Set device configuration parameter](/actions/zwave_js.set_config_parameter/) action instead.

You can target the action at one or more entities, devices, or areas. At least one of those must be provided.

{% include actions/ui_header.md %}

To bulk set partial configuration parameters from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the list of actions, search for and select **Bulk set partial configuration parameters**.
6. Select the Z-Wave entities, devices, or areas to target, then set the **Parameter** and **Value**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Area ID(s):
  description: The area, or areas, to target. All Z-Wave devices and entities in the area are targeted.
  required: false
Device ID(s):
  description: The device, or devices, to target.
  required: false
Entity ID(s):
  description: The entity, or entities, to target.
  required: false
Endpoint:
  description: The configuration parameter's endpoint. Defaults to 0.
  required: false
Parameter:
  description: The ID of the configuration parameter to change.
Value:
  description: Either a raw integer for the whole parameter, or a mapping where each key is the bitmask (hex or integer) or partial parameter name, and each value is the value to set for that partial.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zwave_js.bulk_set_partial_config_parameters`.

The following examples use parameter 21 of [this device](https://devices.zwave-js.io/?jumpTo=0x031e:0x000a:0x0001:0.0). They set `0xff` to `127`, `0x7f00` to `10`, and `0x8000` to `1` (or the raw value `4735`).

{% note %}
When you use the mapping format, the cached values of any partial parameters you leave out are kept. So in the second, third, fourth, and fifth examples, the cached values for `0xff0000`, `0x3f000000`, and `0x40000000` are used. When you send the raw integer value, it is assumed you calculated the full value, so in the first example those partials are all set to `0`.
{% endnote %}

{% example %}
action: |
  action: zwave_js.bulk_set_partial_config_parameters
  target:
    entity_id: switch.fan
  data:
    parameter: 21
    value: 4735
{% endexample %}

{% example %}
action: |
  action: zwave_js.bulk_set_partial_config_parameters
  target:
    entity_id: switch.fan
  data:
    parameter: 21
    value:
      0xff: 127
      0x7f00: 10
      0x8000: 1
{% endexample %}

{% example %}
action: |
  action: zwave_js.bulk_set_partial_config_parameters
  target:
    entity_id: switch.fan
  data:
    parameter: 21
    value:
      255: 127
      32512: 10
      32768: 1
{% endexample %}

{% example %}
action: |
  action: zwave_js.bulk_set_partial_config_parameters
  target:
    entity_id: switch.fan
  data:
    parameter: 21
    value:
      255: 127
      32512: 10
      32768: "Fine"
{% endexample %}

{% example %}
action: |
  action: zwave_js.bulk_set_partial_config_parameters
  target:
    entity_id: switch.fan
  data:
    parameter: 21
    value:
      "Quick Strip Effect: Hue Color Wheel / Color Temp": 127
      "Quick Strip Effect Intensity": 10
      "Quick Strip Effect Intensity Scale": "Fine"
{% endexample %}

### Options in YAML

{% options_yaml %}
area_id:
  description: The area ID, or list of area IDs, to target. All Z-Wave devices and entities in the area are targeted. At least one of entity_id, device_id, or area_id is required.
  required: false
  type: [string, list]
device_id:
  description: The device ID, or list of device IDs, to target. At least one of entity_id, device_id, or area_id is required.
  required: false
  type: [string, list]
entity_id:
  description: The entity ID, or list of entity IDs, to target. At least one of entity_id, device_id, or area_id is required.
  required: false
  type: [string, list]
endpoint:
  description: The configuration parameter's endpoint.
  required: false
  type: integer
  default: 0
parameter:
  description: The ID of the configuration parameter to change.
  required: true
  type: integer
value:
  description: Either a raw integer for the whole parameter, or a mapping where each key is the bitmask (hex or integer) or partial parameter name, and each value is the value to set for that partial. Missing partials keep their cached values.
  required: true
  type: [integer, map]
{% endoptions_yaml %}

## Good to know

- You must target at least one entity, device, or area.
- To find the available parameters and bitmasks for your device, look it up in the [Z-Wave JS device database](https://devices.zwave-js.io/).

{% include actions/stuck.md %}

{% include actions/related.md %}
