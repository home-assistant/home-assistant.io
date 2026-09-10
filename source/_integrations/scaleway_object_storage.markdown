---
title: Scaleway Object Storage
description: Instructions on how to set up a Scaleway Object Storage bucket to be used as a backup location.
ha_release: 2026.6
ha_category:
  - Backup
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: scaleway_object_storage
ha_codeowners:
  - '@BjoernPetersen'
ha_integration_type: service
ha_quality_scale: bronze
related:
  - url: https://console.scaleway.com/
    title: Scaleway Elements Console
---

The **Scaleway Object Storage** {% term integration %} allows you to use a [Scaleway Object Storage] bucket with Home Assistant Backups.

Scaleway is a French cloud computing and web hosting company that offers services hosted in different locations across Europe.

## Prerequisites

This integration requires an existing Scaleway Object Storage bucket and an API key that has access to that bucket.
For security reasons, it is strongly recommended to scope the API key as narrowly as possible to only the required operations and resources.

{% details "Create a new Object Storage bucket" %}

1. Log in to the [Scaleway Elements Console].
2. Navigate to the [Object Storage Product] in the project you want to use for Home Assistant backups.
3. Select **Create a bucket**.
4. Select your preferred region to host your bucket.
5. Choose a unique **bucket name** (for example, `home-assistant-backups-123456`). Only lowercase letters, numbers, periods (.), and hyphens (-) are accepted.
6. **Keep bucket visibility private**. Setting bucket visibility to public would be a serious security risk.
7. **Enable SSE-ONE encryption** to enable transparent server-side encryption of your data at rest.
8. You can leave the rest of the settings untouched.
9. Select **Create bucket**.

Make a note of the bucket name — you’ll need it later.

{% enddetails %}

{% details "Create an IAM application" %}

To create a new IAM application that can access the Object Storage bucket:

1. Go to the [**Applications tab** of the Identity and Access Management section][IAM-applications] of the Scaleway Elements Console.
2. Select **Create application**.
3. Use a name like `home-assistant-backup`.
4. You can enter a more detailed description that will help you remember what this application is used for in the future.
5. Confirm by selecting **Create application**.

At this point, the application is not allowed to perform any actions using the Scaleway API.
To allow the application to manage your backups, an IAM policy needs to be created for it:

1. Go to the [**Policies tab** of the Identity and Access Management section][IAM-policies] of the Scaleway Elements Console.
2. Select **Create policy**.
3. Enter a name for your policy, for example `home-assistant-backup-access`.
4. In the **Select a principal** section, select your application.
5. Proceed to the next step by selecting **Add rules**.
6. Select the **Access to resources** scope and select the name of the Scaleway project that you have created your bucket in from the dropdown.
7. Select **Validate**.
8. In the **Permission sets** section, select the `Storage` product on the left-hand side.
9. On the right-hand side, select the `ObjectStorageBucketsRead`, `ObjectStorageObjectsRead`, `ObjectStorageObjectsWrite`, and `ObjectStorageObjectsDelete` permission sets.
10. Select **Validate**.
11. You can skip the additional condition settings by selecting **Validate** again.
12. Confirm your new policy by selecting **Create policy**.

The last step is creating an API key for the application that will be used to configure the Scaleway Object Storage integration in Home Assistant:

1. Go to the [**API keys tab** of the Identity and Access Management section][IAM-api-keys] of the Scaleway Elements Console.
2. Select **Generate API key**.
3. Select the application you previously created as the API key bearer.
4. Choose an **API key expiration** that matches how often you can rotate credentials. Using a limited lifetime, like 6–12 months, reduces the impact if the key is ever leaked. If you set an expiration date, backups will stop working once the key expires until you create a new key and update the integration in Home Assistant. If you decide to set the expiration to **Never**, make sure you regularly rotate this key manually, and revoke it in the Scaleway Elements Console immediately if you accidentally leak or lose it.
5. Select **Yes, set up a preferred Project** and select the project you created your Object Storage bucket in.
6. Save the **Access Key ID** and **Secret Key** for the integration setup in Home Assistant. You will not be able to view the secret key in the Scaleway console again after dismissing the dialog.

{% enddetails %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Access Key ID:
  description: "The access key ID of your Scaleway application's API key."
Secret Key:
  description: "The secret key of your Scaleway application's API key."
Region:
  description: "The Scaleway region that you have created your Object Storage bucket in."
Bucket Name:
  description: "The name of the Object Storage bucket you want to store the backups in. The bucket must already exist and be writable by the provided credentials."
Object Key Prefix:
  description: "Optional object key prefix within the Object Storage bucket where backups will be stored. For example, setting the `home-assistant/` prefix will store backup objects in `bucket-name/home-assistant/`. This is useful for organizing backups when using the same bucket for multiple purposes."
{% endconfiguration_basic %}


## Organizing backups with the prefix option

The optional object key prefix option allows you to organize your backups within a specific path inside your Object Storage bucket. This is useful if you want to:

- Store backups in a dedicated path (for example, `home-assistant/backups/`)
- Use the same Object Storage bucket for multiple purposes
- Manage multiple Home Assistant instances with separate backup paths

Note that Object Storage buckets don't actually store objects in a hierarchical folder structure like a regular file system.
Thus, the prefix doesn't have to end with a slash (`/`). You can use any kind of prefix with no impact on performance.

## Known limitations

There are no known limitations for this integration.

## Troubleshooting

There are no commonly known issues with this integration.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.
Note that removing the integration from Home Assistant will not delete the backup objects from Scaleway Object Storage.
You can delete single objects or the whole bucket in the [Object Storage section of the Scaleway Elements Console][Object Storage Product].

{% include integrations/remove_device_service.md %}

[Scaleway Elements Console]: https://console.scaleway.com/
[Scaleway Object Storage]: https://www.scaleway.com/docs/object-storage/
[Object Storage Product]: https://console.scaleway.com/object-storage/buckets
[IAM-api-keys]: https://console.scaleway.com/iam/api-keys
[IAM-applications]: https://console.scaleway.com/iam/applications
[IAM-policies]: https://console.scaleway.com/iam/policies
