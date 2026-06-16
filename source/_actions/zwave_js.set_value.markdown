---
title: "Set a value"
action: zwave_js.set_value
domain: zwave_js
description: "Changes any value that Z-Wave recognizes on a Z-Wave device."
related_actions:
  - zwave_js.multicast_set_value
  - zwave_js.invoke_cc_api
---

Use this action to change any value that Z-Wave recognizes on a device. It is for advanced use cases where you need to change the state of a node and can't do it through a regular Home Assistant entity.

Correctly using this action requires advanced knowledge of Z-Wave. It performs minimal validation and passes your input straight to the Z-Wave JS API, so trouble usually means an incorrect value somewhere. To change a configuration parameter, use the [Set device configuration parameter](/actions/zwave_js.set_config_parameter/) or [Bulk set partial configuration parameters](/actions/zwave_js.bulk_set_partial_config_parameters/) action instead.

You can target the action at one or more entities, devices, or areas. At least one of those must be provided.

{% include actions/ui_header.md %}

To set a value from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the list of actions, search for and select **Set a value**.
6. Select the Z-Wave entities, devices, or areas to target, then set the **Command class**, **Property**, and **Value**.
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
Command class:
  description: The ID of the command class for the value.
  required: true
Endpoint:
  description: The endpoint for the value.
  required: false
Property:
  description: The ID of the property for the value.
  required: true
Property key:
  description: The ID of the property key for the value.
  required: false
Value:
  description: The new value to set.
  required: true
Options:
  description: A map of set value options. Refer to the Z-Wave JS documentation for the available options.
  required: false
Wait for result:
  description: When on, waits for a response from the node. When not set, the integration decides whether to wait. Waiting can take a while for an asleep battery device.
  required: false  
  default: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zwave_js.set_value`. A basic example looks like this:

{% example %}
action: |
  action: zwave_js.set_value
  target:
    entity_id: switch.kitchen
  data:
    command_class: 117
    property: local
    value: 2
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
command_class:
  description: The ID of the command class for the value.
  required: true
  type: integer
property:
  description: The ID of the property for the value.
  required: true
  type: [string, integer]
property_key:
  description: The ID of the property key for the value.
  required: false
  type: [string, integer]
endpoint:
  description: The endpoint for the value.
  required: false
  type: integer
value:
  description: The new value to set.
  required: true
  type: any
options:
  description: A map of set value options. Refer to the Z-Wave JS documentation for the available options.
  required: false
  type: map
wait_for_result:
  description: When true, waits for a response from the node. When not set, the integration decides whether to wait. Waiting can take a while for an asleep battery device.
  required: false
  type: boolean
{% endoptions_yaml %}

## Good to know

- You must target at least one entity, device, or area.
- This action does minimal validation. If it isn't working, double-check the command class, property, and value against the Z-Wave JS documentation.

{% include actions/stuck.md %}

{% include actions/related.md %}
