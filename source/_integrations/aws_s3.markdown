---
title: AWS S3
description: Instructions on how to setup AWS S3 bucket to be used as a backup location.
ha_release: 2025.5
ha_category:
  - Backup
ha_iot_class: Cloud Push
ha_config_flow: true
ha_domain: aws_s3
ha_codeowners:
  - '@tomasbedrich'
ha_integration_type: service
ha_quality_scale: bronze
---

The **AWS S3** {% term integration %} allows you to use [AWS S3](https://aws.amazon.com/s3/) bucket with Home Assistant Backups.

## Prerequisites

{% important %}
This integration is specifically designed to work **only with Amazon AWS S3** and not with third-party storage providers that claim S3 API compatibility. Third-party providers like Wasabi, DigitalOcean Spaces, Backblaze B2, Infomaniak, and others are not supported.
{% endimportant %}

This integration requires an existing S3 bucket and an IAM user that has access to that bucket. For security reasons, it is strongly recommended to scope the IAM policy as narrowly as possible to only the required operations and resources.

{% details "Create a new S3 bucket" %}

1. Log in to the [AWS Management Console](https://console.aws.amazon.com/).
1. Navigate to **S3** from the Services menu.
1. Click **Create bucket**.
1. Choose a unique **bucket name** (e.g., `home-assistant-backups-123456`).
1. Select your preferred AWS **region** (e.g., `eu-central-1`).
1. Adjust the settings:
   - ✅ **Block all public access** (enabled by default, recommended)
   - ⚠️ **Enable Bucket Versioning** (optional). This lets you recover backups after Home Assistant deletes them, but it **can increase storage costs**. Disable this to allow permanent deletion based on retention settings.
1. Click **Create bucket**.

Make a note of the bucket name — you’ll need it later.

{% enddetails %}

{% details "Create an IAM user" %}

To create a new IAM user that can access the S3 bucket:

1. Go to **IAM > Users** in the AWS Management Console.
1. Click **Add users**.
1. Use a name like `home-assistant-backup`.
1. Check **Access key - Programmatic access** only.
1. Click **Next: Permissions**.

Now, let's create and attach a custom IAM policy to give the user the necessary permissions to the bucket:

1. Click **Create policy**, go to the **JSON** tab, and paste the following (replace `YOUR_BUCKET_NAME`):

    ```json
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Sid": "AllowS3BackupOperations",
          "Effect": "Allow",
          "Action": [
            "s3:ListBucket",
            "s3:GetObject",
            "s3:PutObject",
            "s3:DeleteObject",
            "s3:AbortMultipartUpload"
          ],
          "Resource": [
            "arn:aws:s3:::YOUR_BUCKET_NAME",
            "arn:aws:s3:::YOUR_BUCKET_NAME/*"
          ]
        }
      ]
    }
    ```

1. Name the policy (e.g., `HomeAssistantS3Policy`) and create it.
1. Return to the user creation wizard and attach the new policy.
1. Complete the user setup.
1. Save the **Access Key ID** and **Secret Access Key** — you'll need these when setting up the AWS S3 integration in Home Assistant.

{% enddetails %}

{% note %}

- Avoid using credentials for your AWS root account or IAM users that have more permissions than is necessary.
- By limiting credentials to a specific bucket, you reduce risk and help keep your AWS account secure.

{% endnote %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Access Key ID:
  description: "The access key ID for your AWS S3 account."
Secret Access Key:
  description: "The secret access key for your AWS S3 account."
Bucket Name:
  description: "S3 bucket name to store the backups. Bucket must already exist and be writable by the provided credentials."
Endpoint URL:
  description: "Endpoint URL provided to [Boto3 Session](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/core/session.html). Region-specific [AWS S3 endpoints](https://docs.aws.amazon.com/general/latest/gr/s3.html) are available in their documentation. Defaults to `https://s3.eu-central-1.amazonaws.com/`."
{% endconfiguration_basic %}

## Setting up the AWS S3 integration in Home Assistant

1. In Home Assistant, go to **Settings > Devices & Services**.
1. Click **Add Integration** and search for **AWS S3**.
1. Enter the following details:
   - Access Key ID and Secret Access Key from the IAM user
   - Your bucket name
   - The region endpoint (e.g., `https://s3.eu-central-1.amazonaws.com/`)

The integration will test the connection and confirm access to your S3 bucket.

## Known limitations

The AWS S3 integration has the following limitations:

### No support for third-party S3 API compatible providers

This integration is designed to work only with the official Amazon AWS S3 service. Despite claims of S3 API compatibility, third-party storage providers like Wasabi, DigitalOcean Spaces, Backblaze B2, Infomaniak, OVH Cloud, and others have often proven to be incompatible. Even when they appear to work initially, they cannot guarantee ongoing compatibility with this AWS S3 integration in the future.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
