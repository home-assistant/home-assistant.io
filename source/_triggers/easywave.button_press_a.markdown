---
title: "Button A pressed"
trigger: easywave.button_press_a
domain: easywave
description: "Triggers when button A is pressed on an Easywave transmitter."
related_triggers:
  - easywave.button_press_b
  - easywave.button_press_c
  - easywave.button_press_d
  - easywave.button_release
---

The **Button A pressed** trigger fires when an Easywave transmitter sends a press for Button A. Use it to start automations from wall switches or hand-held remotes without watching the **State** sensor yourself.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), select the Easywave transmitter device or its **State** sensor.
5. From the triggers shown for that target, select **Button A pressed**.
6. Select **Save**.

### Options in the UI

This trigger has no additional options beyond the target.

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `easywave.button_press_a`. A basic example looks like this:

{% example %}
trigger: |
  trigger: easywave.button_press_a
  target:
    entity_id: sensor.living_room_wall_switch_state
{% endexample %}

This fires every time Button A is pressed on that transmitter.

### Options in YAML

This trigger has no additional YAML options beyond the target.

{% include triggers/targets.md %}

## Good to know

- Target an Easywave transmitter **State** sensor (an enum sensor). The trigger is not available for neo sensors or the gateway connection status sensor.
- Changes to `unavailable` or `unknown` do not count as button presses.
- If the transmitter was learned with fewer than 4 buttons, Button A is still available when the device has at least one button.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn on a light when Button A is pressed

Use this when a wall switch Button A should turn on a nearby light.

- **Trigger**: Button A pressed
  - **Target**: Living room wall switch state sensor
- **Action**: Turn on light
  - **Target**: Living room light

{% details "YAML example for turning on a light from Button A" %}

{% example %}
automation: |
  alias: "Turn on living room light from Easywave Button A"
  triggers:
    - trigger: easywave.button_press_a
      target:
        entity_id: sensor.living_room_wall_switch_state
  actions:
    - action: light.turn_on
      target:
        entity_id: light.living_room
{% endexample %}

{% enddetails %}

### Automation: notify when Button A is pressed

Use this to keep a record of when a remote Button A was pressed.

- **Trigger**: Button A pressed
  - **Target**: Bedroom remote state sensor
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a Button A notification" %}

{% example %}
automation: |
  alias: "Notify when Easywave Button A is pressed"
  triggers:
    - trigger: easywave.button_press_a
      target:
        entity_id: sensor.bedroom_remote_state
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Easywave Button A was pressed."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
