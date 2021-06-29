---
title: "Media Player Group"
description: "Instructions for how to setup Media player groups within Home Assistant."
ha_category:
  - Media Player
ha_release: "2021.7"
ha_iot_class: Local Push
ha_quality_scale: internal
ha_domain: group
---

The group media player platform lets you combine multiple media players into one entity. All child media players of a media player group can still be used as usual, but controlling the state of the grouped media player will forward the command to each child media player.

To enable this platform in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: group
    entities:
      - media_player.kitchen_tv
      - media_player.livivng_room_tv
```

{% configuration %}
  name:
    description: The name of the media player group. Defaults to "Media Group".
    required: false
    type: string
  entities:
    description: A list of entities to be included in the media player group.
    required: true
    type: [string, list]
{% endconfiguration %}

## Script Example

Here's an example of a script using the above media player group.

```yaml
script:
  tts:
    alias: Run TTS
    sequence:
      service: tts.google_translate_say
      entity_id: media_player.media_group
      data:
        message: 'The cake is a lie.'
```
