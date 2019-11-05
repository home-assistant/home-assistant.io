---
title: "Yandex Speechkit"
description: "Instructions on how to setup Yandex SpeechKit TTS with Home Assistant."
logo: yandex.png
ha_category:
  - Text-to-speech
ha_release: 0.102
---

The `yandextts` text-to-speech platform uses [Yandex SpeechKit](https://tech.yandex.com/speechkit/) Text-to-Speech engine to read a text with natural sounding voices.

## Configuration

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
  description: "The language to use. Supported languages are `en-US`, `ru-RU` and `tr-TR`."
  required: false
  type: string
  default: "`en-US`"
codec:
  description: "The audio codec. Supported codecs are `wav` and `oggopus`."
  required: false
  type: string
  default: "`oggopus`"
voice:
 description: "The speaker voice. Supported female voices are `jane`, `oksana`, `alyss`, `omazh`, `silaerkan` and 'alena'. Male voices are `zahar`, `ermil`, `nick`, `erkanyavas`, and `filipp`. According to yandex `jane`, `oksana`, `zahar`, `ermil`, `alena` and `filipp` are trained for `ru-RU`, `silaerkan` and `erkanyavas` prefer `tr-TR`. For `en-US` choose `alyss` and `nick`."
  required: false
  type: string
  default: "`alyss`"
emotion:
  description: "The speaker emotional intonation. Supported emotions are `good` (friendly), `evil` (angry) and `neutral`."
  required: false
  type: string
  default: "`neutral`"
speed:
  description: "The speech speed. Highest speed is `3` and lowest `0,1`."
  required: false
  type: float
  default: "`1`"
{% endconfiguration %}

 You could create  API key [online](https://cloud.yandex.com/docs/speechkit/concepts/auth) and select `Service Account` tab.  There no free tier for  Yandex.Speechkit (see [price](https://cloud.yandex.com/docs/speechkit/pricing) ) N.B some voices (`alena` and `filipp` are 7 time more expensive than other . Please see the [API documentation](https://cloud.yandex.com/docs/speechkit/tts/) for details.

## Full configuration example

The configuration sample below shows how an entry can look like:

```yaml
# Example configuration.yaml entry
tts:
  - platform: yandextts
    api_key: YOUR_API_KEY
    language: 'ru-RU'
    codec: oggopus
    voice: oksana
    emotion: evil
    speed: 2
```
