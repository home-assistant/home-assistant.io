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
---

This integration allows you to use [OneDrive](https://www.microsoft.com/en-us/microsoft-365/onedrive/online-cloud-storage) for use with Home Assistant Backups.

Backups will be created in a folder called `home-assistant\backups` in the `App Folder` of your OneDrive.
The integration only has access to a application specific `home-assistant` folder in the `App Folder` and cannot access any other parts of your OneDrive.

{% include integrations/config_flow.md %}
{% configuration_basic %}
Client ID:
  description: "Application Id of the app registration to be used with the integration. Uses Home Assistant provided by default."
Client secret:
  description: "Application secret for the app registration. Uses Home Assistant provided by default."

{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

## Requested permissions by the integration

The integration will request the following permissions on your OneDrive for the integration to work:

- `Files.ReadWrite.AppFolder`: Grants the application permission to read and write in its own, app-specific folder inside your OneDrive
- `offline_access`: Grants the application permission to refresh its authentication token without requiring your manual intervention
- `openid`: Grants the application permission to read basic information, e.g. if you have a OneDrive

## Getting application credentials

This integration comes with a predefined set of [application credentials](https://www.home-assistant.io/integrations/application_credentials/) through Home Assistant account linking. 
Everything is done in a delegated user context, so nobody will ever have access to your data except you. However, if you want to use your own credentials, 
follow [this guide](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app?tabs=certificate) to create your own client ID and secret.

{% note %}
You will need an Azure tenant with an active Azure subscription to create your own client credentials.
{% endnote %}

## Known Limitations

- Only personal OneDrives are supported at the moment

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
