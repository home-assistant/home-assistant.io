---
title: Knovvu TTS
description: Instructions on how to setup Knovvu Text-to-Speech with Home Assistant.
ha_category:
  - Text-to-speech
ha_iot_class: Cloud Push
ha_release: 2022.4.2
ha_domain: knovvu
ha_platforms:
  - tts
ha_integration_type: integration
---

The `knovvu` is a powerful speech synthesis technology that can vocalize written text into audible speech, rendered in a clear, human-like voice. This integration uses the cloud TTS API of the Knovvu platform. Before the integration, you need to contact with [Knovvu](https://www.knovvu.com/) team (contact@knovvu.com) to take the client id and client secret.

## Configuration

To enable text-to-speech with Knovvu, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
tts:
  - platform: knovvu
    api_token: YOUR_API_KEY
```

{% configuration %}
api_token:
  description: The API key for use this service.
  required: true
  type: string
url:
  description: The API URL for use this service.
  required: false
  type: string
  default: https://ttsapi.knovvu.com/v1/speech/synthesis/tts
voice:
  description: "The speaker voice. Supported female voices are `Sestek Gul 24k_HV_Premium`,`Sestek Melissa 24k`,`Sestek Delal 24k`, and `Sestek Rae 24k`. Male voices are `Sestek Sinan 24k`."
  required: false
  type: string
  default: "`Sestek Gul 24k_HV_Premium`"
codec:
  description: "The audio codec. Supported codecs are `wav`, `mp3` and `opus`."
  required: false
  type: string
  default: "`wav`"
volume:
  description: "The audio volume. Highest volume is `2` and lowest ` 0.0`"
  required: false
  type: float
  default: "`1`"
rate:
  description: "The speech speed. Highest speed is `3` and lowest ` 0.3`"
  required: false
  type: float
  default: "`1`"
sample_rate:
  description: "The sample rate is how many samples, or measurements, of the sound are taken each second. Supported sample rate are `16000` and `24000`."
  required: false
  type: integer
  default: "`24000`"
{% endconfiguration %}

## Full configuration example

The configuration sample below shows how an entry can look like:

```yaml
# Example configuration.yaml entry
tts:
  - platform: knovvu
    url: https://ttsapi.knovvu.com/v1/speech/synthesis/tts
    api_token: YOUR_API_KEY
    voice: Sestek Gul 24k_HV_Premium
    codec: wav
    volume: 1
    rate: 1
    sample_rate: 24000
```
