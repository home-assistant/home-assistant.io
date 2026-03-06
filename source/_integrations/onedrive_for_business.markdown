---
title: OneDrive for Business
description: Instructions on how to setup OneDrive for Business to be used with backups.
ha_release: 2026.3
ha_category:
  - Backup
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: onedrive_for_business
ha_codeowners:
  - '@zweckj'
ha_integration_type: service
related:
  - docs: /common-tasks/general/#backups
    title: Backups
ha_quality_scale: platinum
ha_platforms:
  - diagnostics
  - sensor
---

The **OneDrive for Business** {% term integration %} allows you to use [OneDrive for Business](https://www.microsoft.com/en-us/microsoft-365/onedrive/online-cloud-storage) for [Home Assistant Backups](/common-tasks/general/#backups).

Backup encryption is enabled by default and can be disabled as shown in the [backup documentation](/common-tasks/general/#to-define-the-backup-location-for-automatic-backups).

{% include integrations/config_flow.md %}

{% configuration_basic %}
Tenant ID:
  description: "Tenant ID of the Entra ID tenant where the account to be used with the integration lives."
Client ID:
  description: "Application ID of the app registration to be used with the integration."
Client secret:
  description: "Application secret for the app registration."
Folder path:
  description: "The path of the folder where to store backups."

{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

## Requested permissions by the integration

The integration will request the following permissions on your OneDrive for the integration to work:

- `Files.ReadWrite.All`: Grants the application permission to read and write in any folder of your OneDrive. Unfortunately, unlike the personal OneDrive, OneDrive for Business does not support the `Files.ReadWrite.AppFolder` permissions, so these are the least possible permissions.
- `offline_access`: Grants the application permission to refresh its authentication token without requiring your manual intervention.
- `openid`: Grants the application permission to read basic information, for example, if you have a OneDrive.


## Getting application credentials

You'll need to follow [this guide by Microsoft on registering an application](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app?tabs=certificate) to create your own client ID and secret.

Make sure to configure the following settings on the app registration:

- **Supported account types**: Choose one of `Accounts in this organizational directory only` (recommended), `Accounts in any organizational directory`, `Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant) and personal Microsoft accounts`
- **Redirect URI**: Type: `Web`, URL: `https://my.home-assistant.io/redirect/oauth`



## Sensors

The integration provides the following sensors, which are updated every 5 minutes:

- **Total available storage**: The total size of your drive (disabled by default).
- **Used storage**: The amount of storage you have used up.
- **Remaining storage**: The amount of storage that is left in your drive.
- **Drive state**: Calculated state of your drive, based on the storage left. Possible values: `Normal`, `Nearing limit`, `Critical`, `Exceeded`.

{% note %}
A drive in **Drive state** `Exceeded` will be automatically frozen (meaning you can't upload any more backups & files) until you free up enough storage.
{% endnote %}

## Troubleshooting

Currently we don't have any known troubleshooting steps, if you find something please create a documentation PR. Thanks!

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
