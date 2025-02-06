---
title: OneDrive
description: Instructions on how to setup OneDrive to be used with backups.
ha_release: 2025.2
ha_category:
  - Backup
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: onedrive
ha_codeowners:
  - '@zweckj'
ha_integration_type: service
related:
  - docs: /common-tasks/general/#backups
    title: Backups
ha_quality_scale: bronze
---

This integration allows you to use [OneDrive](https://www.microsoft.com/en-us/microsoft-365/onedrive/online-cloud-storage) for [Home Assistant Backups](/common-tasks/general/#backups).

Backups will be created in a folder called `Home Assistant\backups_<id>` in the `App Folder` of your OneDrive.
`id` is part of your Home Assistant instance's unique id to allow backups from multiple instances to the same OneDrive account.
The integration only has access to an application specific `Home Assistant` folder in the `App Folder` and cannot access any other parts of your OneDrive.

{% important %}
Because of an [issue in the Graph API](https://github.com/OneDrive/onedrive-api-docs/issues/1866), the application-specific folder is often called `Graph` instead of `Home Assistant`.
{% endimportant %}

{% include integrations/config_flow.md %}
{% configuration_basic %}
Client ID:
  description: "Application ID of the app registration to be used with the integration. Uses Home Assistant provided by default."
Client secret:
  description: "Application secret for the app registration. Uses Home Assistant provided by default."

{% endconfiguration_basic %}

## Requested permissions by the integration

The integration will request the following permissions on your OneDrive for the integration to work:

- `Files.ReadWrite.AppFolder`: Grants the application permission to read and write in its own, app-specific folder inside your OneDrive
- `offline_access`: Grants the application permission to refresh its authentication token without requiring your manual intervention
- `openid`: Grants the application permission to read basic information, e.g. if you have a OneDrive


<img src='/images/integrations/onedrive/onedrive-permissions.png' alt='Lists of permissions that the application will request.'>


## Getting application credentials

This integration comes with a predefined set of [application credentials](https://www.home-assistant.io/integrations/application_credentials/) through Home Assistant account linking. 
Nobody will ever have access to your data except you, as the app does not have permission to do anything on its own. It only works with a signed-in user (it only has `delegated` not `application permissions`). 
However, if you want to use your own credentials, follow [this guide](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app?tabs=certificate) to create your own client ID and secret.

{% note %}
If you set the integration up with the default credentials and switch to custom credentials later, your backup folder will change inside your OneDrive, and you will have to manually copy existing backups from the old folder to the new one.
{% endnote %}

{% tip %}
You will need an Azure tenant with an active Azure subscription to create your own client credentials.
{% endtip %}

## Known limitations

- Only personal OneDrives are supported at the moment.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
