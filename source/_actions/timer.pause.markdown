---
title: "Pause timer"
action: timer.pause
domain: timer
description: "Pauses a running timer, retaining the remaining duration for later continuation."
related_actions:
  - timer.start
  - timer.cancel
---

The **Pause timer** action stops a running timer without losing the remaining time. Use it when you want to continue the same countdown later.

{% include integrations/labs_entity_triggers_note.md %}

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're creating an automation, add a trigger in the **When** section.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the timer you want to pause. You can also select an area, a floor, a device, or a label.
6. From the actions shown for that target, select **Pause timer**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
No options:
  description: This action has no additional options in the UI.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `timer.pause`. A basic example looks like this:

{% example %}
action: |
  action: timer.pause
  target:
    entity_id: timer.bedtime
{% endexample %}

This pauses `timer.bedtime`.

### Options in YAML

{% options_yaml %}
No options:
  description: This action has no additional YAML options.
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action keeps the remaining time so you can continue later.
- To resume the timer, use [Start timer](/actions/timer.start/) without setting a new duration.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: pause the bedtime timer when the bedroom door opens

If you open the bedroom door during a bedtime routine, you can pause the timer until you are ready to continue.

- **Trigger**: Door opens
- **Action**: Pause timer
- **Target**: Bedtime timer

{% details "YAML example for pausing a bedtime timer" %}

{% example %}
automation: |
  alias: "Pause the bedtime timer when the bedroom door opens"
  triggers:
    - trigger: state
      entity_id: binary_sensor.bedroom_door
      to: "on"
  actions:
    - action: timer.pause
      target:
        entity_id: timer.bedtime
{% endexample %}

{% enddetails %}

### Automation: pause the laundry timer when the washer turns off early

If the washer is stopped before the cycle is done, you can pause the laundry timer instead of canceling it.

- **Trigger**: State changes to off
- **Action**: Pause timer
- **Target**: Laundry timer

{% details "YAML example for pausing a laundry timer" %}

{% example %}
automation: |
  alias: "Pause the laundry timer when the washer turns off early"
  triggers:
    - trigger: state
      entity_id: switch.washer
      to: "off"
  actions:
    - action: timer.pause
      target:
        entity_id: timer.laundry
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
