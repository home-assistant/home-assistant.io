---
title: Stop vacuum
action: vacuum.stop
domain: vacuum
description: "Stops the current activity of a vacuum."
---

The **Stop vacuum** action immediately stops the vacuum's current activity (cleaning, returning to dock, spot clean, etc.).

Use it when you want the robot to stop right away instead of pausing or returning to the dock, like during an unexpected spill, a pet accident, or another situation where you need it out of the area immediately.

{% include integrations/labs_entity_actions_note.md %}

## Usage in the UI

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Create or edit an automation.
3. Add an action and search for **Vacuum: Stop vacuum**.
4. Select the target vacuum, area, or group.
5. Save your automation.

## Usage in YAML

{% example %}
action: |
  - action: vacuum.stop
    target:
      entity_id: vacuum.upstairs
{% endexample %}

`entity_id` is optional. Omitting it stops all connected vacuums.

## Options

### Options in YAML

{% options_yaml %}
target:
  description: The vacuum, area, or entity to stop.
  required: false
  type: target
{% endoptions_yaml %}

## Good to know

- This action only works for vacuums that are currently active or returning.

### Automation: stop the vacuum if a leak is detected

If a leak sensor activates in the kitchen, this automation stops the vacuum immediately so it does not drive through water.

- **Trigger**: Leak detected
- **Action**: Stop vacuum
- **Target**: Downstairs vacuum

{% details "YAML example for stopping a vacuum on leak detection" %}

{% example %}
automation: |
  alias: "Stop vacuum on leak"
  triggers:
    - trigger: state
      entity_id: binary_sensor.kitchen_leak
      to: "on"
  actions:
    - action: vacuum.stop
      target:
        entity_id: vacuum.downstairs
{% endexample %}

{% enddetails %}
