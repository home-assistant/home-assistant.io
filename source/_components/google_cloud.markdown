---
layout: page
title: "Google Cloud Platform"
description: "Google Cloud Platform integration."
date: 2019-05-02 12:08
sidebar: true
comments: false
sharing: true
footer: true
logo: google_cloud.png
ha_category: Text-to-speech
ha_release: 0.93
---

The `google_cloud` platform allow you to use [Google Cloud Platform](https://cloud.google.com/) API and integrate them into Home Assistant.

## {% linkable_title Platform configuration %}

To use Google Cloud Platform you need to provide `config` directory relative path of [`API key`](#obtaining-api-key) file you are going to use. Place it under `config` folder and set `key_file` parameter in `configuration.yaml`:

```yaml
# Example configuration.yaml entry
tts:
  - platform: google_cloud
    key_file: googlecloud.json
```

## {% linkable_title Obtaining API key %}
API key obtaining process described in corresponding documentation:
* [Text-to-Speach](https://cloud.google.com/text-to-speech/docs/quickstart-protocol)
* [Speach-to-Text](https://cloud.google.com/speech-to-text/docs/quickstart-protocol)
* [Geocoding](https://cloud.google.com/translate/docs/quickstart)

Basic instruction for all APIs:
1. Visit [Cloud Resource Manager](https://console.cloud.google.com/cloud-resource-manager).
2. Click `CREATE PROJECT` button at the top.
3. Specify convenient `Project name` and click `CREATE` button.
4. [Make sure that billing is enabled for your Google Cloud Platform project](https://cloud.google.com/billing/docs/how-to/modify-project).
5. Enable needed Cloud API visiting one of the links below or [APIs library](https://console.cloud.google.com/apis/library), selecting your `Project` from dropdown list and clicking `Continue` button:
    * [Text-to-Speech](https://console.cloud.google.com/flows/enableapi?apiid=texttospeech.googleapis.com)
    * [Speech-to-Text](https://console.cloud.google.com/flows/enableapi?apiid=speech.googleapis.com)
    * [Geocoding](https://console.cloud.google.com/flows/enableapi?apiid=geocoding-backend.googleapis.com)
6. Set up authentication:
    1. Visit [this link](https://console.cloud.google.com/apis/credentials/serviceaccountkey)
    2. From the `Service account` list, select `New service account`.
    3. In the `Service account name` field, enter any name.

    If you are requsting Text-to-Speech API key:

    4. Don't select a value from the Role list. **No role is required to access this service**.
    5. Click `Create`. A note appears, warning that this service account has no role.
    6. Click `Create without role`. A JSON file that contains your `API key` downloads to your computer.

## {% linkable_title Google Cloud Text-to-Speech %}

[Google Cloud Text-to-Speech](https://cloud.google.com/text-to-speech/) converts text into human-like speech in more than 100 voices across 20+ languages and variants. It applies groundbreaking research in speech synthesis (WaveNet) and Google's powerful neural networks to deliver high-fidelity audio. With this easy-to-use API, you can create lifelike interactions with your users that transform customer service, device interaction, and other applications.

### {% linkable_title Pricing %}

The Cloud Text-to-Speech API is priced monthly based on the amount of characters to synthesize into audio sent to the service.

| Feature                       | Monthly free tier         | Paid usage                        |
|-------------------------------|---------------------------|-----------------------------------|
| Standard (non-WaveNet) voices | 0 to 4 million characters | $4.00 USD / 1 million characters  |
| WaveNet voices                | 0 to 1 million characters | $16.00 USD / 1 million characters |

### {% linkable_title Text-to-Speach configuration %}

{% configuration %}
key_file:
  description: "The [`API key`](#obtaining-api-key) file to use with Google Cloud Platform. If not specified `os.environ['GOOGLE_APPLICATION_CREDENTIALS']` path will be used."
  required: false
  type: string
language:
  description: "Default language of the voice, e.g. `en`. Supported languages, genders and voices listed [here](https://cloud.google.com/text-to-speech/docs/voices)."
  required: false
  type: string
  default: "`en`"
gender:
  description: "Default gender of the voice, e.g. `Male`. Supported languages, genders and voices listed [here](https://cloud.google.com/text-to-speech/docs/voices)."
  required: false
  type: string
  default: "`Neutral`"
voice:
  description: "Default voice name, e.g. `en-US-Wavenet-F`. Supported languages, genders and voices listed [here](https://cloud.google.com/text-to-speech/docs/voices)."
  required: false
  type: string
  default: "(None)"
encoding:
  description: "Default audio encoder. Supported encodings are `ogg`, `mp3` and `wav`."
  required: false
  type: string
  default: "ogg"
{% endconfiguration %}

### {% linkable_title Full configuration example %}

The Google Cloud Text-to-Speech configuration can look like:

```yaml
# Example configuration.yaml entry
tts:
  - platform: google_cloud
    key_file: googlecloud.json
    language: en
    gender: Male
    voice: en-US-Wavenet-F
    encoding: mp3
```
