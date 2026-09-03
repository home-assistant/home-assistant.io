---
title: "Carbon monoxide level crossed threshold"
trigger: air_quality.co_crossed_threshold
domain: air_quality
description: "Triggers when one or more carbon monoxide levels cross a threshold."
related_triggers:
  - air_quality.co_changed
---

The **Carbon monoxide level crossed threshold** trigger fires when a carbon monoxide (CO) reading on one or more air quality sensors crosses a specific level. Carbon monoxide is a colorless, odorless gas produced by incomplete combustion of fuels, and it is life-threatening at elevated concentrations. Most residential CO alarms activate around 35 to 70 ppm, but you deserve to know the moment levels start climbing, not just when an alarm goes off.

Imagine getting an urgent alert on your phone the second CO reaches a dangerous level in the garage, even in the middle of the night. Or having your exhaust fan kick on automatically when a sensor detects rising CO while you are away. This trigger gives you that early warning, so your home protects your family before a situation becomes critical.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Carbon monoxide level crossed threshold**.
6. Under **Threshold type**, set the carbon monoxide level the reading must cross for the trigger to fire.
7. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how multiple targets interact.
8. Under **For at least**, set how long the level must stay past the threshold before the trigger fires. Leave at the default to fire immediately.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: The carbon monoxide level (in ppm) the reading has to cross for the trigger to fire. Can be a fixed number, or reference a helper entity that provides the value.
Trigger when:
  description: When multiple sensors are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted sensor crosses the threshold, **First** to fire only on the first crossing, or **All** to fire only after all targeted sensors have crossed the threshold.
  required: false
  default: Each
For at least:
  description: How long the reading must remain past the threshold before the trigger fires. Defaults to firing immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.co_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.co_crossed_threshold
  target:
    entity_id: sensor.living_room_co
  options:
    threshold: 35
    behavior: each
{% endexample %}

This fires whenever the living room CO sensor crosses 35 ppm in either direction.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The carbon monoxide level (in ppm) the reading has to cross for the trigger to fire. Accepts a number or a reference to an `input_number`, `number`, or `sensor` entity.
  required: true
  type: any
behavior:
  description: >
    When multiple sensors are targeted, controls when the trigger fires. Accepts `each`, `first`, or `all`.
  required: false
  type: string
  default: each
for:
  description: >
    How long the reading must remain past the threshold before the trigger fires. Accepts a duration string in `HH:MM:SS` format.
  required: true
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The trigger fires on any crossing, up or down. If you only want one direction, add a numeric condition that checks whether the current CO level is above or below your threshold.
- Most residential CO alarms activate around 35 to 70 ppm depending on exposure time. A threshold in that range is a good starting point for safety automations.
- Pair this trigger with [Carbon monoxide level changed](/triggers/air_quality.co_changed/) if you also want to track smaller fluctuations between crossings.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: send a safety alert when garage CO gets dangerous

Nobody wants to discover a CO problem too late. This automation sends an urgent notification straight to your phone the moment the garage sensor crosses 35 ppm, giving you time to open the door and check for running engines or faulty appliances.

- **Trigger**: Carbon monoxide level crossed threshold
  - **Target**: Garage CO sensor
  - **Threshold type**: 35
  - **Trigger when**: Each
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a garage CO threshold alert" %}

{% example %}
automation: |
  alias: "Garage CO threshold alert"
  triggers:
    - trigger: air_quality.co_crossed_threshold
      target:
        entity_id: sensor.garage_co
      options:
        threshold: 35
        behavior: each
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Carbon monoxide warning"
        message: >
          CO in the garage crossed 35 ppm.
          Open the garage door and check
          for running engines or appliances.
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
