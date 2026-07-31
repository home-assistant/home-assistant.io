---
title: "Button hold started"
trigger: button.hold_started
domain: button
description: "Triggers when one or more buttons start being held."
related_triggers:
  - button.hold_ended
  - button.pressed
  - button.double_pressed
  - event.received
---

The **Button hold started** trigger fires the moment a physical button has been held down long enough to count as a long press, while you are still holding it. Use it to start something that should keep running while you hold the button, such as opening a cover or turning a light to full brightness. To react when you let go instead, use the [**Button hold ended**](/triggers/button.hold_ended/) trigger.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), select the area, floor, device, label, or entity you want to monitor.
5. From the triggers shown for that target, select **Button hold started**.
6. Select **Save**.

### Options in the UI

This trigger has no additional options beyond the target.

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `button.hold_started`. A basic example looks like this:

{% example %}
trigger: |
  trigger: button.hold_started
  target:
    entity_id: event.living_room_switch_up_button
{% endexample %}

This fires every time you start holding `event.living_room_switch_up_button`.

### Options in YAML

This trigger has no additional YAML options beyond the target.

{% include triggers/targets.md domain="event" %}

## Good to know

- This trigger works with event entities that use the **button** device class, such as wall switches, remote controls, and scene controllers. Button entities, like a device's restart or identify button, do not report holds.
- The device decides how long a button must be held before it counts as a hold, so the delay before the trigger fires depends on your hardware.
- This trigger fires once at the start of the hold, not repeatedly while you keep holding.
- Not every button reports holds. If the trigger never fires, your device may only report single presses. Check the event types the entity supports, and use the [**Event received**](/triggers/event.received/) trigger if you want to react to the exact event types your device reports.
- Changes to `unavailable` or `unknown` do not count as holds.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: open the blinds while you hold a button

Use this automation together with [**Button hold ended**](/triggers/button.hold_ended/) so that the blinds move while you hold the button and stop when you let go.

- **Trigger**: Button hold started
  - **Target**: Living room switch up button (`event.living_room_switch_up_button`)
- **Action**: Open cover
  - **Target**: Living room blinds

{% details "YAML example for opening the blinds while a button is held" %}

{% example %}
automation: |
  - alias: "Open the living room blinds while the button is held"
    triggers:
      - trigger: button.hold_started
        target:
          entity_id: event.living_room_switch_up_button
    actions:
      - action: cover.open_cover
        target:
          entity_id: cover.living_room_blinds
{% endexample %}

{% enddetails %}

### Automation: turn a light to full brightness on a hold

Use this automation when a short press should toggle a light as usual, and holding the same button should take it straight to full brightness.

- **Trigger**: Button hold started
  - **Target**: Kitchen switch button (`event.kitchen_switch_button`)
- **Action**: Turn on light
  - **Target**: Kitchen ceiling light
  - **Brightness**: 100%

{% details "YAML example for turning a light to full brightness on a hold" %}

{% example %}
automation: |
  - alias: "Turn the kitchen light to full brightness on a hold"
    triggers:
      - trigger: button.hold_started
        target:
          entity_id: event.kitchen_switch_button
    actions:
      - action: light.turn_on
        target:
          entity_id: light.kitchen_ceiling
        data:
          brightness_pct: 100
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
