---
title: "Timer resumed"
trigger: timer_list.timer_unpaused
domain: timer_list
description: "Triggers when a paused timer resumes."
---

Use this trigger to react when a paused timer starts counting down again.

{% include triggers/ui_header.md %}

Prerequisites: An integration must provide a [timer list entity](/integrations/timer_list/).

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), select the timer list you want to watch.
5. From the triggers shown for that target, select **Timer resumed**.
6. Select **Save**.

### Options in the UI

This trigger has no additional options beyond the target.

{% include triggers/yaml_header.md %}

Use `timer_list.timer_unpaused` as the `trigger` value. Set `target` to the timer list entities, devices, areas, floors, or labels to monitor.

{% example %}
trigger: |
  trigger: timer_list.timer_unpaused
  target:
    entity_id: timer_list.kitchen
{% endexample %}

Replace `timer_list.kitchen` with a list supplied by your integration.

### Options in YAML

This trigger has no additional YAML options beyond the target.

{% include triggers/targets.md entity_type="timer list" custom_trigger_variables="true" %}

### Trigger variables

When the trigger fires, it provides:

- `trigger.entity_id`: The entity ID of the timer list.
- `trigger.timer`: The complete [timer details](/integrations/timer_list/#timer-details) for the item that changed.

For data shared by all triggers, refer to [Trigger data in templates](/docs/automation/trigger-data/#properties-of-all-triggers).

## Good to know

- Resuming a timer adds it to the active count and sets a new finish time.
- The trigger responds to every matching timer in the targeted lists. It has no timer ID or name filter. Use a template condition with `trigger.timer.timer_id` or `trigger.timer.name` to restrict an automation to one timer.
- Changes to the entity's `unavailable` or `unknown` state do not fire this item trigger.

{% include triggers/try_it.md %}

For this trigger, perform the corresponding timer operation on the selected list. Changing the list's state alone does not produce a timer event.

{% include triggers/more_examples.md %}

These examples require timer lists supplied by another integration. Replace the entity IDs with your own.

### Automation: notify when a kitchen timer resumes

Send a message to your notification entity for each matching timer event. Replace `notify.my_device` with your notification entity.

- **Trigger**: Timer resumed
  - **Target**: Kitchen timers (`timer_list.kitchen`)
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML for this automation" %}

{% example %}
automation: |
  alias: "Notify when a kitchen timer resumes"
  triggers:
    - trigger: timer_list.timer_unpaused
      target:
        entity_id: timer_list.kitchen
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "{{ trigger.timer.name or trigger.timer.timer_id }} resumes."
{% endexample %}

{% enddetails %}

### Automation: turn on a work-session indicator

Turn on a desk indicator light when a timer named Work session resumes. This requires a light entity that you use as the indicator.

- **Trigger**: Timer resumed
  - **Target**: Office timers (`timer_list.office`)
- **Condition**: Template, timer name equals `Work session`
- **Action**: Turn on light
  - **Target**: Desk indicator (`light.desk_indicator`)

{% details "YAML for this automation" %}

{% example %}
automation: |
  alias: "Turn on a work-session indicator"
  triggers:
    - trigger: timer_list.timer_unpaused
      target:
        entity_id: timer_list.office
  conditions:
    - "{{ trigger.timer.name == 'Work session' }}"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.desk_indicator
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
