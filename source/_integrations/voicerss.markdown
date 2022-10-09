---
title: VoiceRSS
description: Instructions on how to setup VoiceRSS TTS with Home Assistant.
ha_category:
  - Text-to-speech
ha_iot_class: Cloud Push
ha_release: 0.35
ha_domain: voicerss
ha_platforms:
  - tts
ha_integration_type: integration
---

The `voicerss` text-to-speech platform uses [VoiceRSS](http://www.voicerss.org/) Text-to-Speech engine to read a text with natural sounding voices.

## Configuration

To enable text-to-speech with VoiceRSS, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
tts:
  - platform: voicerss
    api_key: YOUR_API_KEY
```

{% configuration %}
api_key:
  description: The API Key for VoiceRSS.
  required: true
  type: string
language:
  description: The language to use.
  required: false
  type: string
  default: "`en-us`"
codec:
  description: The audio codec.
  required: false
  type: string
  default: mp3
format:
  description: The audio sample format.
  required: false
  type: string
  default: 8khz_8bit_mono
{% endconfiguration %}

Check the [VoiceRSS API documentation](http://www.voicerss.org/api/) for allowed values.

## Full configuration example

The configuration sample below shows how an entry can look like:

```yaml
# Example configuration.yaml entry
tts:
  - platform: voicerss
    api_key: YOUR_API_KEY
    language: "de-de"
    codec: mp3
    format: "8khz_8bit_mono"
```

Please note, some media_players require a certain format. For example the Sonos requires a format of '44khz_16bit_stereo'
