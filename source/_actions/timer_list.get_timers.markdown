---
title: "Get timers"
action: timer_list.get_timers
domain: timer_list
description: "Returns timers from a list, optionally filtered by status."
response: required
---

Use this action to read the timers in a list. The result includes timer IDs, names, statuses, and timing details. You can use the IDs in later timer actions.

{% include actions/ui_header.md %}

Prerequisites: An integration must provide a [timer list entity](/integrations/timer_list/) that supports this action.

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. For a new automation, add a trigger in the **When** section. Scripts do not need a trigger.
4. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the timer list.
6. From the actions shown for that target, select **Get timers**.
7. Optionally select the **Status** values to return.
8. Set a response variable to store the returned data.
9. Select **Save**.

### Options in the UI

<!-- textlint-disable terminology -->
{% options_ui %}
Status:
  description: Select Active, Paused, Finished, or Cancelled. You can select more than one status. By default, all statuses are included.
  required: false
{% endoptions_ui %}
<!-- textlint-enable terminology -->

{% include actions/yaml_header.md %}

Use `timer_list.get_timers` as the `action` value. Put the list selection under `target` and the fields below under `data`.

Replace `timer_list.kitchen` with a list supplied by your integration.

{% example %}
action: |
  action: timer_list.get_timers
  target:
    entity_id: timer_list.kitchen
  data:
    status: active
  response_variable: timers
{% endexample %}

### Options in YAML

{% options_yaml %}
status:
  description: Use `active`, `paused`, `finished`, or `cancelled`. A list can contain more than one status. By default, all statuses are included.
  required: false
  type: [string, list]
{% endoptions_yaml %}

{% include actions/targets.md entity_type="timer list" %}

## Action response data

{% include actions/response.md %}

The response is a mapping keyed by the targeted entity ID. Each entry contains a `timers` list with the matching [timer details](/integrations/timer_list/#timer-details).

## Good to know

- Without a status filter, this action returns all timers, including archived items. An empty filter also returns all timers.
- Available actions depend on the integration that provides the timer list.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

These examples require timer lists supplied by another integration. Replace the entity IDs with your own.

### Automation: check active kitchen timers in the morning

At 08:00, send a notification with the number of active kitchen timers. A notification entity is required; replace `notify.my_device` with yours.

- **Trigger**: Time, at 08:00
- **Action**: Get timers
  - **Target**: Kitchen timers (`timer_list.kitchen`)
  - **Status**: Active
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML for this automation" %}

{% example %}
automation: |
  alias: "Check active kitchen timers in the morning"
  triggers:
    - trigger: time
      at: "08:00:00"
  actions:
    - action: timer_list.get_timers
      target:
        entity_id: timer_list.kitchen
      data:
        status: active
      response_variable: timers
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          {{ timers['timer_list.kitchen']['timers'] | count }}
          active kitchen timers.
{% endexample %}

{% enddetails %}

### Automation: check paused kitchen timers in the evening

At 21:00, send a notification only if at least one kitchen timer is still paused. A notification entity is required; replace `notify.my_device` with yours.

- **Trigger**: Time, at 21:00
- **Action**: Get timers
  - **Target**: Kitchen timers (`timer_list.kitchen`)
  - **Status**: Paused
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML for this automation" %}

{% example %}
automation: |
  alias: "Check paused kitchen timers in the evening"
  triggers:
    - trigger: time
      at: "21:00:00"
  actions:
    - action: timer_list.get_timers
      target:
        entity_id: timer_list.kitchen
      data:
        status: paused
      response_variable: timers
    - condition: template
      value_template: "{{ timers['timer_list.kitchen']['timers'] | count > 0 }}"
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          {{ timers['timer_list.kitchen']['timers'] | count }}
          paused kitchen timers.
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
