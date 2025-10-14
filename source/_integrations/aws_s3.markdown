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

The **AWS S3** {% term integration %} allows you to use [AWS S3](https://aws.amazon.com/s3/) buckets with Home Assistant Backups.

## Prerequisites

{% important %}
This integration is specifically designed to work **only with Amazon AWS S3** and not with third-party storage providers that claim S3 API compatibility. Third-party providers like Wasabi, DigitalOcean Spaces, Backblaze B2, Infomaniak, and others are not supported.
{% endimportant %}

This integration requires an existing S3 bucket and an IAM user or role that has access to that bucket. For security reasons, it is strongly recommended to scope the IAM policy attached to the user or role as narrowly as possible to only the required operations and resources.

The example setup below describes using an IAM user with long-lived static security credentials which will be stored in Home Assistant.

 AWS [best practice](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#bp-workloads-use-roles) recommends alternative authentication methods which use short-lived security credentials instead - the relative complexity of configuring these methods under the hood is not covered in this guide.

{% details "Create a new S3 bucket" %}

1. Log in to the [AWS Management Console](https://console.aws.amazon.com/).
2. Navigate to **S3** from the Services menu.
3. Select your preferred AWS region from the drop-down towards the top-right of the management console (e.g., `Europe Frankfurt`)
4. Click **Create bucket**.
5. Select **General purpose** bucket type.
6. Choose a unique **bucket name** (e.g., `home-assistant-backups-123456`).
7. Adjust the settings:
   - Object ownership - **ACLs disabled** (selected by default, recommended)
   - ✅ **Block all public access** (enabled by default, recommended)
   - ⚠️ **Enable Bucket Versioning** (optional). This lets you recover backups after Home Assistant deletes them, but it **can increase storage costs**. Disable this to allow permanent deletion based on retention settings.
8. Click **Create bucket**.

Make a note of the bucket name — you’ll need it later.

{% enddetails %}

{% details "Create an IAM user" %}

To create a new IAM user that can access the S3 bucket:

1. Go to **IAM > Users** in the AWS Management Console.
2. Click **Create user**.
3. Use a name like `home-assistant-backup` and click **Next**.
4. Select **Attach policies directly**.

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

2. Name the policy (e.g., `HomeAssistantS3Policy`) and create it.
3. Return to the user creation wizard, refresh the list of available policies, and attach the new policy.
4. Complete the user setup.
5. Click on the newly created user, go to the **Security credentials** tab and click **Create access key**.
6. Select **Other** in the list of use-cases, click **Next**, and then **Create access key**
7. Securely note the **Access Key ID** and **Secret Access Key** — you'll need these when setting up the AWS S3 integration in Home Assistant.

{% enddetails %}

{% note %}

- *Never* use IAM credentials belonging to your AWS root user account.
- Avoid using IAM roles or IAM users that have more permissions than is necessary.
- By limiting your IAM role or IAM User to a specific bucket, you reduce risk and help keep your AWS account secure.

{% endnote %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Bucket Name:
  description: "S3 bucket name to store the backups. Bucket must already exist and be writable by the provided credentials."
Endpoint URL:
  description: "Endpoint URL provided to [Boto3 Session](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/core/session.html). Region-specific [AWS S3 endpoints](https://docs.aws.amazon.com/general/latest/gr/s3.html) are available in their documentation. Defaults to `https://s3.eu-central-1.amazonaws.com/`."
AWS Authentication Type:
  description: "The type of authentication [credentials](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/credentials.html) used to connect to your AWS S3 bucket."
AWS Authentication Type - Implicit Authentication:
  description: "No explicit authentication method is configured - the client library will work its way through the potential authentication providers and use the first one that provides valid credentials."
AWS Authentication Type - IAM Credentials:
  description: "The client library is configured to use an explicit IAM Access Key ID and Secret Access Key."
Access Key ID (IAM Credentials Authentication Type only):
  description: "The access key ID for your AWS S3 account."
Secret Access Key (IAM Credentials Authentication Type only):
  description: "The secret access key for your AWS S3 account."
{% endconfiguration_basic %}

## Setting up the AWS S3 integration in Home Assistant

1. In Home Assistant, go to **Settings > Devices & Services**.
2. Click **Add Integration** and search for **AWS S3**.
3. Enter the following details:
   - Your bucket name
   - The region endpoint (e.g., `https://s3.eu-central-1.amazonaws.com/`)
4. Select the AWS Authentication Type and click **Submit**
   - **Implicit Authentication**
     - The integration will test the connection and confirm access to your S3 bucket.
   - **IAM Credentials**
     1. Enter the following details:
        - Access Key ID and Secret Access Key from the IAM user
     2. Click **Submit** - the integration will test the connection and confirm access to your S3 bucket.

## Known limitations

The AWS S3 integration has the following limitations:

### No support for third-party S3 API compatible providers

This integration is designed to work only with the official Amazon AWS S3 service. Despite claims of S3 API compatibility, third-party storage providers like Wasabi, DigitalOcean Spaces, Backblaze B2, Infomaniak, OVH Cloud, and others have often proven to be incompatible. Even when they appear to work initially, they cannot guarantee ongoing compatibility with this AWS S3 integration in the future.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% note %}
Removing the integration will not remove any data stored in AWS S3, for which you may still be charged.
{% endnote %}

{% include integrations/remove_device_service.md %}
