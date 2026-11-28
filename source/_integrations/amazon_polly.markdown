---
description: Instructions on how to set up Amazon Polly text-to-speech with Home Assistant.
ha_release: 0.37
ha_domain: amazon_polly
related:
  - url: https://docs.aws.amazon.com/polly/latest/dg/what-is.html
    title: Amazon Polly documentation
  - docs: /integrations/tts/
    title: Text-to-speech
---

The **Amazon Polly** {% term integration %} uses [Amazon Polly](https://aws.amazon.com/polly/), the text-to-speech service from Amazon Web Services (AWS), to turn text into natural-sounding speech.

Use it to have Home Assistant read announcements and notifications aloud on your media players and voice assistants, in any of the dozens of languages and voices Polly offers.

Amazon Polly is a paid AWS service. A [free tier](https://aws.amazon.com/polly/pricing/) covers a number of characters each month for the first 12 months. After that, you pay per million characters converted.

## Prerequisites

To use this integration, you need an AWS account and an IAM access key that is allowed to use Amazon Polly.

1. Sign in to the [AWS Management Console](https://console.aws.amazon.com/) or create an AWS account.
2. In the IAM console, create a user for Home Assistant.
3. Attach the AWS managed policy [`AmazonPollyReadOnlyAccess`](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonPollyReadOnlyAccess.html) to the user. It includes the two actions the integration needs: `polly:DescribeVoices` and `polly:SynthesizeSpeech`.
4. Create an access key for the user and note down the **Access key ID** and **Secret access key**. For more information, see [Manage access keys for IAM users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).

Despite its name, `AmazonPollyReadOnlyAccess` also allows actions that Home Assistant doesn't use. None of them can change your AWS account:

- `polly:GetLexicon` and `polly:ListLexicons`: read your pronunciation lexicons.
- `polly:GetSpeechSynthesisTask` and `polly:ListSpeechSynthesisTasks`: read your asynchronous speech synthesis tasks.
- `polly:StartSpeechSynthesisStream`: stream synthesized speech.

{% details "Custom policy with only the required permissions" %}

To grant only what the integration needs, attach this policy to the user instead of `AmazonPollyReadOnlyAccess`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "polly:DescribeVoices",
        "polly:SynthesizeSpeech"
      ],
      "Resource": "*"
    }
  ]
}
```

{% enddetails %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Region:
  description: "The AWS region whose Amazon Polly service is used, for example `eu-west-2`. You can search the list by region name or ID. Not every voice and engine is available in every region. For details, see [Feature and region compatibility](https://docs.aws.amazon.com/polly/latest/dg/NTTS-main.html#ntts-regions). Defaults to `us-east-1`."
Access key ID:
  description: "The ID of the IAM access key you created in the [prerequisites](#prerequisites)."
Secret access key:
  description: "The secret of the IAM access key."
{% endconfiguration_basic %}

You can add the integration more than once, for example to use Amazon Polly in more than one region. Each entry creates its own text-to-speech entity.

To change the region or rotate the access key later, select **Reconfigure** from the integration entry's menu.

## Options

The options set the default voice and audio settings for the text-to-speech entity. To change them, follow these steps:

1. In Home Assistant, go to **{% my integrations title="Settings > Devices & services" %}** and select **Amazon Polly**.
2. If you added more than one region, choose the entry you want to change.
3. On the entry, select the cogwheel {% icon "mdi:cog-outline" %}.

   ![Screenshot of the Amazon Polly integration page, showing the cogwheel next to an entry under Services](/images/integrations/amazon_polly/options-cogwheel.png)

4. Edit the options, then select **Submit**. The integration reloads with the new settings.

{% configuration_basic %}
Voice:
  description: "The default voice. Its language becomes the default language of the entity. When the integration is loaded, the list shows the voices available in your region, with their language and gender. For an overview, see [Available voices](https://docs.aws.amazon.com/polly/latest/dg/available-voices.html). Defaults to `Joanna`."
Engine:
  description: "The default [Amazon Polly engine](https://docs.aws.amazon.com/polly/latest/dg/voice-engines-polly.html): `standard`, `neural`, `long-form`, or `generative`. The selected voice must support the engine. Defaults to `standard`."
Output format:
  description: "The audio format Amazon Polly returns: `mp3`, `ogg_vorbis`, or `pcm`. Defaults to `mp3`."
Sample rate:
  description: "The sample rate in Hz. `mp3` supports `8000`, `16000`, `22050`, and `24000`. `ogg_vorbis` supports `8000`, `16000`, and `22050`. `pcm` supports `8000` and `16000`. Leave empty to use the default for the output format: `22050` for `mp3` and `ogg_vorbis`, `16000` for `pcm`."
Text type:
  description: "Whether messages are plain `text` or [`ssml`](https://docs.aws.amazon.com/polly/latest/dg/ssml.html). With `ssml`, every message must be wrapped in `<speak></speak>` tags. Defaults to `text`."
{% endconfiguration_basic %}

## Supported functionality

### Text-to-speech

The integration creates one text-to-speech entity per configured region, named **Text-to-speech**. For example, for the `us-east-1` region, the entity is `tts.amazon_polly_us_east_1_text_to_speech`.

You can use the entity with the [**Speak**](/actions/tts.speak/) action, in media browsing, and as the text-to-speech engine of an [Assist voice assistant](/voice_control/).

The [**Speak**](/actions/tts.speak/) action accepts the following Amazon Polly options in its **Options** field. They override the defaults from the integration options for a single message.

{% configuration_basic %}
voice:
  description: "The ID of the voice to use, for example `Amy`. Set the action's **Language** to the voice's language as well, for example `en-GB` for `Amy`."
engine:
  description: "The engine to use: `standard`, `neural`, `long-form`, or `generative`. The voice must support the engine. If you don't set an engine and the voice doesn't support the default engine, the integration uses the best engine the voice supports, in this order: `neural`, `generative`, `long-form`, `standard`."
{% endconfiguration_basic %}

## Amazon Polly automation examples

Here are a few ideas for using Amazon Polly in your automations and scripts.

{% include docs/paste_yaml_tip.md %}

### Automation: Announce arrivals in a different voice

Greet someone with a British English generative voice when they arrive home.

- **Trigger**: Entered zone
  - **Target**: Person
- **Action**: Speak
  - **Target**: Amazon Polly text-to-speech entity

{% details "YAML example for announcing arrivals" %}

{% example %}
automation: |
  alias: "Announce arrivals"
  triggers:
    - trigger: zone
      entity_id: person.alex
      zone: zone.home
      event: enter
  actions:
    - action: tts.speak
      target:
        entity_id: tts.amazon_polly_us_east_1_text_to_speech
      data:
        media_player_entity_id: media_player.living_room
        message: "Welcome home, Alex."
        language: en-GB
        options:
          voice: Amy
          engine: generative
{% endexample %}

{% enddetails %}

### Automation: Add pauses and change speed with SSML

With the **Text type** option set to `ssml`, you can use [SSML tags](https://docs.aws.amazon.com/polly/latest/dg/supportedtags.html) to add pauses, change the speaking rate, or switch language in the middle of a sentence.

- **Trigger**: Time
- **Action**: Speak
  - **Target**: Amazon Polly text-to-speech entity

{% details "YAML example for an SSML morning announcement" %}

{% example %}
automation: |
  alias: "Morning announcement"
  triggers:
    - trigger: time
      at: "07:00:00"
  actions:
    - action: tts.speak
      target:
        entity_id: tts.amazon_polly_us_east_1_text_to_speech
      data:
        media_player_entity_id: media_player.kitchen
        message: >
          <speak>
            Good morning.
            <break time="1s"/>
            <prosody rate="85%">It's time to get ready.</prosody>
          </speak>
{% endexample %}

{% enddetails %}

## Data updates

The integration fetches the list of available voices from Amazon Polly when it starts. It contacts Amazon Polly again only when you request speech.

## Known limitations

- The voice and the language must match. If you pick a voice in the **Speak** action, also set the **Language** to that voice's language. Otherwise, the action fails with a message that the voice does not support the language.
- Not every voice supports every engine, and not every engine is available in every region. For details, see [Feature and region compatibility](https://docs.aws.amazon.com/polly/latest/dg/NTTS-main.html#ntts-regions).
- The integration only supports IAM access keys. AWS profiles and default credential chains, such as environment variables or instance roles, are not supported.
- If the integration is not loaded when you open the options, the voice list shows all known Amazon Polly voices, not only the ones in your region.

## Troubleshooting

{% details "Can't set up the integration" %}

### Symptom: "Invalid authentication"

When you try to set up the integration, the form shows **Invalid authentication**.

#### Description

AWS rejected the access key. The key may be incorrect, deactivated, or deleted, or the user may not have permission to use Amazon Polly.

#### Resolution

1. In the IAM console, check that the access key is active.
2. Make sure the user has a policy that allows `polly:DescribeVoices` and `polly:SynthesizeSpeech`. For an example, see the [prerequisites](#prerequisites).
3. If you no longer have the secret access key, create a new access key and enter it again.

### Symptom: "Amazon Polly is not available in this region"

#### Description

The region you entered is not one where Amazon Polly is offered.

#### Resolution

Select a region from the list. For an overview of supported regions, see [Amazon Polly endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/pol.html).

{% enddetails %}

{% details "Speaking fails with a voice or engine error" %}

### Symptom: "Voice does not support the engine" or "Voice does not support the language"

When you use the **Speak** action, it fails with a message that the voice does not support the engine or language.

#### Description

Each Amazon Polly voice has one language and supports only some engines.

#### Resolution

- Set the action's **Language** to the voice's language.
- Choose an engine that the voice supports, or remove the `engine` option to let the integration pick one.
- To check which engines a voice supports, see [Available voices](https://docs.aws.amazon.com/polly/latest/dg/available-voices.html).

{% enddetails %}

{% details "Home Assistant asks to reauthenticate" %}

### Symptom: A repair asks you to reauthenticate Amazon Polly

#### Description

AWS stopped accepting the access key, for example because it was rotated or deleted.

#### Resolution

Follow the repair and enter a valid access key. If needed, create a new access key in the IAM console first.

{% enddetails %}

## Migrating from YAML

Earlier versions set up Amazon Polly in your {% term "`configuration.yaml`" %} file with the `amazon_polly` platform under `tts:`. Setting up Amazon Polly with YAML is being removed.

- If your YAML configuration used an access key, Home Assistant imports it into the UI automatically, including the voice and audio settings, and shows a repair.
- If your YAML configuration used an AWS profile or the default AWS credentials, Home Assistant can't import it. A repair asks you to add the integration from the UI with an IAM access key.

To finish the migration:

1. Replace the `tts.amazon_polly_say` action in your automations and scripts with the [**Speak**](/actions/tts.speak/) action, targeting the new text-to-speech entity.
2. Remove the `amazon_polly` platform from your {% term "`configuration.yaml`" %} file.
3. Restart Home Assistant.

The `tts.amazon_polly_say` action keeps working until it is removed.

## Removing the integration

This integration follows standard integration removal.

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select **Amazon Polly**.
2. Under **Services**, next to the entry you want to remove, select the three dots {% icon "mdi:dots-vertical" %} menu. Then, select **Delete**.
3. To confirm, select **Delete**.
   - Home Assistant also deletes the text-to-speech entity of the entry.

After removing the integration, you can delete the access key or the IAM user you created for Home Assistant in the AWS IAM console.
