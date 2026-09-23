---
title: "Nitrogen dioxide level crossed threshold"
trigger: air_quality.no2_crossed_threshold
domain: air_quality
description: "Triggers when one or more nitrogen dioxide levels cross a threshold."
related_triggers:
  - air_quality.no2_changed
---

The **Nitrogen dioxide level crossed threshold** trigger fires when the nitrogen dioxide (NO2) reading on one or more air quality sensors crosses a specific level. Nitrogen dioxide is a reddish-brown gas with a sharp odor, produced primarily by vehicle traffic and gas appliances. Elevated NO2 irritates the airways and worsens respiratory conditions like asthma, so the WHO recommends keeping short-term exposure below 25 micrograms per cubic meter.

If you live near a busy road, this trigger is a game-changer. Have your ventilation system close its fresh-air intake automatically when street-side NO2 rises past your limit, keeping traffic pollution out of the house. Or get an alert on your phone during rush hour so you know to keep the kids inside until levels drop. Your home watches the air for you and reacts the instant conditions change.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Nitrogen dioxide level crossed threshold**.
6. Under **Threshold type**, set the nitrogen dioxide level the reading must cross for the trigger to fire.
7. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how multiple targets interact.
8. Under **For at least**, set how long the level must stay past the threshold before the trigger fires. Leave at the default to fire immediately.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: The nitrogen dioxide concentration the reading has to cross for the trigger to fire. Can be a fixed number, or reference a helper entity that provides the value.
Trigger when:
  description: When multiple sensors are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted sensor crosses the threshold, **First** to fire only on the first crossing, or **All** to fire only after all targeted sensors have crossed the threshold.
  required: false
  default: Each
For at least:
  description: How long the reading must remain past the threshold before the trigger fires. Defaults to firing immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.no2_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.no2_crossed_threshold
  target:
    entity_id: sensor.street_side_no2
  options:
    threshold: 40
    behavior: each
{% endexample %}

This fires whenever the street-side NO2 sensor crosses 40 in either direction.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The nitrogen dioxide concentration the reading has to cross for the trigger to fire. Accepts a number or a reference to an `input_number`, `number`, or `sensor` entity.
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

- The trigger fires on any crossing, up or down. If you only want one direction, add a condition that checks whether the current NO2 level is above or below your threshold.
- The WHO guideline for short-term NO2 exposure is 25. If you live near a busy road, a threshold in that range helps protect indoor air quality.
- Pair this trigger with [Nitrogen dioxide level changed](/triggers/air_quality.no2_changed/) if you also want to track smaller fluctuations between crossings.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: block traffic pollution during rush hour

Living near a busy road means NO2 spikes every rush hour. This automation closes the fresh-air intake on your ventilation system the moment your street-side sensor crosses 40, keeping traffic fumes out of the house while you go about your evening.

- **Trigger**: Nitrogen dioxide level crossed threshold
- **Target**: Street-side NO2 sensor
- **Threshold type**: 40
- **Trigger when**: Each
- **Condition**: NO2 is above 40
- **Action**: Close cover (fresh-air intake)

{% details "YAML example for closing intake on high NO2" %}

{% example %}
automation: |
  alias: "Close intake on high NO2"
  triggers:
    - trigger: air_quality.no2_crossed_threshold
      target:
        entity_id: sensor.street_side_no2
      options:
        threshold: 40
        behavior: each
  conditions:
    - condition: numeric_state
      entity_id: sensor.street_side_no2
      above: 40
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.fresh_air_intake
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
