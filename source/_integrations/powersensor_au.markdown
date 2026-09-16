---
title: Powersensor
description: Integrate Powersensor plugs and sensors into Home Assistant
ha_release: 2026.6
ha_category: Sensor
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@jmattsson'
  - '@bookman-dius'
ha_domain: powersensor_au
ha_integration_type: hub
ha_quality_scale: bronze
related:
  - url: https://dius.github.io/homeassistant-powersensor/
    title: External documentation
---

The **Powersensor** {% term integration %} integrates [Powersensor](https://www.powersensor.com.au) devices into Home Assistant. The integration lets you view data from Powersensor plugs and sensors and use them in automations.

## Supported devices

The following devices are known to be supported by the integration:

- Powersensor Plugs with firmware >=8129
- Powersensor Sensors with firmware >=8129

## Unsupported devices

Devices running firmware <8129 are not supported and should be upgraded, though devices with firmware >=8100 may have partial functionality within Home Assistant.

## Prerequisites

Before setting up this integration, make sure that the following criteria are met:

- Your Powersensor devices are powered on and connected to the same Wi-Fi network as Home Assistant
  - Please note: Installing Powersensor devices in your home requires the mobile app which provides step-by-step instructions on initial configuration. This is only required for initial set up. Once your devices are connected to Wi-Fi, the Home Assistant integration should work regardless of whether or not you subsequently delete the mobile app from your devices.
- Your devices are running firmware 8129 or later (check via the Powersensor mobile app)
- UDP traffic is allowed on your local network

{% include integrations/config_flow.md %}

## Supported functionality

This integration provides the following platforms:

- **Sensor**: Power consumption, voltage, current, energy, and other sensor data
- **Battery**: Battery level for sensors (but not for plugs)

## Known limitations

The integration does not provide complete support for Powersensor water sensors and water flow data is not exposed in Home Assistant. However, the integration will surface any water sensor on the network and expose the battery level of the sensor.


## Actions

This integration does not provide any custom actions.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
