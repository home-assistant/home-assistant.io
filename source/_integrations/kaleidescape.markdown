---
title: Kaleidescape
description: Instructions on how to integrate Kaleidescape into Home Assistant.
ha_category:
  - Media Player
  - Sensor
  - Remote
ha_release: '2022.4'
ha_iot_class: Local Push
ha_config_flow: true
ha_ssdp: true
ha_codeowners:
  - '@SteveEasley'
ha_domain: kaleidescape
ha_platforms:
  - media_player
  - sensor
---

The Kaleidescape integration allows for the automation of Kaleidescape movie players.

Ideas for automation include:

- Playing and pausing a movie sets lighting scenes.
- The start of movie credits turns up the lights.
- A change in aspect ratio controls a projection masking system.
- A change in video resolution controls a lens system or video scaler.

## Supported Models

This integration is intended for the automation of Kaleidescape players with a movie zone. This includes all Strato and Premier players. Strato players support auto-discovery in Home Assistant. Premier players must be added manually by adding an instance of this integration and specifying the IP address of the player.

{% include integrations/config_flow.md %}

## Media Player

The Kaleidescape media player platform will create a Media Player entity the player. This entity will display the currently playing media and playback controls.

## Sensor

The Kaleidescape sensor platform will create multiple Sensor entities for the player. The follow sensors are provided:

- media_location
- play_status
- play_speed
- video_mode
- video_color_eotf
- video_color_space
- video_color_depth
- video_color_sampling
- screen_mask_ratio
- screen_mask_top_trim_rel
- screen_mask_bottom_trim_rel
- screen_mask_conservative_ratio
- screen_mask_top_mask_abs
- screen_mask_bottom_mask_abs
- screen_mask_bottom_mask_abs
- cinemascape_mask
- cinemascape_mode

Details about the values provided by the sensors can be found in Kaleidescape's [Control Protocol Reference Manual](https://www.kaleidescape.com/wp-content/uploads/Kaleidescape-System-Control-Protocol-Reference-Manual.pdf).


A typical automation might look like the example below. This turns up the lights when the `media_location` sensor leaves the `content` state.

```yaml
- alias: kaleidescape_theater_lights_up
  trigger:
    - platform: state
      entity_id: sensor.kaleidescape_theater_media_location
      from: content
  action:
    - service: scene.turn_on
      target:
        entity_id: scene.theater_lights
```
