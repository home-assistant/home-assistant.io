---
title: Cloudflare R2
description: Instructions on how to set up Cloudflare R2 bucket to be used as a backup location.
ha_release: 2026.2
ha_category:
  - Backup
ha_iot_class: Cloud Push
ha_config_flow: true
ha_domain: cloudflare_r2
ha_codeowners:
  - '@corrreia'
ha_integration_type: service
ha_quality_scale: bronze
---

The **Cloudflare R2** {% term integration %} allows you to use [Cloudflare R2](https://www.cloudflare.com/developer-platform/products/r2/) buckets with Home Assistant Backups.

## Prerequisites

This integration requires an existing R2 bucket and admin access to the bucket so you can create a Secret Access Key.

{% details "Create a new Cloudflare R2 bucket" %}

1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. On the sidebar, go to **Storage & databases**, click on **R2 object storage** and then **Overview**.
3. Select **+ Create bucket**.
4. Choose a unique **Bucket name**, for example, `home-assistant-backups-123456`.
5. Select your preferred [location](https://developers.cloudflare.com/r2/reference/data-location/).
6. Select your preferred [storage class](https://developers.cloudflare.com/r2/buckets/storage-classes/#set-default-storage-class-for-buckets) (Standard is fine, as Infrequent Access is still in beta)
7. Select **Create bucket**.

Make a note of the bucket name — you’ll need it later.

{% enddetails %}

{% details "Create an API Token/Secret Key" %}

To create a new Secret Key that can access the R2 bucket:

1. Go back to the **R2 object storage > Overview** page.
2. Click **Manage API Tokens**.
3. Click **Create User API token**.
4. Give it a name like `Home Assistant Backup`.
5. Check **Object Read & Write**.
6. Select **Apply to specific buckets only** and choose the bucket you created previously, for example, `home-assistant-backups-123456`.
7. Do not touch the other options and click **Create User API Token**.
8. Save the **Access Key ID**, the **Secret Access Key** and also the **S3 endpoint** — you'll need these when setting up the Cloudflare R2 integration in Home Assistant.

{% enddetails %}

{% note %}

- Avoid using credentials and API Keys that have more permissions than is necessary.
- By limiting credentials to a specific bucket, you reduce risk and help keep your Cloudflare account secure.

{% endnote %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Access key ID:
  description: "Access key ID to connect to Cloudflare R2."
Secret access key:
  description: "Secret access key to connect to Cloudflare R2. See [Cloudflare documentation](https://developers.cloudflare.com/r2/api/tokens/)"
Bucket name:
  description: "R2 bucket name to store the backups. Bucket must already exist and be writable by the provided credentials."
Endpoint URL:
  description: "Cloudflare R2 S3-compatible endpoint."
Folder prefix:
  description: "Optional folder path inside the bucket. For example, `backups/homeassistant`"
{% endconfiguration_basic %}

## Reconfiguring the integration

You can change the credentials, bucket, endpoint, or folder prefix of an existing entry without removing it.

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select **Cloudflare R2**.
2. Next to the entry, select the three dots {% icon "mdi:dots-vertical" %} menu and then select **Reconfigure**.
3. Update the fields and select **Submit**.

Home Assistant verifies that the bucket is accessible with the new settings before saving them.

{% note %}
Changing the bucket or folder prefix does not move existing backups. Backups stored under the previous bucket or prefix are no longer listed in Home Assistant.
{% endnote %}

## Troubleshooting

### Expired or revoked API token

If the API token is rotated, expires, or is deleted in Cloudflare, Home Assistant asks you to reauthenticate. Create a new API token as described in [Prerequisites](#prerequisites), then select **Reconfigure** on the notification under {% my integrations title="**Settings** > **Devices & services**" %} and enter the new **Access key ID** and **Secret access key**.

### Bucket does not exist

If the configured bucket was deleted or renamed, the integration fails to set up and reports that the bucket does not exist. New credentials will not fix this. Create the bucket again or [reconfigure the integration](#reconfiguring-the-integration) to use an existing bucket.

## Removing the integration

{% include integrations/remove_device_service.md %}
