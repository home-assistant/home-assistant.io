---
title: everHome
description: Instructions on setting up everHome EcoTracker products within Home Assistant.
ha_release: 2025.3
ha_category:
  - Energy
  - Sensor
ha_codeowners:
  - '@everhome-admin'
ha_quality_scale: silver
ha_domain: everhome
ha_integration_type: device
ha_iot_class: Local Polling
ha_config_flow: true
ha_zeroconf: true
ha_platforms:
  - sensor
---

The **everHome** {% term integration %} is fetching the energy informations from your everHome [EcoTracker](https://everhome.cloud/de/ecotracker) devices.

everHome is a German company that is providing a SmartHome Platform.

{% include integrations/config_flow.md %}

### Configuration parameters

{% configuration_basic %}
IP address:
  description: The hostname or IP address of the EcoTracker device.
{% endconfiguration_basic %}

## Data updates

The integration updates its sensors by polling the everHome EcoTracker every second for new values. This polling interval matches the typical update rate of infrared and P1 electricity meters, which usually provide new readings once per second.

## Available sensors

The following sensors are available:

- Power (W): Active power.
- Power average (W): The average power of the last minute.
- Power Phase 1 (W): The active power on phase 1.
- Power Phase 2 (W): The active power on phase 2.
- Power Phase 3 (W): The active power on phase 3.
- Total energy usage (kWh): The total amount of consumed energy from the home.
- Total energy usage tariff 1 (kWh): The total amount of consumed energy from the home in tariff 1.
- Total energy usage tariff 2 (kWh): The total amount of consumed energy from the home in tariff 2.
- Total energy returned (kWh): The total amount of energy that went back into the grid.
- Signal strength WiFi: WiFi connection strength of the everHome EcoTracker.

## Troubleshooting

There are no commonly known issues with this integration.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
