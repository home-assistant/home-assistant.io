---
title: Casper Glow
description: Instructions on how to integrate Casper Glow lights into Home Assistant.
ha_category:
  - Binary Sensor
  - Button
  - Light
  - Select
  - Sensor
ha_bluetooth: true
ha_release: 2026.4
ha_iot_class: Local Polling
ha_codeowners:
  - '@mikeodr'
ha_domain: casper_glow
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - light
  - select
  - sensor
ha_integration_type: device
ha_quality_scale: silver
---

The **Casper Glow** {% term integration %} allows you to control your [Casper Glow](https://casper.com/products/glow) light from Home Assistant over Bluetooth. The Casper Glow is a portable dimmable light designed as a sleep aid, featuring a gentle dimming sequence that gradually lowers brightness to help you fall asleep. You can incorporate it into your bedtime automations to control brightness levels.

## Supported devices

The following devices are supported:

- Casper Glow (identified as "Jar" over Bluetooth)

## Prerequisites

Before setting up the integration, make sure:

1. Your Home Assistant host has a Bluetooth adapter.
2. The Casper Glow is powered on and within Bluetooth range.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Bluetooth address:
  description: "The Bluetooth address of your Casper Glow light. Discovered devices are shown automatically."
{% endconfiguration_basic %}

## Supported functionality

### Entities

The **Casper Glow** {% term integration %} provides the following entities.

#### Binary sensors

- **Dimming paused**
  - **Description**: Indicates whether the Glow's dimming sequence is currently paused.
- **Charging**
  - **Description**: Indicates whether the Glow is currently charging.

#### Buttons

- **Pause dimming**
  - **Description**: Pauses dimming, holding the current brightness level until resumed.

- **Resume dimming**
  - **Description**: Resumes dimming from where it left off.

#### Lights

- **Casper Glow**
  - **Description**: Controls the on/off state and brightness of the Glow light. Brightness is mapped to five levels.

#### Sensors

- **Battery**
  - **Description**: Reports the current battery level of the Glow as a percentage.

- **Dimming end time** (disabled by default)
  - **Description**: Shows the projected time when the current dimming sequence will end. This value is a timestamp that updates only when there is a significant change during a poll interval. Such as pausing or resuming dimming, or manually adjusting the physical light.

#### Selects

- **Dimming time**
  - **Description**: Configures how long the dimming sequence lasts before the light turns off. You can choose between 15, 30, 45, 60, or 90 minutes. The new dimming time takes effect the next time the light is turned on.

## Data updates

The **Casper Glow** {% term integration %} detects the device through passive Bluetooth advertisements. All state updates are retrieved by actively {% term polling %} the device every 30 seconds — for example, to detect changes made directly on the light or through the Casper app.

## Known limitations

- Brightness is limited to five discrete levels. The integration maps these to the Home Assistant 0-255 brightness scale, snapping to the nearest supported level.
- The integration communicates over Bluetooth, so the light must remain within range of the Home Assistant Bluetooth adapter.
- Only one Bluetooth connection to the Glow can be active at a time. If the Casper app is connected, Home Assistant may not be able to reach the device.

## Troubleshooting

### The device is not discovered

Make sure the Glow light is powered on and within Bluetooth range. If it still doesn't appear, try toggling the light off and on by flipping it over. Ensure no other Bluetooth device (like the Casper app) is actively connected to it.

### The light shows as unavailable

This typically means the Bluetooth connection was lost. Check that the light is powered on and within range. Moving the light closer to the Bluetooth adapter may help.

### Resetting the light

If the light remains unresponsive, a reboot or factory reset may help.

- To reboot, hold both buttons on the Glow until it briefly turns on. This takes about 30 seconds.
- To factory reset the Glow, press one of the buttons 6 times while holding the other button down.
  - This returns the device to default settings and removes it from any configured Glow light groups (configured outside Home Assistant in the Casper app).

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
