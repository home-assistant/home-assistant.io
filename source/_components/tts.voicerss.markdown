---
layout: page
title: "VoiceRSS"
description: "Instructions on how to setup VoiceRSS TTS with Home Assistant."
date: 2016-12-13 07:00
sidebar: true
comments: false
sharing: true
footer: true
logo: voicerss.png
ha_category: Text-to-speech
ha_release: 0.35
---

The `voicerss` text-to-speech platform uses [VoiceRSS](http://www.voicerss.org/) Text-to-Speech engine to read a text with natural sounding voices.

To enable text-to-speech with VoiceRSS, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
tts:
  - platform: voicerss
    api_key: 'XXXXXXXX'
```

{% configuration %}
api_key:
  description: API Key for use this service.
  required: true
  type: string
language:
  description: The language to use.
  required: false
  default: "`en-us`"
  type: string
codec:
  description: Audio codec.
  required: false
  default: mp3
  type: string
format:
  description: Audio sample format.
  required: false
  default: 8khz_8bit_mono
  type: string
{% endconfiguration %}

See on api [documentation](http://www.voicerss.org/api/documentation.aspx) for allow values.

A full configuration sample:

```yaml
# Example configuration.yaml entry
tts:
  - platform: voicerss
    api_key: 'XXXXX'
    language: 'de-de'
    codec: mp3
    format: '8khz_8bit_mono'
```

Please note, some media_players require a certain format. For example the Sonos requires a format of '44khz_16bit_stereo'
