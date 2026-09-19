---
title: Return to base
action: vacuum.return_to_base
domain: vacuum
description: "Sends the vacuum to the charging dock."
---

The **Return vacuum cleaner to dock** action instructs the vacuum to stop its current task and return to its charging dock.

Use it when you want the robot to head home in an orderly way, like before bedtime, before guests arrive, or when you want the floor clear without leaving the vacuum stranded in the middle of a room.

{% include actions/ui_header.md %}

To use this action from an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open or create an automation.
3. Add an action and search for **Return vacuum cleaner to dock**.
4. Select a vacuum, area, or group.
5. Select **Save**.

{% include actions/yaml_header.md %}

{% example %}
action: |
  action: vacuum.return_to_base
  target:
    entity_id: vacuum.living_room
{% endexample %}

This sends `vacuum.living_room` back to its dock.

If you omit `entity_id`, the action will target all vacuums.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
target:
  description: The vacuum, area, or device to send to base.
  required: false
  type: map
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- Not all vacuums support returning to base from every state.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: send the vacuum back before bedtime

At the end of the evening, this automation sends the vacuum back to its dock so the floor is clear and the robot is charging overnight.

- **Trigger**: Time: 22:30
- **Action**: Return to base
- **Target**: Downstairs vacuum

{% details "YAML example for sending a vacuum home at night" %}

{% example %}
automation: |
  alias: "Return vacuum to dock at bedtime"
  triggers:
    - trigger: time
      at: "22:30:00"
  actions:
    - action: vacuum.return_to_base
      target:
        entity_id: vacuum.downstairs
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
