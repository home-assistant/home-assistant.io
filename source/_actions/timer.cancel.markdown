---
title: "Cancel timer"
action: timer.cancel
domain: timer
description: "Resets a timer's duration to the last known initial value without firing the timer finished event."
related_actions:
  - timer.start
  - timer.finish
---

The **Cancel timer** action stops a running or paused timer and resets it to its configured starting duration. Use it when the timer is no longer needed.

{% include integrations/labs_entity_triggers_note.md %}

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're creating an automation, add a trigger in the **When** section.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the timer you want to cancel. You can also select an area, a floor, a device, or a label.
6. From the actions shown for that target, select **Cancel timer**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
No options:
  description: This action has no additional options in the UI.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `timer.cancel`. A basic example looks like this:

{% example %}
action: |
  action: timer.cancel
  target:
    entity_id: timer.tea
{% endexample %}

This cancels `timer.tea`.

### Options in YAML

{% options_yaml %}
No options:
  description: This action has no additional YAML options.
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- Canceling a timer does not fire the [Timer finished](/triggers/timer.finished/) trigger.
- After you cancel a timer, it returns to `idle` and resets to its starting duration.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: cancel the tea timer when the kettle turns off

If you stop boiling water early, you can cancel the timer instead of waiting for it to finish.

- **Trigger**: State changes to off
- **Action**: Cancel timer
- **Target**: Tea timer

{% details "YAML example for canceling a tea timer" %}

{% example %}
automation: |
  alias: "Cancel the tea timer when the kettle turns off"
  triggers:
    - trigger: state
      entity_id: switch.kettle
      to: "off"
  actions:
    - action: timer.cancel
      target:
        entity_id: timer.tea
{% endexample %}

{% enddetails %}

### Automation: cancel the bathroom fan timer when a window opens

If you open the window to clear steam naturally, you can stop the fan timer right away.

- **Trigger**: Window opens
- **Action**: Cancel timer
- **Target**: Bathroom fan timer

{% details "YAML example for canceling a bathroom fan timer" %}

{% example %}
automation: |
  alias: "Cancel the bathroom fan timer when the window opens"
  triggers:
    - trigger: state
      entity_id: binary_sensor.bathroom_window
      to: "on"
  actions:
    - action: timer.cancel
      target:
        entity_id: timer.bathroom_fan
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
