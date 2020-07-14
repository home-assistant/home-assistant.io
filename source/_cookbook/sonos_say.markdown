---
title: "Sonos say script to speak with text-to-speech"
description: "Sonos say script to use text-to-speech with Sonos"
ha_category: Automation Examples
---

#### Sonos say script to speak with text-to-speech

This script allows you to use [TTS](/integrations/#text-to-speech) on Sonos.

```yaml
script:
  sonos_say:
    alias: "Sonos TTS script"
    sequence:
     - service: sonos.snapshot
       data_template:
         entity_id: {% raw %}"{{ sonos_entity }}"{% endraw %}
     - service: sonos.unjoin
       data_template:
         entity_id: {% raw %}"{{ sonos_entity }}"{% endraw %}
     - service: media_player.volume_set
       data_template:
         entity_id: {% raw %}"{{ sonos_entity }}"{% endraw %}
         volume_level: {% raw %}"{{ volume }}"{% endraw %}
     - service: tts.voicerss_say
       data_template:
         entity_id: {% raw %}"{{ sonos_entity }}"{% endraw %}
         message: {% raw %}"{{ message }}"{% endraw %}
     - delay: {% raw %}"{{ delay }}"{% endraw %}
     - service: sonos.restore
       data_template:
         entity_id: {% raw %}"{{ sonos_entity }}"{% endraw %}
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

```yaml
tts:
  - platform: google_translate
```

If you want to use this TTS engine, change the line in the example provided to:
```txt
- service: tts.google_translate_say
```
