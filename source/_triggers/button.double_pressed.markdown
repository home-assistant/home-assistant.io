---
title: "Button double pressed"
trigger: button.double_pressed
domain: button
description: "Triggers when one or more buttons are pressed twice in quick succession."
related_triggers:
  - button.pressed
  - button.hold_started
  - button.hold_ended
  - event.received
---

The **Button double pressed** trigger fires when a physical button is pressed twice in quick succession, like double-pressing a button on a wall switch or a remote control. Use it to give one button a second function without adding more hardware, for example a single press for the ceiling light and a double press for the whole room.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), select the area, floor, device, label, or entity you want to monitor.
5. From the triggers shown for that target, select **Button double pressed**.
6. Select **Save**.

### Options in the UI

This trigger has no additional options beyond the target.

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `button.double_pressed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: button.double_pressed
  target:
    entity_id: event.bedside_remote_button
{% endexample %}

This fires every time `event.bedside_remote_button` reports a double press.

### Options in YAML

This trigger has no additional YAML options beyond the target.

{% include triggers/targets.md domain="event" %}

## Good to know

- This trigger works with event entities that use the **button** device class, such as wall switches, remote controls, and scene controllers. Button entities, like a device's restart or identify button, do not report double presses.
- The device decides how quickly the two presses must follow each other. Home Assistant fires the trigger once the device reports that the two-press sequence is complete.
- This trigger fires only for exactly two presses. A sequence of three or more presses does not fire it.
- Not every button reports double presses. If the trigger never fires, your device may only report single presses. Check the event types the entity supports, and use the [**Event received**](/triggers/event.received/) trigger if you want to react to the exact event types your device reports.
- Changes to `unavailable` or `unknown` do not count as presses.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn off all the lights with a double press

Use this automation to make a bedside button switch off the lights everywhere, while a single press still controls the bedroom light only. This example targets a label called **All lights** that you create yourself and assign to the light entities you want to include.

- **Trigger**: Button double pressed
  - **Target**: Bedside remote button (`event.bedside_remote_button`)
- **Action**: Turn off light
  - **Target**: All lights (by label)

{% details "YAML example for turning off all the lights with a double press" %}

{% example %}
automation: |
  - alias: "Turn off all the lights on a double press"
    triggers:
      - trigger: button.double_pressed
        target:
          entity_id: event.bedside_remote_button
    actions:
      - action: light.turn_off
        target:
          label_id: all_lights
{% endexample %}

{% enddetails %}

### Automation: lock the front door with a double press

Use this automation when you want a deliberate action, like locking a door, to need two presses instead of one.

- **Trigger**: Button double pressed
  - **Target**: Hallway switch button (`event.hallway_switch_button`)
- **Action**: Lock lock
  - **Target**: Front door lock

{% details "YAML example for locking the front door with a double press" %}

{% example %}
automation: |
  - alias: "Lock the front door on a double press"
    triggers:
      - trigger: button.double_pressed
        target:
          entity_id: event.hallway_switch_button
    actions:
      - action: lock.lock
        target:
          entity_id: lock.front_door
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
