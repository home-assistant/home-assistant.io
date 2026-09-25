---
title: "Button C pressed"
trigger: easywave.button_press_c
domain: easywave
description: "Triggers when button C is pressed on an Easywave transmitter."
related_triggers:
  - easywave.button_press_a
  - easywave.button_press_b
  - easywave.button_press_d
  - easywave.button_release
---

The **Button C pressed** trigger fires when an Easywave transmitter sends a press for Button C. Use it for 3- or 4-button remotes, or for a 1-button transmitter that was learned with code C.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), select the Easywave transmitter device or its **State** sensor.
5. From the triggers shown for that target, select **Button C pressed**.
6. Select **Save**.

### Options in the UI

This trigger has no additional options beyond the target.

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `easywave.button_press_c`. A basic example looks like this:

{% example %}
trigger: |
  trigger: easywave.button_press_c
  target:
    entity_id: sensor.office_remote_state
{% endexample %}

This fires every time Button C is pressed on that transmitter.

### Options in YAML

This trigger has no additional YAML options beyond the target.

{% include triggers/targets.md %}

## Good to know

- Target an Easywave transmitter **State** sensor (an enum sensor). The trigger is not available for neo sensors or the gateway connection status sensor.
- Changes to `unavailable` or `unknown` do not count as button presses.
- For multi-button transmitters, this trigger is offered when the device was learned with at least 3 buttons (codes A, B, and C).
- For a **1-button** transmitter, this trigger is offered when Button C was the code pressed during learning.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: toggle a light when Button C is pressed

Use this when Button C on a remote should toggle a desk light.

- **Trigger**: Button C pressed
  - **Target**: Office remote state sensor
- **Action**: Toggle light
  - **Target**: Desk light

{% details "YAML example for toggling a light from Button C" %}

{% example %}
automation: |
  alias: "Toggle desk light from Easywave Button C"
  triggers:
    - trigger: easywave.button_press_c
      target:
        entity_id: sensor.office_remote_state
  actions:
    - action: light.toggle
      target:
        entity_id: light.desk
{% endexample %}

{% enddetails %}

### Automation: notify when Button C is pressed

Use this to get a phone notification when Button C is pressed.

- **Trigger**: Button C pressed
  - **Target**: Kitchen remote state sensor
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a Button C notification" %}

{% example %}
automation: |
  alias: "Notify when Easywave Button C is pressed"
  triggers:
    - trigger: easywave.button_press_c
      target:
        entity_id: sensor.kitchen_remote_state
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Easywave Button C was pressed."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
