---
title: "Set fan speed"
action: fan.set_percentage
domain: fan
description: "Set the speed of a fan."
related_actions:
  - fan.increase_speed
  - fan.decrease_speed
---

The **Set fan speed** action is useful when you know the exact speed you want. Use it to move a fan to a specific level, like 25% for quiet airflow or 100% for fast cooling.

{% include integrations/labs_entity_triggers_note.md %}

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're creating an automation, add a trigger in the **When** section.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the fan you want to control. You can also select an area, a floor, a device, or a label.
6. From the actions shown for that target, select **Set fan speed**.
7. Under **Percentage**, set the speed you want.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Percentage:
  description: The speed to set, from 0 to 100 percent.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `fan.set_percentage`. A basic example looks like this:

{% example %}
action: |
  action: fan.set_percentage
  target:
    entity_id: fan.office
  data:
    percentage: 40
{% endexample %}

This sets `fan.office` to 40% speed.

### Options in YAML

{% options_yaml %}
percentage:
  description: The speed to set, from 0 to 100 percent.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action is available only for fans that support speed control.
- `0` is allowed by the selector, but some devices may treat that as off or ignore it.
- To move the speed up or down by a step instead, use [Increase fan speed](/actions/fan.increase_speed/) or [Decrease fan speed](/actions/fan.decrease_speed/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: set the office fan to a quiet speed in the morning

Start the day with a light airflow that is less distracting during calls.

- **Trigger**: Time: 08:00
- **Action**: Set fan speed
- **Target**: Office fan
- **Percentage**: 35

{% details "YAML example for a quiet office fan" %}

{% example %}
automation: |
  alias: "Office fan to 35 percent"
  triggers:
    - trigger: time
      at: "08:00:00"
  actions:
    - action: fan.set_percentage
      target:
        entity_id: fan.office
      data:
        percentage: 35
{% endexample %}

{% enddetails %}

### Automation: raise the living room fan to full speed when the sun comes in

When the afternoon sun starts heating the room, you can push the fan to full speed for faster cooling.

- **Trigger**: Time: 15:00
- **Action**: Set fan speed
- **Target**: Living room fan
- **Percentage**: 100

{% details "YAML example for strong afternoon airflow" %}

{% example %}
automation: |
  alias: "Living room fan to full speed"
  triggers:
    - trigger: time
      at: "15:00:00"
  actions:
    - action: fan.set_percentage
      target:
        entity_id: fan.living_room
      data:
        percentage: 100
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
