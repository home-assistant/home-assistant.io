---
title: SleepIQ
description: Instructions for how to integrate SleepIQ beds within Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Health
  - Light
  - Number
  - Select
  - Sensor
  - Switch
ha_release: 0.29
ha_iot_class: Cloud Polling
ha_domain: sleepiq
ha_config_flow: true
ha_dhcp: true
ha_codeowners:
  - '@mfugate1'
  - '@kbickar'
ha_platforms:
  - binary_sensor
  - button
  - light
  - number
  - select
  - sensor
  - switch
ha_integration_type: integration
---

The SleepIQ integration lets you integrate your SleepNumber Bed via [SleepIQ by SleepNumber](https://www.sleepnumber.com/pages/sleepiq-sleep-tracker).

There is currently support available for the following platforms within Home Assistant, depending on the bed's capabilities:

- Binary sensor - View occupancy of each side
- Button - Calibrate the bed
- Button - Stop the pump
- Light - Control lights on supported models
- Number - View/Set the actuator positions of the foundation
- Number - View/Set firmness for each side
- Select - Choose a foundation preset position
- Select/Number - Set a foot warmer mode and timeout
- Sensor - View pressure of each side
- Switch - Toggle Privacy mode

You will need an account on [SleepIQ](https://sleepiq.sleepnumber.com/) to use this integration.

{% include integrations/config_flow.md %}
