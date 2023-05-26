---
title: Owlet
description: Instructions on how to set up the Owlet integration in Home Assistant.
ha_release: 2023.6.0
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: owlet
ha_platforms:
  - sensor
ha_codeowners:
  - '@ryanbdclark'
ha_integration_type: integration
---

The Owlet integration allows you to integration a v3 Owlet Smart Sock into home assistant, this will expose 8 sensors, include heart rate, o2 saturation etc.

All that is required to add this integration is an Owlet account with a Smart Sock v3 connected to this account.

{% include integrations/config_flow.md %}

## Sensor

- Battery Percentage - The sock's remaining battery percentage
- Oxygen Saturation - The sock wearer's current Oxygen Saturation as a percentage
- O2 Saturation 10 Minute Average - The sock wearer's average Oxygen Saturation over the last 10 minutes as a percentage
- Heart Rate - The sock wearer's current heart rate in bpm
- Battery Remaining - The sock's remaining battery in minutes
- Skin Temperature - The sock wearer's current skin temperature in celsius
