---
title: Powersensor
description: Integrate Powersensor plugs and sensors into Home Assistant
ha_release: 2026.1
ha_category: Sensor
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@jmattsson'
  - '@bookman-dius'
ha_domain: powersensor
ha_integration_type: hub
ha_quality_scale: bronze
related:
  - url: https://dius.github.io/homeassistant-powersensor/
    title: External documentation 
---

The `Powersensor` {% term integration %} is used to integrate with the devices [Powersensor](https://www.powersensor.com.au), principally exposing data from plugs and sensors over your local WiFi network. The aim is to facilitate by detailed viewing of Powersensor data as well as use in home automations.

## Supported devices

The following devices are known to be supported by the integration:

- Powersensor Plugs with firmware >=8129
- Powersensor Sensors with firmware >=8129

## Unsupported devices

Devices running firmware <8129 are not supported and should be upgraded, though devices with firmware >=8100 may have partial functionality within Home Assistant

## Prerequisites

Before setting up this integration, ensure:

- Your Powersensor devices are powered on and connected to the same WiFi network as Home Assistant
- Your devices are running firmware 8129 or later (check via the Powersensor mobile app)
- UDP traffic is allowed on your local network

{% include integrations/config_flow.md %}

## Supported entities

This integration provides the following platforms:

- **Sensor**: Power consumption, voltage, current, energy, and other sensor data
- **Battery**: Battery level for sensors (i.e. not plugs)

## Known limitations

The integration does not provide complete support for Powersensor water sensors and water flow data is not exposed in Home Assistant. However, the integration will surface any water sensor on the network and expose the battery level of the sensor.

{% include integrations/config_flow.md %}


## Services

This integration does not provide any custom service actions.

## Removal

{% include integrations/remove_device_service.md %}
