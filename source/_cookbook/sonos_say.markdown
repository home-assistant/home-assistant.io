---
title: "Sonos say script to speak with text-to-speech"
description: "Sonos say script to use text-to-speech with Sonos"
ha_category: Automation Examples
---

#### Sonos say script to speak with text-to-speech

This script allows you to use [TTS](/integrations/#text-to-speech) on Sonos.

{% raw %}

```yaml
script:
  sonos_say:
    alias: "Sonos TTS script"
    sequence:
     - service: sonos.snapshot
       target:
         entity_id: "{{ sonos_entity }}"
     - service: sonos.unjoin
       target:
         entity_id: "{{ sonos_entity }}"
     - service: media_player.volume_set
       target:
         entity_id: "{{ sonos_entity }}"
         volume_level: "{{ volume }}"
     - service: tts.voicerss_say
       target:
         entity_id: "{{ sonos_entity }}"
         message: "{{ message }}"
     - delay: "{{ delay }}"
     - service: sonos.restore
       target:
         entity_id: "{{ sonos_entity }}"
```

{% endraw %}

We call this now with:

```yaml
automation:
  - alias: "test"
    trigger:
      - platform: state
        entity_id: input_boolean.mytest
    action:
      - service: script.sonos_say
        data:
          sonos_entity: media_player.office
          volume: 0.5
          message: "Your husband coming home!"
          delay: "00:00:05"
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
