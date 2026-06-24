---
title: "Carbon dioxide level crossed threshold"
trigger: air_quality.co2_crossed_threshold
domain: air_quality
description: "Triggers when one or more carbon dioxide levels cross a threshold."
related_triggers:
  - air_quality.co2_changed
---

The **Carbon dioxide level crossed threshold** trigger fires when a carbon dioxide (CO2) reading on one or more air quality sensors crosses a specific level. CO2 builds up naturally in occupied rooms from breathing, cooking, and heating. Once levels climb above 1,000 ppm, a room feels stuffy, concentration drops, and it is time to let in fresh air.

Picture your bedroom ventilation fan switching on automatically the moment CO2 crosses 1,000 ppm while you sleep, keeping the air fresh without you lifting a finger. Or getting a gentle reminder on your phone to crack a window when the living room gets stuffy during a gathering. This trigger lets your home respond to stale air the instant it becomes a problem.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Carbon dioxide level crossed threshold**.
6. Under **Threshold type**, set the carbon dioxide level the reading must cross for the trigger to fire.
7. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how multiple targets interact.
8. Under **For at least**, set how long the level must stay past the threshold before the trigger fires. Leave at the default to fire immediately.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: The carbon dioxide level (in ppm) the reading has to cross for the trigger to fire. Can be a fixed number, or reference a helper entity that provides the value.
Trigger when:
  description: When multiple sensors are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted sensor crosses the threshold, **First** to fire only on the first crossing, or **All** to fire only after all targeted sensors have crossed the threshold.
For at least:
  description: How long the reading must remain past the threshold before the trigger fires. Defaults to firing immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.co2_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.co2_crossed_threshold
  target:
    entity_id: sensor.bedroom_co2
  options:
    threshold: 1000
    behavior: each
{% endexample %}

This fires whenever the bedroom CO2 sensor crosses 1,000 ppm in either direction.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The carbon dioxide level (in ppm) the reading has to cross for the trigger to fire. Accepts a number or a reference to an `input_number`, `number`, or `sensor` entity.
  required: true
  type: any
behavior:
  description: >
    When multiple sensors are targeted, controls when the trigger fires. Accepts `each`, `first`, or `all`.
  required: true
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

- The trigger fires on any crossing, up or down. If you only want one direction, add a condition that checks whether the current CO2 level is above or below your threshold.
- Indoor CO2 typically ranges from about 400 ppm (well-ventilated) to over 1,000 ppm (stuffy room). A threshold around 800 to 1,000 ppm works well for most ventilation automations.
- Pair this trigger with [Carbon dioxide level changed](/triggers/air_quality.co2_changed/) if you also want to track smaller fluctuations between crossings.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: keep the bedroom fresh while you sleep

Stuffy air makes for restless nights. This automation turns on the bedroom ventilation fan when CO2 crosses 1,000 ppm, so you wake up feeling refreshed instead of groggy.

- **Trigger**: Carbon dioxide level crossed threshold
- **Target**: Bedroom CO2 sensor
- **Threshold type**: 1000
- **Trigger when**: Each
- **Action**: Turn on fan

{% details "YAML example for CO2-based bedroom ventilation" %}

{% example %}
automation: |
  alias: "Ventilate bedroom on high CO2"
  triggers:
    - trigger: air_quality.co2_crossed_threshold
      target:
        entity_id: sensor.bedroom_co2
      options:
        threshold: 1000
        behavior: each
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.bedroom_ventilation
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
