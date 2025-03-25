---
title: TheSilentWave
description: Instructions on how to integrate TheSilentWave devices into Home Assistant.
ha_category:
  - Sensor
ha_release: 0.1.0
ha_iot_class: Local Polling
ha_domain: thesilentwave
ha_platforms:
  - sensor
ha_integration_type: integration
ha_quality_scale: silver
ha_config_flow: true
---

The TheSilentWave integration allows you to monitor the status of your TheSilentWave device in Home Assistant.

## Prerequisites

- A TheSilentWave device on your local network
- The IP address of your device

## Configuration

This integration can be configured via the Home Assistant UI:

1. Go to **Settings** > **Devices & Services**
2. Click the **+ ADD INTEGRATION** button
3. Search for "TheSilentWave"
4. Follow the configuration flow and provide:
   - A name for your device
   - The IP address of your device
   - Update interval (optional, defaults to 10 seconds)

{% configuration_basic %}
Name:
  description: A name for the device
Host:
  description: The IP address of your TheSilentWave device
Scan Interval:
  description: Number of seconds between updates (5-300)
{% endconfiguration_basic %}

## Sensors

This integration provides a binary sensor that shows the current state of your TheSilentWave device:

- **State**: Shows either "on" or "off" depending on the device's status
- **Icon**: Dynamically changes between power-on and power-off based on the state
