---
title: energieleser
description: Instructions on how to integrate energieleser devices in Home Assistant.
ha_release: 2026.7
ha_category:
  - Energy
  - Sensor
ha_codeowners:
  - "@AjinkyaGokhale"
  - "@amitkio"
ha_quality_scale: silver
ha_domain: energieleser
ha_integration_type: device
ha_iot_class: Local Polling
ha_config_flow: true
ha_zeroconf: true
ha_platforms:
  - sensor
---

The energieleser {% term integration %} fetches real-time consumption data reported by energieleser devices, such as stromleser.one, gasleser, wasserleser, and wärmeleser, using a local HTTP API.

[energieleser](https://energieleser.de/) is a brand by nineti GmbH, a German company offering smart readers for utility meters.

{% include integrations/config_flow.md %}

## Configuration parameters

{% configuration_basic %}
IP address:
  description: "The IP address of your energieleser device. For example, `192.168.178.100`."
{% endconfiguration_basic %}

## Data updates

The integration fetches data by polling the device locally over your network.

## Available sensors

The following sensors are supported depending on the device type and meter capabilities:

- **stromleser.one**:
  - Imported energy (kWh): Cumulative energy consumed
  - Exported energy (kWh): Cumulative energy exported to the grid
  - Active power (W): Current active power
  - Phase 1, Phase 2, and Phase 3 power (W): Current active power for each of the three phases
- **gasleser**:
  - Total gas (m³): Total gas volume measured by the meter
  - Gas flow rate (m³/h): Current gas flow rate
- **wasserleser**:
  - Total water (m³): Total water volume measured by the meter
  - Water flow rate (L/h): Current water flow rate in liters per hour
  - Volume flow rate (m³/h): Current water flow rate in cubic meters per hour
- **wärmeleser**:
  - Energy tariff 1, tariff 2, and tariff 3 (MWh): Cumulative heat energy for each of the three tariffs
  - Power (kW): Current thermal power
  - Total volume (m³): Total volume of heating medium measured by the meter
  - Volume flow (L/h): Current flow rate of heating medium
  - Flow temperature (°C): Temperature of the incoming heating medium
  - Return temperature (°C): Temperature of the outgoing heating medium
  - Temperature difference (K): Difference between flow and return temperature
- **Common sensors**:
  - Signal strength (dBm): Wi-Fi signal strength of the device

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
