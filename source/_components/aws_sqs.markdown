---
layout: page
title: "AWS SQS"
description: "Instructions on how to publish messages to AWS SQS from Home Assistant."
date: 2016-05-14 16:35
sidebar: true
comments: false
sharing: true
footer: true
logo: aws_sqs.png
ha_category: Notifications
ha_release: "0.20"
---

The `aws_sqs` notification platform enables publishing to an [AWS SQS](https://aws.amazon.com/sqs/) message queue.

## {% linkable_title Setup %}

For more information, please read the [AWS General Reference regarding Security Credentials](http://docs.aws.amazon.com/general/latest/gr/aws-security-credentials.html) to get the needed details. Also, check the [boto3 Documentation](http://boto3.readthedocs.io/en/latest/guide/configuration.html#shared-credentials-file) about the profiles and the [AWS Regions and Endpoints Reference](https://docs.aws.amazon.com/general/latest/gr/rande.html#pol_region) for available regions.

## {% linkable_title Configuration %}

To use this notification platform in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: aws_sqs
    aws_access_key_id: AWS_ACCESS_KEY_ID
    aws_secret_access_key: AWS_SECRET_ACCESS_KEY
    region_name: 'us-east-1'
```

{% configuration %}
aws_access_key_id:
  description: Your AWS Access Key ID. If provided, you must also provide an `aws_secret_access_key` and must **not** provide a `profile_name`.
  required: Required if aws_secret_access_key is provided
  type: string
aws_secret_access_key:
  description: Your AWS Secret Access Key. If provided, you must also provide an `aws_access_key_id` and must **not** provide a `profile_name`.
  required: Required if aws_access_key_id is provided
  type: string
profile_name:
  description: A credentials profile name.
  required: false
  type: string
region_name:
  description: The region identifier to connect to.
  required: true
  default: us-east-1
  type: string
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`.
  required: false
  default: notify
  type: string
{% endconfiguration %}

### {% linkable_title Usage %}

AWS SQS is a notify platform and thus can be controlled by calling the notify service [as described here](/components/notify/). It will publish a message to the queue for all targets given in the notification payload. A target must be a SQS topic URL. For more information, please see the [SQS docs](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/ImportantIdentifiers.html).

The SQS event payload will contain everything passed in the service call payload. SQS payloads will be published as stringified JSON. All attributes from the payload except message will also be sent as stringified message attributes. Here is an example message that would be published to the SQS queue:

```json
{
  "title": "Test message!",
  "target": "http://sqs.us-east-1.amazonaws.com/123456789012/queue2",
  "data": {
    "test": "okay"
  },
  "message": "Hello world!"
}
```
