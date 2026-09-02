---
title: Lyngdorf
description: Instructions on how to integrate Lyngdorf audio processors into Home Assistant.
ha_category:
  - Media player
  - Number
  - Remote
  - Select
  - Sensor
ha_release: 2026.8
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@fishloa'
ha_domain: lyngdorf
ha_ssdp: true
ha_platforms:
  - diagnostics
  - media_player
  - number
  - remote
  - select
  - sensor
ha_integration_type: device
ha_quality_scale: platinum
---

The **Lyngdorf** {% term integration %} allows you to control [Lyngdorf] and [Steinway & Lyngdorf] audio processors and amplifiers from Home Assistant. Lyngdorf Audio is known for its RoomPerfect room correction technology. This integration lets you control power, volume, source selection, sound modes, and audio processing parameters.

[Lyngdorf]: https://lyngdorf.steinwaylyngdorf.com/electronics/
[Steinway & Lyngdorf]: https://steinwaylyngdorf.com/

## Supported devices

Every model gets a main zone media player and the RoomPerfect position and voicing selects. The rest depends on what the model has:

| Model | Zone B | Now playing and transport | Remote | Lip sync | Bass and treble trims | Channel trims | Input sensors |
| ----- | ------ | ------------------------- | ------ | -------- | --------------------- | ------------- | ------------- |
| [MP-40](https://lyngdorf.steinwaylyngdorf.com/lyngdorf-mp-40/) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| [MP-50](https://lyngdorf.steinwaylyngdorf.com/lyngdorf-mp-50/) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| [MP-60](https://lyngdorf.steinwaylyngdorf.com/lyngdorf-mp-60/) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| [TDAI-1120](https://lyngdorf.steinwaylyngdorf.com/lyngdorf-tdai-1120/) | ❌ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| [TDAI-2170](https://lyngdorf.steinwaylyngdorf.com/lyngdorf-tdai-2170/) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| [TDAI-2210](https://lyngdorf.steinwaylyngdorf.com/lyngdorf-tdai-2210/) | ❌ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| [TDAI-3400](https://lyngdorf.steinwaylyngdorf.com/lyngdorf-tdai-3400/) | ❌ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| [P100](https://steinwaylyngdorf.com/steinway-sons-p100/) | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ | ✅ |
| [P200](https://steinwaylyngdorf.com/steinway-sons-p200/) | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ | ✅ |
| [P300](https://steinwaylyngdorf.com/steinway-sons-p300/) | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ | ✅ |

The P100, P200, and P300 are made by Lyngdorf and marketed as [Steinway & Lyngdorf].

{% note %}
Only the MP-60, TDAI-1120, TDAI-3400, and P200 have been tested against real hardware. The other models listed here are implemented from the protocol documentation and have not been verified by an owner, so if you have one, please report anything that does not work on [GitHub](https://github.com/home-assistant/core/issues).
{% endnote %}

## Prerequisites

- Home Assistant must be able to reach the device on TCP port 84, which carries the control protocol.
- The device is identified by the serial number in its UPnP description. Home Assistant locates the description with an SSDP request on UDP port 1900, then fetches it over HTTP from the port the device advertises. The device assigns that port itself and it is not fixed, so a firewall rule cannot rely on a particular number. This applies when adding a device by IP address as well as when one is discovered.
- Automatic discovery additionally needs the device on the same subnet as Home Assistant, because it relies on multicast SSDP. A device on another subnet can still be added by IP address.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname or IP address of your Lyngdorf device."
{% endconfiguration_basic %}

## Supported functionality

### Media players

The integration creates the following media player {% term entities %}:

- **Main zone**: Controls your Lyngdorf device, including power, volume, mute, source selection, and sound mode.
- **Zone B**: Controls the Zone B output, including power, volume, mute, and source selection. Only created for models with a Zone B output (the TDAI-series does not have one).

On models with a streaming module, the main zone also shows what is playing: track title, artist, album, artwork, and playback position. Transport controls (play, pause, next, previous, seek, shuffle, and repeat) appear when the streaming source offers them, which varies by source. Spotify Connect offers seek and shuffle, for example, while AirPlay does not.

### Numbers

Numbers adjust the audio calibration, and are only created for the controls a model has:

- **Lip sync**: The audio delay, in milliseconds. The device reports its own permitted range.
- **Trim bass** and **Trim treble**: Tone trims, in decibels.
- **Trim centre**, **Trim height**, **Trim LFE**, and **Trim surround**: Channel trims, in decibels. Only created on surround models.

### Remote

A remote entity drives the processor's own on-screen menus, for the models that
have remote keys. The TDAI series does not, so no remote entity is created there.

Send keys with the `remote.send_command` action. The available keys are `up`,
`down`, `left`, `right`, `enter`, `back`, `exit`, `menu`, `info`, `settings`,
`multiview`, and the digits `0` to `9`. Not every model has every key, and
sending one the device does not have reports the keys it does support rather than
sending anything.

`num_repeats` repeats the whole sequence rather than each key, so `["1", "2"]`
with two repeats sends `1 2 1 2`. `delay_secs` is not used, because the
integration already paces its own commands to the device.

### Selects

- **RoomPerfect position**: The RoomPerfect focus position, including the global position.
- **Voicing**: The RoomPerfect voicing.

### Sensors

Diagnostic sensors report what the device is receiving and playing:

- **Audio input** and **Video input**: The active inputs.
- **Audio information** and **Video information**: The incoming signal formats.
- **Streaming source**: The active streaming service.
- **Zone B audio input** and **Zone B streaming source**: The same for Zone B, where present.

## Use cases

- Switch to a movie voicing and a surround sound mode when a film starts, and back to a music voicing afterwards.
- Select the RoomPerfect focus position for wherever people are actually sitting, rather than the global position.
- Raise the lip sync delay for a source whose picture and sound drift apart, and reset it when you switch away.
- Use the audio information sensor to detect a surround format and dim the lights only for those.

## Examples

### Use a different voicing while watching

A voicing chosen for music is rarely the one you want for a film. This blueprint switches the RoomPerfect voicing while a chosen source is selected and the processor is actually receiving video and audio, and switches back as soon as it is not.

{% my blueprint_import badge blueprint_url="https://www.home-assistant.io/blueprints/integrations/lyngdorf_cinema_mode.yaml" %}

### Correct lip sync for one source

A single source whose picture and sound drift apart needs a delay the other sources do not. This blueprint applies a lip sync delay while that source is selected, and returns to your normal delay when you switch away.

{% my blueprint_import badge blueprint_url="https://www.home-assistant.io/blueprints/integrations/lyngdorf_lip_sync_per_source.yaml" %}

### Run a scene when surround audio starts

The audio information sensor reports the incoming format, so it knows a surround soundtrack has started even when the source has not changed. This blueprint runs any action you choose when a surround format appears, and another when it goes back to stereo.

{% my blueprint_import badge blueprint_url="https://www.home-assistant.io/blueprints/integrations/lyngdorf_surround_scene.yaml" %}

## Data updates

The **Lyngdorf** integration uses local push to receive real-time updates from the device over a TCP connection. State changes on the device are pushed to Home Assistant immediately.

## Known limitations

- Only the MP-60, TDAI-1120, TDAI-3400, and P200 have been tested against real hardware. The other models are implemented from the protocol documentation and may not support all features.
- Only local network control is supported.
- Pausing a source that is controlled by another app, such as AirPlay, ends the session rather than pausing it. The device cannot resume it; only the controlling app can start it again. This is how those protocols work, and is not specific to Home Assistant.
- Now playing information, playback position, and transport controls require a model with a streaming module. The TDAI-2170 and the P-series do not have one.
- The trims and lip sync apply to the main zone only.
- The remote keys drive the device's own menus only. There is no way to read what is on screen, so an automation cannot know where in a menu it is.

## Troubleshooting

### Device not discovered

#### Symptom: Device is not automatically discovered

The Lyngdorf device does not show up as a discovered device in Home Assistant.

#### Resolution

To resolve this issue, try the following steps:

1. Make sure your Lyngdorf device is powered on and connected to the same subnet as Home Assistant. Automatic discovery uses multicast SSDP, which does not cross subnets.
2. Check that UPnP/SSDP is not blocked on your network.
3. Add the device manually using its IP address. This works across subnets, but still needs UPnP to be reachable, because the device is identified from its UPnP description.

### Connection issues

#### Symptom: Device shows as unavailable

The integration shows as unavailable or disconnects frequently.

#### Resolution

To resolve this issue, try the following steps:

1. Ensure your Lyngdorf device has a static IP address or DHCP reservation.
2. Check your network for stability issues.
3. Verify that no firewall rules are blocking TCP communication between Home Assistant and your device.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
