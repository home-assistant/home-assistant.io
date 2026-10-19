---
title: "Device"
trigger: device
domain: device_automation
description: "Triggers when something happens to a device, such as a button being pressed on a remote."
related_triggers:
  - state
  - numeric_state
  - event
---

The **Device** trigger starts an {% term automation %} when something happens to a {% term device %}, such as a button press on a remote. You select a device first, and then select one of the triggers that the device offers, such as **"Turn on" pressed**. The list comes from the device's {% term integration %}, and not every device offers triggers.

For most changes, such as a door opening or a light turning on, use a purpose-specific trigger instead, such as [Door opened](/triggers/door.opened/) or [Light turned on](/triggers/light.turned_on/). Use the **Device** trigger for button presses and other events that no other trigger covers.

## Choosing between the Device trigger and other triggers

Use the **Device** trigger for button presses and other {% term events %} that have no entity.

For changes that other triggers also cover, use those triggers instead, such as **Door opened** or **Temperature crossed threshold**. They're easier to set up and to read. If you target an entity or an area instead of a device, they're also easier to share in YAML, and they keep working when you replace the device, as long as the new entity gets the same entity ID or is in the same area.

## How the Device trigger differs from other triggers

Most triggers are named after what you want to react to, such as **Door opened**. The **Device** trigger starts from the device and shows the triggers that its integration offers for it. They fall into two groups:

- Many of them react to changes that a purpose-specific trigger also covers, such as a light turning on. For these, use the purpose-specific trigger instead.
- Some devices, such as some Zigbee remotes, report button presses without an {% term entity %}. The **Device** trigger is the only trigger that lists these button presses, so you can select them. Otherwise, you'd need to enter the event details yourself in a **Manual event received** trigger.

## Two ways to start from a device

