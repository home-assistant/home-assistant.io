---
title: IDrive e2
description: Instructions on how to set up an IDrive e2 bucket to use as a backup location.
ha_release: 2026.3
ha_category:
  - Backup
ha_iot_class: Cloud Push
ha_config_flow: true
ha_domain: idrive_e2
ha_codeowners:
  - '@patrickvorgers'
ha_integration_type: service
ha_quality_scale: bronze
---

The **IDrive e2** {% term integration %} allows you to use an [IDrive e2](https://www.idrive.com/s3-storage-e2/) bucket with Home Assistant Backups.

## Prerequisites

Before configuring this integration, you need to prepare your IDrive e2 account. This includes creating a bucket to store your backups and an access key with permissions to that bucket.

{% details "Create a new IDrive e2 bucket" %}

1. Log in to the [IDrive e2 Management Console](https://app.idrivee2.com/dashboard/).
2. Follow the steps on [creating a bucket](https://www.idrive.com/s3-storage-e2/videos) in the iDrive documentation.
3. When prompted to define a bucket name, make sure it is unique: **Name** (for example, `home-assistant-backups-123456`).
4. When adjusting the settings:
   - **Files in bucket are private**: Enabled by default. It is recommended to leave it enabled.
   - **Versioning** (optional): Lets you recover backups after Home Assistant deletes them, but it *can increase storage costs*. Disable this to allow permanent deletion based on retention settings.
5. Make a note of the bucket name and region. You’ll need it later.

{% enddetails %}

{% details "Create an access key" %}

To create an access key that has access to the bucket:

1. Log in to the [IDrive e2 Management Console](https://app.idrivee2.com/dashboard/).
2. Follow the steps on [creating an access key](https://www.idrive.com/s3-storage-e2/videos) in the iDrive documentation.
3. When prompted to define a name, make it descriptive (for example, `home-assistant-backup`).
4. When adjusting the settings:
   - **Access key expiry**: Disabled by default. It is recommended to leave it disabled.
   - **Access permission**: Read and write (default).
     - **Allow deletion of objects**: Enabled by default. It is recommended to leave it enabled.
     - **Allow bucket deletion**: *Disable this option* (unchecked).
5. Assign the access key to the bucket you created earlier.
6. Make a note of the **Access key id** and **Secret access key**. You’ll need them when configuring the integration in Home Assistant.

{% enddetails %}

{% note %}

- Avoid using credentials that have more permissions than is necessary.
- By limiting credentials to a specific bucket, you reduce risk and help keep your IDrive e2 account secure.

{% endnote %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Access key id:
  description: "The access key ID for your IDrive e2 account."
Secret access key:
  description: "The secret access key for your IDrive e2 account."
Bucket name:
  description: "IDrive e2 bucket name to store the backups. Bucket must already exist and be writable by the provided credentials."
{% endconfiguration_basic %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
