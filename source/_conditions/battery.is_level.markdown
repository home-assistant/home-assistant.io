---
title: "Battery level"
condition: battery.is_level
domain: battery
description: "Tests if a battery level is above a threshold, below a threshold, or in a range of values."
related_conditions:
  - battery.is_charging
  - battery.is_not_charging
  - battery.is_low
  - battery.is_not_low
---

The **Battery level** condition passes when a battery reading meets a threshold you define. You can check that a battery is above, below, or within a specific percentage range. Use it to run an automation only when a device still has enough charge, or only when its battery is getting low enough to need attention.

For a visual overview of all battery statuses, open the {% my maintenance title="**Maintenance** dashboard" %}.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use **Battery level** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your battery-powered device is in (like your hallway or garden). You can also select a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Battery level**.
6. Under **Threshold type**, set the battery level the condition checks against:
   1. Pick whether the reading must be **Above**, **Below**, **In range**, or **Outside range** of the threshold.
   2. Select **Number** or **Entity**:
      - **Number**: Enter a fixed percentage directly, for example `20` for 20%. For **In range** or **Outside range**, enter both a lower and upper bound.
      - **Entity**: Use a sensor entity or a [number helper](/integrations/input_number/) entity as the threshold:
        - Number helper: You can adjust the threshold value without editing the automation. The battery reading is compared against the number helper's current value.
        - Sensor: Its current reading becomes the threshold and updates automatically as the sensor changes.
        - For **In range** or **Outside range**, you need two entities: one for the lower bound and one for the upper bound (for example, two separate number helpers).
        - If you don't have a number helper, you can create one by selecting **Create a new number helper**.
7. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: |
    The battery level the entity has to meet for the condition to pass. **Above** and **Below** are exclusive: a reading equal to the threshold does not pass. **In range** is exclusive at both bounds. **Outside range** is inclusive: a reading equal to either bound passes. Choose **Number** to enter a fixed percentage (0–100), or **Entity** to use a sensor or number helper as a dynamic threshold.
Condition passes if:
  description: |
    When multiple entities are targeted, controls how results combine:

    - **Any**: The condition passes if at least one targeted entity meets the threshold (default).
    - **All**: The condition passes only when every targeted entity meets the threshold.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `battery.is_level`. A basic example looks like this:

{% example %}
condition: |
  condition: battery.is_level
  target:
    entity_id: sensor.front_door_sensor_battery
  options:
    threshold:
      type: below
      value:
        number: 20
{% endexample %}

This passes when the front door sensor battery reads below 20%.

To check that a battery still has plenty of charge:

{% example %}
condition: |
  condition: battery.is_level
  target:
    area_id: hallway
  options:
    threshold:
      type: above
      value:
        number: 50
    behavior: all
{% endexample %}

This passes when every battery-powered device in the hallway area reads above 50%.

To check that a battery is in a healthy charge range:

{% example %}
condition: |
  condition: battery.is_level
  target:
    entity_id:
      - sensor.front_door_sensor_battery
      - sensor.garden_camera_battery
  options:
    threshold:
      type: between
      value_min:
        number: 20
      value_max:
        number: 101
{% endexample %}

This passes when at least one of the batteries reads between 21% and 100%. The `between` threshold is exclusive, so `value_max` with `number: 101` is used to include a reading of 100%.

To use a number helper as a dynamic threshold that you can adjust without editing the automation:

{% example %}
condition: |
  condition: battery.is_level
  target:
    entity_id: sensor.front_door_sensor_battery
  options:
    threshold:
      type: below
      value:
        entity: input_number.low_battery_alert_threshold
{% endexample %}

This passes when the front door sensor battery reads below the number helper's value.

### Options in YAML

{% options_yaml %}
threshold:
  description: |
    The battery level the entity has to meet for the condition to pass:

    - `type: above` (exclusive): Sets a minimum. The reading must be strictly above the threshold to pass. Provide `value` with a `number` key (0–100) or an `entity` key.
    - `type: below` (exclusive): Sets a maximum. The reading must be strictly below the threshold to pass. Provide `value` with a `number` key (0–100) or an `entity` key.
    - `type: between` (exclusive): Defines a range. The reading must be strictly between both bounds to pass. Provide `value_min` and `value_max`, each with a `number` key or an `entity` key.
    - `type: outside` (inclusive): Defines an outside-range. The reading must be at or beyond either bound to pass. Provide `value_min` and `value_max`, each with a `number` key or an `entity` key.

    For the `number` key, use a percentage value (0–100). For the `entity` key, use an `input_number`, `number`, or `sensor` entity.
  required: true
  type: map
behavior:
  description: |
    When multiple entities are targeted, controls how results combine:

    - `any`: The condition passes if at least one targeted entity meets the threshold.
    - `all`: The condition passes only when every targeted entity meets the threshold.
  required: false
  type: string
  default: any
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- The condition works with sensors that have the battery device class.
- Entities that are unavailable (`unavailable`) or have an unknown state (`unknown`) are skipped for **Any** and fail for **All**.
- Battery level is expressed as a percentage from 0 to 100.
- This condition checks the entity's current battery reading. To react to changes in the reading, use the [Battery level changed](/triggers/battery.level_changed/) or [Battery level crossed threshold](/triggers/battery.level_crossed/) trigger instead.
- When you use a sensor as a dynamic threshold, its value is read at the moment the condition runs. The threshold is not continuously tracked; it is re-evaluated each time the automation fires.
- For an overview of the status of your battery {% term entities %}, open the [**Maintenance** dashboard](/dashboards/dashboards/#dashboards-only-shown-in-the-dashboard-list-by-default). This dashboard allows you to quickly see which batteries need replacing.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: skip a weekly reminder when batteries are low

This automation sends a weekly reminder to test your smoke detectors, but only when every detector still has at least 25% battery. If any battery is low, the reminder is skipped so you can replace the batteries first.

- **Trigger**: Time: Every Sunday at 10:00
- **Condition**: Battery level (above 25%)
  - **Target**: Smoke detector batteries
  - **Condition passes if**: All
- **Action**: Send a notification message
  - **Target**: My device (`notify.my_device`)

{% details "YAML example for a battery-aware weekly reminder" %}

{% example %}
automation: |
  alias: "Weekly smoke detector test reminder"
  triggers:
    - trigger: time
      at: "10:00:00"
  conditions:
    - condition: time
      weekday:
        - sun
    - condition: battery.is_level
      target:
        label_id: smoke_detectors
      options:
        threshold:
          type: above
          value:
            number: 25
        behavior: all
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Time to test your smoke detectors."
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
