---
title: MaryTTS
description: Instructions on how to setup MaryTTS with Home Assistant.
ha_category:
  - Text-to-speech
ha_iot_class: Local Push
ha_release: 0.43
ha_domain: marytts
ha_platforms:
  - tts
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `marytts` text-to-speech {% term integration %} uses [MaryTTS](https://marytts.github.io/) text-to-speech engine to read a text with natural sounding voices.

## Configuration

To enable text-to-speech with MaryTTS, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

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
  description: "The audio codec. Supported codecs are `AIFF_FILE`, `AU_FILE` and `WAVE_FILE`."
  required: false
  type: string
  default: "`WAVE_FILE`"
voice:
  description: The speaker voice.
  required: false
  type: string
  default: "`cmu-slt-hsmm`"
language:
  description: "The language to use. Supported languages are `de`, `en_GB`, `en_US`, `fr`, `it`, `lb`, `ru`, `sv`, `te` and `tr`."
  required: false
  type: string
  default: "`en_US`"
effect:
  description: "A dictionary of effects which should be applied to the speech output."
  required: false
  type: map
{% endconfiguration %}

See [documentation](https://marytts.github.io/documentation/index.html) for details.

## Speech effects

For more information about the different effects take a look at the demo page of your MaryTTS installation (`http://localhost:59125/`).

There you can read about each effect and also test them on the fly.

## Full configuration example

A full configuration sample including optional variables:

```yaml
# Example configuration.yaml entry
tts:
  - platform: marytts
    host: "localhost"
    port: 59125
    codec: "WAVE_FILE"
    voice: "cmu-slt-hsmm"
    language: "en_US"
    effect:
      Volume: "amount:2.0;"
      TractScaler: "amount:1.5;"
      F0Scale: "f0Scale:2.0;"
      F0Add: "f0Add:50.0;"
      Rate: "durScale:1.5;"
      Robot: "amount:100.0;"
      Whisper: "amount:100.0;"
      Stadium: "amount:100.0"
      Chorus: "delay1:466;amp1:0.54;delay2:600;amp2:-0.10;delay3:250;amp3:0.30"
      FIRFilter: "type:3;fc1:500.0;fc2:2000.0"
      JetPilot: ""
```