The **Add trigger** dialog has two tabs, **By type** and **By target**. Both let you start from a device, but only **By type** gets you a **Device** trigger. The steps are in [Adding the Device trigger to an automation](#adding-the-device-trigger-to-an-automation).

Under **By target**, you can select a device and then pick from the triggers that work with its entities. You get a trigger, such as **Door opened**, with the device as its target. It isn't a **Device** trigger.

The two lists often have triggers that react to the same thing, such as **Door opened** and **Front door opened**. Button presses without an entity only show up in the **Device** trigger.

To tell them apart, look at the name. Many **Device** triggers include the name of your entity, such as **Front door opened**. The other triggers have a general name, such as **Door opened**.

{% include triggers/ui_header.md %}

### Adding the Device trigger to an automation

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select **By type**. Under **Generic**, select **Device**.
   - You can also search for **Device**.
5. Under **Device**, select the device you want to watch.
6. Under **Trigger**, select what should start the automation.
   - Some triggers show more options, such as **Duration**, **Above**, or **Below**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The device to watch.
  required: true
Trigger:
  description: What should start the automation. The list shows the triggers that this device offers, such as **Living room light turned on** or **"Turn on" pressed**.
  required: true
Duration:
  description: Only for some triggers, such as a light turning on or off. The trigger only reacts after the device has been in the new state for this long. By default, the trigger reacts right away.
  required: false
Above:
  description: Only for some triggers, such as a sensor value. The trigger reacts when the value rises above this number. For a sensor, set at least one of **Above** or **Below**. No default.
  required: false
Below:
  description: Only for some triggers, such as a sensor value. The trigger reacts when the value drops below this number. For a sensor, set at least one of **Above** or **Below**. No default.
  required: false
From:
  description: Only for some triggers, such as an option change on a select entity. The state to change from. If you leave it empty, the trigger reacts to a change from any state.
  required: false
To:
  description: Only for some triggers. The new state to react to, such as **Heat**. Required for some triggers, such as **Thermostat HVAC mode changed**. Optional for others, such as an option change on a select entity.
  required: false
Zone:
  description: Only for some triggers, such as **Phone enters a zone**. Required for those triggers. The zone to watch.
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In {% term YAML %}, use `trigger: device`. A **Device** trigger refers to the device, and often an entity, by their internal IDs, not by their names. The easiest way to get the YAML is to create the trigger in the editor first. Then, on the trigger, select **Menu** {% icon "mdi:dots-vertical" %} > **Edit in YAML**. A basic example looks like this:

{% example %}
trigger: |
  trigger: device
  device_id: 3f6a9c2e1b4d7f8a0c5e2b9d6a3f1c7e
  entity_id: 7c1e4a9b2d5f8e3a6c0b9d2f5a8e1c4b
  domain: light
  type: turned_on
{% endexample %}

This trigger reacts when the light of this device turns on.

### Options in YAML

In YAML, the options have different names. **Device** becomes `device_id`. The **Trigger** you select becomes `domain`, `type`, and, depending on the trigger, `entity_id` or `subtype`. **Duration**, **Above**, **Below**, **From**, **To**, and **Zone** become `for`, `above`, `below`, `from`, `to`, and `zone`.

The following list shows the common options. Some integrations add their own options. For example, some Z-Wave triggers also need `command_class`. To get the exact options for your device, create the trigger in the editor and copy its YAML.

{% options_yaml %}
trigger:
  description: The trigger type. For this trigger, use `device`.
  required: true
  type: string
device_id:
  description: The ID of the device to watch.
  required: true
  type: string
domain:
  description: The integration or entity domain that provides the trigger, such as `light`, `sensor`, or `zha`.
  required: true
  type: string
type:
  description: What should start the automation, such as `turned_on`, `turned_off`, or `remote_button_short_press`. The available types depend on the domain and the device.
  required: true
  type: string
entity_id:
  description: Required for triggers based on an entity. The entity of the device to watch. The editor stores the entity's internal ID. An entity ID, such as `light.living_room`, also works.
  required: false
  type: string
subtype:
  description: Only for some triggers. Narrows down the type, such as which button was pressed.
  required: false
  type: string
for:
  description: >
    Only for some triggers. How long the device must stay in the new state before the trigger reacts. Use a mapping with `days`, `hours`, `minutes`, `seconds`, or `milliseconds`, such as `minutes: 30`. A time string such as `"00:30:00"` doesn't work here. By default, the trigger reacts right away.
  required: false
  type: map
above:
  description: Only for some triggers. The trigger reacts when the value rises above this number. For a sensor, set at least one of `above` or `below`. No default.
  required: false
  type: float
below:
  description: Only for some triggers. The trigger reacts when the value drops below this number. For a sensor, set at least one of `above` or `below`. No default.
  required: false
  type: float
from:
  description: Only for some triggers, such as an option change on a select entity. The state to change from. If you leave it out, the trigger reacts to a change from any state.
  required: false
  type: string
to:
  description: Only for some triggers. The new state to react to, such as `heat`. Required for some triggers, such as an HVAC mode change on a thermostat. Optional for others, such as an option change on a select entity.
  required: false
  type: string
zone:
  description: Only for some triggers, such as a device tracker entering or leaving a zone. Required for those triggers. The entity ID of the zone, such as `zone.home`.
  required: false
  type: string
{% endoptions_yaml %}

## Good to know

- When you create the trigger in the editor, it uses internal IDs, so you can rename the device or change the entity ID without editing the trigger. After you change an entity ID, restart Home Assistant or {% term reload %} your automations. The trigger then picks up the new entity ID automatically.
- If you write an entity ID, such as `light.living_room`, in YAML, update the trigger when that entity ID changes.
- If you remove the device, for example, because you swapped it for a new physical device, the automation stops working. After the next restart or reload, {% my repairs title="**Settings** > **System** > **Repairs**" %} shows that the automation failed to set up, with an `Unknown device` error. If you remove only the entity, the error is `Unknown entity`. If you wrote the entity ID in YAML, such as `light.living_room`, no error is shown. The trigger stays set up but doesn't react until you update it.
- For a removed device, the editor shows **Editor not available for unknown device**. To fix the automation, delete the trigger and add it again with the new device.
- This is different from Home Assistant replacing a device with one or more new devices, for example, when it splits one device into separate devices per integration. In that case, the trigger keeps working. For a trigger that an integration provides, such as a button press on a remote, Home Assistant uses the replacement device from that integration. For other triggers, such as a light turning on, Home Assistant keeps using the old device. The editor still opens and, under **Device**, shows which device replaced the old one. Selecting that device and saving is optional. It updates the trigger to refer to the new device directly.
- If you use the **Duration** (`for`) option, a restart or reload cancels the running timer. The trigger only reacts after the device changes to the new state again and stays there for the full duration.

## Try it yourself

Ready to test this? Go to {% my automations title="**Settings** > **Automations & scenes**" %}, create a new automation, and add this trigger. Save the automation. Then do what you selected under **Trigger**, such as pressing the button on your remote, to see the trigger react.

{% include triggers/more_examples.md %}

### Automation: turn on the lights with a remote button

When you press the "Turn on" button on a Zigbee remote, this automation turns on the living room lights.

- **Trigger**: Device
  - **Device**: Living room remote
  - **Trigger**: "Turn on" pressed
- **Action**: Turn on light
  - **Target**: Living room (area)

{% details "YAML example for a remote button" %}

<!-- Disable terminology test, because the ZHA domain key is lowercase. -->
<!-- textlint-disable terminology -->

{% example %}
automation: |
  alias: "Turn on living room lights with the remote"
  triggers:
    - trigger: device
      device_id: 5b8e1d4a7c0f3e6b9d2a5c8f1e4b7d0a
      domain: zha
      type: remote_button_short_press
      subtype: turn_on
  actions:
    - action: light.turn_on
      target:
        area_id: living_room
{% endexample %}

<!-- textlint-enable terminology -->

{% enddetails %}

### Automation: turn off all lights on a floor with a long press

When you press and hold the "Turn off" button on a Zigbee remote, this automation turns off all lights on the ground floor.

- **Trigger**: Device
  - **Device**: Living room remote
  - **Trigger**: "Turn off" continuously pressed
- **Action**: Turn off light
  - **Target**: Ground floor (floor)

{% details "YAML example for a long press" %}

<!-- Disable terminology test, because the ZHA domain key is lowercase. -->
<!-- textlint-disable terminology -->

{% example %}
automation: |
  alias: "Turn off the ground floor lights with the remote"
  triggers:
    - trigger: device
      device_id: 5b8e1d4a7c0f3e6b9d2a5c8f1e4b7d0a
      domain: zha
      type: remote_button_long_press
      subtype: turn_off
  actions:
    - action: light.turn_off
      target:
        floor_id: ground_floor
{% endexample %}

<!-- textlint-enable terminology -->

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
