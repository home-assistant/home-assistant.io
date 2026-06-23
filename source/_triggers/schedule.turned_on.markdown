---
title: "Schedule block started"
trigger: schedule.turned_on
domain: schedule
description: "Triggers when a schedule block starts."
related_triggers:
  - schedule.turned_off
---

The **Schedule block started** trigger is useful when you want an automation to begin exactly when a scheduled time block starts. Use it to turn something on at the start of a routine, or to begin a follow-up action after a schedule has been active for a while.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the schedule you want to monitor. You can also select an area, a floor, a device, or a label.
5. From the triggers shown for that target, select **Schedule block started**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
7. Under **For at least**, set how long the schedule block must stay active before the trigger fires.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple schedules are targeted, controls whether the trigger fires for **Each** schedule, only the **First** schedule, or after **All** targeted schedules start a block.
  required: false
  default: Each
For at least:
  description: How long the schedule block must stay active before the trigger fires.
  required: false
  default: 00:00:00
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `schedule.turned_on`. A basic example looks like this:

{% example %}
trigger: |
  trigger: schedule.turned_on
  target:
    entity_id: schedule.morning_routine
  options:
    for: "00:15:00"
{% endexample %}

This fires when `schedule.morning_routine` has been active for 15 minutes.

### Options in YAML

{% options_yaml %}
behavior:
  description: When multiple schedules are targeted, controls whether the trigger fires for `each`, `first`, or `all`.
  required: false
  type: string
  default: each
for:
  description: How long the schedule block must stay active before the trigger fires. Accepts a duration string like `00:05:00` for five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- A schedule in the `unknown` or `unavailable` state does not trigger this automation.
- If the schedule stops being active before the **For at least** time finishes, the timer resets.
- To react when a schedule block ends instead, use [Schedule block ended](/triggers/schedule.turned_off/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn on the porch light when the evening schedule starts

If you use a schedule to define when your porch light should be active, you can start the light automatically when that schedule block begins.

- **Trigger**: Schedule block started
  - **Target**: Evening porch light schedule
- **Action**: Turn on light
  - **Target**: Porch light

{% details "YAML example for turning on the porch light when the evening schedule starts" %}

{% example %}
automation: |
  alias: "Turn on the porch light when the evening schedule starts"
  triggers:
    - trigger: schedule.turned_on
      target:
        entity_id: schedule.evening_porch_light
  actions:
    - action: light.turn_on
      target:
        entity_id: light.porch
{% endexample %}

{% enddetails %}

### Automation: start the kitchen fan after the ventilation schedule has been active for 10 minutes

If you want a short delay before starting ventilation, you can wait until the schedule block has been active for a while.

- **Trigger**: Schedule block started
  - **Target**: Kitchen ventilation schedule
  - **For at least**: 00:10:00
- **Action**: Turn on fan
  - **Target**: Kitchen fan

{% details "YAML example for starting the kitchen fan after the ventilation schedule has been active for 10 minutes" %}

{% example %}
automation: |
  alias: "Start the kitchen fan after 10 minutes"
  triggers:
    - trigger: schedule.turned_on
      target:
        entity_id: schedule.kitchen_ventilation
      options:
        for: "00:10:00"
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.kitchen
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
