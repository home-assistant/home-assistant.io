---
title: Air quality
description: Monitor air pollutants and receive alerts from gas, smoke, and carbon monoxide sensors with the Air quality integration in Home Assistant.
ha_release: 0.85
ha_domain: air_quality
ha_quality_scale: internal
ha_category: []
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

The **Air quality** {% term integration %} brings together all the air quality sensors and detectors in your home. It gives you purpose-built triggers and conditions for pollutants like particulate matter (PM2.5, PM10), carbon dioxide (CO2), carbon monoxide (CO), volatile organic compounds (VOCs), ozone, nitrogen dioxide (NO2), and gas or smoke detectors.

Instead of writing complex template triggers to watch sensor values, you get dedicated triggers that understand pollutant thresholds, unit conversions, and multi-sensor behavior out of the box. Pair them with conditions to build automations that respond intelligently to the air around you.

{% include integrations/building_block_integration.md %}

## Air quality automation examples

The real power of this integration is combining triggers and conditions into automations that keep your home healthy without you having to think about it. Here are a few ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: ventilate a stuffy bedroom overnight

CO2 builds up in a closed bedroom as you sleep. By the time you notice the air feels stale, the level is already well above 1,000 ppm. This automation turns on the bedroom ventilation fan when CO2 crosses that threshold and turns it off again once the air is fresh.

- **Trigger**: Carbon dioxide level crossed threshold (above 1,000 ppm)
- **Action**: Turn on the bedroom ventilation fan
- **Second trigger**: Carbon dioxide level crossed threshold (below 800 ppm)
- **Second action**: Turn off the fan

{% details "YAML example for overnight bedroom ventilation" %}

{% example %}
automation: |
  alias: "Ventilate bedroom when CO2 is high"
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

### Automation: get an urgent alert when carbon monoxide is detected

Carbon monoxide is colorless and odorless. You rely entirely on your sensors to know it is there. This automation sends an urgent notification the moment any CO sensor in the house detects carbon monoxide, no matter the time of day.

- **Trigger**: Carbon monoxide detected
- **Target**: All CO sensors (by label)
- **Action**: Send a critical notification to every household member

{% details "YAML example for a carbon monoxide alert" %}

{% example %}
automation: |
  alias: "Carbon monoxide alert"
  triggers:
    - trigger: air_quality.co_detected
      target:
        label_id: co_sensors
      options:
        behavior: each
  actions:
    - action: notify.notify
      data:
        title: "Carbon monoxide detected"
        message: >
          A carbon monoxide sensor has triggered.
          Open windows, leave the house, and call
          emergency services if needed.
{% endexample %}

{% enddetails %}

### Automation: run the air purifier during wildfire season

When wildfire smoke raises outdoor PM2.5 above a safe level, the last thing you want is to open the windows. This automation starts the air purifier when PM2.5 crosses 25 µg/m³ and stops it when the air clears.

- **Trigger**: PM2.5 level crossed threshold (above 25 µg/m³)
- **Action**: Turn on the air purifier

{% details "YAML example for a wildfire-triggered air purifier" %}

{% example %}
automation: |
  alias: "Air purifier on high PM2.5"
  triggers:
    - trigger: air_quality.pm25_crossed_threshold
      target:
        entity_id: sensor.outdoor_pm25
      options:
        threshold: 25
        behavior: each
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.living_room_purifier
{% endexample %}

{% enddetails %}

### Automation: only open the windows if outdoor air is clean

Before letting fresh air in, check that outdoor pollution is actually low. This automation runs when you press a dashboard button to open the living room covers, but only if PM2.5 is below a safe limit.

- **Trigger**: Dashboard button pressed
- **Condition**: PM2.5 value is below 15 µg/m³
- **Action**: Open the living room window covers

{% details "YAML example for pollution-gated window covers" %}

{% example %}
automation: |
  alias: "Open covers only if air is clean"
  triggers:
    - trigger: state
      entity_id: input_button.open_windows
  conditions:
    - condition: air_quality.is_pm25_value
      target:
        entity_id: sensor.outdoor_pm25
      options:
        threshold: 15
        behavior: any
  actions:
    - action: cover.open_cover
      target:
        area_id: living_room
{% endexample %}

{% enddetails %}

{% include integrations/triggers_conditions_actions.md %}
