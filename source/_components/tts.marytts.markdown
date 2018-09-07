---
layout: page
title: "MaryTTS"
description: "Instructions on how to setup MaryTTS with Home Assistant."
date: 2017-04-08 16:49
sidebar: true
comments: false
sharing: true
footer: true
logo: marytts.png
ha_category: Text-to-speech
ha_release: 0.43
---

The `marytts` text-to-speech platform uses [MaryTTS](http://mary.dfki.de/) Text-to-Speech engine to read a text with natural sounding voices.

To enable text-to-speech with MaryTTS, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
tts:
  - platform: marytts
    host: 'localhost'
    port: 59125
```

Configuration variables:

- **host** (*Optional*): MaryTTS server hostname or IP address. Default is `localhost`.
- **port** (*Optional*): MaryTTS server port. Default is 59125.
- **codec** (*Optional*): Audio codec. Default is `wav`. Supported are `aiff`, `au`, `wav`.
- **voice** (*Optional*): Speaker voice. Default is `cmu-slt-hsmm`.
- **language** (*Optional*): Language to use. Default is `en-US`. Supports 'de', 'en-GB', 'en-US', 'fr', 'it', 'lb', 'ru', 'sv', 'te', 'tr'.

See [documentation](http://mary.dfki.de/documentation/index.html) for details.

A full configuration sample:

```yaml
# Example configuration.yaml entry
tts:
  - platform: marytts
    host: 'localhost'
    port: 59125
    codec: 'wav'
    voice: 'cmu-slt-hsmm'
    language: 'en-US'
```
