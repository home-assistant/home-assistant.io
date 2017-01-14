---
layout: page
title: "Yandex TTS"
description: "Instructions how to setup Yandex SpeechKit TTS with Home Assistant."
date: 2017-01-05 03:04
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

- **api_key** (*Requered*): API Key for use this service. 
- **language** (*Optional*): The language to use. Defaults to `en-us`. Supported en-EN, ru-RU, uk-UK, tr-TR
- **codec** (*Optional*): Audo codec. Default is 'mp3'. Supported us mp3, wav, opus.
- **voice** (*Optional*): Speaker voice. Default is 'zahar'. Supported female voices are jane, oksana, alyss, omazh and male voices are zahar and ermil


See on api [documentation](https://tech.yandex.com/speechkit/cloud/doc/dg/concepts/speechkit-dg-tts-docpage/) for details. N.B. english version of documentation is outdated. So you could receive api key [here](https://developer.tech.yandex.ru/)

A full configuration sample:

```yaml
# Example configuration.yaml entry
tts:
  - platform: yandextts
    api_key: 'XXXXX'
    language: 'ru-RU'
    codec: mp3
    voice: oksana
```
