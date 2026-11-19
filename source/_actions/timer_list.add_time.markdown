---
title: "Add time"
action: timer_list.add_time
domain: timer_list
description: "Adds time to an active or paused timer."
---

Use this action to extend a countdown without creating a new timer. A paused timer stays paused.

{% include actions/ui_header.md %}

Prerequisites: An integration must provide a [timer list entity](/integrations/timer_list/) that supports this action.

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. For a new automation, add a trigger in the **When** section. Scripts do not need a trigger.
4. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the timer list.
6. From the actions shown for that target, select **Add time**.
7. Enter the **Timer ID** and set **Duration**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Timer ID:
  description: The ID of the timer within the targeted list. Obtain it from Create timer, Get timers, or a timer trigger.
  required: true
Duration:
  description: How much time to add.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

Use `timer_list.add_time` as the `action` value. Put the list selection under `target` and the fields below under `data`.

Replace `timer_list.kitchen` with a list supplied by your integration. Replace `REPLACE_WITH_TIMER_ID` with an ID returned by [Get timers](/actions/timer_list.get_timers/).

{% example %}
action: |
  action: timer_list.add_time
  target:
    entity_id: timer_list.kitchen
  data:
    timer_id: "REPLACE_WITH_TIMER_ID"
    duration: "00:05:00"
{% endexample %}

### Options in YAML

{% options_yaml %}
timer_id:
  description: The ID of the timer within the targeted list. Obtain it from Create timer, Get timers, or a timer trigger.
  required: true
  type: string
duration:
  description: How much time to add. For accepted formats, refer to [Durations in automations and scripts](/docs/automation/durations/).
  required: true
  type: [string, integer, map]
{% endoptions_yaml %}

{% include actions/targets.md entity_type="timer list" %}

## Good to know

- The original duration stays unchanged. The progress total increases only if the new remaining time exceeds its previous maximum. Adding zero changes nothing.
- Available actions depend on the integration that provides the timer list.
- The timer ID must exist in each targeted list. An unknown ID causes an error. Finished or canceled timers are unchanged.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

These examples require timer lists supplied by another integration. Replace the entity IDs with your own. A timer name must match exactly; if no timer matches, the item action is skipped.

### Automation: extend a work session in the afternoon

Add 15 minutes to active or paused timers named Work session at 17:00. The YAML selects current timer IDs from the response, so you do not need to save them in advance.

- **Trigger**: Time, at 17:00
- **Action**: Get timers
  - **Target**: `timer_list.office`
  - **Status**: Active, Paused
- For each returned timer named `Work session`, use **Add time** with that item's timer ID.
  - **Duration**: `00:15:00`

{% details "YAML for this automation" %}

{% example %}
automation: |
  alias: "Extend a work session in the afternoon"
  triggers:
    - trigger: time
      at: "17:00:00"
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
        for_each: >
          {{ timers['timer_list.office']['timers']
             | selectattr('name', 'eq', 'Work session') | list }}
        sequence:
          - action: timer_list.add_time
            target:
              entity_id: timer_list.office
            data:
              timer_id: "{{ repeat.item.timer_id }}"
              duration: "00:15:00"
{% endexample %}

{% enddetails %}

### Automation: extend ventilation when a window opens

Add two minutes to active or paused timers named Ventilation when the kitchen window opens. The YAML selects current timer IDs from the response, so you do not need to save them in advance.

- **Trigger**: Kitchen window changes from `off` to `on`
- **Action**: Get timers
  - **Target**: `timer_list.kitchen`
  - **Status**: Active, Paused
- For each returned timer named `Ventilation`, use **Add time** with that item's timer ID.
  - **Duration**: `00:02:00`

{% details "YAML for this automation" %}

{% example %}
automation: |
  alias: "Extend ventilation when a window opens"
  triggers:
    - trigger: state
      entity_id: binary_sensor.kitchen_window
      from: "off"
      to: "on"
  actions:
    - action: timer_list.get_timers
      target:
        entity_id: timer_list.kitchen
      data:
        status:
          - active
          - paused
      response_variable: timers
    - repeat:
        for_each: >
          {{ timers['timer_list.kitchen']['timers']
             | selectattr('name', 'eq', 'Ventilation') | list }}
        sequence:
          - action: timer_list.add_time
            target:
              entity_id: timer_list.kitchen
            data:
              timer_id: "{{ repeat.item.timer_id }}"
              duration: "00:02:00"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
