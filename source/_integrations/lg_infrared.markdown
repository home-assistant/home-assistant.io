---
title: LG Infrared
description: Integration to control LG TVs using an infrared transmitter.
ha_category:
  - Media player
ha_release: 2026.4
ha_iot_class: Assumed State
ha_codeowners:
  - '@abmantis'
ha_domain: lg_infrared
ha_config_flow: true
ha_platforms:
  - button
  - media_player
ha_integration_type: device
ha_quality_scale: silver
---

The **LG Infrared** {% term integration %} lets you control an LG TV using any infrared transmitter previously configured in Home Assistant.

Because the integration communicates over infrared, it operates in a one-way, fire-and-forget fashion: commands are sent to the TV but there is no feedback channel to confirm the current state of the TV. The integration therefore uses assumed states.

## Prerequisites

Before setting up the LG Infrared integration, you need a working infrared transmitter set up in Home Assistant that exposes an [Infrared](/integrations/infrared/) entity. For example, you can use an ESPHome device with an IR LED pointed at your LG TV.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Device type:
  description: The type of LG device to control. Currently, only **TV** is supported.
Infrared transmitter:
  description: The infrared transmitter entity to use for sending commands. This must be an entity provided by a hardware integration (such as ESPHome) that has already been set up with an IR transmitter.
{% endconfiguration_basic %}

## Supported devices

The integration supports LG TVs that can be controlled via the standard LG infrared protocol.

## Supported functionality

### Entities

The **LG Infrared** integration provides the following entities.

#### Buttons

Button entities are created for common TV remote control functions. Each button sends the corresponding infrared command when pressed.

- **Power on**, **Power off**
- **HDMI 1**, **HDMI 2**, **HDMI 3**, **HDMI 4**
- **Input**
- **Up**, **Down**, **Left**, **Right**, **OK**
- **Back**, **Exit**, **Home**, **Menu**
- **Info**, **Guide**
- **0** through **9**

#### Media player

- **LG TV**
  - **Description**: Represents the LG TV and allows you to control it via IR commands.
  - **Supported features**: Turn on, turn off, volume up, volume down, mute, channel up, channel down, play, pause, and stop.

## Known limitations

- The integration uses assumed state, meaning Home Assistant cannot read the actual state of the TV (for example, whether it is on or off, or what the current volume is).
- Turning on and turning off the TV both send the same IR power toggle command, as is standard with infrared remotes.
- Volume control is step-based only; there is no way to set an absolute volume level.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
