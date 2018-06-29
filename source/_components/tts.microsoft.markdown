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
    api_key: [YourAPIKey]
```

Configuration variables:

- **api_key** (*Required*): Your API key.
- **language** (*Optional*): The language to use. Defaults to `en-us`. Accepted values are listed in the documentation mentioned below. Note that if you set the language to anything other than the default of `en-us`, you will need to specify a matching voice type as well.
- **gender** (*Optional*): The gender you would like to use for the voice. Accepted values are `Female` and `Male`. Defaults to `Female`.
- **type** (*Optional*): The voice type you want to use. Accepted values are listed as the service name mapping [in the documentation](https://docs.microsoft.com/en-us/azure/cognitive-services/Speech/api-reference-rest/bingvoiceoutput). Defaults to `ZiraRUS`.
- **rate** (*Optional*): Change the rate of speaking in percentage. Example values: `25`, `50`. Defaults to `0` (no change).
- **volume** (*Optional*): Change the volume of the output in percentage. Example values: `-20`, `70`. Defaults to `0` (no change).
- **pitch** (*Optional*): Change the pitch of the output. Example values: `high`. Defaults to `default` (no change).
- **contour** (*Optional*): Change the contour of the output in percentages. This overrides the pitch setting. See the [W3 SSML specification](http://www.w3.org/TR/speech-synthesis/#pitch_contour) for what it does. Example value: `(0,0) (100,100)`.

A full configuration sample including optional configuration variables:

```yaml
# Example configuration.yaml entry
tts:
  - platform: microsoft
    api_key: XXXXXXXXX
    language: en-gb
    gender: Male
    type: George, Apollo
    rate: 20
    volume: -50
    pitch: high
    contour: (0, 0) (100, 100)
```
