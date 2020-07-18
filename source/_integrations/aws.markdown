---
title: Amazon Web Services (AWS)
description: Instructions on how to integrate Amazon Web Services with Home Assistant.
ha_category:
  - Notifications
  - Image Processing
ha_release: '0.91'
ha_codeowners:
  - '@awarecan'
  - '@bendews'
ha_domain: aws
---

The `aws` integration provides a single place to interact with [Amazon Web Services](https://aws.amazon.com/). It provides:

- A notification platform that can send a message to [AWS SQS](https://aws.amazon.com/sqs/), [AWS SNS](https://aws.amazon.com/sns/), or invoke [AWS Lambda](https://aws.amazon.com/lambda/) functions.
- An Image Processing platform that can detect objects, people, and faces via [AWS Rekognition](https://aws.amazon.com/rekognition/), using your existing `camera` entities

## Setup

You have to have an AWS account to use Amazon Web Services, create one [here](https://aws.amazon.com/free/) with a 12 months free tier benefit. Please note, even in the first 12-months, you may still be billed if you use more resources than offered in the free tier. We advise you to monitor your costs in the [AWS Billing Console](https://console.aws.amazon.com/billing/) closely. You can read the [Control your AWS costs](https://aws.amazon.com/getting-started/tutorials/control-your-costs-free-tier-budgets/) guide for more information.

The `lambda`, `sns` and `sqs` services, used in the `aws` component, all provide an **Always Free** tier for all users even after the 12-month period. The general usage in Home Automation will most likely not reach the free tier limit. Please read the following pricing pages for more details relevant to your usage:

- [Lambda Pricing](https://aws.amazon.com/lambda/pricing/)
- [SNS Pricing](https://aws.amazon.com/sns/pricing/)
- [SQS Pricing](https://aws.amazon.com/sqs/pricing/)
- [Rekognition Pricing](https://aws.amazon.com/rekognition/pricing/)

## Credentials

The `aws` integration is using [botocore](https://botocore.amazonaws.com/v1/documentation/api/latest/index.html) to communicate with Amazon Web Services, which is also used by the [AWS Command Client Interface](https://aws.amazon.com/cli/) tool. Therefore, `aws` shares the same credential and profiles with `awscli` tool. Please read [Configuring the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) to learn how to get access keys and how to manage them on your local system securely.

The `aws` component supports both 'profile' and 'access key' authentication methods.

### Profile authentication example

```yaml
# Example configuration.yaml entry
aws:
  credentials:
    - name: My AWS Account
      profile_name: MY_PROFILE_NAME
```

### Access key authentication example

```yaml
# Example configuration.yaml entry
aws:
  credentials:
    - name: My AWS Account
      aws_access_key_id: AWS_ID
      aws_secret_access_key: AWS_SECRET
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

## Image Processing

The `image_processing` component supports the `rekognition` service for both object and face detection. Please see [Image Processing Configuration](#configuration-for-image-processing) for full configuration parameter details.

### Face Detection and Identification

The below example displays all of the available configuration options for face detection. Please note that `collection_id` references a [Rekognition Collection](https://docs.aws.amazon.com/rekognition/latest/dg/create-collection-procedure.html) and is required for both detection and identification of faces - if the specified collection does not exist it will be created on startup.

```yaml
# Full face identification example
aws:
  credentials:
    - name: My AWS Account
      profile_name: MY_PROFILE_NAME
  image_processing:
    # use the first credential defined in aws integration by default
    - platform: face
      service: rekognition
      region_name: us-east-1
      collection_id: family
      confidence: 90
      detection_attributes: ALL
      identify_faces: true
      save_file_folder: /path/to/detection_images
      save_file_timestamp: true
      source:
        - entity_id: camera.demo_camera_1
          name: Demo Face Detection
```

This example displays the minimum required configuration for face identification:

```yaml
# Minimal face identification example
aws:
  credentials:
    - name: My AWS Account
      profile_name: MY_PROFILE_NAME
  image_processing:
    - platform: face
      service: rekognition
      region_name: us-east-1
      collection_id: family
      identify_faces: true
      source:
        - entity_id: camera.demo_camera_1
```

### Object Detection

The below example displays all of the available configuration options for Object detection.

```yaml
# Full object detection example
aws:
  credentials:
    - name: My AWS Account
      profile_name: MY_PROFILE_NAME
  image_processing:
    # use the first credential defined in aws integration by default
    - platform: object
      service: rekognition
      region_name: us-east-1
      confidence: 90
      save_file_folder: /path/to/detection_images
      save_file_timestamp: true
      source:
        - entity_id: camera.demo_camera_1
          name: Demo Object Detection
```

### Configuration for Image Processing

{% configuration %}
service:
  description: Amazon Web Services will be used for image processing. Only `rekognition` is supported at this time.
  required: true
  type: string
region_name:
  description: The region identifier to connect to, for example, `us-east-1`.
  required: true
  type: string
platform:
  description: The `image_processing` platform to be used, either `face` or `object`.
  required: true
  type: string
collection_id:
  description: The ID of the Rekognition face collection to be used for indexing faces.
  required: false
  type: string
confidence:
    description: The default confidence for any detected objects where not explicitly set.
    required: false
    default: 70
    type: float
detection_attributes:
  description: Whether to return extra attributes or a specific attribute. Please see the [Rekognition documentation](https://docs.aws.amazon.com/rekognition/latest/dg/faces-detect-images.html) for more detail.
  required: false
  default: none
  type: string
identify_faces:
  description: If true, will attempt to identify all detected faces. The entity will return the 'ExternalImageId' and associated attributes of the matched face if successful.
  required: false
  default: false
  type: boolean
save_file_folder:
  description: A valid path for the integration to save processed images including bounding boxes. Filenames will be suffixed with `_latest` and overwritten on new detections.
  required: false
  default: none
  type: string
save_file_timestamp:
  description: If true, in addition to saving images with the `_latest` suffix, another image file will be generated with a shortened ISO8601 timestamp as a suffix. This file will not be overwritten on new detections.
  required: false
  default: false
  type: boolean
source:
  description: The list of image sources.
  required: true
  type: map
  keys:
    entity_id:
      description: A camera entity id to get picture from.
      required: true
      type: string
    name:
      description: This parameter allows you to override the name of your `image_processing` entity.
      required: false
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
{% endconfiguration %}

### Service `aws.index_face`

The service `aws.index_face` can be used to 'index' (teach) faces. It is very _important_ to note that when indexing faces, only the largest face in the supplied image is indexed. It is best to use images that have been cropped or processed to have any other faces removed.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Name(s) of the entities to set.
| `image_id` | no | The reference ID of the image(s) being indexed. This is returned as the 'name' attribute when identifying faces.
| `image_path` | exclusive | Path to a single image of a face to be indexed.
| `image_folder` | exclusive | Folder containing many images of a face to be indexed with the same `image_id`.

A valid service data example for a folder containing many pre-cropped images of 'Jane':

{% raw %}
```yaml
{
  "entity_id": "image_processing.rekognition_face_local_file",
  "name": "Jane",
  "image_folder": "/config/face_images/Jane"
}
```
{% endraw %}

A valid service data example for a single pre-cropped image file of 'Jane':

{% raw %}
```yaml
{
  "entity_id": "image_processing.rekognition_face_local_file",
  "name": "Jane",
  "image_path": "/config/images/Jane.jpg"
}
```
{% endraw %}

## Notifications

### Configuration for notify

```yaml
# Example configuration.yaml entry
aws:
  credentials:
    - name: My AWS Account
      profile_name: MY_PROFILE_NAME
  notify:
    # use the first credential defined in aws integration by default
    - service: lambda
      region_name: us-east-1
```

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

### Lambda Notify Usage

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

### SNS Notify Usage

AWS SNS is a notification platform and thus can be controlled by calling the `notify` service [as described here](/integrations/notify/). It will publish a message to all targets given in the notification payload. A target must be a SNS topic or endpoint ARN ([Amazon Resource Name](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html)). For more information, please see the [botocore documentation](https://botocore.amazonaws.com/v1/documentation/api/latest/reference/services/sns.html#SNS.Client.publish).

If one exists, the SNS Subject will be set to the title. All attributes from the payload, except the message, will be sent as stringified message attributes.

#### Setting up SNS within AWS

- Log into your AWS console and under "Security and Identity", select "Identity & Access Management".
- On the left-hand side, select "Users" then click "Create New Users". Enter a name here and then click "Create".
- You can either download the credentials or click the arrow to display them one time.

<div class='note warning'>
If you do not download them, you will lose them and will have to recreate a new user.
</div>

- Copy/Paste the two keys that are shown here in your `configuration.yaml` file.
- On the left-hand side of the screen go back to "Users" and select the user you just created. On the "Permissions" tab click the "Attach Policy" icon. Search for "SNS" and attach the policy "AmazonSNSFUullAccess".
- Back to the AWS Console you now need to find "SNS" and click in to that service. It is under the Mobile Services group.
- On the left-hand side, select "Topics" then "Create new topic".
- Choose a Topic Name and Display Name.
- Now check the box next to the Topic you just created and under Actions, select "Subscribe to topic".
- In the box that pops up, select the Protocol = SMS and enter in the phone number next to "Endpoint" you wish to SMS. Now click "Create".
- Repeat for additional numbers.
- Back in the "Users" section you will see a long alphanumeric line that starts with "arn:" and ends with the Topic Name you choose previously. This is what your "target" in Home Assistant will be.

### SQS Notify Usage

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
