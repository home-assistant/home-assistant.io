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

## {% linkable_title Configuration %}

To enable text-to-speech with Yandex SpeechKit, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
tts:
  - platform: yandextts
    api_key: THE_API_KEY
```

{% configuration %}
api_key:
  description: The API Key for use this service.
  required: true
  type: string
language:
  description: "The language to use. Supported `en-US`, `ru-RU`, `uk-UK`, `tr-TR`."
  required: false
  default: "`en-US`"
  type: string
codec:
  description: "The audio codec. Supported us `mp3`, `wav`, `opus`."
  required: false
  default: "`mp3`"
  type: string
voice:
  description: "The speaker voice. Supported female voices are `jane`, `oksana`, `alyss`, `omazh` and male voices are `zahar` and `ermil`."
  required: false
  default: "`zahar`"
  type: string
emotion:
  description: "The speaker emotional intonation. Also supported are `good` (friendly) and `evil` (angry)"
  required: false
  default: "`neutral`"
  type: string
speed:
  description: The speech speed. Highest speed is `3` and lowest `0,1`
  required: false
  default: "`1`"
  type: float
{% endconfiguration %}

Please check the [API documentation](https://tech.yandex.com/speechkit/cloud/doc/guide/concepts/tts-http-request-docpage/) for details. It seems that the English version of documentation is outdated. You could request an API key [by email](https://tech.yandex.com/speechkit/cloud/) or [online](https://developer.tech.yandex.ru/).

## {% linkable_title Full configuration example %}

The configuration sample below show how a entry can look like:

```yaml
# Example configuration.yaml entry
tts:
  - platform: yandextts
    api_key: YOUR_API_KEY
    language: 'ru-RU'
    codec: mp3
    voice: oksana
    emotion: evil
    speed: 2
```
