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
ha_quality_scale: silver
---

The **Lyngdorf** {% term integration %} allows you to control [Lyngdorf] and [Steinway & Lyngdorf] audio processors and amplifiers from Home Assistant. Lyngdorf Audio is known for its RoomPerfect room correction technology. This integration lets you control power, volume, source selection, sound modes, and audio processing parameters.

[Lyngdorf]: https://lyngdorf.steinwaylyngdorf.com/electronics/
[Steinway & Lyngdorf]: https://steinwaylyngdorf.com/

## Supported devices

### Lyngdorf

- [MP-40](https://lyngdorf.steinwaylyngdorf.com/lyngdorf-mp-40/)
- MP-50
- [MP-60](https://lyngdorf.steinwaylyngdorf.com/lyngdorf-mp-60/)
- [TDAI-1120](https://lyngdorf.steinwaylyngdorf.com/lyngdorf-tdai-1120/)
- TDAI-2170
- [TDAI-3400](https://lyngdorf.steinwaylyngdorf.com/lyngdorf-tdai-3400/)

### Steinway & Lyngdorf

- P100
- P200
- P300

{% note %}
The MP-60 is the only model that has been tested in the wild so far. Other models should work but may not support all features. If you have a different model, please report any issues on [GitHub](https://github.com/home-assistant/core/issues).
{% endnote %}

## Prerequisites

- Your Lyngdorf device must be connected to the same network as Home Assistant.

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

Switch voicing and RoomPerfect position when playback starts on the main zone:

```yaml
automation:
  - alias: "Cinema mode"
    triggers:
      - trigger: state
        entity_id: media_player.lyngdorf_main_zone
        to: "playing"
    actions:
      - action: select.select_option
        target:
          entity_id: select.lyngdorf_voicing
        data:
          option: "Movie"
      - action: select.select_option
        target:
          entity_id: select.lyngdorf_roomperfect_position
        data:
          option: "Focus 1"
```

Correct lip sync for a source that needs it:

```yaml
automation:
  - alias: "Fix lip sync on the streaming box"
    triggers:
      - trigger: state
        entity_id: media_player.lyngdorf_main_zone
        attribute: source
        to: "HDMI 2"
    actions:
      - action: number.set_value
        target:
          entity_id: number.lyngdorf_lip_sync
        data:
          value: 80
```

Open the setup menu and step down to the second entry:

```yaml
script:
  lyngdorf_open_setup:
    sequence:
      - action: remote.send_command
        target:
          entity_id: remote.lyngdorf
        data:
          command:
            - menu
            - down
            - down
            - enter
```

## Data updates

The **Lyngdorf** integration uses local push to receive real-time updates from the device over a TCP connection. State changes on the device are pushed to Home Assistant immediately.

## Known limitations

- Only the MP-60 has been tested. Other models may not support all features.
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

1. Make sure your Lyngdorf device is powered on and connected to the same network as Home Assistant.
2. Check that UPnP/SSDP is not blocked on your network.
3. Add the device manually using its IP address.

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
