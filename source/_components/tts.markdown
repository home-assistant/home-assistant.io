---
layout: page
title: "Text-to-Speech (TTS)"
description: "Instructions on how to setup Text-to-Speech (TTS) with Home Assistant."
date: 2016-12-13 07:00
sidebar: true
comments: false
sharing: true
footer: true
ha_release: 0.35
---

Text-to-speech (TTS) enables Home Assistant to speak to you.

## {% linkable_title Configuring a `tts` platform %}

To get started, add the following lines to your `configuration.yaml` (example for google):

```yaml
# Example configuration.yaml entry for google tts service
tts:
  - platform: google
```

<p class='note'>
Depending on your setup, you might need to set a base URL (`base_url`) inside the [http component](/components/http/).
</p>

The following optional parameters can be used with any platform. However, the TTS component will only look for global settings under the configuration of the first configured platform:

| Parameter           | Default | Description                                                                                                                                                                                                                                                                                                                                                                               |
|---------------------|---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `cache` | True    | Allow TTS to cache voice file to local storage. |
| `cache_dir`  | tts      | Folder name or path to a folder for caching files. |
| `time_memory`     | 300     | Time to hold the voice data inside memory for fast play on a media player. Minimum is 60 s and the maximum 57600 s (16 hours). |

The extended example from above would look like the following sample:

```yaml
# Example configuration.yaml entry for google tts service
tts:
  - platform: google
    cache: true
    cache_dir: /tmp/tts
    time_memory: 300
```

## {% linkable_title Service say %}

The `say` service support `language` and on some platforms also `options` for set, i.e., *voice, motion, speed, etc*. The text for speech is set with `message`.

Say to all `media_player` device entities:

```yaml
# Replace google_say with <platform>_say when you use a different platform.
service: tts.google_say
data:
  message: 'May the Force be with you.'
```
Say to the `media_player.floor` device entity:

```yaml
service: tts.google_say
entity_id: media_player.floor
data:
  message: 'May the Force be with you.'
```

Say to the `media_player.floor` device entity in French:

```yaml
service: tts.google_say
entity_id: media_player.floor
data:
  message: 'Que la force soit avec toi.'
  language: 'fr'
```

With a template:

```yaml
service: tts.google_say
data_template:
  message: "Temperature is {% raw %}{{states('sensor.temperature')}}{% endraw %}."
  cache: false
```

## {% linkable_title Cache %}

The component has two caches. Both caches can be controlled with the `cache` option in the platform configuration or the service call `say`. A long time cache will be located on the file system. The in-memory cache for fast responses to media players will be auto-cleaned after a short period.

## {% linkable_title REST Api %}

#### {% linkable_title POST /api/tts_get_url %}

Returns an URL to the generated TTS file. Platform and message are required.

```json
{
    "plaform": "amazon_polly",
    "message": "I am speaking now"
}
```

The return code is 200 if the file is generated. The message body will contain a JSON object with the URL.

```json
{
    "url": "http://127.0.0.1:8123/api/tts_proxy/265944c108cbb00b2a621be5930513e03a0bb2cd_en_-_demo.mp3"
}
```

Sample `curl` command:

```bash
$ curl -X POST -H "x-ha-access: YOUR_PASSWORD" \
       -H "Content-Type: application/json" \
       -d '{"message": "I am speaking now", "platform": "amazon_polly"}' \
       http://localhost:8123/api/tts_get_url
```
