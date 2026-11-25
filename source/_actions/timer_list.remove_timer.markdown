---
title: "Remove timer"
action: timer_list.remove_timer
domain: timer_list
description: "Removes a timer from a list."
---

Use this action to delete a timer from its list, including an archived timer you no longer need.

{% include actions/ui_header.md %}

Prerequisites: An integration must provide a [timer list entity](/integrations/timer_list/) that supports this action.

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. For a new automation, add a trigger in the **When** section. Scripts do not need a trigger.
4. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the timer list.
6. From the actions shown for that target, select **Remove timer**.
7. Enter the **Timer ID**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Timer ID:
  description: The ID of the timer within the targeted list. Obtain it from Create timer, Get timers, or a timer trigger.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

Use `timer_list.remove_timer` as the `action` value. Put the list selection under `target` and the fields below under `data`.

Replace `timer_list.kitchen` with a list supplied by your integration. Replace `REPLACE_WITH_TIMER_ID` with an ID returned by [Get timers](/actions/timer_list.get_timers/).

{% example %}
action: |
  action: timer_list.remove_timer
  target:
    entity_id: timer_list.kitchen
  data:
    timer_id: "REPLACE_WITH_TIMER_ID"
{% endexample %}

### Options in YAML

{% options_yaml %}
timer_id:
  description: The ID of the timer within the targeted list. Obtain it from Create timer, Get timers, or a timer trigger.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md entity_type="timer list" %}

## Good to know

- You can remove a timer in any status. Removing an active timer does not finish or cancel it, so it fires neither the finished trigger nor the cancellation trigger.
- Available actions depend on the integration that provides the timer list.
- The timer ID must exist in each targeted list. An unknown ID causes an error.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

These examples require timer lists supplied by another integration. Replace the entity IDs with your own. A timer name must match exactly; if no timer matches, the item action is skipped.

### Automation: remove a tea timer after it finishes

Remove a finished timer named Tea immediately. Other timers remain archived. Only use this if you do not need to keep the tea timer history.

- **Trigger**: Timer finished
  - **Target**: Kitchen timers (`timer_list.kitchen`)
- **Condition**: Template, timer name equals `Tea`
- **Action**: Remove timer
  - **Target**: Kitchen timers (`timer_list.kitchen`)
  - **Timer ID**: The ID from the trigger

{% details "YAML for this automation" %}

{% example %}
automation: |
  alias: "Remove finished tea timers"
  triggers:
    - trigger: timer_list.timer_finished
      target:
        entity_id: timer_list.kitchen
  conditions:
    - "{{ trigger.timer.name == 'Tea' }}"
  actions:
    - action: timer_list.remove_timer
      target:
        entity_id: timer_list.kitchen
      data:
        timer_id: "{{ trigger.timer.timer_id }}"
{% endexample %}

{% enddetails %}

<!-- textlint-disable terminology -->

### Automation: clear archived timers each evening

At 23:00, remove all finished and canceled timers from the kitchen list. Active and paused timers stay in the list.

- **Trigger**: Time, at 23:00
- **Action**: Get timers
  - **Target**: Kitchen timers (`timer_list.kitchen`)
  - **Status**: Finished and canceled
- For each returned timer, use **Remove timer** with its timer ID.

{% details "YAML for this automation" %}

{% example %}
automation: |
  alias: "Clear archived kitchen timers"
  triggers:
    - trigger: time
      at: "23:00:00"
  actions:
    - action: timer_list.get_timers
      target:
        entity_id: timer_list.kitchen
      data:
        status:
          - finished
          - cancelled
      response_variable: timers
    - repeat:
        for_each: "{{ timers['timer_list.kitchen']['timers'] }}"
        sequence:
          - action: timer_list.remove_timer
            target:
              entity_id: timer_list.kitchen
            data:
              timer_id: "{{ repeat.item.timer_id }}"
{% endexample %}

{% enddetails %}

<!-- textlint-enable terminology -->

{% include actions/stuck.md %}

{% include actions/related.md %}
