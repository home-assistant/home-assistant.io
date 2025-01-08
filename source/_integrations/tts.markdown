---
title: Text-to-speech (TTS)
description: Instructions on how to set up text-to-speech (TTS) with Home Assistant.
ha_category:
  - Media source
  - Text-to-speech
ha_release: 0.35
ha_codeowners:
  - '@home-assistant/core'
ha_domain: tts
ha_quality_scale: internal
ha_platforms:
  - notify
ha_integration_type: entity
related:
  - url: https://www.home-assistant.io/integrations/#text-to-speech
    title: List of integrations using the TTS integration
  - url: https://www.nabucasa.com/config/tts/
    title: TTS with Home Assistant Cloud
  - url: https://www.home-assistant.io/integrations/google_translate/
    title: Google Translate TTS
  - url: https://www.home-assistant.io/integrations/microsoft/
    title: Microsoft TTS
  - url: https://www.home-assistant.io/voice_control/
    title: Home Assistant Assist
---

Text-to-speech (TTS) enables Home Assistant to speak to you.

{% include integrations/building_block_integration.md %}

See all [TTS integrations](https://www.home-assistant.io/integrations/#text-to-speech) using this building block for ways to use it in your automations. If you are using the Home Assistant voice assistant, [Assist](https://www.home-assistant.io/voice_control/), Assist is using TTS when replying to you. Another way to use TTS is by using [TTS with Home Assistant Cloud](https://www.nabucasa.com/config/tts/). 

## The state of a text-to-speech entity

The state of a text-to-speech {% term entity %} is a timestamp showing the date and time when text-to-speech was last used.

<p class='img'>
<img src='/images/integrations/tts/state_tts.png' alt='Screenshot showing the state of a text-to-speech entity in the developer tools' />
Screenshot showing the state of a text-to-speech entity in the developer tools.
</p>

## Actions

### Action speak

Modern platforms will create entities under the `tts` domain, where each entity represents one text-to-speech service provider. These entities may be used as targets for the `tts.speak` action.

the `tts.speak` action supports `language` and on some platforms also `options` for settings, e.g., _voice, motion, speed, etc_. The text that should be spoken is set with `message`, and the media player that should output the sound is selected with `media_player_entity_id`.

```yaml
action: tts.speak
target:
  entity_id: tts.example
data:
  media_player_entity_id: media_player.kitchen
  message: "May the force be with you."
```

### Action say (legacy)

The `say` action supports `language` and on some platforms also `options` for settings, e.g., _voice, motion, speed, etc_. The text that should be spoken is set with `message`. Since release 0.92, action name can be defined in configuration `service_name` option.

Say to all `media_player` entities:

```yaml
# Replace google_translate_say with <platform>_say when you use a different platform.
action: tts.google_translate_say
data:
  entity_id: all
  message: "May the force be with you."
```

Say to the `media_player.floor` entity:

```yaml
action: tts.google_translate_say
data:
  entity_id: media_player.floor
  message: "May the force be with you."
```

Say to the `media_player.floor` entity in French:

```yaml
action: tts.google_translate_say
data:
  entity_id: media_player.floor
  message: "Que la force soit avec toi."
  language: "fr"
```

With a template:

{% raw %}

```yaml
action: tts.google_translate_say
data:
  message: "Temperature is {{states('sensor.temperature')}}."
  cache: false
```

{% endraw %}

## Cache

The integration cache can be controlled with the `cache` option in the action to `speak` or `say`. A long time cache will be located on the file system. The in-memory cache for fast responses to media players will be auto-cleaned after a short period.

## REST API

### POST `/api/tts_get_url`

Returns a URL to the generated TTS file. The `engine_id` or `platform` parameter together with `message` are required.

```json
{
  "engine_id": "tts.amazon_polly",
  "message": "I am speaking now"
}
```

The return code is 200 if the file is generated. The message body will contain a JSON object with the URL.

```json
{
  "path": "/api/tts_proxy/265944c108cbb00b2a621be5930513e03a0bb2cd_en_-_tts.demo.mp3",
  "url": "http://127.0.0.1:8123/api/tts_proxy/265944c108cbb00b2a621be5930513e03a0bb2cd_en_-_tts.demo.mp3"
}
```

Sample `curl` command:

```bash
$ curl -X POST -H "Authorization: Bearer <ACCESS TOKEN>" \
       -H "Content-Type: application/json" \
       -d '{"message": "I am speaking now", "engine_id": "amazon_polly"}' \
       http://localhost:8123/api/tts_get_url
```

## Troubleshooting

{% important %}
Depending on your setup, you might need to set an external URL (`external_url`) inside the [configuration](/integrations/homeassistant/#external_url).
{% endimportant %}

The following sections describe some of the problems encountered with media devices.

### Self-signed certificates

This problem occurs when your Home Assistant instance is configured to be accessed through SSL, and you are using a self-signed certificate on your internal URL.

The `tts` action will send an `https://` URL to the media device, which will check the certificate, and reject it. So it won't play your file. If you could make the device accept your certificate, it would play the file. However, many media devices do not allow changing settings to accept self-signed certificates. Ultimately, your option may be to serve files to local devices as `http://` rather than `https://`.

### Google cast devices

The Google cast devices (Google Home, Chromecast, etc.) present the following problems:

- They [reject self-signed certificates](#self-signed-certificates).

- They do not work with URLs that contain hostnames established by local naming means. Let's say your Home Assistant instance is running on a machine made known locally as `ha`. All your machines on your local network are able to access it as `ha`. However, try as you may, your cast device won't download the media files from your `ha` machine. That's because your cast device ignores your local naming setup. In this example, the `say` action creates a URL like `http://ha/path/to/media.mp3` (or `https://...` if you are using SSL). If you are _not_ using SSL then setting an internal URL that contains the IP address of your server works around this issue. By using an IP address, the cast device does not have to resolve the hostname.

- If you are using SSL (e.g., `https://yourhost.example.org/...`) then you _must_ use the hostname in the certificate (e.g., `external_url: https://yourhost.example.org`). You cannot use an IP address since the certificate won't be valid for the IP address, and the cast device will refuse the connection.
