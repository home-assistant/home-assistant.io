---
title: TechnoVE
description: Instructions on how to integrate TechnoVE Smart Charging Station with Home Assistant.
ha_category:
  - Car
ha_release: 2024.2
ha_iot_class: Local Polling
ha_domain: technove
ha_config_flow: true
ha_zeroconf: true
ha_codeowners:
  - '@Moustachauve'
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: device
---

The TechnoVE integration provides connectivity with TechnoVE Smart Charging Station through the station local API.

{% include integrations/config_flow.md %}

## Binary sensors

The {% term integration %} adds the following binary sensors:

- Battery protected - On / Off
- Charging - Charging / Not charging
- Conflict with power sharing mode - On / Off
- Power sharing mode - On / Off
- Static IP - Connected / Not Connected
- Update - Up-to-date / Update available

## Sensors

The {% term integration %} adds the following sensors:

- Input voltage
- Output voltage
- Max station current
- Current
- Total energy usage
- Last session energy usage
- Wi-Fi signal strength
- Wi-Fi network name
- Status
