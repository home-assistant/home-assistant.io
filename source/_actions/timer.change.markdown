---
title: "Change timer"
action: timer.change
domain: timer
description: "Changes a timer by adding or subtracting a given duration."
related_actions:
  - timer.start
  - timer.pause
---

The **Change timer** action adds or subtracts time from an active timer. Use it when the countdown needs a small adjustment without starting over.

{% include integrations/labs_entity_triggers_note.md %}

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're creating an automation, add a trigger in the **When** section.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the timer you want to change. You can also select an area, a floor, a device, or a label.
6. From the actions shown for that target, select **Change timer**.
7. Under **Duration**, enter the amount of time to add or subtract.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Duration:
  description: The amount of time to add or subtract. Use a negative value to shorten the timer.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `timer.change`. A basic example looks like this:

{% example %}
action: |
  action: timer.change
  target:
    entity_id: timer.laundry
  data:
    duration: "00:05:00"
{% endexample %}

This adds five minutes to `timer.laundry`.

### Options in YAML

{% options_yaml %}
duration:
  description: The amount of time to add or subtract. Accepts seconds or a duration string in `HH:MM:SS` format. Negative values shorten the timer.
  required: true
  type: any
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action works on active timers.
- You can use a negative duration to shorten the countdown.
- You cannot extend the timer past the duration of its current run.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: add five minutes to the laundry timer when the washer is still busy

If the washer runs longer than expected, you can extend the timer without restarting it.

- **Trigger**: State changes to on
- **Action**: Change timer
- **Target**: Laundry timer
- **Duration**: 00:05:00

{% details "YAML example for extending a laundry timer" %}

{% example %}
automation: |
  alias: "Add five minutes to the laundry timer when the washer is still busy"
  triggers:
    - trigger: state
      entity_id: binary_sensor.washer_running
      to: "on"
  actions:
    - action: timer.change
      target:
        entity_id: timer.laundry
      data:
        duration: "00:05:00"
{% endexample %}

{% enddetails %}

### Automation: remove five minutes from the kitchen timer when preheating finishes early

If the oven reaches temperature sooner than expected, you can shorten the timer to match.

- **Trigger**: State changes to off
- **Action**: Change timer
- **Target**: Kitchen timer
- **Duration**: -00:05:00

{% details "YAML example for shortening a kitchen timer" %}

{% example %}
automation: |
  alias: "Remove five minutes from the kitchen timer when preheating finishes early"
  triggers:
    - trigger: state
      entity_id: binary_sensor.oven_preheating
      to: "off"
  actions:
    - action: timer.change
      target:
        entity_id: timer.kitchen
      data:
        duration: "-00:05:00"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
