---
title: "Button hold ended"
trigger: button.hold_ended
domain: button
description: "Triggers when one or more buttons stop being held."
related_triggers:
  - button.hold_started
  - button.pressed
  - button.double_pressed
  - event.received
---

The **Button hold ended** trigger fires when you release a physical button that you were holding down. Use it to stop something that was started by holding the button, or to run an action only after a deliberate long press. To react at the start of the hold instead, use the [**Button hold started**](/triggers/button.hold_started/) trigger.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), select the area, floor, device, label, or entity you want to monitor.
5. From the triggers shown for that target, select **Button hold ended**.
6. Select **Save**.

### Options in the UI

This trigger has no additional options beyond the target.

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `button.hold_ended`. A basic example looks like this:

{% example %}
trigger: |
  trigger: button.hold_ended
  target:
    entity_id: event.living_room_switch_up_button
{% endexample %}

This fires every time you stop holding `event.living_room_switch_up_button`.

### Options in YAML

This trigger has no additional YAML options beyond the target.

{% include triggers/targets.md domain="event" %}

## Good to know

- This trigger works with event entities that use the **button** device class, such as wall switches, remote controls, and scene controllers. Button entities, like a device's restart or identify button, do not report holds.
- This trigger fires only after a hold. Releasing a short press fires the [**Button pressed**](/triggers/button.pressed/) trigger instead, so the two do not overlap.
- Not every button reports holds. If the trigger never fires, your device may only report single presses. Check the event types the entity supports, and use the [**Event received**](/triggers/event.received/) trigger if you want to react to the exact event types your device reports.
- Changes to `unavailable` or `unknown` do not count as holds.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: stop the blinds when you release the button

Use this automation together with [**Button hold started**](/triggers/button.hold_started/) so that the blinds move while you hold the button and stop as soon as you let go.

- **Trigger**: Button hold ended
  - **Target**: Living room switch up button (`event.living_room_switch_up_button`)
- **Action**: Stop cover
  - **Target**: Living room blinds

{% details "YAML example for stopping the blinds when a button is released" %}

{% example %}
automation: |
  - alias: "Stop the living room blinds when the button is released"
    triggers:
      - trigger: button.hold_ended
        target:
          entity_id: event.living_room_switch_up_button
    actions:
      - action: cover.stop_cover
        target:
          entity_id: cover.living_room_blinds
{% endexample %}

{% enddetails %}

### Automation: lock the front door with a long press

Use this automation when you want locking the door to take a deliberate long press, so it cannot happen by brushing against the switch.

- **Trigger**: Button hold ended
  - **Target**: Hallway switch button (`event.hallway_switch_button`)
- **Action**: Lock lock
  - **Target**: Front door lock

{% details "YAML example for locking the front door with a long press" %}

{% example %}
automation: |
  - alias: "Lock the front door on a long press"
    triggers:
      - trigger: button.hold_ended
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
