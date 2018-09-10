---
layout: page
title: "AWS SNS"
description: "Instructions on how to publish messages to AWS SNS from Home Assistant."
date: 2016-05-14 16:35
sidebar: true
comments: false
sharing: true
footer: true
logo: aws_sns.png
ha_category: Notifications
ha_release: "0.20"
---

The `aws_sns` notification platform enables publishing to an [AWS SNS](https://aws.amazon.com/sns/) topic or application.

To use this notification platform in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: aws_sns
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

### {% linkable_title Usage %}

AWS SNS is a notify platform and thus can be controlled by calling the notify service [as described here](/components/notify/). It will publish a message to all targets given in the notification payload. A target must be a SNS topic or endpoint ARN ([Amazon Resource Name](http://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html)). For more information, please see the [boto3 docs](http://boto3.readthedocs.io/en/latest/reference/services/sns.html#SNS.Client.publish).

If one exists, the SNS Subject will be set to the title. All attributes from the payload except message will be sent as stringified message attributes.

#### {% linkable_title Setting up SNS within AWS %}

- Log into your AWS console and under "Security and Identity", select "Identity & Access Management".
- On the left hand side, select "Users" then click "Create New Users". Enter a name here and then click "Create". 
- You can either download the credentials or click the arrow to display them one time.

<p class='note warning'>
  If you do not download them you will lose them and will have to recreate a new user.
</p>

- Copy/Paste the two keys that you are provided here in your `configuration.yaml` file respectively.
- On the left hand side of the screen go back to "Users" and select the user you just created. On the "Permissions" tab click the "Attach Policy" icon. Search for "SNS" and attach the policy "AmazonSNSFUullAccess".
- Back to the AWS Console you now need to find "SNS" and click in to that service. It is under the Mobile Services group.
- On the left hand side, select "Topics" then "Create new topic".
- Choose a Topic Name and Display Name.
- Now check the box next to the Topic you just created and under Actions, select "Subscribe to topic".
- In the box that pops up, select the Protocol = SMS and enter in the phone number next to "Endpoint" you wish to SMS. Now click "Create".
- Repeat for additional numbers.
- Back in the "Users" section you will see a long alphanumeric line that starts with "arn:" and ends with the Topic Name you choose previously. This is what your "target" in Home Assistant will be.
