---
title: "PM2.5 level changed"
trigger: air_quality.pm25_changed
domain: air_quality
description: "Triggers when one or more PM2.5 levels change."
related_triggers:
  - air_quality.pm25_crossed_threshold
---

The **PM2.5 level changed** trigger fires after the PM2.5 (particulate matter 2.5 micrometers or smaller) reading on one or more air quality sensors changes by a meaningful amount. PM2.5 is the most widely tracked particle size for indoor and outdoor air quality. Sources include cooking, candles, wildfires, traffic exhaust, and dust. These fine particles are small enough to reach deep into the lungs, making them especially relevant during wildfire season, allergy season, or anytime you want to keep tabs on what your family is breathing.

Imagine your windows closing automatically the moment outdoor particle levels jump during a nearby wildfire, keeping smoke outside where it belongs. Use this trigger to turn on an air purifier, close windows, or send an alert whenever your PM2.5 sensor reports a significant shift.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **PM2.5 level changed**.
6. Under **Threshold type**, set how much the level has to change before the trigger fires.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: How much the PM2.5 level has to change before the trigger fires. Can be a fixed number, or reference a helper entity that provides the value.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.pm25_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.pm25_changed
  target:
    entity_id: sensor.living_room_pm25
  options:
    threshold: 10
{% endexample %}

This fires whenever the living room PM2.5 sensor reading changes by at least 10 micrograms per cubic meter.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The minimum amount the PM2.5 level must change before the trigger fires. Accepts a number, or a reference to an `input_number`, `number`, or `sensor` entity.
  required: true
  type: any
{% endoptions_yaml %}

{% include triggers/targets.md %}

## Good to know

- PM2.5 is the particle size most commonly referenced in air quality indexes worldwide. A threshold of 5 to 15 μg/m³ suits most home automations.
- The trigger fires on any change that meets the threshold, whether the level goes up or down.
- To react only when PM2.5 crosses a specific concentration in one direction, use [PM2.5 level crossed threshold](/triggers/air_quality.pm25_crossed_threshold/) instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: close windows during wildfire season

When wildfire smoke rolls in, the last thing you want is to leave the windows open. This automation closes your motorized windows as soon as PM2.5 levels shift significantly, keeping smoke and fine particles outside where they belong.

- **Trigger**: PM2.5 level changed
- **Target**: Outdoor PM2.5 sensor
- **Threshold type**: 15
- **Action**: Close cover

{% details "YAML example for closing windows on PM2.5 change" %}

{% example %}
automation: |
  alias: "Close windows on PM2.5 change"
  triggers:
    - trigger: air_quality.pm25_changed
      target:
        entity_id: sensor.outdoor_pm25
      options:
        threshold: 15
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.living_room_windows
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
