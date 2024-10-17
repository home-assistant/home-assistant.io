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

- **fajr**: Shows the fajr prayer time for today.
- **shuruq**: Shows the sunrise for today, which is the end of fajr prayer. This is a calculated field and may not necessarily be the same as the astronomical sunrise.
- **dhuhr**: Shows the dhuhr prayer time for today.
- **asr**: Shows the asr prayer time for today.
- **maghrib**: Shows the maghrib prayer time for today.
- **isha**: Shows the isha prayer time for today.
- **next prayer**: Shows the time of the next prayer.
- **jumua**: Shows the jumua time for the week.
- **my_mosque**: displays information about your favorite mosque.
For every prayer, you get an iqama sensor.

## Configuration

### Set up your account

This component allows you to integrate the data of your mawaqit mosque into Home Assistant. To do this, a Mawaqit account from https://mawaqit.net is required.
