---
title: Eight Sleep
description: Interface an Eight Sleep smart cover or mattress to Home Assistant
ha_category:
  - Binary Sensor
  - Health
  - Sensor
ha_release: 0.44
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@mezz64'
  - '@raman325'
ha_domain: eight_sleep
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: integration
ha_config_flow: true
---

The `eight_sleep` integration allows Home Assistant to fetch data from your [Eight Sleep](https://eightsleep.com/) smart cover or mattress.

There is currently support for the following device types within Home Assistant:

- Binary Sensor - lets observe the presence state of a [Eight Sleep](https://eightsleep.com/) cover/mattress through Home Assistant.
- Sensor - This includes bed state, sleep fitness scores, and results of the current and previous sleep sessions.

{% include integrations/config_flow.md %}

## Supported features

Sensors and associated attributes:

- eight_left/right_bed_state
  - Attributes:
    - Target Heating Level
    - Heating Active
    - Heating Time Remaining
- eight left/right_sleep_fitness
  - Attributes:
    - Fitness Date
    - Fitness Duration Score
    - Fitness Asleep Score
    - Fitness Out-of-Bed Score
    - Fitness Wakeup Score
- eight_left/right_sleep_session
  - Attributes:
    - Session Start
    - Tosses & Turns
    - Processing (True/False)
    - Time Slept (s)
    - Light Sleep %
    - Deep Sleep %
    - REM Sleep %
    - Respiratory Rate
    - Heart Rate
    - Sleep Stage
    - Room Temperature
    - Bed Temperature
- eight_left/right_previous_sleep_session
  - Attributes:
    - Session Start
    - Tosses & Turns
    - Processing (True/False)
    - Time Slept (s)
    - Light Sleep %
    - Deep Sleep %
    - REM Sleep %
    - Average Respiratory Rate
    - Average Heart Rate
    - Average Room Temperature
    - Average Bed Temperature
- eight_left/right_bed_temperature
- eight_left/right_sleep_stage
- eight_room_temperature

Binary Sensors:

- eight_left/right_bed_presence

## Service `heat_set`

You can use the service eight_sleep/heat_set to adjust the target cooling/heating level and heating duration of your bed (cooling is only available for the POD mattress).

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Entity ID for a sensor on the side to be adjusted.
| `target` | no | Target cooling/heating level from -100 to 100.
| `duration` | no | Duration to cool/heat at the target level in seconds.

Script Example:

```yaml
script:
  bed_set_heat:
    sequence:
      - service: eight_sleep.heat_set
        target:
          entity_id: "sensor.eight_johns_bed_temperature"
        data:
          target: 35
          duration: 3600
```

## Notice

Please note this component relies on an undocumented API utilized by the Eight Sleep mobile app to communicate with the Eight Sleep servers.  It is not supported by Eight Sleep and may malfunction if changes are made to either the mobile app operation or the API format.
