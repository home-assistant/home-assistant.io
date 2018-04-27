---
layout: page
title: "Amazon Polly"
description: "Instructions on how to setup Amazon Polly with Home Assistant."
date: 2017-01-28 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: polly.png
ha_category: Text-to-speech
ha_release: 0.37
---

The `amazon_polly` text-to-speech platform that works with [Amazon Polly](https://aws.amazon.com/polly/) to create the spoken output.
Polly is a paid service via Amazon Web Services.  There is a [free tier](https://aws.amazon.com/polly/pricing/) for the first 12 months and then a charge per million characters afterwards.

To get started, add the following lines to your `configuration.yaml` (example for Amazon Polly):

```yaml
# Example configuration.yaml entry
tts:
  - platform: amazon_polly
    aws_access_key_id: AWS_ACCESS_KEY_ID
    aws_secret_access_key: AWS_SECRET_ACCESS_KEY
    profile_name: AWS_PROFILE
    region_name: 'us-east-1'
    voice: Joanna
```

Configuration variables:

| Parameter           | Value | Description |
|---------------------|----------|-------------|
| `aws_access_key_id` | Required |  Your AWS Access Key ID. For more information, please read the [AWS General Reference regarding Security Credentials](http://docs.aws.amazon.com/general/latest/gr/aws-security-credentials.html). If provided, you must also provide an `aws_secret_access_key` and must **not** provide a `profile_name` |
| `aws_secret_access_key` | Required | Your AWS Secret Access Key. For more information, please read the [AWS General Reference regarding Security Credentials](http://docs.aws.amazon.com/general/latest/gr/aws-security-credentials.html). If provided, you must also provide an `aws_access_key_id` and must **not** provide a `profile_name`. |
| `profile_name` | Optional | A credentials profile name. For more information, please see the [boto3 Documentation](http://boto3.readthedocs.io/en/latest/guide/configuration.html#shared-credentials-file) for more information. |
| `region_name` | Optional | The region identifier to connect to. The default is `us-east-1`. See the [AWS Regions and Endpoints Reference](https://docs.aws.amazon.com/general/latest/gr/rande.html#pol_region) for available regions. |
| `name` | Optional | Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`. |
| `text_type` | text/ssml    | text or ssml: Specify wherever to use text (default) or ssml markup by default. |
| `voice` | Optional | Voice name to be used. See the [Amazon Documentation](http://docs.aws.amazon.com/polly/latest/dg/voicelist.html) for available voices. |
| `output_format` | mp3/ogg_vorbis/pcm | Override the default output format, defaults to MP3. |
| `sample_rate` | 8000/16000/22050 | Override the default sample rate, defaults to 22050 for MP3 and Ogg Vorbis, 16000 for pcm. |
 
## Usage
Say to all `media_player` device entities:
```yaml
- service: tts.amazon_polly_say
  data_template:
    message: '<speak>Hello from Amazon Polly</speak>'
```
or
```yaml
- service: tts.amazon_polly_say
  data_template:
    message: >
      <speak>
          Hello from Amazon Polly
      </speak>
```

Say to the `media_player.living_room` device entity:

```yaml
- service: tts.amazon_polly_say
  data_template:
    entity_id: media_player.living_room
    message: >
      <speak>
          Hello from Amazon Polly
      </speak>
```

Say with break:

```yaml
- service: tts.amazon_polly_say
  data_template:
    message: >
      <speak>
          Hello from
          <break time=".9s" />
          Amazon Polly
      </speak>
```
