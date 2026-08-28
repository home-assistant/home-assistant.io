---
title: "Ozone value"
condition: air_quality.is_ozone_value
domain: air_quality
description: "Tests the ozone level of one or more entities."
related_conditions:
  - air_quality.is_no2_value
  - air_quality.is_voc_value
---

The **Ozone value** condition passes when an ozone (O3) sensor's reading meets a specific level. Ground-level ozone is a key component of smog and tends to spike on hot, sunny afternoons. This condition helps your automation make smarter ventilation decisions, keeping the windows shut during a smog alert but allowing fresh air in after the ozone reading decreases to a comfortable level.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Ozone value**.
6. Under **Threshold type**, set the ozone level the condition checks against.
7. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: The ozone level the sensor has to meet or exceed for the condition to pass.
Condition passes if:
  description: When multiple sensors are targeted, controls how results combine. Pick **Any** to pass if at least one sensor meets the threshold, or **All** to pass only when every targeted sensor does.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `air_quality.is_ozone_value`. A basic example looks like this:

{% example %}
condition: |
  condition: air_quality.is_ozone_value
  target:
    entity_id: sensor.outdoor_ozone
  options:
    threshold: 100
    behavior: any
{% endexample %}

This passes when the outdoor ozone sensor reads at or above 100 µg/m³.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The ozone level the sensor has to meet or exceed for the condition to pass. Accepts a number or a reference to an `input_number`, `number`, or `sensor` entity.
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
- Ozone levels tend to peak on hot, sunny afternoons. Pair this condition with time-based triggers to limit outdoor ventilation during those hours.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: only open windows in the afternoon if ozone is low enough

On hot summer days, ozone builds up through the afternoon and peaks around 3 PM. This automation triggers at that time and checks whether outdoor ozone is at or above 100 μg/m3. If the reading is still high, the windows stay shut, and you get a notification explaining why. On breezy days with lower ozone, the automation does nothing, and you enjoy fresh air as usual.

- **Trigger**: Time: 15:00
- **Condition**: Air Quality: Ozone value
  - **Target**: Outdoor ozone sensor
  - **Threshold type**: 100
  - **Condition passes if**: Any
- **Action**: Close cover
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for keeping windows shut on high ozone afternoons" %}

{% example %}
automation: |
  alias: "Keep windows shut on high ozone afternoons"
  triggers:
    - trigger: time
      at: "15:00:00"
  conditions:
    - condition: air_quality.is_ozone_value
      target:
        entity_id: sensor.outdoor_ozone
      options:
        threshold: 100
        behavior: any
  actions:
    - action: cover.close_cover
      target:
        area_id: living_room
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Ozone is high outside"
        message: >
          Outdoor ozone is above 100. Windows
          are staying closed this afternoon.
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
