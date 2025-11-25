---
title: IBM Watson TTS
description: Instructions on how to setup IBM Watson TTS with Home Assistant.
ha_category:
  - Text-to-speech
ha_release: 0.94
ha_iot_class: Cloud Push
ha_codeowners:
  - '@rutkai'
ha_domain: watson_tts
ha_platforms:
  - tts
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `watson_tts` text-to-speech {% term integration %} that works with [IBM Watson Cloud](https://www.ibm.com/watson/services/text-to-speech/) to create the spoken output.
Watson is a paid service via IBM Cloud but there is a decent [free tier](https://www.ibm.com/cloud/watson-text-to-speech/pricing) which offers 10000 free characters every month.

## Setup

For supported formats and voices please go to [IBM Cloud About section](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-voices#languageVoices).

To get started please read the [Getting started tutorial](https://cloud.ibm.com/docs/services/text-to-speech?topic=text-to-speech-gettingStarted#gettingStarted).

## Configuration

To configure Watson TTS, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
tts:
  - platform: watson_tts
    watson_apikey: YOUR_GENERATED_APIKEY
```

You can get these tokens after you generated the credentials on the IBM Cloud console:

<p class='img'>
  <img src='/images/screenshots/watson_tts_screen.png' />
</p>

{% configuration %}
watson_url:
  description: "The endpoint to which the service will connect."
  required: false
  type: string
  default: "`https://api.us-south.text-to-speech.watson.cloud.ibm.com`"
watson_apikey:
  description: "Your secret apikey generated on the IBM Cloud admin console."
  required: true
  type: string
voice:
  description: Voice name to be used.
  required: false
  type: string
  default: en-US_AllisonV3Voice
output_format:
  description: "Override the default output format. Supported formats: `audio/flac`, `audio/mp3`, `audio/mpeg`, `audio/ogg`, `audio/ogg;codecs=opus`, `audio/ogg;codecs=vorbis`, `audio/wav`"
  required: false
  type: string
  default: audio/mp3
{% endconfiguration %}

## Usage

Say to all `media_player` device entities:

```yaml
- action: tts.watson_tts_say
  data:
    message: "Hello from Watson"
```

or

```yaml
- action: tts.watson_tts_say
  data:
    message: >
      <speak>
          Hello from Watson
      </speak>
```

Say to the `media_player.living_room` device entity:

```yaml
- action: tts.watson_tts_say
  target:
    entity_id: media_player.living_room
  data:
    message: >
      <speak>
          Hello from Watson
      </speak>
```

Say with break:

```yaml
- action: tts.watson_tts_say
  data:
    message: >
      <speak>
          Hello from
          <break time=".9s" />
          Watson
      </speak>
```

Optionally, specify a voice for the message:

```yaml
- action: tts.watson_tts_say
  data:
    message: "Hello from Watson"
  options:
    voice: en-US_EmilyV3Voice
```
