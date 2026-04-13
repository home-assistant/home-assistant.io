---
title: Renson WAVES
description: Instructions on how to integrate Renson WAVES ventilation devices with Home Assistant.
ha_category:
  - Binary sensor
  - Sensor
ha_iot_class: Local Polling
ha_release: 2026.5
ha_config_flow: true
ha_codeowners:
  - '@pietergeerts'
ha_domain: renson_waves
ha_integration_type: device
ha_platforms:
  - binary_sensor
  - sensor
ha_quality_scale: bronze
---

The **Renson WAVES** {% term integration %} connects Home Assistant to compatible Renson WAVES ventilation devices over your local network. It provides read-only monitoring for device status, ventilation-related decisions, and air-quality-related measurements exposed by the device.

## Supported devices

This integration supports Renson WAVES devices that expose the local HTTP API used by the integration.

## Prerequisites

Before adding the integration, make sure:

1. Your Renson WAVES device is powered on and connected to the same local network as Home Assistant.
2. You know the IP address of the device.
3. Home Assistant can reach the device over HTTP on the configured port. The default port is 8000.

{% include integrations/config_flow.md %}

### Configuration parameters

{% configuration_basic %}
Host:
  description: The IP address of your Renson WAVES device on your local network.
Port:
  description: The HTTP port of your Renson WAVES device. The default is 8000.
{% endconfiguration_basic %}

## Supported functionality

The integration provides the following entities.

### Binary sensors

- **Wi-Fi connected**: Indicates whether the device reports an active Wi-Fi connection.
- **Room boost enabled**: Indicates whether room boost mode is currently active.
- **Silent mode enabled**: Indicates whether silent mode is currently active.
- **Breeze mode enabled**: Indicates whether breeze mode is currently active.

### Sensors

The integration exposes fixed sensors for device and ventilation status, including:

- **Uptime**
- **Wi-Fi SSID**
- **Room boost decision**
- **Room boost level**
- **Silent mode decision**
- **Silent reduction**
- **Breeze mode decision**
- **Breeze temperature**

The integration also creates additional sensors for measurements exposed by the device's local API when available. Depending on the device model, firmware, and available API endpoints, this can include measurements such as:

- Temperature
- Relative humidity
- Absolute humidity
- Volatile organic compounds (VOC)
- Pressure
- Wi-Fi signal strength

## Configuration options

This integration does not provide additional configuration options after setup.

## Data updates

The integration polls data from the device every 30 seconds.

## Known limitations

- This integration currently provides read-only monitoring entities.
- The available dynamic sensors depend on what the device exposes through its local API.

## Troubleshooting

### Device cannot be reached during setup

If setup fails with a connection error:

1. Confirm the IP address and port are correct.
2. Confirm the device is online on your local network.
3. Confirm that no firewall or network isolation rule is blocking access from Home Assistant to the device.

## Removing the integration

This integration follows standard integration removal. No additional vendor-side cleanup is required.
