---
title: Ukraine Alarm
description: Instructions on how to integrate Ukraine Alarm within Home Assistant.
ha_category:
  - Other
ha_release: 2022.6
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@PaulAnnekov'
ha_domain: ukraine_alarm
ha_platforms:
  - binary_sensor
ha_integration_type: service
---

The **Ukraine Alarm** {% term integration %} uses the siren.pp.ua API, a public wrapper for the [Ukraine Alarm](https://www.ukrainealarm.com/) web service, to provide air-raid siren notifications. The {% term integration %} creates 8 binary sensors for your selected region in Ukraine:

- Air
- Air (red)
- Air (yellow)
- Artillery
- Chemical
- Nuclear
- Urban Fights
- Unknown

## Air alert levels

The service reports a danger level for air alerts, where red is the more severe level and yellow the less severe one:

- **Air** is on whenever an air alert is active for the region, whether or not a level is reported for it.
- **Air (red)** is on while an air alert with the red level is active.
- **Air (yellow)** is on while an air alert with the yellow level is active.

The service can report both levels for a region at the same time, in which case both sensors are on. The service attaches levels to every alert type, but they are only meaningful for air alerts, so the other sensors are not affected by them.

Siren check interval is set to 10 seconds to avoid overloading the API and still be able to react fast enough.

{% include integrations/config_flow.md %}

## Limitations

You can monitor up to 5 regions to not hit the API rate limit.
