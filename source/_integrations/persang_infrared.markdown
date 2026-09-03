---
title: Persang Infrared
description: Integration to control Persang speakers using an infrared transmitter.
ha_category:
  - Button
  - Infrared
  - Media player
ha_release: '2026.10'
ha_iot_class: Assumed State
ha_codeowners:
  - '@Dr-Blank'
ha_domain: persang_infrared
ha_config_flow: true
ha_platforms:
  - button
  - media_player
ha_integration_type: device
ha_quality_scale: bronze
---

The **Persang Infrared** {% term integration %} lets you control a Persang Bluetooth speaker using any infrared transmitter previously configured in Home Assistant.

Because the integration communicates over infrared, it operates in a one-way, fire-and-forget fashion: commands are sent to the speaker but there is no feedback channel to confirm the current state. The integration therefore uses assumed states, and restores the last state it sent after a restart.

## Prerequisites

Before setting up the Persang Infrared integration, you need a working infrared transmitter set up in Home Assistant that exposes an [Infrared](/integrations/infrared/) entity. For example, you can use an ESPHome device with an IR LED pointed at your speaker.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Infrared transmitter:
  description: The infrared transmitter entity to use for sending commands. This must be an entity provided by a hardware integration (such as ESPHome) that has already been set up with an IR transmitter.
{% endconfiguration_basic %}

## Supported devices

The IR commands were captured from the remote shipped with a Persang Octane 9 speaker. Persang sells the same remote as a spare part for several of its speakers, so other Persang models are likely to respond to the same commands, but only the Octane 9 has been verified.

If your speaker does not respond, or if you want another Persang remote supported, please [open an issue on the infrared-protocols repository](https://github.com/home-assistant-libs/infrared-protocols/issues) with captured IR signals from your remote.

## Supported functionality

The **Persang Infrared** integration provides the following entities.

### Media player

- **Persang speaker**
  - **Description**: Represents the speaker and allows you to control it over IR.
  - **Supported features**: Turn on, turn off, volume up, volume down, mute, play, pause, next track, and previous track.

### Buttons

Button entities are provided for the remaining remote buttons, which the media player entity does not expose:

- **Mode**: Cycles through the speaker's playback modes.
- **Equalizer**: Cycles through the speaker's equalizer presets.
- **Scan**: Starts scanning the current source.
- **Repeat**: Cycles through the repeat modes.
- **Number 0** to **Number 9**: Send the corresponding numeric key, which the speaker uses to select a track.

## Known limitations

- The integration uses assumed state, meaning Home Assistant cannot read the actual state of the speaker (for example, whether it is on or off, or what the current volume is).
- Presses on the physical remote are not tracked. The integration only sends commands through an infrared transmitter, so using the remote directly leaves the entities showing whatever state Home Assistant last set.
- Turning on and turning off the speaker both send the same IR power toggle command, as is standard with infrared remotes. The same applies to play and pause, and to muting and unmuting. The command is always sent, so if the speaker and Home Assistant disagree, sending the opposite command brings them back in sync.
- Volume control is step-based only; there is no way to set an absolute volume level.
- Mute is not restored after a restart.
- Source selection is not exposed, because the remote has no dedicated source buttons.
- The mode, equalizer, and repeat buttons cycle through the available settings, so Home Assistant cannot select a specific one or tell which one is active.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
