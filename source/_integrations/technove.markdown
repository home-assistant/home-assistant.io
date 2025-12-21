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
  - diagnostics
  - number
  - sensor
  - switch
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

## Number

The {% term integration %} adds the following number entity:

| Name        | Description                                                                                                                                                             |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| max current | Determines the maximum current limit that the charging station can provide to the vehicle. Note: this value can only be set when the power-sharing mode is not enabled. |

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
- Status, one of the following values:
  - Unplugged
  - Plugged, waiting
  - Plugged, charging
  - Out of activation period
  - High tariff period

## Switch

The {% term integration %} adds the following switch:

| Name             | Description                                                                                                                                                                                                                                              |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Auto-charge mode | When enabled, vehicles will start charging automatically when plugged in. When turned off, charging will need to be manually started each time a vehicle is plugged in. Note: Disabling auto-charge mode does not interrupt an ongoing charging session. |
| Charging enabled | When enabled, vehicles will be able to charge. Disable it to stop a vehicle from charging. Note: This switch can only be used when auto-charge mode is disabled.                                                                                         |
