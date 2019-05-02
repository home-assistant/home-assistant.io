---
layout: page
title: "Google Cloud TTS"
description: "Google Cloud text-to-speach with Home Assistant."
date: 2019-05-02 12:08
sidebar: true
comments: false
sharing: true
footer: true
logo: google_cloud_tts.png
ha_category: Text-to-speech
ha_release: "0.92.3"
redirect_from:
  - /components/tts.google_cloud/
---

The `google_cloud_tts` text-to-speech platform uses [Google Cloud Text-to-Speech](https://cloud.google.com/text-to-speech/) engine to read a text with natural sounding voices.

> Google Cloud Text-to-Speech converts text into human-like speech in more than 100 voices across 20+ languages and variants. It applies groundbreaking research in speech synthesis (WaveNet) and Google's powerful neural networks to deliver high-fidelity audio. With this easy-to-use API, you can create lifelike interactions with your users that transform customer service, device interaction, and other applications.

## {% linkable_title Obtaining API Key %}
API Key obtaining process is described in [Google Cloud Text-to-Speach Quickstart guide](https://cloud.google.com/text-to-speech/docs/quickstart-protocol)
1. Visit [Cloud Resource Manager](https://console.cloud.google.com/cloud-resource-manager)
2. Click `CREATE PROJECT` button at the top
3. Specify convenient `Project name` and click `CREATE` button
4. [Make sure that billing is enabled for your Google Cloud Platform project](https://cloud.google.com/billing/docs/how-to/modify-project).
5. Enable the Cloud Text-to-Speech API visiting [this link](https://console.cloud.google.com/flows/enableapi?apiid=texttospeech.googleapis.com), selecting your `Project` from dropdown list and clicking `Continue` button.
6. Set up authentication:
    1. Visit [this link](https://console.cloud.google.com/apis/credentials/serviceaccountkey)
    2. From the `Service account` list, select `New service account`.
    3. In the `Service account name` field, enter any name.
    4. Don't select a value from the Role list. **No role is required to access this service**.
    5. Click `Create`. A note appears, warning that this service account has no role.
    6. Click `Create without role`. A JSON file that contains your `API Key` downloads to your computer.

## {% linkable_title Configuration %}

To use Google Cloud TTS you need to set `GOOGLE_APPLICATION_CREDENTIALS` envirement variable to point your API Key file your are going to use. You can do that just plcaing it under `config` folder and providing `key_file` parameter in `configuration.yaml`:

```yaml
# Example configuration.yaml entry
tts:
  - platform: google_cloud_tts
    key_file: googlecloudtts.json
```

{% configuration %}
key_file:
  description: "The [API Key](#obtaining-api-key) to use with Google Cloud Text-to-Speech. If not specified `os.environ['GOOGLE_APPLICATION_CREDENTIALS']` path will be used if set."
  required: false
  type: string
language:
  description: "Default language of the voice. Supported languages are `en`, `da`, `nl`, `fr`, `de`, `it`, `ja`, `ko`, `nb`, `pl`, `pt`, `ru`, `sk`, `es`, `sv`, `tr` and `uk`."
  required: false
  type: string
  default: "`en`"
gender:
  description: "Default gender of the voice. Supported genders are `Neutral`, `Female` and `Male`."
  required: false
  type: string
  default: "`Neutral`"
voice:
  description: "Default voice name. Supported voices described [here](https://cloud.google.com/text-to-speech/docs/voices)."
  required: false
  type: string
  default: "(None)"
{% endconfiguration %}

## {% linkable_title Full configuration example %}

The configuration sample below shows how an entry can look like:

```yaml
# Example configuration.yaml entry
tts:
  - platform: google_cloud_tts
    key_file: googlecloudtts.json
    language: en
    gender: Male
    voice: en-US-Wavenet-F
```
