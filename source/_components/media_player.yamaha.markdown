---
layout: page
title: "Yamaha Network Receivers"
description: "Instructions how to integrate Yamaha Network Receivers into Home Assistant."
date: 2016-03-26 0:58 -0700
sidebar: true
comments: false
sharing: true
footer: true
logo: yamaha.png
ha_category: Media Player
ha_release: 0.16
---

The `yamaha` platform allows you to control [Yamaha Network Receivers](http://usa.yamaha.com/products/audio-visual/av-receivers-amps/rx) from Home Assistant.

Supported devices:

- HTR-4065
- RX-V473
- RX-V573
- RX-V673
- RX-V773
- And more

To add a Yamaha Network Receiver to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: yamaha
```
Configuration variables:

- **name** (*Optional*): Name of the device. This overrides the
  default name (often model number) that is returned by the device.
- **host** (*Optional*): IP address or hostname of the device
- **source_ignore** (*Optional*): List of sources to hide in the front-end
- **source_names** (*Optional*): Mapping of internal AVR source names to custom ones, allowing to rename e.g. `HDMI1` to `ChromeCast`

### {% linkable_title Discovery notes %}

- If the `discovery` component is enabled, all units on the network
  will be discovered using UPNP.
- For receivers that support more than one zone, Home Assistant will
  add one media player per zone supported by the player, named "$name
  Zone 2" and "$name Zone 3".
- If you specify `host` manually, you **must** enable network standby
  on your receiver, or else startup of Home Assistant will hang if you
  have your receiver switched off.
- In some cases, auto-discovery fails due to a known bug in the
  receiver's firmware. It is possible to manually specify the
  receiver's IP address or via it's hostname (if it is discoverable by
  your DNS) then.

### {% linkable_title Supported operations %}

- Media players created by yamaha support powering on/off, mute,
  volume control and source selection. Playback controls, for instance
  play and stop are available for sources that supports it.
- The `play_media` service is implemented for `NET RADIO` source
  only. The `media_id` is a `>` separted string of the menu path on
  the vtuner service. For instance `Bookmarks>Internet>WAMC 90.3 FM`.

### {% linkable_title Example configuration %}

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
```

### {% linkable_title Example `play_media` script %}

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
      - service: media_player.turn_on
        data:
          entity_id: media_player.living_room_stereo_zone_2
      - service: media_player.volume_set
        data:
          entity_id: media_player.living_room_stereo_zone_2
          volume_level: 0.48
      - service: media_player.play_media
        data:
          entity_id: media_player.living_room_stereo_zone_2
          media_content_type: "NET RADIO"
          media_content_id: "Bookmarks>Internet>Radio Paradise"

```

### {% linkable_title Service `yamaha_enable_output` %}

Enable or disable an output port (HDMI) on the receiver.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`s of Yamaha receivers.
| `port` | no | Port to enable or disable, e.g. `hdmi1`.
| `enabled` | no | To enable set true, otherwise set to false.
