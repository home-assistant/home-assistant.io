---
title: "Button B pressed"
trigger: easywave.button_press_b
domain: easywave
description: "Triggers when button B is pressed on an Easywave transmitter."
related_triggers:
  - easywave.button_press_a
  - easywave.button_press_c
  - easywave.button_press_d
  - easywave.button_release
---

The **Button B pressed** trigger fires when an Easywave transmitter sends a press for Button B. Use it for remotes with at least two buttons, or for a 1-button transmitter that was learned with code B.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), select the Easywave transmitter device or its **State** sensor.
5. From the triggers shown for that target, select **Button B pressed**.
6. Select **Save**.

### Options in the UI

This trigger has no additional options beyond the target.

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `easywave.button_press_b`. A basic example looks like this:

{% example %}
trigger: |
  trigger: easywave.button_press_b
  target:
    entity_id: sensor.living_room_wall_switch_state
{% endexample %}

This fires every time Button B is pressed on that transmitter.

### Options in YAML

This trigger has no additional YAML options beyond the target.

{% include triggers/targets.md %}

## Good to know

- Target an Easywave transmitter **State** sensor (an enum sensor). The trigger is not available for neo sensors or the gateway connection status sensor.
- Changes to `unavailable` or `unknown` do not count as button presses.
- For multi-button transmitters, this trigger is offered when the device was learned with at least 2 buttons (codes A and B).
- For a **1-button** transmitter, this trigger is offered when Button B was the code pressed during learning.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn off a light when Button B is pressed

Use this when Button B on a wall switch should turn a light off.

- **Trigger**: Button B pressed
  - **Target**: Living room wall switch state sensor
- **Action**: Turn off light
  - **Target**: Living room light

{% details "YAML example for turning off a light from Button B" %}

{% example %}
automation: |
  alias: "Turn off living room light from Easywave Button B"
  triggers:
    - trigger: easywave.button_press_b
      target:
        entity_id: sensor.living_room_wall_switch_state
  actions:
    - action: light.turn_off
      target:
        entity_id: light.living_room
{% endexample %}

{% enddetails %}

### Automation: activate a scene when Button B is pressed

Use this when Button B should switch a room to an evening scene.

- **Trigger**: Button B pressed
  - **Target**: Hallway remote state sensor
- **Action**: Activate scene
  - **Target**: Evening hallway scene

{% details "YAML example for activating a scene from Button B" %}

{% example %}
automation: |
  alias: "Activate evening scene from Easywave Button B"
  triggers:
    - trigger: easywave.button_press_b
      target:
        entity_id: sensor.hallway_remote_state
  actions:
    - action: scene.turn_on
      target:
        entity_id: scene.evening_hallway
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
