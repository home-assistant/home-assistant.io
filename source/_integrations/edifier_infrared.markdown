---
title: Edifier Infrared
description: Integration to control Edifier speakers using an infrared transmitter.
ha_category:
  - Button
  - Media player
ha_release: 2026.7
ha_iot_class: Assumed State
ha_codeowners:
  - '@abmantis'
ha_domain: edifier_infrared
ha_config_flow: true
ha_platforms:
  - button
  - media_player
ha_integration_type: device
ha_quality_scale: bronze
---

The **Edifier Infrared** {% term integration %} lets you control an Edifier speaker using any infrared transmitter previously configured in Home Assistant.

Because the integration communicates over infrared, it operates in a one-way, fire-and-forget fashion: commands are sent to the speaker but there is no feedback channel to confirm the current state. The integration therefore uses assumed states.

## Prerequisites

Before setting up the Edifier Infrared integration, you need a working infrared transmitter set up in Home Assistant that exposes an [Infrared](/integrations/infrared/) entity. For example, you can use an ESPHome device with an IR LED pointed at your Edifier speaker.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Speaker model or remote profile:
  description: The Edifier speaker model or remote profile to control. Pick the option that best matches your hardware so the integration uses the right IR command set. Some options correspond to shared remote profiles rather than exact speaker model names.
IR transmitter:
  description: The infrared transmitter entity to use for sending commands. This must be an entity provided by a hardware integration (such as ESPHome) that has already been set up with an IR transmitter.
{% endconfiguration_basic %}

## Supported devices

The integration supports the following Edifier speaker models and remote profiles:

- R1280DB
- R1280T
- R1700BT
- R1700BTs
- R1855DB
- R2000DB
- R2730DB
- RC10D1
- RC17A
- RC20G
- RC31A
- RC80B
- S360DB

Several of these models share the same IR command set, so other Edifier speakers that ship with the same remote may also work — try the closest model in the list. If your model is not listed and you want it supported, please [open an issue on the infrared-protocols repository](https://github.com/home-assistant-libs/infrared-protocols/issues) with captured IR signals from your remote.

## Supported functionality

The **Edifier Infrared** integration provides the following entities.

### Media player

- **Edifier speaker**
  - **Description**: Represents the Edifier speaker and allows you to control it via IR commands.
  - **Supported features**: Turn on, turn off, volume up, volume down, mute, play, pause, next track, and previous track. The exact set of supported features depends on the selected model, because not every Edifier remote exposes the same buttons.

### Buttons

Some models also provide buttons for functionality that is not exposed by the media player entity, such as selecting a specific input or toggling sound effects. The available buttons depend on the selected model, because not every Edifier remote exposes the same buttons. Possible buttons include:

- **Bluetooth**: Switches the speaker to its Bluetooth input.
- **Line 1** and **Line 2**: Switch the speaker to the corresponding line input.
- **AUX**: Switches the speaker to its auxiliary input.
- **PC**: Switches the speaker to its PC input.
- **Optical**: Switches the speaker to its optical input.
- **Coaxial**: Switches the speaker to its coaxial input.
- **FX on** and **FX off**: Turn the speaker's sound effects on or off.


## Known limitations

- The integration uses assumed state, meaning Home Assistant cannot read the actual state of the speaker (for example, whether it is on or off, or what the current volume is).
- Turning on and turning off the speaker both send the same IR power toggle command, as is standard with infrared remotes. The same applies to play and pause.
- Volume control is step-based only; there is no way to set an absolute volume level.
- Source selection is not exposed by the media player entity. For models that support it, dedicated buttons are provided to switch between inputs instead.
- The **R1280T** model only supports volume up, volume down, and mute, because its remote does not include power or playback buttons.
- The **S360DB** model does not support mute, because its remote does not include a mute button.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
