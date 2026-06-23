---
title: "PM1 level changed"
trigger: air_quality.pm1_changed
domain: air_quality
description: "Triggers after one or more PM1 levels change."
related_triggers:
  - air_quality.pm1_crossed_threshold
---

The **PM1 level changed** trigger fires after the PM1 (particulate matter 1 micrometer or smaller) reading on one or more air quality sensors changes by a meaningful amount. PM1 particles are ultrafine and originate from combustion, vehicle exhaust, and industrial emissions. Because of their tiny size, they penetrate deep into the lungs and bloodstream. Cooking on a gas stove, nearby traffic, or a wildfire miles away all push PM1 levels up inside your home.

Imagine your nursery air purifier ramping up the moment particle levels shift, keeping the air as clean as possible for little ones without you doing antything. Use this trigger to start an air purifier, adjust HVAC filtration, or log particle count changes when your PM1 sensor reports a significant shift.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **PM1 level changed**.
6. Under **Threshold type**, set how much the level has to change before the trigger fires.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: How much the PM1 level has to change before the trigger fires. Can be a fixed number, or reference a helper entity that provides the value.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.pm1_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.pm1_changed
  target:
    entity_id: sensor.living_room_pm1
  options:
    threshold: 5
{% endexample %}

This fires whenever the living room PM1 sensor reading changes by at least 5 micrograms per cubic meter.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The minimum amount the PM1 level must change before the trigger fires. Accepts a number, or a reference to an `input_number`, `number`, or `sensor` entity.
  required: true
  type: any
{% endoptions_yaml %}

{% include triggers/targets.md %}

## Good to know

- PM1 particles are the smallest commonly measured particulate matter. They are especially relevant for respiratory health.
- The trigger fires on any change that meets the threshold, whether the level goes up or down.
- To react only when PM1 crosses a specific concentration in one direction, use [PM1 level crossed threshold](/triggers/air_quality.pm1_crossed_threshold/) instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: boost the air purifier when PM1 shifts

Ultrafine particles from cooking or traffic drift into every room, and tiny lungs are the most vulnerable. This automation increases your air purifier speed whenever PM1 levels in the nursery shift noticeably, keeping the air as clean as possible for little ones.

- **Trigger**: PM1 level changed
- **Target**: Nursery PM1 sensor
- **Threshold type**: 5
- **Action**: Fan: Set speed

{% details "YAML example for PM1-driven air purifier boost" %}

{% example %}
automation: |
  alias: "Boost purifier on PM1 change"
  triggers:
    - trigger: air_quality.pm1_changed
      target:
        entity_id: sensor.nursery_pm1
      options:
        threshold: 5
  actions:
    - action: fan.set_percentage
      target:
        entity_id: fan.nursery_air_purifier
      data:
        percentage: 80
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
