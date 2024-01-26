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
ha_integration_type: integration
---

The **Ukraine Alarm** {% term integration %} uses the siren.pp.ua API - public wrapper for [Ukraine Alarm](https://www.ukrainealarm.com/) web service to offer air-raid siren notifications. The {% term integration %} will create 6 binary sensors for your selected region in Ukraine:

- Air
- Artillery
- Chemical
- Nuclear
- Urban Fights
- Unknown

Siren check interval is set to 10 seconds to avoid overloading the API and still be able to react fast enough.

{% include integrations/config_flow.md %}

## Limitations

You can monitor up to 5 regions to not hit the API rate limit.
