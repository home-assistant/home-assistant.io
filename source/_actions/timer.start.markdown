---
title: "Start timer"
action: timer.start
domain: timer
description: "Starts a timer or restarts it with a provided duration."
related_actions:
  - timer.pause
  - timer.cancel
---

The **Start timer** action starts a timer right away. You can also give it a new duration, which restarts the timer from that value.

{% include integrations/labs_entity_triggers_note.md %}

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're creating an automation, add a trigger in the **When** section.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the timer you want to start. You can also select an area, a floor, a device, or a label.
6. From the actions shown for that target, select **Start timer**.
7. Optional: under **Duration**, enter the duration to use for this run.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Duration:
  description: Optional duration to use for this run.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `timer.start`. A basic example looks like this:

{% example %}
action: |
  action: timer.start
  target:
    entity_id: timer.laundry
{% endexample %}

This starts `timer.laundry` with its configured duration.

### Options in YAML

{% options_yaml %}
duration:
  description: Optional duration to use for this run. Accepts seconds or a duration string in `HH:MM:SS` format.
  required: false
  type: any
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- If the timer is paused and you do not provide a new duration, this action resumes it with the remaining time.
- If you provide a new duration, the timer restarts from that value.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: start the bathroom fan timer when motion is detected

Start a short timer whenever motion is detected so the fan can keep running after you leave.

- **Trigger**: Motion detected
- **Action**: Start timer
- **Target**: Bathroom fan timer
- **Duration**: 00:20:00

{% details "YAML example for starting a bathroom fan timer" %}

{% example %}
automation: |
  alias: "Start the bathroom fan timer when motion is detected"
  triggers:
    - trigger: state
      entity_id: binary_sensor.bathroom_motion
      to: "on"
  actions:
    - action: timer.start
      target:
        entity_id: timer.bathroom_fan
      data:
        duration: "00:20:00"
{% endexample %}

{% enddetails %}

### Automation: start the laundry timer when the washer turns on

Start a laundry timer when the washer begins its cycle.

- **Trigger**: State changes to on
- **Action**: Start timer
- **Target**: Laundry timer
- **Duration**: 00:45:00

{% details "YAML example for starting a laundry timer" %}

{% example %}
automation: |
  alias: "Start the laundry timer when the washer turns on"
  triggers:
    - trigger: state
      entity_id: switch.washer
      to: "on"
  actions:
    - action: timer.start
      target:
        entity_id: timer.laundry
      data:
        duration: "00:45:00"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
