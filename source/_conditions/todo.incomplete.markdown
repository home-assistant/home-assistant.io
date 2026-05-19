---
title: "Incomplete to-do items"
condition: todo.incomplete
domain: todo
description: "Tests the number of incomplete to-do items in one or more to-do lists."
related_conditions:
  - todo.all_completed
---

The **Incomplete to-do items** condition helps you check whether a list still has work left. You can test whether the number of incomplete items is above, below, inside, or outside a range, and use that result to send a reminder or block another automation until the list is in the state you want.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the to-do list you want to check. You can also select an area, floor, device, entity, or label if that target resolves to one or more to-do lists.
5. From the conditions shown for that target, select **Incomplete to-do items**.
6. Under **Threshold type**, set the number of incomplete items the condition checks against:
   1. Pick whether the list should be **Above**, **Below**, **In range**, or **Outside range** of the threshold.
   2. Select **Number** or **Entity**:
      - **Number**: Enter a fixed item count directly.
      - **Entity**: Use an `input_number`, `number`, or `sensor` entity as the threshold value.
      - If you use **In range** or **Outside range**, enter both a lower and upper value.
7. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
8. Under **For at least**, set how long the list must stay at the matching count before the condition passes. Leave it at zero to pass right away.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: The number of incomplete items the list must be above, below, inside, or outside. Use **Number** for a fixed value or **Entity** to read the threshold from an `input_number`, `number`, or `sensor` entity.
Condition passes if:
  description: When multiple to-do lists are targeted, controls how results combine. Pick **Any** to pass if at least one targeted list matches the threshold, or **All** to pass only when every targeted list matches it.
For at least:
  description: How long the targeted to-do list must stay at the matching count before the condition passes.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `todo.incomplete`. A basic example looks like this:

{% example %}
condition: |
  condition: todo.incomplete
  target:
    entity_id: todo.shopping_list
  options:
    threshold:
      type: above
      value:
        number: 3
{% endexample %}

This passes when `todo.shopping_list` has more than 3 incomplete items.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: |
    The number of incomplete items the list has to match for the condition to pass:

    - `above`: Sets a minimum
    - `below`: Sets a maximum
    - `between`: Defines a range
    - `outside`: Defines an outside-range

    For `above` and `below`, use `value` with either `number` or `entity`. For `between` and `outside`, use `value_min` and `value_max`, each with either `number` or `entity`.
  required: true
  type: map
behavior:
  description: >
    When multiple to-do lists are targeted, controls how results combine.
    Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    How long the incomplete item count must stay in the matching range before
    the condition passes. Accepts a duration like `00:10:00` for 10 minutes.
  required: false
  type: time
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- The condition checks the current state of the to-do list entity, which is the number of incomplete items.
- To-do lists in the `unavailable` or `unknown` state are skipped when Home Assistant evaluates this condition.
- If you only need to know whether a list is fully done, use [All to-do items completed](/conditions/todo.all_completed/) instead.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: send a reminder when the shopping list gets too long

If the shopping list keeps growing through the week, this automation sends a reminder once there are more than five incomplete items.

- **Trigger**: Time: 18:00
- **Condition**: Incomplete to-do items
  - **Target**: Shopping list
- **Threshold type**: Above 5
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a long shopping list reminder" %}

{% example %}
automation: |
  alias: "Remind me when the shopping list gets long"
  triggers:
    - trigger: time
      at: "18:00:00"
  conditions:
    - condition: todo.incomplete
      target:
        entity_id: todo.shopping_list
      options:
        threshold:
          type: above
          value:
            number: 5
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          Your shopping list has more than 5 incomplete items.
{% endexample %}

{% enddetails %}

### Automation: turn on an entry light when the errands list still has open items

If you want a visual reminder before you leave, this automation turns on a light when the errands list still has between 1 and 3 incomplete items.

- **Trigger**: Time: 07:00
- **Condition**: Incomplete to-do items
  - **Target**: Errands list
- **Threshold type**: In range 1 to 3
- **Action**: Turn on light

{% details "YAML example for an errands reminder light" %}

{% example %}
automation: |
  alias: "Turn on the entry light when errands are still pending"
  triggers:
    - trigger: time
      at: "07:00:00"
  conditions:
    - condition: todo.incomplete
      target:
        entity_id: todo.errands_list
      options:
        threshold:
          type: between
          value_min:
            number: 1
          value_max:
            number: 3
  actions:
    - action: light.turn_on
      target:
        entity_id: light.entryway
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
