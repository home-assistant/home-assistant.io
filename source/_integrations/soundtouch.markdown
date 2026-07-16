---
title: Bose SoundTouch
description: Instructions on how to integrate Bose SoundTouch devices into Home Assistant.
ha_category:
  - Media player
ha_release: 0.34
ha_iot_class: Local Polling
ha_domain: soundtouch
ha_config_flow: true
ha_codeowners:
  - '@kroimon'
ha_platforms:
  - media_player
ha_integration_type: device
ha_zeroconf: true
---

The **Bose SoundTouch** {% term integration %} allows you to control your [Bose SoundTouch](https://www.soundtouch.com/) speakers from Home Assistant.

{% include integrations/config_flow.md %}

## Playing media

You can switch between one of your 6 pre-configured presets using ```media_player.play_media```

```yaml
# Play media preset
- action: media_player.play_media
  target:
    entity_id: media_player.soundtouch_living_room
  data:
    media_content_id: 1..6
    media_content_type: PLAYLIST
```

You can also play HTTP (not HTTPS) URLs:

```yaml
# Play media URL
- action: media_player.play_media
  target:
    entity_id: media_player.soundtouch_living_room
  data:
    media_content_id: http://example.com/music.mp3
    media_content_type: MUSIC
```

### Text-to-speech services

You can use TTS services like [Google text-to-speech](/integrations/google_translate) or [Amazon Polly](/integrations/amazon_polly) only if your Home Assistant is configured in HTTP and not HTTPS (current device limitation, a firmware upgrade is planned).

A workaround if you want to publish your Home Assistant installation on Internet in SSL is to configure an HTTPS Web Server as a reverse proxy ([NGINX](/docs/ecosystem/nginx/) for example) and let your Home Assistant configuration in HTTP on your local network. The SoundTouch devices will be available to access the TTS files in HTTP in local and your configuration will be in HTTPS on the Internet.

{% include integrations/actions.md %}
