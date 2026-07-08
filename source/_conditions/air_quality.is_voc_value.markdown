---
title: "Volatile organic compounds value"
condition: air_quality.is_voc_value
domain: air_quality
description: "Tests the volatile organic compounds level of one or more entities."
related_conditions:
  - air_quality.is_voc_ratio_value
  - air_quality.is_co2_value
---

The **Volatile organic compounds value** condition passes when a <abbr title="volatile organic compounds">VOC</abbr> sensor's reading meets a specific level. VOCs are invisible gases released by paints, cleaning supplies, new furniture, and even scented candles. You often notice them as that "new car" or "fresh paint" smell, and at higher concentrations they affect comfort and health. This condition lets your automation respond proportionally, turning on the ventilation fan only when VOC readings are genuinely elevated and leaving it off during a normal day so you save energy.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Volatile organic compounds value**.
6. Under **Threshold type**, set the VOC level the condition checks against.
7. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: The VOC level the sensor has to meet or exceed for the condition to pass.
Condition passes if:
  description: When multiple sensors are targeted, controls how results combine. Pick **Any** to pass if at least one sensor meets the threshold, or **All** to pass only when every targeted sensor does.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `air_quality.is_voc_value`. A basic example looks like this:

{% example %}
condition: |
  condition: air_quality.is_voc_value
  target:
    entity_id: sensor.living_room_voc
  options:
    threshold: 300
    behavior: any
{% endexample %}

This passes when the living room VOC sensor reads at or above 300 µg/m³.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The VOC level the sensor has to meet or exceed for the condition to pass. Accepts a number or a reference to an `input_number`, `number`, or `sensor` entity.
  required: true
  type: any
behavior:
  description: >
    When multiple sensors are targeted, controls how results combine. Accepts `all` or `any`.
  required: true
  type: string
  default: any
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Sensors that are unavailable (`unavailable`) or have an unknown state (`unknown`) are skipped for **Any** and fail for **All**.
- Some sensors report VOCs as a ratio instead of an absolute concentration. For those sensors, use [Volatile organic compounds ratio value](/conditions/air_quality.is_voc_ratio_value/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: start the air purifier when you wake up only if VOC levels are high

Overnight, off-gassing from furniture, carpets, and cleaning products pushes VOC levels up in a closed room. This automation triggers at wake-up time and checks the living room VOC reading. If the level is at or above 300 μg/m3, the air purifier turns on to clear the air before you start your day. On mornings when the air is already fresh, the purifier stays off and you save energy.

- **Trigger**: Time: 07:00
- **Condition**: Air Quality: Volatile organic compounds value
- **Target**: Living room VOC sensor
- **Threshold type**: 300
- **Condition passes if**: Any
- **Action**: Fan: Turn on (air purifier)

{% details "YAML example for starting the purifier on high VOCs at wake-up" %}

{% example %}
automation: |
  alias: "Morning purifier if VOCs are high"
  triggers:
    - trigger: time
      at: "07:00:00"
  conditions:
    - condition: air_quality.is_voc_value
      target:
        entity_id: sensor.living_room_voc
      options:
        threshold: 300
        behavior: any
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.living_room_purifier
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
