---
title: "Battery level crossed threshold"
trigger: battery.level_crossed
domain: battery
description: "Triggers after one or more battery level readings cross a threshold."
related_triggers:
  - battery.level_changed
---

The **Battery level crossed threshold** trigger fires when a battery level crosses into a zone you define. A smoke detector crossing below 15% after weeks of use, a robot vacuum crossing above 80% after returning to its dock, a reading entering a healthy charge range, or a reading escaping a safe zone are all supported.

Use **Battery level crossed threshold** to automate alerts when critical devices lose power, confirm when devices finish charging, or pause automations until battery-powered sensors have enough charge to be reliable.

When you target more than one entity, the trigger's **Trigger when** option controls when it fires.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use **Battery level crossed threshold** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your battery-powered device is in (like your living room or garden). You can also select a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Battery level crossed threshold**.
6. Under **Threshold type**, configure the zone the reading must enter for the trigger to fire:
   - Select **Above** or **Below** and enter a value to fire when the reading crosses that level.
   - Select **In range** and enter a lower and upper bound to fire when the reading enters the range from outside.
   - Select **Outside range** and enter a lower and upper bound to fire when the reading leaves the range (crosses past either bound).
   - For each option, you can enter a fixed percentage (0–100%), pick a sensor entity, or a [number helper](/integrations/input_number/) entity as the threshold. If you don't have a number helper, you can create one by selecting **Create a new number helper**.
7. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple entities are targeted.
8. Under **For at least**, set how long the reading must stay past the threshold before the trigger fires. Leave it at zero to fire immediately.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: |
    Controls the zone the reading must enter for the trigger to fire:

    - **Above** or **Below**: enter a value to fire when the reading crosses that level.
    - **In range**: enter a lower and upper bound to fire when the reading enters the range from outside.
    - **Outside range**: enter a lower and upper bound to fire when the reading leaves the range (crosses past either bound).

    For each mode you can enter a fixed percentage (0–100%), reference a sensor entity, or a [number helper](/integrations/input_number/) entity.
Trigger when:
  description: |
    When multiple entities are targeted, controls when the trigger fires:

    - **Each**: fires every time any targeted entity crosses the threshold.
    - **First**: fires only on the first crossing.
    - **All**: fires only after every targeted entity crosses the threshold.

    This corresponds to the `behavior` field in YAML. Default is **Each**.
For at least:
  description: How long the reading must remain past the threshold before the trigger fires. Useful to avoid triggering on brief fluctuations. For example, set it to `0:30:00` to fire only after the reading has stayed past the threshold for 30 minutes. Default is `0` (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Battery level crossed threshold** is referred to as `battery.level_crossed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: battery.level_crossed
  target:
    entity_id: sensor.hallway_motion_sensor_battery
  options:
    threshold:
      type: below
      value:
        number: 15
{% endexample %}

This fires whenever the hallway motion sensor battery crosses below 15%.

To fire when a device charges back into a safe range:

{% example %}
trigger: |
  trigger: battery.level_crossed
  target:
    entity_id:
      - sensor.hallway_motion_sensor_battery
      - sensor.bedroom_smoke_detector_battery
  options:
    threshold:
      type: between
      value_min:
        number: 20
      value_max:
        number: 101
    behavior: last
{% endexample %}

This fires once both sensors have charged back into the 20–100% range (effective zone: 21%–100%, because `between` is exclusive on both bounds).

To use a number helper as a dynamic threshold you can adjust without editing the automation:

{% example %}
trigger: |
  trigger: battery.level_crossed
  target:
    label_id: critical_sensors
  options:
    threshold:
      type: above
      value:
        entity: input_number.battery_replacement_threshold
    behavior: first
{% endexample %}

This fires when the first sensor with the `critical_sensors` label crosses above the number helper's threshold value.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: |
    A mapping that defines the zone the reading must enter for the trigger to fire. Set `type` to one of:

    - `above` or `below`: provide `value` with a `number` key or an `entity` key.
    - `between` or `outside`: provide `value_min` and `value_max`, each with a `number` key or an `entity` key.

    For example:

    ```yaml
    threshold:
      type: below
      value:
        number: 20
    ```
  required: true
  type: map
behavior:
  description: |
    When multiple entities are targeted, controls when the trigger fires. Accepts:

    - `any`: fires every time any targeted entity crosses the threshold.
    - `first`: fires only on the first crossing.
    - `last`: fires only after every targeted entity crosses the threshold.
  required: false
  type: string
  default: any
for:
  description: |
    How long the reading must remain past the threshold before the trigger fires. Accepts a duration string in `HH:MM:SS` format. For example, `00:30:00` fires only after the reading has stayed past the threshold for 30 minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- **Above** and **Below** fire on the crossing moment only. Once the reading is above the threshold, the trigger does not fire again until the reading dips back below it and then crosses above again.
- **In range** (`between`) fires when the reading moves from outside the bounds into the bounds. **Outside range** (`outside`) fires when the reading moves from inside the bounds past either bound.
- Pair this trigger with the [Battery level changed](/triggers/battery.level_changed/) trigger if you also want to react to smaller fluctuations between crossings.
- Pair this trigger with the Battery level condition to double-check the final state.
- The trigger works with sensors that have the battery device class.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: send a critical alert when a smoke detector battery runs low

Smoke detector batteries failing silently is a safety risk. This automation sends a notification the moment any smoke detector in the house crosses below 15%, giving you time to replace it before it matters most.

- **Trigger**: Battery level crossed threshold
  - **Target**: All smoke detector entities (by label)
  - **Threshold type**: Below 15%
  - **Trigger when**: Each
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a smoke detector battery alert" %}

{% example %}
automation: |
  alias: "Alert when smoke detector battery is critical"
  triggers:
    - trigger: battery.level_crossed
      target:
        label_id: smoke_detectors
      options:
        threshold:
          type: below
          value:
            number: 15
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "A smoke detector battery is below 15%. Replace it immediately."
{% endexample %}

{% enddetails %}

### Automation: confirm when the robot vacuum is fully charged

The robot vacuum takes a while to charge. This automation sends a notification after the vacuum has stayed above 95% for at least 10 minutes, so you know it's truly ready and not just briefly peaking.

- **Trigger**: Battery level crossed threshold
  - **Target**: Robot vacuum battery entity
  - **Threshold type**: Above 95%
  - **Trigger when**: Each
  - **For at least**: 00:10:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a robot vacuum fully charged notification" %}

{% example %}
automation: |
  alias: "Notify when robot vacuum is fully charged"
  triggers:
    - trigger: battery.level_crossed
      target:
        entity_id: sensor.robot_vacuum_battery
      options:
        threshold:
          type: above
          value:
            number: 95
        for: "00:10:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The robot vacuum is fully charged and ready to go."
{% endexample %}

{% enddetails %}

### Automation: alert when adjustable threshold is crossed

Use a number helper so you can change the alert threshold from the UI without editing the automation.

- **Trigger**: Battery level crossed threshold
  - **Target**: Garden camera battery entity
  - **Threshold type**: Below (entity: low battery threshold helper)
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for using a number helper as threshold" %}

{% example %}
automation: |
  alias: "Garden camera low battery alert"
  triggers:
    - trigger: battery.level_crossed
      target:
        entity_id: sensor.garden_camera_battery
      options:
        threshold:
          type: below
          value:
            entity: input_number.low_battery_alert_threshold
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Garden camera battery is below the configured alert level."
{% endexample %}

{% enddetails %}
