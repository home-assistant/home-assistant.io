---
title: Axion Lighting
description: Integration for controlling Axion Lighting systems using DMX protocol.
ha_category:
  - Lighting
ha_release: '2024.08'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@Vrncanac'
ha_domain: axion_dmx
ha_integration_type: integration
---

The Axion Lighting integration allows you to control [Axion Lights](https://axionlighting.com/) systems via DMX protocol within Home Assistant. This integration supports various light modes including White, Tunable White, RGB, RGBW, and RGBWW with accurate brightness scaling and channel numbering starting from 1.

## Prerequisites

To use this integration, you will need an Axion Lighting system that supports DMX control. Ensure that your DMX controller is properly connected to your Home Assistant instance.

{% include integrations/config_flow.md %}

### Configuration Options

When setting up the Axion Lighting integration, you can configure the following options:

| Parameter               | Description                                           |
| ----------------------- | ----------------------------------------------------- |
| `ip_address`            | The IP address of the DMX controller. |
| `password`              | The password required to access the DMX controller. |
| `dmx_channel`           | The starting DMX channel for the light entity. The channels are numbered starting from 1. |
| `light_type`            | The type of light entity to control (e.g., White, Tunable White, RGB, RGBW, RGBWW). |

## Light Entities

This integration supports the following light entities:

- **White**: Controls the brightness of a single white channel.
- **Tunable White**: Controls the temperature of white light by adjusting the balance between warm and cool white channels.
- **RGB**: Controls Red, Green, and Blue channels with brightness scaling.
- **RGBW**: Controls Red, Green, Blue, and White channels with brightness scaling.
- **RGBWW**: Controls Red, Green, Blue, Warm White, and Cold White channels with brightness scaling.

### Usage

Once configured, your Axion Lighting devices will appear in Home Assistant, and you can control the lights using the UI. The integration supports standard Home Assistant light services, such as turning lights on/off, adjusting brightness, and changing colors (for RGB, RGBW, and RGBWW modes).

### Services

#### axion_dmx.set_level

Set the brightness of the light entity.

| Parameter               | Description                                           |
| ----------------------- | ----------------------------------------------------- |
| `channel`               | The entity ID of the light (the DMX channel number starting from 1) to be controlled.          |
| `brightness`            | The brightness level (0-255) to apply.                |

#### axion_dmx.set_color

Set the color of the light entity using DMX channels - 3 channels will be occupied.

| Parameter               | Description                                           |
| ----------------------- | ----------------------------------------------------- |
| `channel`               | The entity ID of the light (the DMX channel number starting from 1) to be controlled.          |
| `rgb_color`             | The color to set, specified as an RGB value.          |

#### axion_dmx.set_rgbw

Set the RGBW color of the light entity using DMX channels - 4 channels will be occupied.

| Parameter               | Description                                           |
| ----------------------- | ----------------------------------------------------- |
| `channel`               | The entity ID of the light (the DMX channel number starting from 1) to be controlled.          |
| `rgbw_color`            | The color to set, specified as an RGBW value.          |

#### axion_dmx.set_rgbww

Set the RGBW color of the light entity using DMX channels - 5 channels will be occupied.

| Parameter               | Description                                           |
| ----------------------- | ----------------------------------------------------- |
| `channel`               | The entity ID of the light (the DMX channel number starting from 1) to be controlled.          |
| `rgbww_color`           | The color to set, specified as an RGBWW value.          |
