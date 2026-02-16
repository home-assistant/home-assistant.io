---
title: Cloudflare R2
description: Instructions on how to setup Cloudflare R2 bucket to be used as a backup location.
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
4. Choose a unique **Bucket name** (e.g., `home-assistant-backups-123456`).
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
6. Click **Apply to specific buckets only** and chose the bucket you created previously (e.g., `home-assistant-backups-123456`).
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


## Removing the integration

{% include integrations/remove_device_service.md %}
