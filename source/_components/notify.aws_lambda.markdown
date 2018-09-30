---
layout: page
title: "AWS Lambda"
description: "Instructions on how to invoke AWS Lambda functions from Home Assistant."
date: 2016-05-14 16:35
sidebar: true
comments: false
sharing: true
footer: true
logo: aws_lambda.png
ha_category: Notifications
ha_release: "0.20"
---

The `aws_lambda` notification platform enables invoking [AWS Lambda](https://aws.amazon.com/lambda/) functions.

To use this notification platform in your installation, add the following to your `configuration.yaml` file:

### Configuration

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: aws_lambda
    aws_access_key_id: AWS_ACCESS_KEY_ID
    aws_secret_access_key: AWS_SECRET_ACCESS_KEY
    region_name: 'us-east-1'
```

Configuration variables:

- **aws_access_key_id** (*Required if aws_secret_access_key is provided*): Your AWS Access Key ID. For more information, please read the [AWS General Reference regarding Security Credentials](http://docs.aws.amazon.com/general/latest/gr/aws-security-credentials.html). If provided, you must also provide an `aws_secret_access_key` and must **not** provide a `profile_name`.
- **aws_secret_access_key** (*Required if aws_access_key_id is provided*): Your AWS Secret Access Key. For more information, please read the [AWS General Reference regarding Security Credentials](http://docs.aws.amazon.com/general/latest/gr/aws-security-credentials.html). If provided, you must also provide an `aws_access_key_id` and must **not** provide a `profile_name`.
- **profile_name** (*Optional*): A credentials profile name. For more information, please see the [boto3 documentation section about credentials](http://boto3.readthedocs.io/en/latest/guide/configuration.html#shared-credentials-file).
- **region_name** (*Required*): The region identifier to connect to. The default is `us-east-1`.
- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- **context** (*Optional*): An optional dictionary you can provide to pass custom context through to the Lambda function. The `context` dictionary (if any) is combined with the same data available at the `/api/config` HTTP API route.

### {% linkable_title Usage %}

AWS Lambda is a notify platform and thus can be controlled by calling the notify service [as described here](/components/notify/). It will invoke a Lambda for all targets given in the notification payload. A target can be formatted as a function name, an entire ARN ([Amazon Resource Name](http://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html)) or a partial ARN. For more information, please see the [boto3 docs](http://boto3.readthedocs.io/en/latest/reference/services/lambda.html#Lambda.Client.invoke).

The Lambda event payload will contain everything passed in the service call payload. Here is an example payload that would be sent to Lambda:

```json
{
  "title": "Test message!",
  "target": "arn:aws:lambda:us-east-1:123456789012:function:ProcessKinesisRecords",
  "data": {
    "test": "okay"
  },
  "message": "Hello world!"
}
```

The context will look like this:

```json
{
  "hass": {
    "components": ["recorder", "logger", "http", "logbook", "api", "frontend"],
    "latitude": 44.1234,
    "location_name": "Home",
    "longitude": 5.5678,
    "unit_system": "metric",
    "time_zone": "Europe/Zurich",
    "version": "0.20.0.dev0"
  },
  "custom": {
    "two": "three",
    "test": "one"
  }
}
```
