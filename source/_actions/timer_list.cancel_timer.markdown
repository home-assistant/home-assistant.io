---
title: "Cancel timer"
action: timer_list.cancel_timer
domain: timer_list
description: "Cancels a timer without finishing it."
---

Use this action to end a timer without firing the Timer finished trigger. The canceled timer stays in the list as an archived item.

{% include actions/ui_header.md %}

Prerequisites: An integration must provide a [timer list entity](/integrations/timer_list/) that supports this action.

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. For a new automation, add a trigger in the **When** section. Scripts do not need a trigger.
4. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the timer list.
6. From the actions shown for that target, select **Cancel timer**.
7. Enter the **Timer ID**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Timer ID:
  description: The ID of the timer within the targeted list. Obtain it from Create timer, Get timers, or a timer trigger.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

Use `timer_list.cancel_timer` as the `action` value. Put the list selection under `target` and the fields below under `data`.

Replace `timer_list.kitchen` with a list supplied by your integration. Replace `REPLACE_WITH_TIMER_ID` with an ID returned by [Get timers](/actions/timer_list.get_timers/).

{% example %}
action: |
  action: timer_list.cancel_timer
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

- Canceling fires [the cancellation trigger](/triggers/timer_list.timer_cancelled/), not Timer finished. To delete the item, use [Remove timer](/actions/timer_list.remove_timer/).
- Available actions depend on the integration that provides the timer list.
- The timer ID must exist in each targeted list. An unknown ID causes an error. Finished or canceled timers are unchanged.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

These examples require timer lists supplied by another integration. Replace the entity IDs with your own. A timer name must match exactly; if no timer matches, the item action is skipped.

### Automation: cancel kitchen timers when you leave home

Cancel all active and paused kitchen timers when you leave home. Replace `person.me` with your person entity. The YAML selects current timer IDs from the response, so you do not need to save them in advance.

- **Trigger**: Zone left
  - **Target**: Me (`person.me`)
  - **Zone**: Home (`zone.home`)
- **Action**: Get timers
  - **Target**: `timer_list.kitchen`
  - **Status**: Active, Paused
- For each returned timer, use **Cancel timer** with that item's timer ID.

{% details "YAML for this automation" %}

{% example %}
automation: |
  alias: "Cancel kitchen timers when you leave home"
  triggers:
    - trigger: zone.left
      target:
        entity_id: person.me
      options:
        zone: zone.home
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
        for_each: "{{ timers['timer_list.kitchen']['timers'] }}"
        sequence:
          - action: timer_list.cancel_timer
            target:
              entity_id: timer_list.kitchen
            data:
              timer_id: "{{ repeat.item.timer_id }}"
{% endexample %}

{% enddetails %}

### Automation: cancel cooking timers when the oven turns off

Cancel active and paused timers named Cooking when the oven switches off. This requires an oven integration that exposes a switch. The YAML selects current timer IDs from the response, so you do not need to save them in advance.

- **Trigger**: Oven changes from `on` to `off`
- **Action**: Get timers
  - **Target**: `timer_list.kitchen`
  - **Status**: Active, Paused
- For each returned timer named `Cooking`, use **Cancel timer** with that item's timer ID.

{% details "YAML for this automation" %}

{% example %}
automation: |
  alias: "Cancel cooking timers when the oven turns off"
  triggers:
    - trigger: state
      entity_id: switch.oven
      from: "on"
      to: "off"
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
             | selectattr('name', 'eq', 'Cooking') | list }}
        sequence:
          - action: timer_list.cancel_timer
            target:
              entity_id: timer_list.kitchen
            data:
              timer_id: "{{ repeat.item.timer_id }}"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
