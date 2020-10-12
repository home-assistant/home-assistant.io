---
title: VoiceRSS
description: Instructions on how to setup VoiceRSS TTS with Home Assistant.
ha_category:
  - Text-to-speech
ha_release: 0.35
ha_domain: voicerss
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
  default: " mp3 "
format:
  description: The audio sample format.
  required: false
  type: string
  default: " 8khz_8bit_mono "
voice:
  description: The voice name for the selected language. If unconfigured, uses the default voice set by VoiceRSS.
  required: false
  type: string
  default: unconfigured
speed:
  description: The rate of the speech (speed of talk). Valid values are " -10 " to " 10 ". Value needs to be in quotes.
  required: false
  type: string
  default: " 0 "
{% endconfiguration %}

Languages supported: ar-eg, ar-sa, bg-bg, ca-es, zh-cn, zh-hk, zh-tw, hr-hr, cs-cz, da-dk, nl-be, nl-nl, en-au, en-ca, en-gb, en-in, en-ie, en-us, fi-fi, fr-ca, fr-fr, fr-ch, de-at, de-de, de-ch, el-gr, he-il, hi-in, hu-hu, id-id, it-it, ja-jp, ko-kr, ms-my, nb-no, pl-pl, pt-br, pt-pt, ro-ro, ru-ru, sk-sk, sl-si, es-mx, es-es, sv-se, ta-in, th-th, tr-tr, vi-vn.

Codecs supported: 8khz_8bit_mono, 8khz_8bit_stereo, 8khz_16bit_mono, 8khz_16bit_stereo, 11khz_8bit_mono, 11khz_8bit_stereo, 11khz_16bit_mono, 11khz_16bit_stereo, 12khz_8bit_mono, 12khz_8bit_stereo, 12khz_16bit_mono, 12khz_16bit_stereo, 16khz_8bit_mono, 16khz_8bit_stereo, 16khz_16bit_mono, 16khz_16bit_stereo, 22khz_8bit_mono, 22khz_8bit_stereo, 22khz_16bit_mono, 22khz_16bit_stereo, 24khz_8bit_mono, 24khz_8bit_stereo, 24khz_16bit_mono, 24khz_16bit_stereo, 32khz_8bit_mono, 32khz_8bit_stereo, 32khz_16bit_mono, 32khz_16bit_stereo, 44khz_8bit_mono, 44khz_8bit_stereo, 44khz_16bit_mono, 44khz_16bit_stereo, 48khz_8bit_mono, 48khz_8bit_stereo, 48khz_16bit_mono, 48khz_16bit_stereo, alaw_8khz_mono, alaw_8khz_stereo, alaw_11khz_mono, alaw_11khz_stereo, alaw_22khz_mono, alaw_22khz_stereo, alaw_44khz_mono, alaw_44khz_stereo, ulaw_8khz_mono, ulaw_8khz_stereo, ulaw_11khz_mono, ulaw_11khz_stereo, ulaw_22khz_mono, ulaw_22khz_stereo, ulaw_44khz_mono, ulaw_44khz_stereo.

Check the [VoiceRSS API documentation](http://www.voicerss.org/api/) for language-specific voice values.

## Full configuration example

The configuration sample below shows how an entry can look like:

```yaml
# Example configuration.yaml entry
tts:
  - platform: voicerss
    api_key: YOUR_API_KEY
    language: en-gb
    codec: aac
    format: '44khz_16bit_mono'
    speed: '-2'
    voice: Nancy
```

Please note, some media_players require a certain format. For example Sonos or Linkplay require a format of '44khz_16bit_stereo'.
