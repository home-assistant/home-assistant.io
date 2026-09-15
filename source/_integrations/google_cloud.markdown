---
title: Google Cloud
description: Google Cloud Platform integration.
ha_category:
  - Speech-to-text
  - Text-to-speech
  - Voice
ha_release: 0.95
ha_config_flow: true
ha_iot_class: Cloud Push
ha_codeowners:
  - '@lufton'
  - '@tronikos'
ha_domain: google_cloud
ha_platforms:
  - stt
  - tts
ha_integration_type: service
---

The **Google Cloud** {% term integration %} allows you to use [Google Cloud Platform](https://cloud.google.com/) APIs and integrate them into Home Assistant.

{% include integrations/config_flow.md %}

## Obtaining service account file

1. Visit [Cloud Resource Manager](https://console.cloud.google.com/cloud-resource-manager).
2. Click `CREATE PROJECT` button at the top.
3. Specify convenient `Project name` and click `CREATE` button.
4. [Make sure that billing is enabled for your Google Cloud Platform project](https://cloud.google.com/billing/docs/how-to/modify-project).
5. Enable needed Cloud API visiting one of the links below or [APIs library](https://console.cloud.google.com/apis/library), selecting your `Project` from the dropdown list and clicking the `Continue` button:

    - [Text-to-speech](https://console.cloud.google.com/flows/enableapi?apiid=texttospeech.googleapis.com)
    - [Speech-to-text](https://console.cloud.google.com/flows/enableapi?apiid=speech.googleapis.com)

6. Set up authentication:

   1. Visit [this link](https://console.cloud.google.com/apis/credentials/serviceaccountkey)
   2. From the toolbar above the `Service account` list, select `Create service account`.
   3. In the `Service account name` field, enter any name.

      If you are setting up text-to-speech:

        1. Don't select a value from the Role list. **No role is required to access this service**.
        2. Click `Create`. If a note appears, warning that this service account has no role, you may ignore that.
        3. Return to the `Service account` list page and click on the service account you created to see the details for this service account.
        4. Choose the `Keys` tab within the details view for this service account.
        5. In the `Add Key` dropdown, select `Create New Key`.
        6. Specify a `JSON` key type and click `Create`.
        7. A `[serviceaccountname].json` file will download to your browser.
        8. Upload this file when asked in the integration setup.


## Google Cloud text-to-speech

[Google Cloud text-to-speech](https://cloud.google.com/text-to-speech/) converts text into human-like speech in [380+ voices across 50+ languages and variants](https://cloud.google.com/text-to-speech/docs/voices). It applies groundbreaking research in speech synthesis and Google's powerful neural networks to deliver high-fidelity audio. With this easy-to-use API, you can create lifelike interactions with your users that transform customer service, device interaction, and other applications.

### Pricing

The Cloud text-to-speech API is priced monthly based on the number of characters to synthesize into audio sent to the service. For up-to-date pricing, see [here](https://cloud.google.com/text-to-speech/pricing).

### Text-to-speech configuration

The following settings can be configured in the integration options and in the **Options** field of the [**Speak**](/actions/tts.speak/) action.

{% configuration %}
encoding:
  description: "Default audio encoding. For supported values, see the [Google Cloud text-to-speech API reference](https://cloud.google.com/text-to-speech/docs/reference/rest/v1/AudioEncoding)."
  required: false
  type: string
  default: mp3
gain:
  description: >
    Default volume gain, in decibels. Supported values range from `-96.0` to `16.0`.
    If unset, or set to a value of 0.0 (dB), it plays at normal native signal amplitude.
    A value of `-6.0` (dB) plays at approximately half the amplitude of the normal native signal amplitude.
    A value of `+6.0` (dB) plays at approximately twice the amplitude of the normal native signal amplitude.
    We strongly recommend not to exceed `+10` (dB), as there's usually no effective increase in loudness for any value greater than that.
  required: false
  type: float
  default: 0.0
gender:
  description: "Default voice gender. For supported voices and genders, see the [Google Cloud text-to-speech voices documentation](https://cloud.google.com/text-to-speech/docs/voices)."
  required: false
  type: string
  default: neutral
language:
  description: "Default language of the voice, for example, `en-US`. For supported languages, see the [Google Cloud text-to-speech voices documentation](https://cloud.google.com/text-to-speech/docs/voices)."
  required: false
  type: string
  default: en-US
pitch:
  description: "Default pitch of the voice. Supported values range from `-20.0` to `20.0`."
  required: false
  type: float
  default: 0.0
profiles:
  description: "Default audio profiles to apply. For supported values, see the [Google Cloud audio profiles documentation](https://cloud.google.com/text-to-speech/docs/audio-profiles)."
  required: false
  type: list
  default: []
speed:
  description: "Default speaking rate of the voice. Supported values range from `0.25` to `4.0`."
  required: false
  type: float
  default: 1.0
text_type:
  description: "Default text type. Use `text` or `ssml`. For more information, see the [Google Cloud SSML documentation](https://cloud.google.com/text-to-speech/docs/ssml)."
  required: false
  type: string
  default: "text"
voice:
  description: "Default voice name, for example, `en-US-Wavenet-F`. This overrides `language` and `gender` when set. For supported voices, see the [Google Cloud text-to-speech voices documentation](https://cloud.google.com/text-to-speech/docs/voices)."
  required: false
  type: string
{% endconfiguration %}

### Using Google Cloud text-to-speech in automations

To play a message from an automation or script, use the [**Speak**](/actions/tts.speak/) action and select your Google Cloud text-to-speech entity as the target.

To speak a message from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you are setting up a new automation, add a trigger in the **When** section. Scripts do not need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target**, select your Google Cloud text-to-speech entity.
6. From the actions shown for that target, select **Speak**. To use Google Cloud-specific settings, set them in **Options**. For supported options, see [Text-to-speech configuration](#text-to-speech-configuration).
7. Select the **Media player entity** to play the message on, set the **Message**, and set any other options you want to use.
8. Select **Save**.

If you still use the legacy Google Cloud text-to-speech platform in `configuration.yaml`, use the [**Say a TTS message**](/actions/tts.say/) action. In YAML, the legacy Google Cloud action is `tts.google_cloud_say`.

## Google Cloud speech-to-text

[Google Cloud speech-to-text](https://cloud.google.com/speech-to-text) converts audio into text transcriptions for [125 languages and variants](https://cloud.google.com/speech-to-text/docs/speech-to-text-supported-languages).

### Pricing

Speech-to-text is priced based on the amount of audio successfully processed by the service each month, measured in increments of one second. For up-to-date pricing, see [here](https://cloud.google.com/speech-to-text/pricing) under the Speech-to-text v1 API.

### Speech-to-text configuration

{% configuration %}
stt_model:
  description: "One of the transcription models [here](https://cloud.google.com/speech-to-text/docs/transcription-model). Defaults to `latest_short` because this is the recommended one. If you get: `400 Invalid recognition 'config': The requested model is currently not supported for language : <language code>` try changing this to the legacy `command_and_search`."
  required: false
  type: string
{% endconfiguration %}
