---
title: "Carbon monoxide value"
condition: air_quality.is_co_value
domain: air_quality
description: "Tests the carbon monoxide level of one or more entities."
related_conditions:
  - air_quality.is_co_detected
  - air_quality.is_co_cleared
---

The **Carbon monoxide value** condition passes when a carbon monoxide (CO) sensor's reading meets a specific level. Carbon monoxide is a colorless, odorless gas produced by incomplete combustion, and even moderate levels deserve attention. This condition gives you finer control than simpler detected or cleared checks, letting you start ventilation at a lower reading and sound the full alarm only when concentrations climb higher.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Carbon monoxide value**.
6. Under **Threshold type**, set the CO level the condition checks against.
7. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: The carbon monoxide level the sensor has to meet or exceed for the condition to pass.
Condition passes if:
  description: When multiple sensors are targeted, controls how results combine. Pick **Any** to pass if at least one sensor meets the threshold, or **All** to pass only when every targeted sensor does.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `air_quality.is_co_value`. A basic example looks like this:

{% example %}
condition: |
  condition: air_quality.is_co_value
  target:
    entity_id: sensor.hallway_co
  options:
    threshold: 35
    behavior: any
{% endexample %}

This passes when the hallway CO sensor reads at or above 35 ppm.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The carbon monoxide level the sensor has to meet or exceed for the condition to pass. Accepts a number or a reference to an `input_number`, `number`, or `sensor` entity.
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
- For simple binary detection without a specific threshold, use [Carbon monoxide detected](/conditions/air_quality.is_co_detected/) or [Carbon monoxide cleared](/conditions/air_quality.is_co_cleared/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: check CO levels when you arrive home

When you pull into the driveway, you want to know if the air inside is safe before settling in. This automation triggers when you enter the home zone and checks the hallway CO reading. If the level is at or above 20 ppm, you get a notification right away so you know to open the windows or stay outside until the air clears.

- **Trigger**: Zone: Person enters home zone
- **Condition**: Air Quality: Carbon monoxide value
  - **Target**: Hallway CO sensor
  - **Threshold type**: 20
  - **Condition passes if**: Any
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a CO check on arrival home" %}

{% example %}
automation: |
  alias: "CO check on arrival home"
  triggers:
    - trigger: zone
      entity_id: person.frenck
      zone: zone.home
      event: enter
  conditions:
    - condition: air_quality.is_co_value
      target:
        entity_id: sensor.hallway_co
      options:
        threshold: 20
        behavior: any
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "CO level elevated at home"
        message: >
          The hallway CO reading is above 20 ppm.
          Open the windows before settling in.
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
