---
title: Google Cloud Platform
description: Google Cloud Platform integration.
ha_category: Text-to-speech
ha_release: 0.95
ha_iot_class: Cloud Push
ha_codeowners:
  - '@lufton'
ha_domain: google_cloud
---

The `google_cloud` platform allows you to use [Google Cloud Platform](https://cloud.google.com/) API and integrate them into Home Assistant.

## Configuration

To use Google Cloud Platform, you need to provide `config` directory relative path of [`API key`](#obtaining-an-api-key) file you are going to use. Place it under `config` folder and set `key_file` parameter in `configuration.yaml`:

```yaml
# Example configuration.yaml entry
tts:
  - platform: google_cloud
    key_file: googlecloud.json
```

## Obtaining an API key

API key obtaining process described in corresponding documentation:

* [Text-to-Speech](https://cloud.google.com/text-to-speech/docs/quickstart-protocol)
* [Speech-to-Text](https://cloud.google.com/speech-to-text/docs/quickstart-protocol)
* [Geocoding](https://developers.google.com/maps/documentation/geocoding/start)

Basic instruction for all APIs:

1. Visit [Cloud Resource Manager](https://console.cloud.google.com/cloud-resource-manager).
2. Click `CREATE PROJECT` button at the top.
3. Specify convenient `Project name` and click `CREATE` button.
4. [Make sure that billing is enabled for your Google Cloud Platform project](https://cloud.google.com/billing/docs/how-to/modify-project).
5. Enable needed Cloud API visiting one of the links below or [APIs library](https://console.cloud.google.com/apis/library), selecting your `Project` from the dropdown list and clicking the `Continue` button:

    * [Text-to-Speech](https://console.cloud.google.com/flows/enableapi?apiid=texttospeech.googleapis.com)
    * [Speech-to-Text](https://console.cloud.google.com/flows/enableapi?apiid=speech.googleapis.com)
    * [Geocoding](https://console.cloud.google.com/flows/enableapi?apiid=geocoding-backend.googleapis.com)

6. Set up authentication:

    1. Visit [this link](https://console.cloud.google.com/apis/credentials/serviceaccountkey)
    2. From the `Service account` list, select `New service account`.
    3. In the `Service account name` field, enter any name.

    If you are requesting Text-to-Speech API key:

    4. Don't select a value from the Role list. **No role is required to access this service**.
    5. Click `Create`. A note appears, warning that this service account has no role.
    6. Click `Create without role`. A JSON file that contains your `API key` downloads to your computer.

## Google Cloud Text-to-Speech

[Google Cloud Text-to-Speech](https://cloud.google.com/text-to-speech/) converts text into human-like speech in more than 100 voices across 20+ languages and variants. It applies groundbreaking research in speech synthesis (WaveNet) and Google's powerful neural networks to deliver high-fidelity audio. With this easy-to-use API, you can create lifelike interactions with your users that transform customer service, device interaction, and other applications.

### Pricing

The Cloud Text-to-Speech API is priced monthly based on the amount of characters to synthesize into audio sent to the service.

| Feature                       | Monthly free tier         | Paid usage                        |
|-------------------------------|---------------------------|-----------------------------------|
| Standard (non-WaveNet) voices | 0 to 4 million characters | $4.00 USD / 1 million characters  |
| WaveNet voices                | 0 to 1 million characters | $16.00 USD / 1 million characters |

### SSML

This integration allows the use of [Speech Synthesis Markup Language (SSML)](https://cloud.google.com/text-to-speech/docs/ssml) to allow for more customization in your audio response by providing details on pauses, and audio formatting for acronyms, dates, times, abbreviations, or text that should be censored. Check the example below (based on Google's documentation example) and [Google's SSML tutorial](https://cloud.google.com/text-to-speech/docs/ssml-tutorial) to learn how to use it.

```yaml
service: tts.google_cloud_say
entity_id: "all"
data:
  message: >
    <speak>
      Here are <say-as interpret-as="characters">SSML</say-as> samples.
      I can pause <break time="3s"/>.
      I can play a sound
      <audio src="https://www.example.com/MY_MP3_FILE.mp3">didn't get your MP3 audio file</audio>.
      I can speak in cardinals. Your number is <say-as interpret-as="cardinal">10</say-as>.
      Or I can speak in ordinals. You are <say-as interpret-as="ordinal">10</say-as> in line.
      Or I can even speak in digits. The digits for ten are <say-as interpret-as="characters">10</say-as>.
      I can also substitute phrases, like the <sub alias="World Wide Web Consortium">W3C</sub>.
      Finally, I can speak a paragraph with two sentences.
      <p><s>This is sentence one.</s><s>This is sentence two.</s></p>
    </speak>
```

### Text-to-Speech configuration

{% configuration %}
key_file:
  description: "The [`API key`](#obtaining-an-api-key) file to use with Google Cloud Platform. If not specified `os.environ['GOOGLE_APPLICATION_CREDENTIALS']` path will be used."
  required: false
  type: string
language:
  description: "Default language of the voice, e.g.,  `en-US`. Supported languages, genders and voices listed [here](https://cloud.google.com/text-to-speech/docs/voices). Also there are extra not documented but supported languages (see dropdown [here](https://cloud.google.com/text-to-speech/#streaming_demo_section))."
  required: false
  type: string
  default: en-US
gender:
  description: "Default gender of the voice, e.g.,  `male`. Supported languages, genders and voices listed [here](https://cloud.google.com/text-to-speech/docs/voices)."
  required: false
  type: string
  default: neutral
voice:
  description: "Default voice name, e.g.,  `en-US-Wavenet-F`. Supported languages, genders and voices listed [here](https://cloud.google.com/text-to-speech/docs/voices). **Important! This parameter will override `language` and `gender` parameters if set**."
  required: false
  type: string
encoding:
  description: "Default audio encoder. Supported encodings are `ogg_opus`, `mp3` and `linear16`."
  required: false
  type: string
  default: mp3
speed:
  description: "Default rate/speed of the voice, in the range [0.25, 4.0]. 1.0 is the normal native speed supported by the specific voice. 2.0 is twice as fast, and 0.5 is half as fast. If unset(0.0), defaults to the native 1.0 speed."
  required: false
  type: float
  default: 1.0
pitch:
  description: "Default pitch of the voice, in the range [-20.0, 20.0]. 20 means increase of 20 semitones from the original pitch. -20 means decrease of 20 semitones from the original pitch."
  required: false
  type: float
  default: 0.0
gain:
  description: "Default volume gain (in dB) of the voice, in the range [-96.0, 16.0]. If unset, or set to a value of 0.0 (dB), will play at normal native signal amplitude. A value of -6.0 (dB) will play at approximately half the amplitude of the normal native signal amplitude. A value of +6.0 (dB) will play at approximately twice the amplitude of the normal native signal amplitude. Strongly recommend not to exceed +10 (dB) as there's usually no effective increase in loudness for any value greater than that."
  required: false
  type: float
  default: 0.0
profiles:
  description: "An identifier which selects 'audio effects' profiles that are applied on (post synthesized) text to speech. Effects are applied on top of each other in the order they are given. Supported profile ids listed [here](https://cloud.google.com/text-to-speech/docs/audio-profiles)."
  required: false
  type: list
  default: "[]"
{% endconfiguration %}

### Full configuration example

The Google Cloud Text-to-Speech configuration can look like:

```yaml
# Example configuration.yaml entry
tts:
  - platform: google_cloud
    key_file: googlecloud.json
    language: en-US
    gender: male
    voice: en-US-Wavenet-F
    encoding: linear16
    speed: 0.9
    pitch: -2.5
    gain: -5.0
    profiles:
      - telephony-class-application
      - wearable-class-device
```
