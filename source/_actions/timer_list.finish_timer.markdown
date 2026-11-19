---
title: "Finish timer"
action: timer_list.finish_timer
domain: timer_list
description: "Finishes a timer early."
---

Use this action to end a countdown as if its remaining time had elapsed. It also applies to paused timers.

{% include actions/ui_header.md %}

Prerequisites: An integration must provide a [timer list entity](/integrations/timer_list/) that supports this action.

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. For a new automation, add a trigger in the **When** section. Scripts do not need a trigger.
4. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the timer list.
6. From the actions shown for that target, select **Finish timer**.
7. Enter the **Timer ID**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Timer ID:
  description: The ID of the timer within the targeted list. Obtain it from Create timer, Get timers, or a timer trigger.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

Use `timer_list.finish_timer` as the `action` value. Put the list selection under `target` and the fields below under `data`.

Replace `timer_list.kitchen` with a list supplied by your integration. Replace `REPLACE_WITH_TIMER_ID` with an ID returned by [Get timers](/actions/timer_list.get_timers/).

{% example %}
action: |
  action: timer_list.finish_timer
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

- This action fires [Timer finished](/triggers/timer_list.timer_finished/) and keeps the timer as a finished item. The base integration does not provide a notification sound.
- Available actions depend on the integration that provides the timer list.
- The timer ID must exist in each targeted list. An unknown ID causes an error. Finished or canceled timers are unchanged.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

These examples require timer lists supplied by another integration. Replace the entity IDs with your own. A timer name must match exactly; if no timer matches, the item action is skipped.

### Automation: finish a laundry timer when the dryer stops

Finish active or paused timers named Laundry when your dryer reports that its cycle has stopped. This requires a binary sensor that is on while the dryer runs. The YAML selects current timer IDs from the response, so you do not need to save them in advance.

- **Trigger**: Dryer running changes from `on` to `off`
- **Action**: Get timers
  - **Target**: `timer_list.laundry`
  - **Status**: Active, Paused
- For each returned timer named `Laundry`, use **Finish timer** with that item's timer ID.

{% details "YAML for this automation" %}

{% example %}
automation: |
  alias: "Finish a laundry timer when the dryer stops"
  triggers:
    - trigger: state
      entity_id: binary_sensor.dryer_running
      from: "on"
      to: "off"
  actions:
    - action: timer_list.get_timers
      target:
        entity_id: timer_list.laundry
      data:
        status:
          - active
          - paused
      response_variable: timers
    - repeat:
        for_each: >
          {{ timers['timer_list.laundry']['timers']
             | selectattr('name', 'eq', 'Laundry') | list }}
        sequence:
          - action: timer_list.finish_timer
            target:
              entity_id: timer_list.laundry
            data:
              timer_id: "{{ repeat.item.timer_id }}"
{% endexample %}

{% enddetails %}

### Automation: finish office timers at the end of the workday

Finish all active and paused office timers at 18:00. Any automations using the Timer finished trigger can then react to each timer. The YAML selects current timer IDs from the response, so you do not need to save them in advance.

- **Trigger**: Time, at 18:00
- **Action**: Get timers
  - **Target**: `timer_list.office`
  - **Status**: Active, Paused
- For each returned timer, use **Finish timer** with that item's timer ID.

{% details "YAML for this automation" %}

{% example %}
automation: |
  alias: "Finish office timers at the end of the workday"
  triggers:
    - trigger: time
      at: "18:00:00"
  actions:
    - action: timer_list.get_timers
      target:
        entity_id: timer_list.office
      data:
        status:
          - active
          - paused
      response_variable: timers
    - repeat:
        for_each: "{{ timers['timer_list.office']['timers'] }}"
        sequence:
          - action: timer_list.finish_timer
            target:
              entity_id: timer_list.office
            data:
              timer_id: "{{ repeat.item.timer_id }}"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
