---
title: IOmeter
description: Instructions on how to integrate IOmeter within Home Assistant.
ha_release: 2025.3
ha_category:
  - Energy
  - Sensor
ha_codeowners:
  - '@MaestroOnICe'
ha_quality_scale: bronze
ha_domain: iometer
ha_integration_type: device
ha_iot_class: Local Polling
ha_config_flow: true
ha_zeroconf: true
ha_platforms:
  - sensor
---

The **IOmeter** {% term integration %} fetches data from your [IOmeter](https://iometer.de/produkt/) device, by using the local HTTP API.

IOmeter is a German company that provides the IOmeter device for reading electricity meters.

{% important %}
In order for the IOmeter to be used by Home Assistant, the Core/Bridge firmware version should be at least 62/69.
{% endimportant %}

{% include integrations/config_flow.md %}

### Configuration parameters

{% configuration_basic %}
IP address:
  description: The IP address of your IOmeter.
{% endconfiguration_basic %}

## Data updates

The integration will update its sensors by polling the IOmeter Bridge every ten seconds for new values. We recommend using USB-C power for the IOmeter Core instead of batteries.

## Available sensors

The following sensors are supported:

- Power (W): Active power
- Total energy usage (kWh): How much energy the meter used
- Total energy returned (kWh): How much energy the meter returned to the grid
- Meter number: Electricity meter number
- Pin status: Electricity meter pin status
- Core battery level: Battery level of the IOmeter Core in percent
- Core power status: Battery or USB-C power for the IOmeter Core
- Signal strength WiFi: WiFi connection strength of the Bridge
- Signal strength Core/Bridge: Sub-GHz connection strength between Core and Bridge

## Troubleshooting

There are no commonly known issues with this integration.

## Remove integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
