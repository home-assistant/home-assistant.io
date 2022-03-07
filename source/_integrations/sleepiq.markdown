---
title: SleepIQ
description: Instructions for how to integrate SleepIQ beds within Home Assistant.
ha_category:
  - Health
  - Sensor
  - Binary Sensor
ha_release: 0.29
ha_iot_class: Cloud Polling
ha_domain: sleepiq
ha_config_flow: true
ha_dhcp: true
ha_codeowners:
  - '@kbickar'
  - '@mfugate1'
ha_platforms:
  - binary_sensor
  - button
  - light
  - sensor
  - switch
---

The SleepIQ integration lets you integrate your SleepNumber Bed via [SleepIQ by SleepNumber](https://www.sleepnumber.com/sleepiq-sleep-tracker).

There is currently support for the following platforms within Home Assistant:

- Binary Sensor - View occupancy of each side
- Button - Calibrate the bed
- Button - Stop the pump
- Light - Control lights on supported models
- Number - View/Set the actuator positions of the foundation
- Number - View/Set firmness for each side
- Sensor - View pressure of each side
- Switch - Toggle Privacy mode

You will need an account on [SleepIQ](https://sleepiq.sleepnumber.com/) to use this integration.

{% include integrations/config_flow.md %}
