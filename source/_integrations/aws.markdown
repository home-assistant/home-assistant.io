---
title: Amazon Web Services (AWS)
description: Instructions on how to integrate Amazon Web Services with Home Assistant.
ha_category:
  - Notifications
ha_iot_class: Cloud Push
ha_release: '0.91'
ha_domain: aws
ha_platforms:
  - notify
ha_integration_type: integration
---

The `aws` integration provides a single place to interact with [Amazon Web Services](https://aws.amazon.com/). Currently it provides a notification platform that can send a message to [AWS SQS](https://aws.amazon.com/sqs/), [AWS SNS](https://aws.amazon.com/sns/), or invoke [AWS Lambda](https://aws.amazon.com/lambda/) functions.

## Setup

You have to have an AWS account to use Amazon Web Services, create one [here](https://aws.amazon.com/free/) with a 12 months free tier benefit. Please note, even in the first 12-months, you may still be billed if you use more resources than offered in the free tier. We advise you to monitor your costs in the [AWS Billing Console](https://console.aws.amazon.com/billing/) closely. You can read the [Control your AWS costs](https://aws.amazon.com/getting-started/tutorials/control-your-costs-free-tier-budgets/) guide for more information.

The `lambda`, `sns` and `sqs` services, used in the `aws` component, all provide an **Always Free** tier for all users even after the 12-month period. The general usage in Home Automation will most likely not reach the free tier limit. Please read [Lambda Pricing](https://aws.amazon.com/lambda/pricing/), [SNS Pricing](https://aws.amazon.com/sns/pricing/) and [SQS Pricing](https://aws.amazon.com/sqs/pricing/) for more details.

The `aws` integration is using [botocore](https://botocore.amazonaws.com/v1/documentation/api/latest/index.html) to communicate with Amazon Web Services, which is also used by the [AWS Command Client Interface](https://aws.amazon.com/cli/) tool. Therefore, `aws` shares the same credential and profiles with `awscli` tool. Please read [Configuring the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) to learn how to get access keys and how to manage them on your local system securely.

## Configuration

To use the `aws` integration and the `notify` platform in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
aws:
  credentials:
    - name: My AWS Account
      aws_access_key_id: AWS_ID
      aws_secret_access_key: AWS_SECRET
  notify:
    # use the first credential defined in aws integration by default
    - service: lambda
      region_name: us-east-1
```

### Configuration for credentials

{% configuration %}
name:
  description: Give your AWS credential a name, so that you can refer it in other AWS platforms.
  required: true
  type: string
aws_access_key_id:
  description: Your AWS Access Key ID. If provided, you must also provide an `aws_secret_access_key` and must **not** provide a `profile_name`. Required if `aws_secret_access_key` is provided.
  required: false
  type: string
aws_secret_access_key:
  description: Your AWS Secret Access Key. If provided, you must also provide an `aws_access_key_id` and must **not** provide a `profile_name`. Required if `aws_access_key_id` is provided.
  required: false
  type: string
profile_name:
  description: A credentials profile name.
  required: false
  type: string
validate:
  description: Whether validate credential before use. Validate credential needs `IAM.GetUser` permission.
  required: false
  default: true
  type: boolean
{% endconfiguration %}

### Configuration for notify

{% configuration %}
service:
  description: Amazon Web Services will be used for notification. You can choose from `lambda`, `sns`, or `sqs`.
  required: true
  type: string
region_name:
  description: The region identifier to connect to, for example, `us-east-1`.
  required: true
  type: string
credential_name:
  description: A reference to an `aws` credential. Notify platform will use the `default profile` defined in `~/.aws` if none of `credential_name`, `aws_access_key_id`, or `profile_name` was given.
  required: false
  type: string
aws_access_key_id:
  description: Your AWS Access Key ID. If provided, you must also provide an `aws_secret_access_key`.
  required: false
  type: string
aws_secret_access_key:
  description: Your AWS Secret Access Key. If provided, you must also provide an `aws_access_key_id`. Required if aws_access_key_id is provided.
  required: false
  type: string
profile_name:
  description: A credentials profile name.
  required: false
  type: string
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`.
  required: false
  default: notify
  type: string
context:
  description: An optional dictionary you can provide to pass custom context through to the notification handler.
  required: false
  type: string
{% endconfiguration %}

## Lambda Notify Usage

AWS Lambda is a notification platform and thus can be controlled by calling the `notify` service [as described here](/integrations/notify/). It will invoke a Lambda for all targets given in the notification payload. A target can be formatted as a function name, an entire ARN ([Amazon Resource Name](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html)) or a partial ARN. For more information, please see the [botocore documentation](https://botocore.amazonaws.com/v1/documentation/api/latest/reference/services/lambda.html#Lambda.Client.invoke).

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
  "custom": {
    "two": "three",
    "test": "one"
  }
}
```

## SNS Notify Usage

AWS SNS is a notification platform and thus can be controlled by calling the `notify` service [as described here](/integrations/notify/). It will publish a message to all targets given in the notification payload. A target must be a SNS topic or endpoint ARN ([Amazon Resource Name](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html)). For more information, please see the [botocore documentation](https://botocore.amazonaws.com/v1/documentation/api/latest/reference/services/sns.html#SNS.Client.publish).

If one exists, the SNS Subject will be set to the title. All attributes from the payload, except the message, will be sent as stringified message attributes.

### Setting up SNS within AWS

- Log into your AWS console and under "Security and Identity", select "Identity & Access Management".
- On the left-hand side, select "Users" then click "Create New Users". Enter a name here and then click "Create".
- You can either download the credentials or click the arrow to display them one time.

<div class='note warning'>
If you do not download them, you will lose them and will have to recreate a new user.
</div>

- Copy/Paste the two keys that are shown here in your `configuration.yaml` file.
- On the left-hand side of the screen go back to "Users" and select the user you just created. On the "Permissions" tab click the "Attach Policy" icon. Search for "SNS" and attach the policy "AmazonSNSFullAccess".
- Back to the AWS Console you now need to find "SNS" and click in to that service. It is under the Mobile Services group.
- On the left-hand side, select "Topics" then "Create new topic".
- Choose a Topic Name and Display Name.
- Now check the box next to the Topic you just created and under Actions, select "Subscribe to topic".
- In the box that pops up, select the Protocol = SMS and enter in the phone number next to "Endpoint" you wish to SMS. Now click "Create".
- Repeat for additional numbers.
- Back in the "Users" section you will see a long alphanumeric line that starts with "arn:" and ends with the Topic Name you choose previously. This is what your "target" in Home Assistant will be.

## SQS Notify Usage

AWS SQS is a notification platform and thus can be controlled by calling the `notify` service [as described here](/integrations/notify/). It will publish a message to the queue for all targets given in the notification payload. A target must be a SQS topic URL. For more information, please see the [SQS documentation](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/ImportantIdentifiers.html) and [bototcore documentation](https://botocore.amazonaws.com/v1/documentation/api/latest/reference/services/sqs.html#SQS.Client.send_message)

The SQS event payload will contain everything passed in the service call payload. SQS payloads will be published as stringified JSON. All attributes from the payload, except message, will also be sent as stringified message attributes. Here is an example message that would be published to the SQS queue:

```json
{
  "title": "Test message!",
  "target": "https://sqs.us-east-1.amazonaws.com/123456789012/queue2%22",
  "data": {
    "test": "okay"
  },
  "message": "Hello world!"
}
```
