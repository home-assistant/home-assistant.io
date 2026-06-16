---
title: "Set a value on multiple devices via multicast"
action: zwave_js.multicast_set_value
domain: zwave_js
description: "Changes a value on multiple Z-Wave devices at once using multicast."
related_actions:
  - zwave_js.set_value
---

Use this action to change the same value on several Z-Wave devices at once using multicast, so all targeted devices receive the message simultaneously. This is handy for keeping a group of devices in sync, for example setting the same level on multiple dimmers at the exact same moment.

Correctly using this action requires advanced knowledge of Z-Wave. It performs minimal validation and passes your input straight to the Z-Wave JS API. For a single device, use the [Set a value](/actions/zwave_js.set_value/) action instead.

{% include actions/ui_header.md %}

To set a value via multicast from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the list of actions, search for and select **Set a value on multiple devices via multicast**.
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
Broadcast:
  description: When on, the command is broadcast to all nodes on the network. Defaults to off.
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
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zwave_js.multicast_set_value`. A basic example looks like this:

{% example %}
action: |
  action: zwave_js.multicast_set_value
  target:
    entity_id:
      - light.living_room
      - light.kitchen
  data:
    command_class: 38
    property: targetValue
    value: 50
{% endexample %}

### Options in YAML

{% options_yaml %}
area_id:
  description: The area ID, or list of area IDs, to target. All Z-Wave devices and entities in the area are targeted.
  required: false
  type: [string, list]
device_id:
  description: The device ID, or list of device IDs, to target. At least two entities or devices must resolve when not broadcasting.
  required: false
  type: [string, list]
entity_id:
  description: The entity ID, or list of entity IDs, to target. At least two entities or devices must resolve when not broadcasting.
  required: false
  type: [string, list]
broadcast:
  description: Whether the command is broadcast to all nodes on the network. When you have only one Z-Wave network, you do not need to provide a device or entity when this is true. With multiple networks, provide at least one device or entity so the action knows which network to target.
  required: false
  type: boolean
  default: false
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
{% endoptions_yaml %}

## Good to know

- When not broadcasting, target at least two entities or devices on the same Z-Wave network.
- Multicast only works for devices on the same Z-Wave network.

{% include actions/stuck.md %}

{% include actions/related.md %}
