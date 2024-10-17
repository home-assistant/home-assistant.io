---
title: MAWAQIT Prayer Times
description: Instructions on how to integrate the MAWAQIT Prayer Times integration within Home Assistant.
ha_category:
  - Sensor
ha_iot_class: cloud_polling
ha_release: 2024.10.2
ha_config_flow: true
ha_domain: mawaqit
ha_codeowners:
  - '@MAWAQIT'
  - '@moha-tah'
  - '@yeyvo'
ha_platforms:
  - sensor
ha_integration_type: integration
---

The MAWAQIT (`mawaqit`) integration displays the various prayer times for Muslims as sensors.

This platform calculates prayer times from MAWAQIT.net.

## Prerequisites
- a MAWAQIT.net account

{% include integrations/config_flow.md %}

## Integration Sensors

The following sensors are added by the integration:

sensors:
  - fajr: Show the fajr prayer time for today.
  - shuruq: Show the sunrise for today which is the end of fajr prayer. This is a calculated field and may not necessarily be the same as the astronomical sunrise.
  - dhuhr: Show the dhuhr prayer time for today.
  - asr: Show the asr prayer time for today.
  - maghrib: Show the maghrib prayer time for today.
  - isha: Show the isha prayer time for today.
  - next prayer: Show the time of the next prayer.
  - jumua: Show the jumua time for the week.
  - ...

## Configuration

### Set up your account

This component allows you to integrate the data of your mawaqit mosque into Home Assistant. To do this, a Mawaqit account from https://mawaqit.net is required.
