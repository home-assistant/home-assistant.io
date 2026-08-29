---
title: Samsung Infrared
description: Integration to control Samsung TVs using an infrared transmitter.
ha_category:
  - Infrared
  - Media player
ha_release: 2026.6
ha_iot_class: Assumed State
ha_codeowners:
  - '@lmaertin'
ha_domain: samsung_infrared
ha_config_flow: true
ha_platforms:
  - button
  - media_player
ha_integration_type: device
ha_quality_scale: bronze
---

The **Samsung Infrared** {% term integration %} lets you control a Samsung TV using any infrared transmitter previously configured in Home Assistant.

Because the integration communicates over infrared, it operates in a one-way, fire-and-forget fashion: commands are sent to the TV but there is no feedback channel to confirm the current state of the TV. The integration therefore uses assumed states.

## Prerequisites

Before setting up the Samsung Infrared integration, you need a working infrared transmitter set up in Home Assistant that exposes an [Infrared](/integrations/infrared/) entity. For example, you can use an ESPHome device with an IR LED pointed at your Samsung TV.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Device type:
  description: The type of Samsung device to control. Currently, only **TV** is supported.
Infrared transmitter:
  description: The infrared transmitter entity to use for sending commands. This must be an entity provided by a hardware integration (such as ESPHome) that has already been set up with an IR transmitter.
{% endconfiguration_basic %}

## Supported devices

The integration supports Samsung TVs that can be controlled via the standard Samsung infrared protocol.

## Supported functionality

The **Samsung Infrared** integration provides the following entities.

### Buttons

- **Power**: Toggles the TV power state.
- **Source**: Cycles through input sources, including TV, HDMI 1 to HDMI 4, USB drives, DLNA devices, and other available sources.
- **Settings**: Opens the TV settings menu.
- **Info**: Displays program information.
- **Exit**: Exits the current menu or app.
- **Return**: Returns to the previous screen or menu.
- **Home**: Opens the TV home screen.
- **Red**, **Green**, **Yellow**, **Blue**: Color buttons for special functions (function depends on the current context).
- **Up**, **Down**, **Left**, **Right**: Navigation buttons for menu navigation.
- **OK**: Confirms selections in menus.
- **Previous channel**: Switches to the previously viewed channel.
- **Number 0-9**: Number keys for channel selection and text input.
- **Fast forward**: Fast forwards playback.
- **Rewind**: Rewinds playback.
- **Record**: Starts recording (if supported by the TV).
- **Tools**: Opens the tools menu.
- **Browser**: Opens the web browser.
- **AD/Subtitle**: Toggles audio description or subtitles.
- **E-Manual**: Opens the electronic manual.

### Media player

- **Samsung TV**: Represents the Samsung TV and allows you to control it via IR commands. Supported features include turn on, turn off, volume up, volume down, mute, channel up, channel down, play, pause, stop, and source selection (TV, HDMI 1, HDMI 2, HDMI 3, HDMI 4).

## Known limitations

- The integration uses assumed state, meaning Home Assistant cannot read the actual state of the TV (for example, whether it is on or off, or what the current volume is).
- Volume control is step-based only; there is no way to set an absolute volume level.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
