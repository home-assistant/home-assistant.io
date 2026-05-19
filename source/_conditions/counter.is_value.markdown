---
title: "Counter value"
condition: counter.is_value
domain: counter
description: "Tests the value of one or more counters."
related_conditions:
---

The **Counter value** condition passes when a counter helper matches the threshold you define.
You can check whether a counter is above, below, within, or outside a range of values.
Use it when you want an automation to continue only while a count stays under a limit, reaches a target, or falls within a range you set.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the counter helper you want to check. You can also select an area, a floor, a device, or a label.
5. From the conditions shown for that target, select **Counter value**.
6. Under **Threshold type**, set how the value should be checked:
   1. Pick whether the value must be **Above**, **Below**, **In range**, or **Outside range**.
   2. Select **Number** or **Entity**:
      - **Number**: Enter a fixed number directly.
      - **Entity**: Use a `counter`, `input_number`, or `number` entity as the threshold.
      - For **In range** or **Outside range**, you need both a lower and upper value or entity.
      - If you do not have a helper yet, create it separately as a {% term helper %} before using it here.
7. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
8. Under **For at least**, set how long the counter must stay within the selected threshold before the condition passes.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: |
    The value the counter has to meet for the condition to pass. Options are **Above**, **Below**, **In range**, or **Outside range**. **Number** uses a fixed value. **Entity** uses the current value of a `counter`, `input_number`, or `number` entity.
Condition passes if:
  description: When multiple counters are targeted, controls how results combine. Pick **Any** to pass if at least one targeted counter matches, or **All** to pass only when every targeted counter matches. Default is **Any**.
For at least:
  description: How long the counter must stay within the selected threshold before the condition passes. Defaults to `00:00:00`, so the condition passes immediately.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `counter.is_value`. A basic example looks like this:

{% example %}
condition: |
  condition: counter.is_value
  target:
    entity_id: counter.exercise_breaks
  options:
    threshold:
      type: below
      value:
        number: 5
{% endexample %}

This passes when `counter.exercise_breaks` is below `5`.

To compare a counter against another entity:

{% example %}
condition: |
  condition: counter.is_value
  target:
    entity_id: counter.water_reminders
  options:
    threshold:
      type: above
      value:
        entity: input_number.water_reminder_limit
{% endexample %}

This passes when `counter.water_reminders` is above the current value of `input_number.water_reminder_limit`.

To check whether a counter stays within a range:

{% example %}
condition: |
  condition: counter.is_value
  target:
    entity_id: counter.daily_check_ins
  options:
    threshold:
      type: between
      value_min:
        number: 2
      value_max:
        number: 4
{% endexample %}

This passes when `counter.daily_check_ins` is between `2` and `4`.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: |
    The value the counter has to meet for the condition to pass:

    - `above`: Sets a minimum
    - `below`: Sets a maximum
    - `between`: Defines a range
    - `outside`: Defines an outside-range

    For `above` and `below`, use `value` with either `number` or `entity`. For `between` and `outside`, use `value_min` and `value_max`, each with either `number` or `entity`. Entities can be from the `counter`, `input_number`, or `number` domains. For example:

    ```yaml
    threshold:
      type: between
      value_min:
        entity: input_number.break_goal_min
      value_max:
        number: 6
    ```

    When you use an entity, its current value is read when the condition is evaluated.
  required: true
  type: map
behavior:
  description: Controls how results combine when multiple counters are targeted. Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: How long the counter must stay within the selected threshold before the condition passes. Accepts a duration string like `00:05:00` for five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Counters in the `unavailable` or `unknown` state are skipped for **Any** and fail for **All**.
- If the counter leaves the selected threshold before the **For at least** time finishes, the timer resets.
- When you use an entity as the threshold, Home Assistant reads that entity's current value each time the condition is checked.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: stop incrementing a break counter after the daily goal

If you use a counter helper to track short exercise breaks, this condition can stop the count once the daily goal has been reached.

- **Trigger**: Input button pressed
- **Condition**: Counter value
  - **Target**: Exercise break counter
  - **Threshold type**: Below 5
- **Action**: Increment

{% details "YAML example for limiting a daily break counter" %}

{% example %}
automation: |
  alias: "Increment the break counter only while it is below the daily goal"
  triggers:
    - trigger: state
      entity_id: input_button.exercise_break_done
  conditions:
    - condition: counter.is_value
      target:
        entity_id: counter.exercise_breaks
      options:
        threshold:
          type: below
          value:
            number: 5
  actions:
    - action: counter.increment
      target:
        entity_id: counter.exercise_breaks
{% endexample %}

{% enddetails %}

### Automation: run a bedtime script only while a reminder counter is in range

If you have created a script and a counter helper for evening tasks, you can run the script only while the counter stays within a range you choose.

- **Trigger**: At 21:00
- **Condition**: Counter value
  - **Target**: Evening reminder counter
  - **Threshold type**: In range 1 to 3
- **Action**: Turn on script

{% details "YAML example for a counter-based bedtime script" %}

{% example %}
automation: |
  alias: "Run the bedtime script while the reminder counter is in range"
  triggers:
    - trigger: time
      at: "21:00:00"
  conditions:
    - condition: counter.is_value
      target:
        entity_id: counter.evening_reminders
      options:
        threshold:
          type: between
          value_min:
            number: 1
          value_max:
            number: 3
  actions:
    - action: script.turn_on
      target:
        entity_id: script.bedtime_checklist
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
