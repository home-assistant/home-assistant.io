---
layout: page
title: "Microsoft Text-to-Speech"
description: "Instructions on how to setup Microsoft Text-to-Speech with Home Assistant."
date: 2017-11-07 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: microsoft.png
ha_category: Text-to-speech
ha_release: 0.57
---

The `microsoft` text-to-speech platform uses [Microsoft Text-to-Speech engine](https://docs.microsoft.com/en-us/azure/cognitive-services/speech/home) to read a text with natural sounding voices. This component uses an API that is part of the Cognitive Services offering and is known as the Bing Speech API.
You will need an API key, which is free. You can use your [Azure subscription](https://azure.microsoft.com) or get an API key on the [Cognitive Services site](https://azure.microsoft.com/en-us/try/cognitive-services/). 

To enable text-to-speech with Microsoft, add the following lines to your `configuration.yaml`:

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
  description: The language to use. Accepted values are listed in the documentation mentioned below. Note that if you set the language to anything other than the default, you will need to specify a matching voice type as well.
  required: false
  default: "`en-us`"
  type: string
gender:
  description: The gender you would like to use for the voice. Accepted values are `Female` and `Male`.
  required: false
  default: "`Female`"
  type: string
type:
  description: "The voice type you want to use. Accepted values are listed as the service name mapping [in the documentation](https://docs.microsoft.com/en-us/azure/cognitive-services/Speech/api-reference-rest/bingvoiceoutput)."
  required: false
  default: "`ZiraRUS`"
  type: string
rate:
  description: "Change the rate of speaking in percentage. Example values: `25`, `50`."
  required: false
  default: 0
  type: integer
volume:
  description: "Change the volume of the output in percentage. Example values: `-20`, `70`."
  required: false
  default: 0
  type: integer
pitch:
  description: "Change the pitch of the output. Example values: `high`."
  required: false
  default: "`default`"
  type: string
contour:
  description: "Change the contour of the output in percentages. This overrides the pitch setting. See the [W3 SSML specification](http://www.w3.org/TR/speech-synthesis/#pitch_contour) for what it does. Example value: `(0,0) (100,100)`."
  required: false
  type: string
{% endconfiguration %}

A full configuration sample including optional variables:

```yaml
# Example configuration.yaml entry
tts:
  - platform: microsoft
    api_key: YOUR_API_KEY
    language: en-gb
    gender: Male
    type: George, Apollo
    rate: 20
    volume: -50
    pitch: high
    contour: (0, 0) (100, 100)
```
