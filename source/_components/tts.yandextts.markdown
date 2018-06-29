---
layout: page
title: "Yandex TTS"
description: "Instructions on how to setup Yandex SpeechKit TTS with Home Assistant."
date: 2017-01-17 03:04
sidebar: true
comments: false
sharing: true
footer: true
logo: yandex.png
ha_category: Text-to-speech
ha_release: 0.36
---

The `yandextts` text-to-speech platform uses [Yandex SpeechKit](https://tech.yandex.com/speechkit/) Text-to-Speech engine to read a text with natural sounding voices.

To enable text-to-speech with Yandex SpeechKit, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
tts:
  - platform: yandextts
    api_key: 'XXXXXXXX'
```

Configuration variables:

- **api_key** (*Required*): API Key for use this service. 
- **language** (*Optional*): The language to use. Defaults to `en-US`. Supported `en-US`, `ru-RU`, `uk-UK`, `tr-TR`.
- **codec** (*Optional*): Audio codec. Default is `mp3`. Supported us `mp3`, `wav`, `opus`.
- **voice** (*Optional*): Speaker voice. Default is `zahar`. Supported female voices are `jane`, `oksana`, `alyss`, `omazh` and male voices are `zahar` and `ermil`.
- **emotion** (*Optional*): Speaker emotional intonation. Default is `neutral`. Also supported are `good` (friendly) and `evil` (angry)
- **speed** (*Optional*): Speech speed. Default value is `1`. Highest speed is `3` and lowest `0,1`

Please check the [API documentation](https://tech.yandex.com/speechkit/cloud/doc/guide/concepts/tts-http-request-docpage/) for details. It seems that the English version of documentation is outdated. You could request an API key [by email](https://tech.yandex.com/speechkit/cloud/) or [online](https://developer.tech.yandex.ru/).

A full configuration sample:

```yaml
# Example configuration.yaml entry
tts:
  - platform: yandextts
    api_key: 'XXXXX'
    language: 'ru-RU'
    codec: mp3
    voice: oksana
    emotion: evil
    speed: 2
```
