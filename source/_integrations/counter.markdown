---
title: Counter
description: Instructions on how to integrate counters into Home Assistant.
ha_category:
  - Automation
  - Helper
ha_release: 0.53
ha_quality_scale: internal
ha_codeowners:
  - '@fabaff'
ha_domain: counter
ha_integration_type: helper
---

The **Counter** {% term integration %} lets you track how many times something has happened in Home Assistant.
Use it when you want to count events over time, like how often a door opens, how many reminders have been sent, or how many times a routine has run.

## Configuration

The preferred way to configure counter {% term helpers %} is through the user interface.
To add one, go to **{% my helpers title="Settings > Devices & services > Helpers" %}** and select **Create helper**.
Then, select **{% my config_flow_start domain=page.ha_domain title=page.title %}**.

To add helpers from the user interface, `default_config:` must be present in your {% term "configuration.yaml" %} file.
It is included by default unless you removed it.
If you removed `default_config:`, add `counter:` to your {% term "configuration.yaml" %} file first.

Counters can also be configured in {% term "configuration.yaml" %}:

```yaml
# Example configuration.yaml entry
counter:
  my_custom_counter:
    initial: 30
    step: 1
```

{% configuration %}
"[alias]":
  description: Alias for the counter. Multiple entries are allowed. `alias` should be replaced by the user for their actual value.
  required: true
  type: map
  keys:
    name:
      description: Friendly name of the counter.
      required: false
      type: string
    initial:
      description: Initial value (0 or positive integer) when Home Assistant starts or the counter is reset.
      required: false
      type: integer
      default: 0
    restore:
      description: Try to restore the last known value when Home Assistant starts.
      required: false
      type: boolean
      default: true
    step:
      description: Incremental/step value for the counter.
      required: false
      type: integer
      default: 1
    minimum:
      description: Minimum value the counter will have.
      required: false
      type: integer
    maximum:
      description: Maximum value the counter will have.
      required: false
      type: integer
    icon:
      description: Icon to display for the counter.
      required: false
      type: icon
{% endconfiguration %}

Pick an icon from [Material Design Icons](https://pictogrammers.com/library/mdi/) and prefix it with `mdi:`.
For example, `mdi:car`, `mdi:ambulance`, or `mdi:motorbike`.

### Restore state

This integration restores the previous counter value when Home Assistant starts as long as `restore` is set to `true`, which is the default.
To disable this behavior, set `restore` to `false`.

If `restore` is set to `true`, the `initial` value is only used when no previous state is found or when the counter is reset.

{% include integrations/triggers.md %}

{% include integrations/conditions.md %}

## Counter automation examples

If you use a counter {% term helper %} in automations, create the helper separately before using these examples.
Here are a few ways to use counter triggers, conditions, and actions together.

{% include docs/paste_yaml_tip.md %}

### Automation: send a reminder when a counter reaches its limit

If you have created a counter helper to track missed chores, you can send a reminder as soon as it reaches its maximum and then reset it for the next cycle.

- **Trigger**: Counter reached maximum
  - **Target**: Chore reminder counter
  - **Trigger when**: Each
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)
- **Action**: Reset

{% details "YAML example for a maximum reminder counter" %}

{% example %}
automation: |
  alias: "Notify when the chore counter reaches its limit"
  triggers:
    - trigger: counter.maximum_reached
      target:
        entity_id: counter.chore_reminders
      options:
        behavior: any
        for: "00:00:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The chore reminder counter reached its limit."
    - action: counter.reset
      target:
        entity_id: counter.chore_reminders
{% endexample %}

{% enddetails %}

### Automation: stop counting after the daily target is met

If you use a counter helper to track short exercise breaks, you can stop incrementing it once the counter reaches your daily target.

- **Trigger**: Input button pressed
- **Condition**: Counter value
  - **Target**: Exercise break counter
  - **Threshold type**: Below 5
  - **Condition passes if**: Any
- **Action**: Increment

{% details "YAML example for capping a daily counter" %}

{% example %}
automation: |
  alias: "Count exercise breaks until the daily target is met"
  triggers:
    - trigger: state
      entity_id: input_button.exercise_break_done
  conditions:
    - condition: counter.is_value
      target:
        entity_id: counter.exercise_breaks
      options:
        threshold:
          type: below
          value:
            number: 5
        behavior: any
        for: "00:00:00"
  actions:
    - action: counter.increment
      target:
        entity_id: counter.exercise_breaks
{% endexample %}

{% enddetails %}
