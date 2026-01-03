---
title: Yamaha Network Receivers
description: Instructions on how to integrate Yamaha Network Receivers into Home Assistant.
ha_category:
  - Media player
ha_release: 0.16
ha_iot_class: Local Polling
ha_domain: yamaha
ha_platforms:
  - media_player
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `yamaha` {% term integration %} allows you to control [Yamaha Network Receivers](https://usa.yamaha.com/products/audio-visual/av-receivers-amps/rx) from Home Assistant.

Supported devices:

- [HTR-4065](https://www.yamaha.com/cchtr4065/)
- [RX-V473](https://ca.yamaha.com/en/products/audio_visual/av_receivers_amps/rx-v473/specs.html)
- [RX-V573](https://ca.yamaha.com/en/products/audio_visual/av_receivers_amps/rx-v573/specs.html)
- [RX-V585](https://ca.yamaha.com/en/products/audio_visual/av_receivers_amps/rx-v585_u/specs.html)
- [RX-V673](https://ca.yamaha.com/en/products/audio_visual/av_receivers_amps/rx-v673/specs.html)
- [RX-V685](https://ca.yamaha.com/en/products/audio_visual/av_receivers_amps/rx-v685_u/specs.html)
- [RX-V773](https://ca.yamaha.com/en/products/audio_visual/av_receivers_amps/rx-v773/specs.html)
- [RX-V3067](https://ca.yamaha.com/en/products/audio_visual/av_receivers_amps/rx-v3067/specs.html)
- And more

To add a Yamaha Network Receiver to your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
media_player:
  - platform: yamaha
```
You **must** enable network standby on your receiver, or else startup of Home Assistant will hang if you
have your receiver switched off.
{% configuration %}
name:
  description: Name of the device. This overrides the default name (often model number) that is returned by the device.
  required: false
  type: string
host:
  description: IP address or hostname of the device.
  required: false
  type: string
source_ignore:
  description: List of sources to hide in the front-end.
  required: false
  type: list
source_names:
  description: Mapping of internal AVR source names to custom ones, allowing one to rename e.g., `HDMI1` to `ChromeCast`.
  required: false
  type: list
zone_ignore:
  description: List of zones to hide in the front-end.
  required: false
  type: list
zone_names:
  description: Mapping of zone names to custom ones, allowing one to rename e.g., `Main_Zone` to `Family Room`.
  required: false
  type: list
{% endconfiguration %}

### Supported operations

- Media players created by Yamaha support powering on/off, mute,
  volume control and source selection. Playback controls, for instance
  play and stop are available for sources that supports it.
- The `play_media` action is implemented for `NET RADIO` source
  only. The `media_id` is a `>` separated string of the menu path on
  the vtuner service. For instance `Bookmarks>Internet>WAMC 90.3 FM`.
  MusicCast devices use the path `Radio>Favorites>WAMC 90.3 FM`.

### Example configuration

A full configuration example will look like the sample below:
```yaml
# Example configuration.yaml entry
media_player:
  - platform: yamaha
    host: 192.168.0.10
    source_ignore:
      - "AUX"
      - "HDMI6"
    source_names:
      HDMI1: "ChromeCast"
      AV4: "Vinyl"
    zone_ignore:
      - "Zone_2"
    zone_names:
      Main_Zone: "Family Room"
```

### Example `play_media` script

The `play_media` function can be used in scripts easily to build media
player presets. When done in scripts, the sequence will also allow you
to set volume per source.

```yaml
# Example play_media script
#
# This is for an environment where Zone 2 of the receiver named
# `Living Room Stereo` drives outdoor speakers on the porch.
script:
 rp_porch:
    alias: "Radio Paradise Porch"
    sequence:
      - action: media_player.turn_on
        target:
          entity_id: media_player.living_room_stereo_zone_2
      - action: media_player.volume_set
        target:
          entity_id: media_player.living_room_stereo_zone_2
        data:
          volume_level: 0.48
      - action: media_player.play_media
        target:
          entity_id: media_player.living_room_stereo_zone_2
        data:
          media_content_type: "NET RADIO"
          media_content_id: "Bookmarks>Internet>Radio Paradise"

```

### Action `enable_output`

Enable or disable an output port (HDMI) on the receiver.

| Data attribute | Optional | Description                                                               |
| ---------------------- | -------- | ------------------------------------------------------------------------- |
| `entity_id`            | yes      | String or list of strings that point at `entity_id`s of Yamaha receivers. |
| `port`                 | no       | Port to enable or disable, e.g., `hdmi1`.                                 |
| `enabled`              | no       | To enable set true, otherwise set to false.                               |

### Action `menu_cursor`

Control the menu cursor.

| Data attribute | Optional | Description                                                                        |
| ---------------------- | -------- | ---------------------------------------------------------------------------------- |
| `entity_id`            | yes      | String or list of strings that point at `entity_id`s of Yamaha receivers.          |
| `cursor`               | no       | Name of the cursor key to press: `up`, `down`, `left`, `right`, `select`, `return` |

### Action `select_scene`

Select a scene on the receiver.

| Data attribute | Optional | Description                                                                                              |
| ---------------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| `entity_id`            | yes      | String or list of strings that point at `entity_id`s of Yamaha receivers.                                |
| `scene`                | no       | Scene to select, e.g., `BD/DVD Movie Viewing`, `TV Viewing`, `NET Audio Listening` or `Radio Listening`. |
