---
title: Renson
description: Instructions on how to integrate Renson Endura Delta sensors into Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Fan
  - Number
  - Switch
  - Time
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
  - switch
  - time
ha_integration_type: integration
---

The Renson integration pulls in data from the Renson Endura delta device. Most of the sensors that can be monitored from inside the Android/iOS application can be monitored with this integration.

{% include integrations/config_flow.md %}

## Actions

### Action `renson.set_timer_level`

Set the ventilation timer.

  | Data attribute | Required | Description | Example |
  | ---------------------- | -------- | ----------- | ------- |
  | `timer_level`| yes | Level setting | |
  | `minutes` | yes | Time of the timer (0 will disable the timer) | |

### Action `renson.set_breeze`

Set the breeze function of the ventilation system.

  | Data attribute | Required | Description | Example |
  | ---------------------- | -------- | ----------- | ------- |
  | `breeze_level`| no | Ventilation level when breeze function is activated | |
  | `temperature` | no | Temperature when the breeze function should be activated in °C | |
  | `activate` | yes | Activate or disable the breeze feature | `2020-05-01T17:45:00` |

### Action `renson.set_pollution_settings`

Set all the pollution settings of the ventilation system.

  | Data attribute | Required | Description | Example |
  | ---------------------- | -------- | ----------- | ------- |
  | `day_pollution_level`| no | Ventilation level when pollution is detected in the day | |
  | `night_pollution_level` | no | Ventilation level when pollution is detected in the night | |
  | `humidity_control` | no | Activate or disable the humidity control | |
  | `airquality_control` | no | Activate or disable the air quality control | |
  | `co2_control` | no | Activate or disable the CO2 control | `2020-05-01T17:45:00` |
  | `co2_threshold` | no | Sets the CO2 pollution threshold level in ppm | `2020-05-01T17:45:00` |
  | `co2_hysteresis` | no | Sets the CO2 pollution threshold hysteresis level in ppm | `2020-05-01T17:45:00` |
