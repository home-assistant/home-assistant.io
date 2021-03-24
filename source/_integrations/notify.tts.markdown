---
title: "Notify using TTS"
description: "Instructions on how to set up a Notify integration using TTS service and media_player within Home Assistant."
ha_category:
  - Notifications
ha_release: 0.117
ha_iot_class: Local Push
ha_quality_scale: internal
ha_domain: notify
---

The notify TTS platform lets you use the TTS integration [Service Say](/integrations/tts/#service-say) and a [media_player](/integrations/media_player) to alert you of important events. This integration provides a simple interface to use in your automations and alerts.

In order to use this integration, you must already have a TTS platform installed and configured, and a media_player working with the TTS platform.

To enable this platform in your installation, consider the following example using [google_translate](/integrations/google_translate/) and an example `media_player.living_room`. 

In your `configuration.yaml` file type:

```yaml
tts:
  - platform: google_translate
    service_name: google_say

notify:
  - platform: tts
    name: in_the_living_room
    tts_service: tts.google_say
    media_player: media_player.living_room
```

Please note that the `tts_service` parameter, must match the `service_name` defined in the TTS integration.

{% configuration %}
  name:
    description: The name of the notify service.
    required: true
    type: string
  tts_service:
    description: "The `service_name` of a TTS platform."
    required: true
    type: string
  media_player:
    description: "The `entity_id` of a media_player."
    required: true
    type: string
  language:
    description: "The `language` to be passed to the TTS `Service Say`"
    required: false
    type: string
    default: "`en`"
{% endconfiguration %}

Check the [complete list of supported languages](https://translate.google.com/intl/en_ALL/about/languages/) (languages where "Talk" feature is enabled in Google Translate) for allowed values.
Use the 2 digit language code which you can find at the end of URL when you click on Language name.
