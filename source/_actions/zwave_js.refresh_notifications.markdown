---
title: "Refresh notifications on a node"
action: zwave_js.refresh_notifications
domain: zwave_js
description: "Refreshes notifications on a Z-Wave node that supports the Notification Command Class."
---

Use this action to refresh the notifications of a given type on a Z-Wave device that supports the Notification Command Class. This is handy when you want to make sure Home Assistant has the device's latest notification state.

Correctly using this action requires specific knowledge of Z-Wave, such as the notification type and event numbers from the Z-Wave specification.

You can target the action at one or more entities, devices, or areas. At least one of those must be provided.

{% include actions/ui_header.md %}

To refresh notifications from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the list of actions, search for and select **Refresh notifications on a node**.
6. Select the Z-Wave entities, devices, or areas to target, then set the **Notification Type**.
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
Notification Type:
  description: The notification type number as defined in the Z-Wave specification.
  required: true
Notification Event:
  description: The notification event number as defined in the Z-Wave specification.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zwave_js.refresh_notifications`. A basic example looks like this:

{% example %}
action: |
  action: zwave_js.refresh_notifications
  target:
    entity_id: binary_sensor.front_door
  data:
    notification_type: 6
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
notification_type:
  description: The notification type number as defined in the Z-Wave specification.
  required: true
  type: integer
notification_event:
  description: The notification event number as defined in the Z-Wave specification.
  required: false
  type: integer
{% endoptions_yaml %}

## Good to know

- You must target at least one entity, device, or area.
- The device must support the Notification Command Class.

{% include actions/stuck.md %}

{% include actions/related.md %}
