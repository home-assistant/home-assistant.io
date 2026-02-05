---
title: OneDrive for Business
description: Instructions on how to setup OneDrive for Business to be used with backups.
ha_release: 2025.12
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
ha_quality_scale: bronze
---

The **OneDrive for Business** {% term integration %} allows you to use [OneDrive for Business](https://www.microsoft.com/en-us/microsoft-365/onedrive/online-cloud-storage) for [Home Assistant Backups](/common-tasks/general/#backups).

Backup encryption is enabled by default and can be disabled as shown in the [backup documentation](/common-tasks/general/#to-define-the-backup-location-for-automatic-backups).

{% include integrations/config_flow.md %}

{% configuration_basic %}
Client ID:
  description: "Application ID of the app registration to be used with the integration. Uses Home Assistant provided by default."
Client secret:
  description: "Application secret for the app registration. Uses Home Assistant provided by default."
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

This integration comes with a predefined set of [application credentials](https://www.home-assistant.io/integrations/application_credentials/) through Home Assistant account linking. This means you should not need to provide credentials, but get redirected to Microsoft's sign-in page.

Even if you use the default credentials, nobody will ever have access to your data except you, as the app does not have permission to do anything on its own. It only works with a signed-in user (it only has `delegated` not `application permissions`). 

However, if you want to use your own credentials, follow [this guide by Microsoft on registering an application](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app?tabs=certificate) to create your own client ID and secret.

{% tip %}
You will need an Azure tenant with an active Azure subscription to create your own client credentials.
{% endtip %}

Make sure to configure the following settings on the app registration:

- **Supported account types**: Choose one of `Accounts in this organizational directory only` (recommended), `Accounts in any organizational directory`, `Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant) and personal Microsoft accounts`
- **Redirect URI**: Type: `Web`, URL: `https://my.home-assistant.io/redirect/oauth`


## Troubleshooting

{% details "Default credentials not available" %}

If the integration asks you for a `client ID` and a `client secret`, that likely means you disabled part of the `default_config` in your Home Assistant configuration. For account linking to work you'll need `my` & `cloud` integrations loaded.
{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
