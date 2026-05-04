---
title: Stop vacuum
action: vacuum.stop
domain: vacuum
description: "Stops the current activity of a vacuum."
---

The **Stop vacuum cleaner** action immediately stops the vacuum's current activity (cleaning, returning to dock, spot clean, etc.).

Use it when you want the robot to stop right away instead of pausing or returning to the dock, like during an unexpected spill, a pet accident, or another situation where you need it out of the area immediately.

{% include actions/ui_header.md %}

To use this action from an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Create or edit an automation.
3. Add an action and search for **Vacuum: Stop vacuum cleaner**.
4. Select the target vacuum, area, or group.
5. Save your automation.

{% include actions/yaml_header.md %}

{% example %}
action: |
  action: vacuum.stop
  target:
    entity_id: vacuum.upstairs
{% endexample %}

This stops `vacuum.upstairs`.

`entity_id` is optional. Omitting it stops all connected vacuums.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
target:
  description: The vacuum, area, or entity to stop.
  required: false
  type: map
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action only works for vacuums that are currently active or returning.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

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

{% include actions/stuck.md %}

{% include actions/related.md %}
