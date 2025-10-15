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
- The IP address of your device

{% include integrations/config_flow.md %}

## Sensors

This integration provides a binary sensor that shows the current state of your TheSilentWave device:

- **State**: Shows either "on" or "off" depending on the device's status.
- **Icon**: Dynamically changes between power-on and power-off based on the state.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After deleting the integration, go to the app of the manufacturer and remove the Home Assistant integration from there as well.