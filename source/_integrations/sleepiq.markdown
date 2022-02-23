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
ha_platforms:
  - binary_sensor
  - button
  - sensor
  - switch
ha_codeowners:
  - '@mfugate1'
  - '@kbickar'
ha_config_flow: true
ha_dhcp: true
---

The SleepIQ integration lets you view sensor data from [SleepIQ by SleepNumber](https://www.sleepnumber.com/sleepiq-sleep-tracker). In particular, it lets you see the occupancy and current SleepNumber (ie current firmness) of each side of a SleepNumber bed.

You will need an account on [SleepIQ](https://sleepiq.sleepnumber.com/) to use this integration.

{% include integrations/config_flow.md %}
