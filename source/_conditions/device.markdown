---
title: "Device"
condition: device
domain: device_automation
description: "Tests a condition that a device provides, such as whether a light is on."
related_conditions:
  - state
  - numeric_state
---

The **Device** condition checks something that a {% term device %} provides. You select a device, and then select one of the conditions it offers. For example, you can check whether the garage door is open, or whether the alarm is armed.

The conditions you can select depend on the device and its {% term integration %}. For example, a light usually offers **Living room light is on** and **Living room light is off**. A sensor can offer a check on its value, and a cover can offer **Garage door is open**. Not every device offers conditions.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select **By type**. Under **Generic**, select **Device**.
   - You can also search for **Device**.
5. Under **Device**, select the device you want to check.
6. Under **Condition**, select what you want to check.
   - Some conditions show more options, such as **Duration**, **Above**, or **Below**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The device to check.
  required: true
Condition:
  description: What to check on the device. The list shows the conditions that this device offers, such as **Garage door is open**.
  required: true
Duration:
  description: Only for some conditions, such as whether a light is on or off. The condition only passes if the device has been in that state for at least this long.
  required: false
Above:
  description: Only for some conditions, such as a sensor value. The condition passes if the value is above this number.
  required: false
Below:
  description: Only for some conditions, such as a sensor value. The condition passes if the value is below this number.
  required: false
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, use `condition: device`. A device condition refers to the device and the entity by their internal IDs, not by their names. The easiest way to get the YAML is to create the condition in the editor first. Then, on the condition, select **Menu** {% icon "mdi:dots-vertical" %} > **Edit in YAML**. A basic example looks like this:

{% example %}
condition: |
  condition: device
  device_id: 8a2f5c3e9d1b4f6a7c0e2d4b6f8a1c3e
  entity_id: 4b7d9e1f3a5c7e9b1d3f5a7c9e1b3d5f
  domain: cover
  type: is_open
{% endexample %}

This passes when the garage door is open.

### Options in YAML

In YAML, the options have different names. **Device** becomes `device_id`. The **Condition** you select becomes `domain`, `type`, and, for most conditions, `entity_id`. Some condition types accept more options, such as `for`, `above`, or `below`. These match the extra options in the UI.

{% options_yaml %}
condition:
  description: The condition type. For this condition, use `device`.
  required: true
  type: string
device_id:
  description: The ID of the device to check.
  required: true
  type: string
domain:
  description: The integration or entity domain that provides the condition, such as `light`, `cover`, or `sensor`.
  required: true
  type: string
type:
  description: What to check, such as `is_on`, `is_off`, or `is_open`. The available types depend on the domain.
  required: true
  type: string
entity_id:
  description: The entity of the device to check. The editor writes the ID from the entity registry. An entity ID, such as `cover.garage_door`, also works. Most conditions need it.
  required: false
  type: string
{% endoptions_yaml %}

## Good to know

- When you create the condition in the editor, it uses internal IDs. It keeps working if you rename the device or change the entity ID. After you change an entity ID, restart Home Assistant or reload your automations, so the condition picks up the new entity ID.
- If you write an entity ID, such as `cover.garage_door`, in YAML, update the condition when that entity ID changes.
- If you remove the device or its entity, for example, because you replaced the device, the automation stops working. After the next restart or reload, {% my repairs title="**Settings** > **System** > **Repairs**" %} shows that the automation failed to set up. The error is `Unknown device` or `Unknown entity`, with the ID.
- For a removed device, the editor shows **Editor not available for unknown device**. To fix the automation, delete the condition and add it again with the new device.
- If the entity is unavailable or unknown, the condition doesn't pass. For example, a check whether a light is on or a cover is open fails.
- The [State](/docs/scripts/conditions/#state-condition) and [Numeric state](/docs/scripts/conditions/#numeric-state-condition) conditions check an entity directly. In YAML, they are easier to read and to share, because they use the entity ID.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: get a reminder when the garage door is still open

At 22:00, this automation sends a notification, but only if the garage door is open.

- **Trigger**: Time
  - **At time**: 22:00:00
- **Condition**: Device
  - **Device**: Garage door
  - **Condition**: Garage door is open
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a garage door reminder" %}

{% example %}
automation: |
  alias: "Garage door reminder"
  triggers:
    - trigger: time
      at: "22:00:00"
  conditions:
    - condition: device
      device_id: 8a2f5c3e9d1b4f6a7c0e2d4b6f8a1c3e
      entity_id: 4b7d9e1f3a5c7e9b1d3f5a7c9e1b3d5f
      domain: cover
      type: is_open
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The garage door is still open."
{% endexample %}

{% enddetails %}

### Automation: get a notification when a door opens while you're away

When the back door opens, this automation sends a notification, but only if the alarm is armed away.

- **Trigger**: State changed
  - **Entity**: Back door (`binary_sensor.back_door`)
  - **To**: Open
- **Condition**: Device
  - **Device**: Home alarm
  - **Condition**: Home alarm is armed away
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a notification about the back door" %}

{% example %}
automation: |
  alias: "Back door opened while away"
  triggers:
    - trigger: state
      entity_id: binary_sensor.back_door
      to: "on"
  conditions:
    - condition: device
      device_id: 2c4e6a8b0d1f3e5c7a9b1d3f5e7c9a0b
      entity_id: 9e1c3a5b7d9f1e3c5a7b9d1f3e5c7a9d
      domain: alarm_control_panel
      type: is_armed_away
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The back door was opened while the alarm is armed away."
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
