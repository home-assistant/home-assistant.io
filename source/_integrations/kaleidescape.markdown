---
title: Kaleidescape
description: Instructions on how to integrate Kaleidescape into Home Assistant.
ha_category:
  - Media player
  - Remote
  - Sensor
ha_release: '2022.4'
ha_iot_class: Local Push
ha_config_flow: true
ha_ssdp: true
ha_codeowners:
  - '@SteveEasley'
ha_domain: kaleidescape
ha_platforms:
  - media_player
  - remote
  - sensor
ha_integration_type: integration
---

The Kaleidescape integration allows for the automation of [Kaleidescape](https://www.kaleidescape.com/) movie players.

Ideas for automation include:

- Playing and pausing a movie sets lighting scenes.
- The start of movie credits turns up the lights.
- A change in aspect ratio controls a projection masking system.
- A change in video resolution controls a lens system or video scaler.

## Supported Models

This integration is intended for the automation of Kaleidescape players with a movie zone. This includes all Strato and Premier players. Strato players support auto-discovery in Home Assistant. Premier players must be added manually by adding an instance of this integration and specifying the IP address of the player.

{% include integrations/config_flow.md %}

## Media player

The Kaleidescape media player platform will create a [media player](/integrations/media_player/) entity for the device. This entity will display the currently playing media and playback controls.

## Remote

The Kaleidescape remote platform will create a [Remote](/integrations/remote/) entity for the device. This entity allows you to send the following commands via the [remote.send_command](/integrations/remote/) action.

- `select`
- `up`
- `down`
- `left`
- `right`
- `cancel`
- `replay`
- `scan_forward`
- `scan_reverse`
- `go_movie_covers`
- `menu_toggle`

A typical action might look like the example below, which sends a command to the device to _select_ the currently highlighted item.

```yaml
action: remote.send_command
target:
  entity_id: remote.kaleidescape_theater
data:
  command:
    - select
```

## Sensor

The Kaleidescape sensor platform will create multiple [Sensor](/integrations/sensor/) entities for the device. The follow sensors are provided:

### Media Location

The location in the current movie.

- none
- content
- intermission
- credits
- disc_menu

### Play Status

The play status of the current movie.

- none
- paused
- playing
- forward
- reverse

### Play Speed

The playback speed of the current movie. An integer between 1 (normal) and 3 (fast).

### Video Mode

The video mode of the current movie.

- none
- 480i60_4:3
- 480i60_16:9
- 480p60_4:3
- 480p60_16:9
- 576i50_4:3
- 576i50_16:9
- 576p50_4:3
- 576p50_16:9
- 720p60_ntsc_hd
- 720p50_pal_hd
- 1080i60_16:9
- 1080i50_16:9
- 1080p60_16:9
- 1080p50_16:9
- 1080p24_16:9
- 480i60_64:27
- 576i50_64:27
- 1080i60_64:27
- 1080i50_64:27
- 1080p60_64:27
- 1080p50_64:27
- 1080p23976_64:27
- 1080p24_64:27
- 3840x2160p23976_16:9
- 3840x2160p23976_64:27
- 3840x2160p30_16:9
- 3840x2160p30_64:27
- 3840x2160p60_16:9
- 3840x2160p60_64:27
- 3840x2160p25_16:9
- 3840x2160p25_64:27
- 3840x2160p50_16:9
- 3840x2160p50_64:27
- 3840x2160p24_16:9
- 3840x2160p24_64:27

### Video Color EOTF

The Electro-Optical Transfer Function standard of the current movie.

- unknown
- sdr
- hdr
- smtpest2084

### Video Color Space

The color space standard of the current movie.

- default
- rgb
- bt601
- bt709
- bt2020

### Video Color Depth

The color depth standard of the current movie.

- unknown
- 24bit
- 30bit
- 36bit

### Video Color Sampling

The chroma color sampling standard of the current movie.

- none
- rgb
- ycbcr422
- ycbcr444
- ycbcr420

### Screen Mask Ratio

The actual aspect ratio of the current movie.

- none
- 1.33
- 1.66
- 1.78
- 1.85
- 2.35

### Screen Mask Top Trim Rel

The top trim value, relative to the current Screen Mask Ratio. A percentage between -100% and +100%.

### Screen Mask Bottom Trim Rel

The bottom trim value, relative to the current Screen Mask Ratio. A percentage between -100% and +100%.

### Screen Mask Conservative Ratio

Has the same possible values as the Screen Mask Ratio, but represents a more conservative estimate of the image aspect ratio.

### Screen Mask Top Mask Abs

The position for the top mask in absolute terms, measured from the top of the screen. A percentage between -100% and +100%.

### Screen Mask Bottom Mask Abs

The position for the bottom mask in absolute terms, measured from the bottom of the screen. A percentage between -100% and +100%.

### Cinemascape Mask

The Cinemascape frame aspect ratio of the current movie.

- 0
- 133
- 166
- 178
- 237
- 240

### Cinemascape Mode

The Cinemascape mode of the current movie.

- none
- anamorphic
- letterbox
- native

Additional details about the values provided by the sensors can be found in Kaleidescape's [Control Protocol Reference Manual](https://www.kaleidescape.com/wp-content/uploads/Kaleidescape-System-Control-Protocol-Reference-Manual.pdf).

A typical automation might look like the example below, which turns up the lights when the _media_location_ sensor leaves the _content_ state.

```yaml
- alias: "Kaleidescape theater lights up"
  triggers:
    - trigger: state
      entity_id: sensor.kaleidescape_theater_media_location
      from: content
  actions:
    - action: scene.turn_on
      target:
        entity_id: scene.theater_lights
```
