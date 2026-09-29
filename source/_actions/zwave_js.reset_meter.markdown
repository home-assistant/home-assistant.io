---
title: "Reset meters on a node"
action: zwave_js.reset_meter
domain: zwave_js
description: "Resets the meters on a Z-Wave node that supports the Meter Command Class."
---

Use this action to reset the meters on a Z-Wave device that supports the Meter Command Class, for example to start a fresh energy measurement on a smart plug or energy monitor.

You can target the action at one or more entities, devices, or areas.

{% include actions/ui_header.md %}

To reset meters from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the list of actions, search for and select **Reset meters on a node**.
6. Select the Z-Wave entities, devices, or areas to target.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Area ID(s):
  description: The area, or areas, to target. All Z-Wave meter entities in the area are targeted.
  required: false
Device ID(s):
  description: The device, or devices, to target.
  required: false
Entity ID(s):
  description: The entity, or entities, to target.
  required: false
Meter type:
  description: The type of meter to reset. Not all devices let you pick a meter type.
  required: false
Target value:
  description: The value to reset the meter to. Not all devices support resetting to a specific value.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zwave_js.reset_meter`. A basic example looks like this:

{% example %}
action: |
  action: zwave_js.reset_meter
  target:
    entity_id: sensor.washing_machine_power
{% endexample %}

### Options in YAML

{% options_yaml %}
area_id:
  description: The area ID, or list of area IDs, to target. All Z-Wave meter entities in the area are targeted.
  required: false
  type: [string, list]
device_id:
  description: The device ID, or list of device IDs, to target.
  required: false
  type: [string, list]
entity_id:
  description: The entity ID, or list of entity IDs, to target.
  required: false
  type: [string, list]
meter_type:
  description: The type of meter to reset. Not all devices let you pick a meter type.
  required: false
  type: integer
value:
  description: The value to reset the meter to. Not all devices support resetting to a specific value.
  required: false
  type: integer
{% endoptions_yaml %}

## Good to know

- The device must support the Meter Command Class.
- Some meters only support a full reset and ignore the meter type or target value.

{% include actions/stuck.md %}

{% include actions/related.md %}
