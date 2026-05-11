---
title: "Relative humidity crossed threshold"
trigger: humidity.crossed_threshold
domain: humidity
description: "Triggers after one or more relative humidity readings cross a threshold."
related_triggers:
  - humidity.changed
---

The **Relative humidity crossed threshold** trigger fires when a humidity reading crosses into a zone you define. A bathroom sensor crossing above 70% after a shower, a basement sensor dipping below 30% in a dry winter, a reading entering a target comfort range, or a reading escaping that range are all supported.

Use **Relative humidity crossed threshold** to automate ventilation when the air becomes too humid, alert you when conditions in a sensitive room drift out of range, or coordinate devices that respond to specific humidity levels.

When you target more than one entity, the trigger's **Trigger when** option controls when it fires.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use **Relative humidity crossed threshold** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your humidity sensor is in (like your bathroom or basement). You can also select a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Relative humidity crossed threshold**.
6. Under **Threshold type**, configure the zone the reading must enter for the trigger to fire:
   - Select **Above** or **Below** and enter a value to fire when the reading crosses that level.
   - Select **In range** and enter a lower and upper bound to fire when the reading enters the range from outside.
   - Select **Outside range** and enter a lower and upper bound to fire when the reading leaves the range (crosses past either bound).
   For each option, you can enter a fixed percentage or use an `input_number`, `number`, or `sensor` entity as the threshold.
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

    For each mode you can enter a fixed percentage or reference an `input_number`, `number`, or `sensor` entity.
  required: true
Trigger when:
  description: |
    When multiple entities are targeted, controls when the trigger fires:

    - **Each**: fire every time any targeted entity crosses the threshold.
    - **First**: fire only on the first crossing.
    - **All**: fire only after every targeted entity crosses the threshold.

    This corresponds to the `behavior` field in YAML. Default is **Each**.
  required: true
For at least:
  description: How long the reading must remain past the threshold before the trigger fires. Useful to avoid triggering on brief spikes. For example, set it to `0:05:00` to fire only after the reading has stayed past the threshold for 5 minutes. Default is `0` (fires immediately).
  required: true
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Relative humidity crossed threshold** is referred to as `humidity.crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: humidity.crossed_threshold
  target:
    entity_id: sensor.bedroom_humidity
  options:
    threshold:
      type: between
      value_min:
        number: 40
      value_max:
        number: 60
{% endexample %}

This fires whenever the bedroom humidity sensor enters the comfort range (40% to 60%).

To fire when the reading leaves a comfort range (escapes above 60% or below 40%):

{% example %}
trigger: |
  trigger: humidity.crossed_threshold
  target:
    entity_id: sensor.bedroom_humidity
  options:
    threshold:
      type: outside
      value_min:
        number: 40
      value_max:
        number: 60
{% endexample %}

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: |
    A mapping that defines the zone the reading must enter for the trigger to fire. Set `type` to one of:

    - `above` or `below`: provide `value` with a `number` key or an `entity` key.
    - `between` or `outside`: provide `value_min` and `value_max`, each with a `number` key or an `entity` key.
  required: true
  type: map
behavior:
  description: |
    When multiple entities are targeted, controls when the trigger fires. Accepts:

    - `any`: fire every time any targeted entity crosses the threshold.
    - `first`: fire only on the first crossing.
    - `last`: fire only after every targeted entity crosses the threshold.
  required: true
  type: string
  default: any
for:
  description: |
    How long the reading must remain past the threshold before the trigger fires. Accepts a duration string in `HH:MM:SS` format. For example, `00:05:00` fires only after the reading has stayed past the threshold for 5 minutes.
  required: true
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- **Above** and **Below** fire on the crossing moment only. Once the reading is above the threshold, the trigger does not fire again until the reading dips back below it and then crosses above again.
- **In range** (`between`) fires when the reading moves from outside the bounds into the bounds. **Outside range** (`outside`) fires when the reading moves from inside the bounds past either bound.
- A comfortable indoor humidity range is typically 40% to 60%. Use **Outside range** with those bounds to fire the moment conditions drift out of that comfort zone.
- Pair this trigger with [Relative humidity changed](/triggers/humidity.changed/) if you also want to react to smaller fluctuations between crossings.
- Pair this trigger with [Relative humidity](/conditions/humidity.is_value/) in follow-up conditions to double-check the final state.
- The trigger works with climate entities, humidifier entities, weather entities, and sensors with the humidity device class.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn on the bathroom fan when it gets too humid

After a shower, bathroom humidity can climb fast. This automation turns on the bathroom fan the moment humidity crosses 70%.

- **Trigger**: Relative humidity crossed threshold
- **Target**: Bathroom humidity sensor
- **Threshold type**: Above 70%
- **Trigger when**: Each
- **Action**: Fan: Turn on

{% details "YAML example for bathroom humidity ventilation" %}

{% example %}
automation: |
  alias: "Ventilate bathroom on high humidity"
  triggers:
    - trigger: humidity.crossed_threshold
      target:
        entity_id: sensor.bathroom_humidity
      options:
        threshold:
          type: above
          value:
            number: 70
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.bathroom
{% endexample %}

{% enddetails %}

### Automation: alert when basement humidity goes out of range

Keep your basement at a healthy humidity level by sending a notification whenever the sensor crosses a level that may indicate a moisture problem.

- **Trigger**: Relative humidity crossed threshold
- **Target**: Basement humidity sensor
- **Threshold type**: Above 60%
- **Trigger when**: Each
- **For at least**: 00:10:00
- **Action**: Notifications: Send a notification via mobile_app_phone

{% details "YAML example for a basement humidity alert" %}

{% example %}
automation: |
  alias: "Alert on basement humidity"
  triggers:
    - trigger: humidity.crossed_threshold
      target:
        entity_id: sensor.basement_humidity
      options:
        threshold:
          type: above
          value:
            number: 60
        for: "00:10:00"
  actions:
    - action: notify.mobile_app_phone
      data:
        message: "Basement humidity crossed 60%."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
