---
title: Renson
description: Instructions on how to integrate Renson Endura Delta sensors into Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Fan
  - Number
  - Sensor
ha_release: 2023.7
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@jimmyd-be'
ha_domain: renson
ha_platforms:
  - binary_sensor
  - button
  - fan
  - number
  - sensor
ha_integration_type: integration
---

The Renson integration pulls in data from the Renson Endura delta device. Most of the sensors that can be monitored from inside the Android/iOS application can be monitored with this integration.

{% include integrations/config_flow.md %}

## Services

### Service `renson.set_timer_level`

Set the ventilation timer.

  | Service data attribute | Required | Description | Example |
  | ---------------------- | -------- | ----------- | ------- |
  | `Level`| yes | Level setting | |
  | `Time` | yes | Time of the timer (0 will disable the timer) | |

### Service `renson.set_breeze`

Set the breeze function of the ventilation system.

  | Service data attribute | Required | Description | Example |
  | ---------------------- | -------- | ----------- | ------- |
  | `Level`| no | Ventilation level when breeze function is activated | |
  | `Temperature` | no | Temperature when the breeze function should be activated in °C | |
  | `Activate` | yes | Activate or disable the breeze feature | `2020-05-01T17:45:00` |

### Service `renson.set_day_night_time`

Set the day and night time of the system.

  | Service data attribute | Required | Description | Example |
  | ---------------------- | -------- | ----------- | ------- |
  | `Start day`| yes | Start time of the day | |
  | `Start night` | yes | Start time of the night | |

### Service `renson.set_pollution_settings`

Set all the pollution settings of the ventilation system.

  | Service data attribute | Required | Description | Example |
  | ---------------------- | -------- | ----------- | ------- |
  | `Day pollution Level`| no | Ventilation level when pollution is detected in the day | |
  | `Night pollution Level` | no | Ventilation level when pollution is detected in the night | |
  | `Enable humidity control` | no | Activate or disable the humidity control | |
  | `Enable air quality control` | no | Activate or disable the air quality control | |
  | `Enable CO2 control` | no | Activate or disable the CO2 control | `2020-05-01T17:45:00` |
  | `co2 threshold` | no | Sets the CO2 pollution threshold level in ppm | `2020-05-01T17:45:00` |
  | `co2 hysteresis` | no | Sets the CO2 pollution threshold hysteresis level in ppm | `2020-05-01T17:45:00` |
