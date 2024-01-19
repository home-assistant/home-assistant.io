---
title: TechnoVE
description: Instructions on how to integrate TechnoVE Charging station with Home Assistant.
ha_category:
  - Car
ha_release: 2024.1
ha_iot_class: Local Polling
ha_domain: technove
ha_config_flow: true
ha_codeowners:
  - '@Moustachauve'
ha_platforms:
  - sensor
ha_integration_type: integration
---

The TechnoVE integration provides connectivity with TechnoVE WiFi Charging station through the station local API.

{% include integrations/config_flow.md %}

## Sensors

The {% term integration %} adds the following sensors:

- Input voltage
- Output voltage
- Max current
- Max station current
- Current
- Total energy usage
- Last session energy usage
- Wi-Fi signal strength
- Wi-Fi network name
- Status