---
title: "Button released"
trigger: easywave.button_release
domain: easywave
description: "Triggers when an Easywave transmitter button is released (impulse mode only)."
related_triggers:
  - easywave.button_press_a
  - easywave.button_press_b
  - easywave.button_press_c
  - easywave.button_press_d
---

The **Button released** trigger fires when an Easywave transmitter reports that a button was released. Use it for hold-style automations: start an action on press, then stop or reverse it when the button is released.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), select the Easywave transmitter device or its **State** sensor.
5. From the triggers shown for that target, select **Button released**.
6. Select **Save**.

### Options in the UI

This trigger has no additional options beyond the target.

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `easywave.button_release`. A basic example looks like this:

{% example %}
trigger: |
  trigger: easywave.button_release
  target:
    entity_id: sensor.living_room_wall_switch_state
{% endexample %}

This fires when a button on that transmitter is released.

### Options in YAML

This trigger has no additional YAML options beyond the target.

{% include triggers/targets.md %}

## Good to know

- This trigger is available only for transmitters learned in impulse mode. In impulse mode, the **State** sensor returns to `Not pressed` when the button is released.
- Target an Easywave transmitter **State** sensor (an enum sensor).
- Changes to `unavailable` or `unknown` do not count as releases.
- The release event does not identify which button was released. Combine it with a recent **Button A pressed** (or B/C/D) automation if you need that context.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn off a light when the button is released

Use this with a press automation so the light stays on only while the button is held.

- **Trigger**: Button released
  - **Target**: Living room wall switch state sensor
- **Action**: Turn off light
  - **Target**: Living room light

{% details "YAML example for turning off a light on button release" %}

{% example %}
automation: |
  alias: "Turn off living room light when Easywave button is released"
  triggers:
    - trigger: easywave.button_release
      target:
        entity_id: sensor.living_room_wall_switch_state
  actions:
    - action: light.turn_off
      target:
        entity_id: light.living_room
{% endexample %}

{% enddetails %}

### Automation: notify when a button is released

Use this to confirm that a held remote button was released.

- **Trigger**: Button released
  - **Target**: Bedroom remote state sensor
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a button release notification" %}

{% example %}
automation: |
  alias: "Notify when Easywave button is released"
  triggers:
    - trigger: easywave.button_release
      target:
        entity_id: sensor.bedroom_remote_state
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "An Easywave remote button was released."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
