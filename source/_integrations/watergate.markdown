---
title: Watergate
description: Instructions on how to integrate Watergate with Home Assistant.
ha_category:
  - Sensor
  - Valve
  - Water management
ha_release: '2025.1'
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@adam-the-hero'
ha_domain: watergate
ha_platforms:
  - valve
  - sensor
---

The **Watergate** integration integrates your Watergate Devices (currently Sonic Wi-Fi) with your Home Assistant.
With this integration, you are able to:

- Control your valve
- Monitor live telemetry (water flow, water pressure, water temperature)
- Monitor water usage

## Prerequisites

- You need to have a Sonic device.
- The Local API feature must be enabled in the Watergate application.

## Supported devices

The following devices are known to be supported by the integration:

- Watergate Sonic Wi-Fi

## Unsupported devices

The following devices are not supported by the integration:

- Watergate Sonic Pro

## Supported functionality

### Entities

The Watergate integration provides the following entities.

#### Sensors

- **Water meter volume**
  - **Description**: Water volume used by this device for the entire lifetime of a Sonic device.
  - **Remarks**: It can be used in the Energy Dashboard.

- **Water flow rate**
  - **Description**: The current flow rate of water through the device.
  - **Remarks**: Useful for monitoring real-time water usage.

- **Water pressure**
  - **Description**: The current water pressure in the system.
  - **Remarks**: Can be used to detect potential issues in the water supply.

- **Water temperature**
  - **Description**: The current temperature of the water.
  - **Remarks**: Useful for monitoring and ensuring safe water temperatures.

#### Valves

- **Water valve state**
  - **Description**: The current state of the water valve (open/closed).
  - **Remarks**: It is automatically updated when the valve state is changed.

## Data updates

The Watergate integration fetches data from the Sonic device every 2 minutes.
Thanks to the webhook option, Sonic will provide live telemetry every second when water is flowing directly to Home Assistant.

## Known limitations

The integration does not provide the ability to set auto shut-off thresholds and does not report any events regarding automatically closed valves.

{% include integrations/config_flow.md %}

{% configuration_basic %}
IP address:
    description: "The IP address of your Sonic device."
{% endconfiguration_basic %}

## Removing the integration

This integration follows standard integration removal procedures. No extra steps are required.

{% include integrations/remove_device_service.md %}

## Examples

### Monitor water usage in the Energy Dashboard

The water meter volume entity can be added to the Energy Dashboard, allowing you to monitor water usage.

### Automation ideas

- Turn off the water when no one is at home.
- Turn on the water when someone arrives home.
- Send a notification when the water is too hot.
- Send a notification when the water is too cold.
- Send a notification when water is flowing for too long.