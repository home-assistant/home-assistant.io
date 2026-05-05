---
title: Pause cleaning
action: vacuum.pause
domain: vacuum
description: "Pauses the current cleaning task on a vacuum."
---

The **Pause vacuum cleaner** action instructs your vacuum to pause its current operation.

Use it when you need the robot to stop temporarily without ending the run, like during a phone call, while someone is sleeping, or when the doorbell rings.

{% include actions/ui_header.md %}

To use this action from an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open or create an automation.
3. In **Add action**, search for **Vacuum: Pause vacuum cleaner**.
4. Choose the vacuum, area, or device to pause.
5. Select **Save**.

{% include actions/yaml_header.md %}

{% example %}
action: |
  action: vacuum.pause
  target:
    entity_id: vacuum.downstairs
{% endexample %}

This pauses `vacuum.downstairs`.

The `entity_id` target is optional. If omitted, all connected vacuums will pause.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
target:
  description: The vacuum, area, or device to pause.
  required: false
  type: map
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- Some vacuums may not support pausing if they are not currently cleaning.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: pause cleaning when the doorbell rings

If the vacuum is running near the front door, a visitor can be hard to hear. This automation pauses the robot when the doorbell is pressed.

- **Trigger**: Doorbell pressed
- **Action**: Pause cleaning
- **Target**: Hallway vacuum

{% details "YAML example for pausing a vacuum on doorbell press" %}

{% example %}
automation: |
  alias: "Pause vacuum for doorbell"
  triggers:
    - trigger: state
      entity_id: binary_sensor.doorbell
      to: "on"
  actions:
    - action: vacuum.pause
      target:
        entity_id: vacuum.hallway
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
