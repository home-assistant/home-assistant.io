---
title: Google Cloud Platform
description: Google Cloud Platform integration.
ha_category:
  - Text-to-speech
ha_release: 0.95
ha_iot_class: Cloud Push
ha_codeowners:
  - '@lufton'
ha_domain: google_cloud
ha_platforms:
  - tts
ha_integration_type: integration
---

The `google_cloud` platform allows you to use [Google Cloud Platform](https://cloud.google.com/) API and integrate them into Home Assistant.

## Configuration

To use Google Cloud Platform, you need to provide `config` directory relative path of [`API key`](#obtaining-an-api-key) file you are going to use. Place it under `config` folder and set `key_file` parameter in {% term "`configuration.yaml`" %}:

```yaml
# Example configuration.yaml entry
tts:
  - platform: google_cloud
    key_file: googlecloud.json
```

## Obtaining an API key

API key obtaining process described in corresponding documentation:

- [Text-to-speech](https://cloud.google.com/text-to-speech/docs/quickstart-protocol)
- [Speech-to-text](https://cloud.google.com/speech-to-text/docs/quickstart-protocol)
- [Geocoding](https://developers.google.com/maps/documentation/geocoding/start)

Basic instruction for all APIs:

1. Visit [Cloud Resource Manager](https://console.cloud.google.com/cloud-resource-manager).
2. Click `CREATE PROJECT` button at the top.
3. Specify convenient `Project name` and click `CREATE` button.
4. [Make sure that billing is enabled for your Google Cloud Platform project](https://cloud.google.com/billing/docs/how-to/modify-project).
5. Enable needed Cloud API visiting one of the links below or [APIs library](https://console.cloud.google.com/apis/library), selecting your `Project` from the dropdown list and clicking the `Continue` button:


    - [Text-to-speech](https://console.cloud.google.com/flows/enableapi?apiid=texttospeech.googleapis.com)
    - [Speech-to-text](https://console.cloud.google.com/flows/enableapi?apiid=speech.googleapis.com)
    - [Geocoding](https://console.cloud.google.com/flows/enableapi?apiid=geocoding-backend.googleapis.com)
6. Set up authentication:

    1. Visit [this link](https://console.cloud.google.com/apis/credentials/serviceaccountkey)
    2. From the toolbar above the `Service account` list, select `Create service account`.
    3. In the `Service account name` field, enter any name.

    If you are requesting a text-to-speech API key:

    4. Don't select a value from the Role list. **No role is required to access this service**.
    5. Click `Create`. If a note appears, warning that this service account has no role, you may ignore that.
    6. Return to the `Service account` list page and click on the service account you created in step 5 to see the details for this service account.
    7. Choose the `Keys` tab within the details view for this service account.
    8. In the `Add Key` dropdown, select `Create New Key`.
    9. Specify a `JSON` key type  and click `Create`.
    10. A `[serviceaccountname].json` file will download to your browser.


## Google Cloud text-to-speech

[Google Cloud text-to-speech](https://cloud.google.com/text-to-speech/) converts text into human-like speech in more than 100 voices across 20+ languages and variants. It applies groundbreaking research in speech synthesis (WaveNet) and Google's powerful neural networks to deliver high-fidelity audio. With this easy-to-use API, you can create lifelike interactions with your users that transform customer service, device interaction, and other applications.

### Pricing

The Cloud text-to-speech API is priced monthly based on the amount of characters to synthesize into audio sent to the service.

| Voice              | Monthly free tier         | Paid usage                        |
| ------------------ | ------------------------- | --------------------------------- |
| Neural2            | 0 to 1 million bytes      | $16.00 USD / 1 million bytes      |
| Polyglot (Preview) | 0 to 1 million bytes      | $16.00 USD / 1 million bytes      |
| Studio (Preview)   | 0 to 100 thousand bytes   | $160.00 USD / 1 million bytes     |
| Standard           | 0 to 4 million characters | $4.00 USD / 1 million characters  |
| WaveNet            | 0 to 1 million characters | $16.00 USD / 1 million characters |

### Text-to-speech configuration

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
  description: "An identifier which selects 'audio effects' profiles that are applied on (post synthesized) text-to-speech. Effects are applied on top of each other in the order they are given. Supported profile ids listed [here](https://cloud.google.com/text-to-speech/docs/audio-profiles)."
  required: false
  type: list
  default: "[]"
text_type:
  description: "Default text type. Supported text types are `text` and `ssml`. Read more on what is that and how to use SSML [here](https://cloud.google.com/text-to-speech/docs/ssml)."
  required: false
  type: string
  default: "text"
{% endconfiguration %}

### Full configuration example

The Google Cloud text-to-speech configuration can look like:

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
    text_type: ssml
    profiles:
      - telephony-class-application
      - wearable-class-device
```
