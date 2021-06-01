---
title: Islamic Prayer Times
description: Instructions on how to integrate the Islamic Prayer Times integration within Home Assistant.
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 0.85
ha_config_flow: true
ha_domain: islamic_prayer_times
ha_codeowners:
  - '@engrbm87'
ha_platforms:
  - sensor
---

The Islamic Prayer Times integration displays the various prayer times for Muslims as sensors.

This integration uses the `prayer_times_calculator` package to get the prayer times. To learn about the different calculation options that are available you can check this [link](https://aladhan.com/prayer-times-api#GetTimings).
In addition to the calculation options, you can also specify an offset for the different prayers for custom tuning.

{% include integrations/config_flow.md %}

## Integration Sensors

The following sensors are added by the integration:

sensors:
  - Fajr: Show the fajr prayer time for today.
  - Sunrise: Show the sunrise for today which is the end of fajr prayer. This is a calculated field and may not necessarily be the same as the astronomical sunrise.
  - Dhuhr: Show the dhuhr prayer time for today.
  - Asr: Show the asr prayer time for today.
  - Maghrib: Show the maghrib prayer time for today.
  - Isha: Show the isha prayer time for today.
  - Imsak: Show the Imsak time (mostly used in the month of Ramadan).
  - Midnight: Show the midnight for today which is the end of isha prayer. This is a calculated field and is not the same as 12AM.
