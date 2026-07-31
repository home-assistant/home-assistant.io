---
title: "Button pressed"
trigger: button.pressed
domain: button
description: "Triggers when one or more buttons are pressed."
related_triggers:
  - button.double_pressed
  - button.hold_started
  - button.hold_ended
  - event.received
---

Use this trigger when you want an automation to run every time a button is pressed. It works with button entities, such as a reset or maintenance button that a device exposes, and with the event entities that represent physical buttons, like a wall switch or a remote control button.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), select the area, floor, device, label, or entity you want to monitor.
5. From the triggers shown for that target, select **Button pressed**.
6. Select **Save**.

### Options in the UI

This trigger has no additional options beyond the target.

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `button.pressed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: button.pressed
  target:
    entity_id: button.air_purifier_reset_filter
{% endexample %}

This fires every time `button.air_purifier_reset_filter` is pressed.

### Options in YAML

This trigger has no additional YAML options beyond the target.

{% include triggers/targets.md %}

Besides button entities, this trigger also watches event entities that use the **button** device class. If a target contains both kinds, Home Assistant watches all of them.

## Good to know

- This trigger fires when Home Assistant detects a button press from the entity.
- For event entities, it fires on a completed short press. Holds and double presses are reported as separate event types, so use [**Button hold started**](/triggers/button.hold_started/), [**Button hold ended**](/triggers/button.hold_ended/), or [**Button double pressed**](/triggers/button.double_pressed/) for those.
- Changes to `unavailable` or `unknown` do not count as button presses.
- If you only need to press a button from an automation, use the related [**Press button**](/actions/button.press/) action instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: send a notification when a filter reset button is pressed

Use this automation to keep a record of when a maintenance button was pressed.

- **Trigger**: Button pressed
  - **Target**: Air purifier filter reset button
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a filter reset button notification" %}

{% example %}
automation: |
  - alias: "Notify when the filter reset button is pressed"
    triggers:
      - trigger: button.pressed
        target:
          entity_id: button.air_purifier_reset_filter
    actions:
      - action: notify.send_message
        target:
          entity_id: notify.my_device
        data:
          message: "The air purifier filter reset button was pressed."
{% endexample %}

{% enddetails %}

### Automation: turn on a light when an identify button is pressed

Use this automation when a button helps you locate a device and you want a nearby light to turn on at the same time.

- **Trigger**: Button pressed
  - **Target**: Front door camera identify button
- **Action**: Turn on light

{% details "YAML example for turning on a light from an identify button" %}

{% example %}
automation: |
  - alias: "Turn on the porch light when the camera identify button is pressed"
    triggers:
      - trigger: button.pressed
        target:
          entity_id: button.front_door_camera_identify
    actions:
      - action: light.turn_on
        target:
          entity_id: light.porch
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
