---
title: Backblaze B2
description: Instructions on how to setup a Backblaze B2 bucket to be used as a backup location.
ha_release: 2025.12
ha_category:
  - Backup
ha_iot_class: Cloud Push
ha_config_flow: true
ha_domain: backblaze_b2
ha_codeowners:
  - '@hugo-vrijswijk'
  - '@ElCruncharino'
ha_integration_type: service
ha_quality_scale: bronze
ha_platforms:
  - diagnostics
---

The **Backblaze** {% term integration %} enables you to use a [Backblaze B2](https://www.backblaze.com/cloud-storage) bucket as a backup location in Home Assistant.

## Prerequisites

This integration requires an existing B2 bucket and an application key that has access to that bucket. It is recommended to create a key that only has access to the required bucket and prefix (if desired).

{% details "Create a new B2 bucket" %}

1. Log in to the [Backblaze Console](https://secure.backblaze.com/b2_buckets.htm).
2. [Create a bucket](https://www.backblaze.com/docs/cloud-storage-create-and-manage-buckets).
   - Choose a unique **bucket name** (such as, `home-assistant-backups-123456`).
   - Make a note of the bucket name — you’ll need it later.
3. Adjust the settings:
   - **Set bucket to private**: Enabled by default, recommended.
   - **Encryption**: This enables Backblaze's server-side encryption. This is separate from the Home Assistant backup encryption. This is optional. If Home Assistant backups are configured to use encryption, you can disable this.

{% enddetails %}

{% details "Create an application key" %}

To create an application key that can access the bucket:

1. Go to [**Application Keys**](https://secure.backblaze.com/app_keys.htm) in the sidebar.
2. [Create a new application key](https://www.backblaze.com/docs/cloud-storage-create-and-manage-app-keys).
   - Use a name like `home-assistant-backup`.
   - Limit access to the bucket by selecting it from the **Choose a bucket** dropdown.
   - The type of access should be **Read and Write**.
   - **Allow List All Bucket Names** can be left unchecked.
   - Optionally, you can limit the key to a specific prefix (such as `home-assistant-backups`) if you want to save backups in a specific folder within the bucket.
3. Save the **Key ID** and **Application Key**. You'll need these when setting up the Backblaze integration in Home Assistant.

{% enddetails %}

{% note %}

By limiting credentials to a specific bucket, you reduce risk and help keep your Backblaze account secure.

{% endnote %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Key ID:
   description: "The access key ID for your Backblaze account."
Application Key:
   description: "The application key for your Backblaze account."
Bucket Name:
   description: "Bucket name to store the backups. Bucket must already exist and be writable by the provided credentials."
Prefix:
   description: "Optional prefix for the backups. This is useful if you want to store backups in a specific folder within the bucket."
{% endconfiguration_basic %}

## Troubleshooting

### Expired keys

If the application key expires, you will need to create a new one and update the integration in Home Assistant.

### Files are being overwritten due to non-unique bucket prefix

If you set a prefix, all backups will be stored under that prefix in the bucket. Ensure that the prefix is unique to avoid overwriting other files. Changing the prefix will not move existing backups.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
