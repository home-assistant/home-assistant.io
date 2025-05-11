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

The **AWS S3** {% term integrations %} allows you to use [AWS S3](https://aws.amazon.com/s3/) bucket with Home Assistant Backups.

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

## Setting up AWS for Home Assistant Backups

This integration requires an existing S3 bucket and an IAM user with limited access. Follow the steps below to securely set them up.

### 1. Create a new S3 bucket

1. Log in to the [AWS Management Console](https://console.aws.amazon.com/).
1. Navigate to **S3** from the Services menu.
1. Click **Create bucket**.
1. Choose a unique **bucket name** (e.g., `home-assistant-backups-123456`).
1. Select your preferred AWS **region** (e.g., `eu-central-1`).
1. Adjust the settings:
   - ✅ **Block all public access** (highly recommended — enabled by default)
   - ⚠️ **Enable Bucket Versioning** (optional). When enabled, this allows you to recover backups even after Home Assistant deletes them based on its configured retention policy. However, **it can increase storage costs**, as deleted backups are retained as previous versions in S3. Leave this disabled if you want Home Assistant’s retention and deletion behaviour to permanently remove backups once they no longer meet the retention criteria.
1. Click **Create bucket**.

Make a note of the bucket name — you'll need it later when setting up the integration in Home Assistant.

### 2. Create a dedicated IAM user

To protect your AWS account, create a user that can only access your backup bucket.

1. Go to **IAM > Users** in the AWS Console.
1. Click **Add users**.
1. Enter a username like `home-assistant-backup`.
1. Check **Access key - Programmatic access** only.
1. Click **Next: Permissions**.

#### Create and attach a custom policy

1. Click **Create policy** and switch to the **JSON** tab.
1. Paste the following policy, replacing `YOUR_BUCKET_NAME`:

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

1. Click **Next**, give the policy a name like `HomeAssistantS3Policy`, and create it.
1. Return to the user creation wizard and attach your new policy.
1. Finish creating the user.
1. Save the **Access Key ID** and **Secret Access Key** displayed at the end. You will need these for Home Assistant.

### 3. Add the AWS S3 integration in Home Assistant

1. In Home Assistant, go to **Settings > Devices & Services**.
1. Click **Add Integration** and search for **AWS S3**.
1. Enter the following details:
   - Access Key ID and Secret Access Key from the IAM user
   - Your bucket name
   - The region endpoint (e.g., `https://s3.eu-central-1.amazonaws.com/`)

The integration will test the connection and confirm access to your S3 bucket.

### Security tip

- **Avoid using your AWS root account or admin-level users**.
- By following the instructions above, your credentials will only allow access to a single bucket used for backups — keeping the rest of your AWS account secure.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
