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
---

The `amazon_polly` text-to-speech platform that works with [Amazon Polly](https://aws.amazon.com/polly/) to create the spoken output.
Polly is a paid service via Amazon Web Services.  There is a [free tier](https://aws.amazon.com/polly/pricing/) for the first 12 months and then a charge per million characters afterwards.

## Setup

For more information, please read the [AWS General Reference regarding Security Credentials](https://docs.aws.amazon.com/general/latest/gr/aws-security-credentials.html) to get the needed details. Also, check the [boto3 Documentation](https://boto3.readthedocs.io/en/latest/guide/configuration.html#shared-credentials-file) about the profiles and the [AWS Regions and Endpoints Reference](https://docs.aws.amazon.com/general/latest/gr/rande.html#pol_region) for available regions.

Available voices are listed in the [Amazon Documentation](https://docs.aws.amazon.com/polly/latest/dg/voicelist.html).

## Configuration

To get started, add the following lines to your `configuration.yaml` (example for Amazon Polly):

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
  description: A credentials profile name.
  required: false
  type: string
region_name:
  description: The region identifier to connect to.
  required: false
  type: [string, list]
  default: us-east-1
text_type:
  description: "Specify wherever to use text (default) or ssml markup by default."
  required: false
  type: string
  default: text
voice:
  description: Voice name to be used.
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
  description: "Override the default engine. Can be either of `standard` or `neural`. See Amazon documentation for compatible regions and voices."
  required: false
  type: string
  default: standard  
{% endconfiguration %}

## Usage

Say to all `media_player` device entities:

```yaml
- service: tts.amazon_polly_say
  data:
    message: "<speak>Hello from Amazon Polly</speak>"
```

or

```yaml
- service: tts.amazon_polly_say
  data:
    message: >
      <speak>
          Hello from Amazon Polly
      </speak>
```

Say to the `media_player.living_room` device entity:

```yaml
- service: tts.amazon_polly_say
  target:
    entity_id: media_player.living_room
    message: >
      <speak>
          Hello from Amazon Polly
      </speak>
```

Say with break:

```yaml
- service: tts.amazon_polly_say
  data:
    message: >
      <speak>
          Hello from
          <break time=".9s" />
          Amazon Polly
      </speak>
```
