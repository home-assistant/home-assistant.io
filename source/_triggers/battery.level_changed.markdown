---
title: "Battery level changed"
trigger: battery.level_changed
domain: battery
description: "Triggers after one or more battery level readings change."
related_triggers:
  - battery.level_crossed
---

The **Battery level changed** trigger fires after a battery level reading changes. Battery levels drain gradually as devices are used, recharge when plugged in, or spike briefly when sensors report a fresh reading. Use the threshold type to filter which changes matter to your automation.

The threshold type controls where the new reading must land for the trigger to fire. You can require the new value to be above a level, below a level, within a range, or outside a range. You can also select **Any change** to fire on any change at all.

Use **Battery level changed** to get notified when a device starts running low, log battery drain over time, or trigger a reminder to swap out the batteries in a frequently used sensor.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use **Battery level changed** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your battery-powered device is in (like your hallway or garden). You can also select a device, a specific entity, or a label. When you target multiple entities (via area, label, or multiple entity selections), the trigger fires whenever any of them changes.
5. From the triggers shown for that target, select **Battery level changed**.
6. Under **Threshold type**, configure what kind of change fires the trigger:
   - Select **Any change** to fire on any change, regardless of direction or new value.
   - Select **Above** or **Below** and enter a value to fire only when the new reading is above or below that value.
   - Select **In range** and enter a lower and upper bound to fire only when the new reading falls inside the range.
   - Select **Outside range** and enter a lower and upper bound to fire only when the new reading is outside the range.
   - For each option, you can enter a fixed percentage (0–100%), pick a sensor entity, or a [number helper](/integrations/input_number/) entity as the threshold.
     - If you don't have a number helper, you can create one by selecting **Create a new number helper**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: |
    Controls which changes fire the trigger:

    - **Any change**: fires on any change, regardless of direction or new value.
    - **Above** or **Below** (exclusive): fires only when the new reading is strictly above or below the threshold. A reading equal to the threshold does not fire the trigger.
    - **In range** (exclusive): fires only when the new reading is strictly between the two bounds. A reading equal to either bound does not fire the trigger.
    - **Outside range** (inclusive): fires when the new reading is at or below the lower bound, or at or above the upper bound. A reading equal to either bound fires the trigger.

    For each mode you can enter a fixed percentage (0–100%), reference a sensor entity, or a [number helper](/integrations/input_number/) entity.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Battery level changed** is referred to as `battery.level_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: battery.level_changed
  target:
    entity_id: sensor.front_door_sensor_battery
  options:
    threshold:
      type: below
      value:
        number: 20
{% endexample %}

This fires whenever the front door sensor battery drops below 20%.

To fire only when the new reading falls within a healthy charge range after a recharge:

{% example %}
trigger: |
  trigger: battery.level_changed
  target:
    entity_id:
      - sensor.front_door_sensor_battery
      - sensor.garden_camera_battery
  options:
    threshold:
      type: between
      value_min:
        number: 79
      value_max:
        number: 100
{% endexample %}

This fires whenever either device charges back to 80% or above (up to, but not including, 100%).

To use a number helper as a dynamic threshold you can adjust without editing the automation:

{% example %}
trigger: |
  trigger: battery.level_changed
  target:
    entity_id: sensor.front_door_sensor_battery
  options:
    threshold:
      type: below
      value:
        entity: input_number.low_battery_alert_threshold
{% endexample %}

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: |
    A mapping that defines which kind of change fires the trigger:

    - `type: any`: Fires on any change (no additional keys needed).
    - `type: above` or `type: below` (exclusive): fires when the reading is strictly above or below `value`. A reading equal to `value` does not fire the trigger. Provide `value` with a `number` key (for a literal percentage) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
    - `type: between` (exclusive): fires when the reading is strictly between `value_min` and `value_max`. Readings equal to either bound do not fire the trigger.
    - `type: outside` (inclusive): fires when the reading is at or below `value_min`, or at or above `value_max`. Readings equal to either bound fire the trigger.

    For `type: between` and `type: outside`, provide `value_min` and `value_max`, each with a `number` key (for a literal percentage) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
  required: true
  type: map
{% endoptions_yaml %}

{% include triggers/targets.md %}

## Good to know

- The threshold type controls both the direction and the landing zone of the change. Use **Above** or **Below** to filter by direction, **In range** to fire only when the new value is inside a range, and **Outside range** to fire only when it escapes a range.
- Use **Any change** to fire on every reading update regardless of direction or where the new value lands.
- To react only when a battery level first crosses a specific value, use [Battery level crossed threshold](/triggers/battery.level_crossed/) instead.
- Pair this trigger with the Battery level condition to verify the reading meets a threshold before continuing the automation.
- The trigger works with sensors that have the battery device class.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: notify when a door sensor battery is running low

Door sensors sit in corners and rarely get attention until they stop responding. This automation sends a notification whenever the front door sensor battery drops below 25%, so you can replace it before it fails.

- **Trigger**: Battery level changed
  - **Target**: Front door sensor battery entity
  - **Threshold type**: Below 25%
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a low battery notification" %}

{% example %}
automation: |
  alias: "Notify when front door sensor battery is low"
  triggers:
    - trigger: battery.level_changed
      target:
        entity_id: sensor.front_door_sensor_battery
      options:
        threshold:
          type: below
          value:
            number: 25
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Front door sensor battery is below 25%. Time to replace it."
{% endexample %}

{% enddetails %}


