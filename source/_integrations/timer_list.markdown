---
title: Timer list
description: Manage multiple countdown timers in a timer list entity.
ha_release: "2026.12"
ha_domain: timer_list
ha_integration_type: entity
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
  - '@synesthesiam'
related:
  - docs: /integrations/timer/
    title: Timer helper
---

The **Timer list** {% term integration %} lets other integrations provide multiple countdown timers within one {% term entity %}. Each timer has its own ID, optional name, duration, and status. You can manage individual timers with actions and react to changes with automation triggers.

{% include integrations/building_block_integration.md %}

Timer list does not create a list on its own. A providing integration supplies the list and manages when its timers finish. The existing [Timer helper](/integrations/timer/) remains separate.

## Voice timers

On supported devices, timers started with Assist are kept in the device's timer list. You can control them with timer list actions and use their events in automations. Timers started with actions notify the device when they finish, just like voice timers.

## Timer list states

The {% term state %} of a timer list entity is the number of active timers in the list. Paused, finished, and canceled timers do not count toward this number. A list with only paused or archived timers has a state of `0`.

A list can also have these states:

- **Unavailable** (`unavailable`): The entity is currently unavailable.
- **Unknown** (`unknown`): The state is not yet known.

## Timer statuses

Each timer has one of these statuses:

<!-- textlint-disable terminology -->

- **Active** (`active`): The timer is counting down.
- **Paused** (`paused`): The timer has stopped counting down and keeps its remaining time.
- **Finished** (`finished`): The timer has ended, either because its time elapsed or because it was finished early.
- **Cancelled** (`cancelled`): The timer has ended without a finished event.

<!-- textlint-enable terminology -->

New timers start immediately. Finished and canceled timers remain in the list as archived items. The providing integration can remove older archived items. You can also remove a timer explicitly, regardless of its status.

## Timer details

Use the [Get timers](/actions/timer_list.get_timers/) action to read the items in a list. Automation triggers provide the same details for the timer that changed. Timers are items within a list, not separate entities or entity attributes.

The returned fields are:

- `timer_id`: The unique ID used to select the timer in actions.
- `name`: The optional name, or `null` when no name was set.
- `status`: One of `active`, `paused`, `finished`, or `cancelled`.
- `created_duration`: The original duration in seconds. This does not change when time is added or subtracted.
- `total_duration`: The largest remaining duration the timer has had, in seconds. It never decreases and is never less than `created_duration`. It can be used as the total for a progress display.
- `created_at`: When the timer was created.
- `finishes_at`: When an active timer will finish, or `null` for other statuses.
- `paused_remaining`: The remaining time in seconds while paused, or `null` for other statuses.
- `ended_at`: When the timer finished or was canceled, or `null` before it ends.
- `remaining`: The remaining time in seconds when the response or trigger was generated. This value does not update continuously. It is `0` for finished and canceled timers.

Timestamps use ISO 8601 format in UTC.

{% include integrations/triggers.md %}

{% include integrations/actions.md %}

## Timer list automation examples

These automations work together: one starts a named timer, and the other sends a notification when that timer finishes. They require a timer list supplied by an integration, a kettle switch, and a notification entity. Replace the entity IDs with your own.

{% include docs/paste_yaml_tip.md %}

### Automation: start a tea timer when the kettle stops

When the kettle switches off, start a three-minute timer named Tea. This requires a kettle integration that exposes a switch.

- **Trigger**: State changes from `on` to `off`
  - **Target**: Kettle (`switch.kettle`)
- **Action**: Create timer
  - **Target**: Kitchen timers (`timer_list.kitchen`)
  - **Duration**: Three minutes
  - **Name**: Tea

{% details "YAML for this automation" %}

{% example %}
automation: |
  alias: "Start a tea timer when the kettle stops"
  triggers:
    - trigger: state
      entity_id: switch.kettle
      from: "on"
      to: "off"
  actions:
    - action: timer_list.create_timer
      target:
        entity_id: timer_list.kitchen
      data:
        duration: "00:03:00"
        name: "Tea"
{% endexample %}

{% enddetails %}

### Automation: send a notification when the tea timer finishes

React to the Tea timer created by the preceding automation. Other timers on the kitchen list do not match the name condition.

- **Trigger**: Timer finished
  - **Target**: Kitchen timers (`timer_list.kitchen`)
- **Condition**: Template, timer name equals `Tea`
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML for this automation" %}

{% example %}
automation: |
  alias: "Notify when tea is ready"
  triggers:
    - trigger: timer_list.timer_finished
      target:
        entity_id: timer_list.kitchen
  conditions:
    - "{{ trigger.timer.name == 'Tea' }}"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Your tea timer has finished."
{% endexample %}

{% enddetails %}
