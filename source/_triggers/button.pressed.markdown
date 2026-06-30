---
title: "Button pressed"
trigger: button.pressed
domain: button
description: "Triggers when one or more buttons are pressed."
---

Use this trigger when you want an automation to run every time a button entity is pressed. This is useful when a button starts a task on a device and you also want Home Assistant to take a follow-up action.

{% include integrations/labs_entity_triggers_note.md %}

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

## Good to know

- This trigger fires when Home Assistant detects a button press from the button entity.
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
- **Action**: Light: Turn on

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
