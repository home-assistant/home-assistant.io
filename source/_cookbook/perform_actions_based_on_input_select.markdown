---
layout: page
title: "Perform actions based on input select"
description: "Example playing media to chromecast based on input select element"
date: 2016-03-07 12:05
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Automation Examples
---

This example uses an [`input_select`](/components/input_select/) element to pick which mp3 file to play on a [Chromecast](components/media_player.cast/).

```yaml
# Define our dropdown list
input_select:
  lullaby:
    name: Lullaby
    options:
      - Rain
      - Babbling Brook
      - None
    initial: None
    icon: mdi:weather-rainy

# Define our media player
media_player:
    - platform: cast
      host: chromecast-nursery
      name: Nursery

automation:
  # If you select "Rain", play the "rain.mp3" file
  - alias: Play Rain Lullaby

    trigger:
      platform: state
      entity_id: input_select.lullaby
      to: "Rain"

    action:
      service: media_player.play_media
      data:
        entity_id: media_player.nursery
        media_id: http://fileserver/rain.mp3
        media_type: audio/mp4


  # If you select "Babbling Brook", play the "babbling_brook.mp3" file
  - alias: Play Babbling Brook Lullaby

    trigger:
      platform: state
      entity_id: input_select.lullaby
      to: "Babbling Brook"

    action:
      service: media_player.play_media
      data:
        entity_id: media_player.nursery
        media_id: http://fileserver/babbling_brook.mp3
        media_type: audio/mp4

  # If you select "None, turn the Chromecast off
  - alias: Stop the Lullaby

    trigger:
      platform: state
      entity_id: input_select.lullaby
      to: "None"

    action:
      service: media_player.turn_off
      data:
        entity_id: media_player.nursery
```
