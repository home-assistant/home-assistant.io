---
layout: page
title: "Sonos say script to speak with text-to-speech"
description: "Sonos say script to use text-to-speech with Sonos"
date: 2017-01-18 00:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Automation Examples
---

#### Sonos say script to speak with text-to-speech

This script allows you to use [TTS](/components/#text-to-speech) on Sonos.

```yaml
script:
  sonos_say:
    alias: "Sonos TTS script"
    sequence:
     - service: media_player.sonos_snapshot
       data_template:
         entity_id: 
     - service: media_player.sonos_unjoin
       data_template:
         entity_id: 
     - service: media_player.volume_set
       data_template:
         entity_id: 
         volume_level: 
     - service: tts.voicerss_say
       data_template:
         entity_id: 
         message: 
     - delay: 
     - service: media_player.sonos_restore
       data_template:
         entity_id: 
```

We call this now with:
```yaml
automation:
  - alias: 'test'
    trigger:
      - platform: state
        entity_id: input_boolean.mytest
    action:
      - service: script.sonos_say
        data:
          sonos_entity: media_player.office
          volume: 0.5
          message: 'Your husband coming home!'
          delay: '00:00:05'
```
Note that this example uses the `voicerss` text-to-speech platform. There are many platforms that can be used. The one installed by default with Home Assistant is Google TTS. This appears in your `configuration.yaml` file as:

```
  tts:
    - platform: google
```

If you want to use this TTS engine, change the line in the example provided to:
```
- service: tts.google_say
```
