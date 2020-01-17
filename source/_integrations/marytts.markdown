---
title: MaryTTS
description: Instructions on how to setup MaryTTS with Home Assistant.
logo: marytts.png
ha_category:
  - Text-to-speech
ha_release: 0.43
---

The `marytts` text-to-speech platform uses [MaryTTS](http://mary.dfki.de/) Text-to-Speech engine to read a text with natural sounding voices.

## Configuration

To enable text-to-speech with MaryTTS, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
tts:
  - platform: marytts
```

{% configuration %}
host:
  description: The MaryTTS server hostname or IP address.
  required: false
  type: string
  default: localhost
port:
  description: The MaryTTS server port.
  required: false
  type: integer
  default: 59125
codec:
  description: "The audio codec. Supported codecs are `aiff`, `au` and `wav`."
  required: false
  type: string
  default: "`wav`"
voice:
  description: The speaker voice.
  required: false
  type: string
  default: "`cmu-slt-hsmm`"
language:
  description: "The language to use. Supported languages are `de`, `en-GB`, `en-US`, `fr`, `it`, `lb`, `ru`, `sv`, `te` and `tr`."
  required: false
  type: string
  default: "`en-US`"
{% endconfiguration %}

See [documentation](http://mary.dfki.de/documentation/index.html) for details.

## Full configuration example

A full configuration sample including optional variables:

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
