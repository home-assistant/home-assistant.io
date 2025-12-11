---
title: "Notify using TTS"
description: "Instructions on how to set up a Notify integration using TTS action and media_player within Home Assistant."
ha_category:
  - Notifications
ha_release: 0.117
ha_iot_class: Local Push
ha_quality_scale: internal
ha_domain: notify
---

The notify TTS platform lets you use the TTS integration [speak](/integrations/tts/#action-speak) or legacy [say](/integrations/tts/#action-say-legacy) action and a [media_player](/integrations/media_player) to alert you of important events. This integration provides a simple interface to use in your automations and alerts.

In order to use this integration, you must already have a TTS platform installed and configured, and a media_player working with the TTS platform.

To enable this platform in your installation, consider the following example using [google_translate](/integrations/google_translate/) and an example `media_player.living_room`.

In your {% term "`configuration.yaml`" %} file type:

```yaml
notify:
  - platform: tts
    name: in_the_living_room
    entity_id: tts.google_en_com
    media_player: media_player.living_room
```

{% configuration %}
  name:
    description: The name of the notify action.
    required: true
    type: string
  entity_id:
    description: "The `entity_id` of the TTS entity to target. Either use `entity_id` or `tts_service` to target a TTS platform."
    required: exclusive
    type: string
  tts_service:
    description: "The `service_name` of a TTS platform. Either use `entity_id` or `tts_service` to target a TTS platform."
    required: exclusive
    type: string
  media_player:
    description: "The `entity_id` of a media_player."
    required: true
    type: string
  language:
    description: "The `language` to be passed to the TTS `speak` or `say` action."
    required: false
    type: string
{% endconfiguration %}
