---
layout: page
title: "Amazon Polly"
description: "Instructions how to setup Amazon Polly with Home Assistant."
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

To enable text-to-speech with Amazon Polly, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
tts:
  - platform: amazon_polly
    aws_access_key_id: AWS_ACCESS_KEY_ID
    aws_secret_access_key: AWS_SECRET_ACCESS_KEY
    profile_name: AWS_PROFILE
    region_name: 'us-east-1'
```

Configuration variables:

- **aws_access_key_id** (*Required if aws_secret_access_key is provided*): Your AWS Access Key ID. For more information, please read the [AWS General Reference regarding Security Credentials](http://docs.aws.amazon.com/general/latest/gr/aws-security-credentials.html). If provided, you must also provide an `aws_secret_access_key` and must **not** provide a `profile_name`.
- **aws_secret_access_key** (*Required if aws_access_key_id is provided*): Your AWS Secret Access Key. For more information, please read the [AWS General Reference regarding Security Credentials](http://docs.aws.amazon.com/general/latest/gr/aws-security-credentials.html). If provided, you must also provide an `aws_access_key_id` and must **not** provide a `profile_name`.
- **profile_name** (*Optional*): A credentials profile name. For more information, please see the [boto3 documentation section about credentials](http://boto3.readthedocs.io/en/latest/guide/configuration.html#shared-credentials-file).
- **region_name** (*Required*): The region identifier to connect to. The default is `us-east-1`.
- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.

