---
layout: page
title: "Sonos say script to speak with text-to-speech"
description: "Sonos say script to speak with text-to-speech."
date: 2017-01-18 00:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Automation Examples
---

#### {% linkable_title Sonos say script to speak with text-to-speech %}

This script allow you to use TTS on sonos in a easy way with all features.

```yaml
script:
  sonos_say:
    alias: "Sonos TTS script"
    sequence:
     - service: media_player.sonos_snapshot
       data_template:
         entity_id: "{{ sonos_entity }}"
     - service: media_player.sonos_unjoin
       data_template:
         entity_id: "{{ sonos_entity }}"
     - service: media_player.volume_set
       data_template:
         entity_id: "{{ sonos_entity }}"
         volume_level: "{{ volume }}"
     - service: tts.voicerss_say
       data_template:
         entity_id: "{{ sonos_entity }}"
         message: "{{ message }}"
     - delay: "{{ delay }}"
     - service: media_player.sonos_restore
       data_template:
         entity_id: "{{ sonos_entity }}"
```

We call this now with:
```yaml
service: script.sonos_say
data:
  sonos_entity: media_player.kitchen
  volume: 0.3
  message: 'Your husband comming home!'
  delay: '00:00:05'
```
