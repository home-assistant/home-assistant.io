---
title: "Set device configuration parameter"
action: zwave_js.set_config_parameter
domain: zwave_js
description: "Changes a configuration parameter on a Z-Wave device."
related_actions:
  - zwave_js.bulk_set_partial_config_parameters
---

Use this action to change a configuration parameter on a Z-Wave device, for example to set the LED behavior, motion sensitivity, or the brightness ramp rate of a switch. To change several partial parameters that share one parameter number in a single call, use the [Bulk set partial configuration parameters](/actions/zwave_js.bulk_set_partial_config_parameters/) action instead.

You can target the action at one or more entities, devices, or areas. At least one of those must be provided.

{% include actions/ui_header.md %}

To set a configuration parameter from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the list of actions, search for and select **Set device configuration parameter**.
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
  description: The name or ID of the configuration parameter to change. The name is case sensitive.
  required: true
Bitmask:
  description: Target a specific bitmask for a partial parameter, in hex (0xff) or decimal (255) format. Not needed when you provide the parameter name. Cannot be combined with value size or value format.
  required: false
Value:
  description: The new value for the parameter, as an integer or the state label. The state label is case sensitive.
  required: true
Value size:
  description: The size of the value, either 1, 2, or 4. Used with value format when the parameter is not defined in your device's configuration file. Cannot be combined with bitmask.
  required: false
Value format:
  description: The format of the value, 0 for signed integer, 1 for unsigned integer, 2 for enumerated, 3 for bitfield. Used with value size when the parameter is not defined in your device's configuration file. Cannot be combined with bitmask.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zwave_js.set_config_parameter`.

The following examples use parameter 31 of [this device](https://devices.zwave-js.io/?jumpTo=0x000c:0x0203:0x0001:0.0) to set the `LED 1 Blink Status (bottom)` partial parameter in different ways. The values are interchangeable: you can use `1` or `Blink` for the value in any of them.

{% example %}
action: |
  action: zwave_js.set_config_parameter
  target:
    entity_id: switch.fan
  data:
    parameter: 31
    bitmask: 0x01
    value: 1
{% endexample %}

{% example %}
action: |
  action: zwave_js.set_config_parameter
  target:
    entity_id: switch.fan
  data:
    parameter: 31
    bitmask: 1
    value: "Blink"
{% endexample %}

{% example %}
action: |
  action: zwave_js.set_config_parameter
  target:
    entity_id: switch.fan
  data:
    parameter: "LED 1 Blink Status (bottom)"
    value: "Blink"
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
  description: The name or ID of the configuration parameter to change. The name is case sensitive.
  required: true
  type: [string, integer]
bitmask:
  description: Target a specific bitmask for a partial parameter, in hex (0xff) or decimal (255) format. Not needed when you provide the parameter name. Cannot be combined with value_size or value_format.
  required: false
  type: [string, integer]
value:
  description: The new value for the parameter, as an integer or the state label. The state label is case sensitive.
  required: true
  type: [string, integer]
value_size:
  description: The size of the value, either 1, 2, or 4. Used with value_format when the parameter is not defined in your device's configuration file. Cannot be combined with bitmask.
  required: false
  type: integer
value_format:
  description: The format of the value, 0 for signed integer, 1 for unsigned integer, 2 for enumerated, 3 for bitfield. Used with value_size when the parameter is not defined in your device's configuration file. Cannot be combined with bitmask.
  required: false
  type: integer
{% endoptions_yaml %}

## Good to know

- You must target at least one entity, device, or area.
- To find the available parameters and values for your device, look it up in the [Z-Wave JS device database](https://devices.zwave-js.io/).

{% include actions/stuck.md %}

{% include actions/related.md %}
