---
title: Amazon Polly
description: Instructions on how to setup Amazon Polly with Home Assistant.
ha_category:
  - Text-to-speech
ha_release: 0.37
ha_domain: amazon_polly
ha_iot_class: Cloud Push
ha_platforms:
  - tts
ha_integration_type: integration
ha_codeowners:
  - '@jschlyter'
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `amazon_polly` text-to-speech platform that works with [Amazon Polly](https://aws.amazon.com/polly/) to create the spoken output.
Polly is a paid service via Amazon Web Services.  There is a [free tier](https://aws.amazon.com/polly/pricing/) for the first 12 months and then a charge per million characters afterwards.

## Setup

For more information, please read the [AWS General Reference regarding Security Credentials](https://docs.aws.amazon.com/IAM/latest/UserGuide/security-creds.html) to get the needed details. Also, check the [boto3 Documentation](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/credentials.html#shared-credentials-file) about the profiles and the [AWS Regions and Endpoints Reference](https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints) for available regions.

Available voices are listed in the [Amazon Documentation](https://docs.aws.amazon.com/polly/latest/dg/voicelist.html).

## Configuration

To get started, add the following lines to your {% term "`configuration.yaml`" %} file (example for Amazon Polly).
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
tts:
  - platform: amazon_polly
    aws_access_key_id: AWS_ACCESS_KEY_ID
    aws_secret_access_key: AWS_SECRET_ACCESS_KEY
```

{% configuration %}
aws_access_key_id:
  description: "Your AWS Access Key ID. If provided, you must also provide an `aws_secret_access_key` and must **not** provide a `profile_name`."
  required: true
  type: string
aws_secret_access_key:
  description: "Your AWS Secret Access Key. If provided, you must also provide an `aws_access_key_id` and must **not** provide a `profile_name`."
  required: true
  type: string
profile_name:
  description: A credentials profile name. If provided, you must **not** provide an `aws_access_key_id` nor an `aws_secrete_access_key`. 
  required: false
  type: string
region_name:
  description: The region identifier to connect to.
  required: false
  type: string
  default: us-east-1
text_type:
  description: "Whether to interpret messages as `text` or as [`ssml`](https://docs.aws.amazon.com/polly/latest/dg/ssml.html) by default."
  required: false
  type: string
  default: text
voice:
  description: The [Voice Name/ID](https://docs.aws.amazon.com/polly/latest/dg/voicelist.html) to be used for generated speech by default. 
  required: false
  type: string
output_format:
  description: "Override the default output format. Either `mp3`, `ogg_vorbis` or `pcm`."
  required: false
  type: string
  default: mp3
sample_rate:
  description: "Override the default sample rate. Possible values are: 8000, 16000, 22050, 24000."
  required: false
  type: string
  default:  22050 for MP3 and Ogg Vorbis, 16000 for pcm
engine:
  description: "Override the default engine. Can be either of [`standard`](https://docs.aws.amazon.com/polly/latest/dg/standard-voices.html), [`neural`](https://docs.aws.amazon.com/polly/latest/dg/neural-voices.html), [`long-form`](https://docs.aws.amazon.com/polly/latest/dg/long-form-voices.html) or [`generative`](https://docs.aws.amazon.com/polly/latest/dg/generative-voices.html). See Amazon documentation for compatible regions and voices."
  required: false
  type: string
  default: standard  
{% endconfiguration %}

## Usage

Say to all `media_player` device entities:

```yaml
- action: tts.amazon_polly_say
  data:
    message: "<speak>Hello from Amazon Polly</speak>"
```

or

```yaml
- action: tts.amazon_polly_say
  data:
    message: >
      <speak>
          Hello from Amazon Polly
      </speak>
```

Say to the `media_player.living_room` device entity:

```yaml
- action: tts.amazon_polly_say
  target:
    entity_id: media_player.living_room
    message: >
      <speak>
          Hello from Amazon Polly
      </speak>
```

Say with break:

```yaml
- action: tts.amazon_polly_say
  data:
    message: >
      <speak>
          Hello from
          <break time=".9s" />
          Amazon Polly
      </speak>
```

Say with specific voice and engine as options:

```yaml
- service: tts.amazon_polly_say
  data:
    message: "Hello from Amazon Polly"
    entity_id: media_player.living_room
    language: en-GB
    options:
      voice: Amy
      engine: generative
```


## Advanced usage
Amazon Polly supports accented bilingual voices and you may find that you'd prefer the voice you like be slowed down, or speeded up. If the speed of the voice is a concern, Amazon Polly provides the ability to modify this using SSML tags. First enable SSML in configuration:

```yaml
  - platform: amazon_polly
    ...
    text_type: ssml
    ...
```

Note: You now need to enclose all new and previous TTS input within the `<speak></speak>` tags. To use SSML in automation, you can follow these steps, for instance:

```yaml
action: tts.amazon_polly_say
data:
  cache: true
  entity_id: media_player.mpd
  message: >-
    <speak> <prosody rate="75%">나는  <prosody rate="75%">천천히</prosody> <lang
    xml:lang="fr-FR">parle</lang>.하고 있다식기세척!</speak>
  language: ko-KR
```
