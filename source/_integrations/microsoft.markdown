---
title: Microsoft Text-to-Speech (TTS)
description: Instructions on how to set up Microsoft text-to-speech with Home Assistant.
ha_category:
  - Text-to-speech
ha_iot_class: Cloud Push
ha_release: 0.57
ha_domain: microsoft
ha_platforms:
  - tts
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `microsoft` text-to-speech {% term integration %} uses the [TTS engine of the Microsoft Speech Service](https://learn.microsoft.com/azure/cognitive-services/speech-service/text-to-speech) to read a text with natural sounding voices. This integration uses an API that is part of the Cognitive Services offering and is known as the Microsoft Speech API. For this integration to work, you need a free API key. You can use your [Azure subscription](https://azure.microsoft.com) to create an [Azure Speech resource](https://portal.azure.com/#create/Microsoft.CognitiveServicesSpeechServices).

## Configuration

To enable text-to-speech with Microsoft, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
tts:
  - platform: microsoft
    api_key: YOUR_API_KEY
```

{% configuration %}
api_key:
  description: Your API key.
  required: true
  type: string
language:
  description: The language to use. Note that if you set the language to anything other than the default, you will need to specify a matching voice type as well. For the supported languages check the list of [available languages](https://github.com/home-assistant/core/blob/dev/homeassistant/generated/microsoft_tts.py).
  required: false
  type: string
  default: "`en-us`"
gender:
  description: The gender you would like to use for the voice. Accepted values are `Female` and `Male`.
  required: false
  type: string
  default: "`Female`"
type:
  description: "The voice type you want to use. Accepted values are listed as the service name mapping [in the documentation](https://learn.microsoft.com/azure/cognitive-services/speech-service/language-support?tabs=tts)."
  required: false
  type: string
  default: "`JennyNeural`"
rate:
  description: "Change the rate of speaking in percentage. Example values: `25`, `50`."
  required: false
  type: integer
  default: 0
volume:
  description: "Change the volume of the output in percentage. Example values: `-20`, `70`."
  required: false
  type: integer
  default: 0
pitch:
  description: "Change the pitch of the output. Example values: `high`."
  required: false
  type: string
  default: "`default`"
contour:
  description: "Change the contour of the output in percentages. This overrides the pitch setting. See the [W3 SSML specification](https://www.w3.org/TR/speech-synthesis/#pitch_contour) for what it does. Example value: `(0%, -1st) (100%, +10st)`."
  required: false
  type: string
region:
  description: "The region of your API endpoint. See [documentation](https://learn.microsoft.com/azure/cognitive-services/speech-service/regions)."
  required: false
  type: string
  default: "`eastus`"
{% endconfiguration %}

{% note %}
Not all Azure regions support high-quality neural voices. Use [this overview](https://learn.microsoft.com/azure/cognitive-services/speech-service/regions) to determine the availability of standard and neural voices by region/endpoint.
 
New users ([any newly created Azure Speech resource after August 31st, 2021](https://learn.microsoft.com/azure/cognitive-services/speech-service/text-to-speech#more-about-neural-text-to-speech-features)) can only use neural voices. Existing resources can continue using standard voices through August 31st, 2024.
{% endnote %}

{% important %}
If you set the language to anything other than the default `en-us`, you will need to specify a matching voice type as well.
{% endimportant %}
 
## Full configuration example

A full configuration sample including optional variables:

```yaml
# Example configuration.yaml entry
tts:
  - platform: microsoft
    api_key: YOUR_API_KEY
    language: en-gb
    gender: Male
    type: RyanNeural
    rate: 20
    volume: -50
    pitch: high
    contour: (0%, -1st) (100%, +10st)
    region: eastus
```
