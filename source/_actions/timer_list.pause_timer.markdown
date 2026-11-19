---
title: "Pause timer"
action: timer_list.pause_timer
domain: timer_list
description: "Pauses an active timer."
---

Use this action to stop a timer from counting down while keeping the time left.

{% include actions/ui_header.md %}

Prerequisites: An integration must provide a [timer list entity](/integrations/timer_list/) that supports this action.

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. For a new automation, add a trigger in the **When** section. Scripts do not need a trigger.
4. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the timer list.
6. From the actions shown for that target, select **Pause timer**.
7. Enter the **Timer ID**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Timer ID:
  description: The ID of the timer within the targeted list. Obtain it from Create timer, Get timers, or a timer trigger.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

Use `timer_list.pause_timer` as the `action` value. Put the list selection under `target` and the fields below under `data`.

Replace `timer_list.kitchen` with a list supplied by your integration. Replace `REPLACE_WITH_TIMER_ID` with an ID returned by [Get timers](/actions/timer_list.get_timers/).

{% example %}
action: |
  action: timer_list.pause_timer
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

- This action only changes active timers. Use [Resume timer](/actions/timer_list.unpause_timer/) to continue the countdown.
- Available actions depend on the integration that provides the timer list.
- The timer ID must exist in each targeted list. An unknown ID causes an error. Finished or canceled timers are unchanged.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

These examples require timer lists supplied by another integration. Replace the entity IDs with your own. A timer name must match exactly; if no timer matches, the item action is skipped.

### Automation: pause a work timer when the office door opens

Pause active timers named Work session when the office door opens. The YAML selects current timer IDs from the response, so you do not need to save them in advance.

- **Trigger**: Office door changes from `off` to `on`
- **Action**: Get timers
  - **Target**: `timer_list.office`
  - **Status**: Active
- For each returned timer named `Work session`, use **Pause timer** with that item's timer ID.

{% details "YAML for this automation" %}

{% example %}
automation: |
  alias: "Pause a work timer when the office door opens"
  triggers:
    - trigger: state
      entity_id: binary_sensor.office_door
      from: "off"
      to: "on"
  actions:
    - action: timer_list.get_timers
      target:
        entity_id: timer_list.office
      data:
        status: active
      response_variable: timers
    - repeat:
        for_each: >
          {{ timers['timer_list.office']['timers']
             | selectattr('name', 'eq', 'Work session') | list }}
        sequence:
          - action: timer_list.pause_timer
            target:
              entity_id: timer_list.office
            data:
              timer_id: "{{ repeat.item.timer_id }}"
{% endexample %}

{% enddetails %}

### Automation: pause timers for the night

Pause every active timer on the house timer list at 22:00. Paused and archived timers are unchanged. The YAML selects current timer IDs from the response, so you do not need to save them in advance.

- **Trigger**: Time, at 22:00
- **Action**: Get timers
  - **Target**: `timer_list.house`
  - **Status**: Active
- For each returned timer, use **Pause timer** with that item's timer ID.

{% details "YAML for this automation" %}

{% example %}
automation: |
  alias: "Pause timers for the night"
  triggers:
    - trigger: time
      at: "22:00:00"
  actions:
    - action: timer_list.get_timers
      target:
        entity_id: timer_list.house
      data:
        status: active
      response_variable: timers
    - repeat:
        for_each: "{{ timers['timer_list.house']['timers'] }}"
        sequence:
          - action: timer_list.pause_timer
            target:
              entity_id: timer_list.house
            data:
              timer_id: "{{ repeat.item.timer_id }}"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
