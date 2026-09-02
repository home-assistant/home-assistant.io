---
title: "Button D pressed"
trigger: easywave.button_press_d
domain: easywave
description: "Triggers when button D is pressed on an Easywave transmitter."
related_triggers:
  - easywave.button_press_a
  - easywave.button_press_b
  - easywave.button_press_c
  - easywave.button_release
---

The **Button D pressed** trigger fires when an Easywave transmitter sends a press for Button D. Use it to start automations from 4-button remotes without watching the **State** sensor yourself.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), select the Easywave transmitter device or its **State** sensor.
5. From the triggers shown for that target, select **Button D pressed**.
6. Select **Save**.

### Options in the UI

This trigger has no additional options beyond the target.

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `easywave.button_press_d`. A basic example looks like this:

{% example %}
trigger: |
  trigger: easywave.button_press_d
  target:
    entity_id: sensor.bedroom_remote_state
{% endexample %}

This fires every time Button D is pressed on that transmitter.

### Options in YAML

This trigger has no additional YAML options beyond the target.

{% include triggers/targets.md %}

## Good to know

- Target an Easywave transmitter **State** sensor (an enum sensor). The trigger is not available for neo sensors or the gateway connection status sensor.
- Changes to `unavailable` or `unknown` do not count as button presses.
- This trigger is only offered when the transmitter was learned with 4 buttons.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: lock a door when Button D is pressed

Use this when Button D on a remote should lock the front door.

- **Trigger**: Button D pressed
  - **Target**: Entry remote state sensor
- **Action**: Lock lock
  - **Target**: Front door lock

{% details "YAML example for locking a door from Button D" %}

{% example %}
automation: |
  alias: "Lock front door from Easywave Button D"
  triggers:
    - trigger: easywave.button_press_d
      target:
        entity_id: sensor.entry_remote_state
  actions:
    - action: lock.lock
      target:
        entity_id: lock.front_door
{% endexample %}

{% enddetails %}

### Automation: notify when Button D is pressed

Use this to get a phone notification when Button D is pressed.

- **Trigger**: Button D pressed
  - **Target**: Bedroom remote state sensor
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a Button D notification" %}

{% example %}
automation: |
  alias: "Notify when Easywave Button D is pressed"
  triggers:
    - trigger: easywave.button_press_d
      target:
        entity_id: sensor.bedroom_remote_state
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Easywave Button D was pressed."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
