---
title: TheSilentWave
description: Instructions on how to integrate TheSilentWave devices into Home Assistant.
ha_category:
  - Sensor
ha_release: 2025.10
ha_iot_class: Local Polling
ha_domain: thesilentwave
ha_platforms:
  - sensor
ha_integration_type: integration
ha_quality_scale: silver
ha_config_flow: true
---

The **TheSilentWave** {% term integration %} allows you to monitor the status of your TheSilentWave devices in Home Assistant.

## Prerequisites

- A TheSilentWave device on your local network
- The IP address or hostname of your device

## Configuration

This integration can be configured via the Home Assistant UI:

1. Go to **Settings** > **Devices & Services**
2. Click the **+ ADD INTEGRATION** button
3. Search for "TheSilentWave"
4. Follow the configuration flow and provide:
   - A name for your device
   - The IP address of your device

**Naming suggestion:**  
You may use any name you prefer for the device. For clarity in larger setups, it is recommended to include the device’s location, for example “Aquarium Flow Pump – Left Rotation” or “Aquarium Flow Pump – Right Rotation”

{% configuration_basic %}
Name:
  description: A name for the device
Host:
  description: The IP address or hostname of your TheSilentWave device
{% endconfiguration_basic %}
{% include integrations/config_flow.md %}

## Sensors

This integration provides a binary sensor that shows the current state of your TheSilentWave device:

- **State**: Shows either "on" or "off" depending on the device's status.
- **Icon**: Dynamically changes between power-on and power-off based on the state.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After deleting the integration, go to the app of the manufacturer and remove the Home Assistant integration from there as well.
