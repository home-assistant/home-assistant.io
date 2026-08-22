---
title: "All to-do items completed"
condition: todo.all_completed
domain: todo
description: "Tests if all to-do items are completed in one or more to-do lists."
related_conditions:
  - todo.incomplete
---

The **All to-do items completed** condition helps you check whether a list is fully done before an automation continues. Use it when something should happen only after every item on a checklist is complete, like locking up for the night or sending a final reminder that the day is wrapped up.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the to-do list you want to check. You can also select an area, floor, device, entity, or label if that target resolves to one or more to-do lists.
5. From the conditions shown for that target, select **All to-do items completed**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Under **For at least**, set how long the list must stay complete before the condition passes. Leave it at zero to pass right away.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple to-do lists are targeted, controls how results combine. Pick **Any** to pass if at least one targeted list has no incomplete items, or **All** to pass only when every targeted list has no incomplete items.
For at least:
  description: How long the targeted to-do list must stay complete before the condition passes.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `todo.all_completed`. A basic example looks like this:

{% example %}
condition: |
  condition: todo.all_completed
  target:
    entity_id: todo.evening_checklist
{% endexample %}

This passes when `todo.evening_checklist` has no incomplete items left.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple to-do lists are targeted, controls how results combine.
    Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    How long the to-do list must stay complete before the condition passes.
    Accepts a duration like `00:10:00` for 10 minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- A to-do list is considered complete when its state is `0`, which means there are no incomplete items left.
- To-do lists in the `unavailable` or `unknown` state are skipped when Home Assistant evaluates this condition.
- If you want to check whether a list still has a certain number of open items, use [Incomplete to-do items](/conditions/todo.incomplete/) instead.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: lock the front door only when the evening checklist is done

If you keep a checklist for the end of the day, this automation makes sure the front door locks only after everything on the list is finished.

- **Trigger**: Time: 22:00
- **Condition**: All to-do items completed
  - **Target**: Evening checklist
- **Action**: Lock lock

{% details "YAML example for locking the front door when the checklist is done" %}

{% example %}
automation: |
  alias: "Lock the front door when the evening checklist is done"
  triggers:
    - trigger: time
      at: "22:00:00"
  conditions:
    - condition: todo.all_completed
      target:
        entity_id: todo.evening_checklist
  actions:
    - action: lock.lock
      target:
        entity_id: lock.front_door
{% endexample %}

{% enddetails %}

### Automation: turn off the kitchen light after the meal-prep list has stayed complete

If you use a short checklist while cooking, this automation turns off a reminder light after the list has stayed complete for five minutes.

- **Trigger**: Time pattern: Every 5 minutes
- **Condition**: All to-do items completed
  - **Target**: Meal-prep checklist
- **For at least**: 00:05:00
- **Action**: Turn off light

{% details "YAML example for turning off a reminder light after meal prep" %}

{% example %}
automation: |
  alias: "Turn off the kitchen reminder light after meal prep"
  triggers:
    - trigger: time_pattern
      minutes: "/5"
  conditions:
    - condition: todo.all_completed
      target:
        entity_id: todo.meal_prep_checklist
      options:
        for: "00:05:00"
  actions:
    - action: light.turn_off
      target:
        entity_id: light.kitchen_reminder
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
