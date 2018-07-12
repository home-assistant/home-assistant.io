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
        media_content_id: http://fileserver/rain.mp3
        media_content_type: audio/mp4


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
        media_content_id: http://fileserver/babbling_brook.mp3
        media_content_type: audio/mp4

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
A little bit more complex example that uses [`input_select`](/components/input_select/) and template to decide what to play, and which [Chromecast](components/media_player.cast/) to play on.

```yaml
input_select:
  radio_station:
    name: Radio Station
    options:
      - Z88.3
      - Virgin
      - RMC
      - rmcHQ
      - 105
      - None
    initial: None
    icon: mdi:radio
  radio_player:
    name: Radio Player
    options:
      - Mansarda
      - Doccia
      - Bed
      - Bath
      - Salotto
      - Salotto Video
      - None
    initial: None
    icon: mdi:airplay

automation:
  - alias: Stop Streaming Radio
    trigger:
      - platform: state
        entity_id: input_select.radio_station
        to: "None"
    action:
      service: media_player.turn_off
      data_template:
        entity_id: >
            
              media_player.bed_2
            
              media_player.bed_3
            
              media_player.bed
            
              media_player.bath
            
              media_player.salotto
            
              media_player.salotto_video
            
              none
            

  - alias: Stream Radio - Template
    trigger:
      - platform: state
        entity_id: input_select.radio_station
    action:
      - service: media_player.play_media
        data_template:
          entity_id: >
            
              media_player.bed_2
            
              media_player.bed_3
            
              media_player.bed
            
              media_player.bath
            
              media_player.salotto
            
              media_player.salotto_video
            
              none
            
          media_content_id: >
            
              http://ice.zradio.org/z/high.mp3
            
              http://icecast.unitedradio.it/Virgin.mp3
            
              http://icecast.unitedradio.it/RMC.mp3
            
              http://icecast.unitedradio.it/rmcHQ.mp3
            
              http://icecast.unitedradio.it/Radio105.mp3
            
              none
            
          media_content_type: 'audio/mp4'
```
