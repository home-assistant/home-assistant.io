---
layout: page
title: "AWS SNS"
description: "Instructions how to publish messages to AWS SNS from Home Assistant."
date: 2016-05-14 16:35
sidebar: true
comments: false
sharing: true
footer: true
logo: aws_sns.png
ha_category: Notifications
ha_release: 0.20
---

The AWS SNS notify platform enables publishing to an [AWS SNS](https://aws.amazon.com/sns/) topic or application.

### Configuration

```yaml
# Example configuration.yaml entry
notify:
  platform: aws_sns
  name: NOTIFIER_NAME
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

### Usage

AWS SNS is a notify platform and thus can be controlled by calling the notify service [as described here](/components/notify/). It will publish a message to all targets given in the notification payload. A target must be a SNS topic or endpoint ARN ([Amazon Resource Name](http://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html)). For more information, please see the [boto3 docs](http://boto3.readthedocs.io/en/latest/reference/services/sns.html#SNS.Client.publish).

The SNS event payload will contain everything passed in the service call payload. SNS payloads will be published as stringified JSON. All attributes from the payload except message will also be sent as stringified message attributes. Here is an example payload that would be sent to SNS:

```json
{
  "title": "Test message!",
  "target": "arn:aws:sns:us-east-1:123456789012:my_corporate_topic:02034b43-fefa-4e07-a5eb-3be56f8c54ce",
  "data": {
    "test": "okay"
  },
  "message": "Hello world!"
}
```
