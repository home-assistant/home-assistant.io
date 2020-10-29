---
title: Microsoft Speech
description: Instructions on how to set up Microsoft Speech with Home Assistant.
ha_category:
  - Text-to-speech
ha_iot_class: Cloud Push
ha_release: 0.118
ha_domain: microsoft_speech
---

The `microsoft_speech` text-to-speech (TTS) integration uses the [Microsoft Speech engine based on Azure Cognitive Services](https://docs.microsoft.com/en-us/azure/cognitive-services/Speech-Service/) to read a text with natural sounding voices. For this integration to work, you need a free API key. You can use your [Azure subscription](https://azure.microsoft.com) to create an [Azure Speech resource](https://portal.azure.com/#create/Microsoft.CognitiveServicesSpeechServices/).

## Configuration

To enable text-to-speech with Microsoft Speech, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
tts:
  - platform: microsoft_speech
    api_key: YOUR_API_KEY
```

{% configuration %}
api_key:
  description: Your API key from the Microsoft Speech service.
  required: true
  type: string
region:
  description: "The region of your API endpoint. For the supported endpoints, check the list of [available endpoints](https://github.com/home-assistant/core/blob/master/homeassistant/components/microsoft_speech/const.py#375)."
  required: false
  type: string
  default: "`eastus`"
language:
  description: The language to use. Note that if you set the language to anything other than the default, you will need to specify a matching voice type as well. For the supported languages check the list of [available languages](https://github.com/home-assistant/core/blob/master/homeassistant/components/microsoft_speech/const.py#3).
  required: false
  type: string
  default: "`en-US`"
type:
  description: "The voice type you want to use. Make sure to check the [list of supported types](https://github.com/home-assistant/core/blob/master/homeassistant/components/microsoft_speech/const.py#56)."
  required: false
  type: string
  default: "`AriaNeural`"
{% endconfiguration %}

## Full configuration example

A full configuration sample including optional variables:

```yaml
# Example configuration.yaml entry
tts:
  - platform: microsoft_speech
    api_key: YOUR_API_KEY
    region: westeurope
    language: en-US
    type: AriaNeural
```
