---
title: IDrive e2
description: Instructions on how to set up an IDrive e2 bucket to use as a backup location.
ha_release: 2025.6
ha_category:
  - Backup
ha_iot_class: Cloud Push
ha_config_flow: true
ha_domain: idrive_e2
ha_codeowners:
  - '@patrickvorgers'
  - '@tomasbedrich'
ha_integration_type: service
ha_quality_scale: bronze
---

The **IDrive e2** {% term integration %} allows you to use an [IDrive e2](https://www.idrive.com/s3-storage-e2/) bucket with Home Assistant Backups.

## Prerequisites

This integration requires an existing IDrive e2 bucket and an Access Key with permissions to that bucket. For security reasons, it is strongly recommended to scope the Access Key policy as narrowly as possible to the required operations and resources only.

{% details "Create a new IDrive e2 bucket" %}

1. Log in to the [IDrive e2 Management Console](https://app.idrivee2.com/dashboard/).
1. Navigate to **Buckets** from the Dashboard menu.
1. Click **Create bucket**.
1. Choose a unique bucket **Name** (e.g., `home-assistant-backups-123456`).
1. Select your preferred IDrive e2 region from the **Enabled regions** (e.g., `Frankfurt-2`).
1. Adjust the settings:
   - ✅ **Files in bucket are private** (enabled by default, recommended)
   - ⚠️ **Versioning** (optional). This lets you recover backups after Home Assistant deletes them, but it **can increase storage costs**. Disable this to allow permanent deletion based on retention settings.
1. Click **Create Bucket**.

Make a note of the bucket name and region — you’ll need it later.

{% enddetails %}

{% details "Create an Access Key" %}

To create an Access Key that has access to the bucket:

1. Navigate to **Access Keys** from the Dashboard menu.
1. Click **Create Access Key**.
1. Enter a name such as `home-assistant-backup`.
1. Select the same IDrive e2 region as the bucket under **Enabled regions** (e.g., `Frankfurt-2`).
1. Adjust the settings:
   - ✅ **Access Key Expiry: disabled** (disabled by default, recommended)
   - ✅ **Assign access permission: read and write** (selected by default)
     - ✅ **Allow deletion of objects: check** (checked by default)
     - ⚠️ **Allow bucket deletion: uncheck** (checked by default)
1. Click **Assign buckets - Select buckets**.
1. Select the **Bucket name** of the bucket created earlier.
1. Click **Create Access Key**.
1. Save the **Access Key ID** and **Secret Access Key** and keep them safe — these will be required when configuring the integration in Home Assistant.

{% enddetails %}

{% note %}

- Avoid using credentials that have more permissions than is necessary.
- By limiting credentials to a specific bucket, you reduce risk and help keep your IDrive e2 account secure.

{% endnote %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Access Key ID:
  description: "The access key ID for your IDrive e2 account."
Secret Access Key:
  description: "The secret access key for your IDrive e2 account."
Bucket Name:
  description: "IDrive e2 bucket name to store the backups. Bucket must already exist and be writable by the provided credentials."
{% endconfiguration_basic %}

## Setting up the IDrive e2 integration in Home Assistant

1. In Home Assistant, go to **Settings > Devices & Services**.
1. Click **Add Integration** and search for **IDrive e2**.
1. Enter the following details:
   - Access Key ID and Secret Access Key
1. Click **Submit**
   - The integration tests the connection, determines the endpoint, and retrieves available buckets.
1. Select the name of the bucket from the dropdown list
1. Click **Submit**

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

---
title: IDrive e2
description: Instructions on how to setup an IDrive e2 bucket to use as a backup location.
ha_release: 2025.6
ha_category:
  - Backup
ha_iot_class: Cloud Push
ha_config_flow: true
ha_domain: idrive_e2
ha_codeowners:
  - '@patrickvorgers'
  - '@tomasbedrich'
ha_integration_type: service
ha_quality_scale: bronze
---

The **IDrive e2** {% term integration %} allows you to use an [IDrive e2](https://www.idrive.com/s3-storage-e2/) bucket with Home Assistant Backups.

## Prerequisites

This integration requires an existing IDrive e2 bucket and an Access Key with permissions to that bucket. For security reasons, it is strongly recommended to scope the Access Key policy as narrowly as possible to the required operations and resources only.

{% details "Create a new IDrive e2 bucket" %}

1. Log in to the [IDrive e2 Management Console](https://app.idrivee2.com/dashboard/).
1. Navigate to **Buckets** from the Dashboard menu.
1. Click **Create bucket**.
1. Choose a unique bucket **Name** (e.g., `home-assistant-backups-123456`).
1. Select your preferred IDrive e2 region from the **Enabled regions** (e.g., `Frankfurt-2`).
1. Adjust the settings:
   - ✅ **Files in bucket are private** (enabled by default, recommended)
   - ⚠️ **Versioning** (optional). This lets you recover backups after Home Assistant deletes them, but it **can increase storage costs**. Disable this to allow permanent deletion based on retention settings.
1. Click **Create Bucket**.

Make a note of the bucket name and region — you’ll need it later.

{% enddetails %}

{% details "Create an Access Key" %}

To create a Access Key that has access to the bucket:

1. Navigate to **Access Keys** from the Dashboard menu.
1. Click **Create Access Key**.
1. Enter a name such as `home-assistant-backup`.
1. Select the same IDrive e2 region as the bucket under **Enabled regions** (e.g., `Frankfurt-2`).
1. Adjust the settings:
   - ✅ **Access Key Expiry: disabled** (disabled by default, recommended)
   - ✅ **Assign access permission: read and write** (selected by default)
     - ✅ **Allow deletion of objects: check** (checked by default)
     - ⚠️ **Allow bucket deletion: uncheck** (checked by default)
1. Click **Assign buckets - Select buckets**.
1. Select the **Bucket name** of the bucket created earlier.
1. Click **Create Access Key**.
1. Save the **Access Key ID** and **Secret Access Key** and keep them safe — these will be required when configuring the integration in Home Assistant.

{% enddetails %}

{% note %}

- Avoid using credentials that have more permissions than is necessary.
- By limiting credentials to a specific bucket, you reduce risk and help keep your IDrive e2 account secure.

{% endnote %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Access Key ID:
  description: "The access key ID for your IDrive e2 account."
Secret Access Key:
  description: "The secret access key for your IDrive e2 account."
Bucket Name:
  description: "IDrive e2 bucket name to store the backups. Bucket must already exist and be writable by the provided credentials."
{% endconfiguration_basic %}

## Setting up the IDrive e2 integration in Home Assistant

1. In Home Assistant, go to **Settings > Devices & Services**.
1. Click **Add Integration** and search for **IDrive e2**.
1. Enter the following details:
   - Access Key ID and Secret Access Key
1. Click **Submit**
   - The integration tests the connection, determines the endpoint, and retrieves available buckets.
1. Select the name of the bucket from the dropdown list
1. Click **Submit**

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
