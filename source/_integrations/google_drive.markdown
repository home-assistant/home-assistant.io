---
title: Google Drive
description: Instructions on how to use Google Drive in Home Assistant.
ha_category:
  - Backup
ha_iot_class: Cloud Polling
ha_release: '2025.2'
ha_config_flow: true
ha_domain: google_drive
ha_codeowners:
  - '@tronikos'
ha_integration_type: service
google_dev_console_link: https://console.developers.google.com/start/api?id=drive
api: Google Drive API
api_link: https://console.developers.google.com/start/api?id=drive
related:
  - docs: /common-tasks/general/#backups
    title: Creating backups in Home Assistant
  - url: https://drive.google.com
    title: Google Drive
  - url: https://console.developers.google.com/start/api?id=drive
    title: Google Developer Console
ha_quality_scale: platinum
---

This {% term integration %} allows you to connect your [Google Drive](https://drive.google.com) with Home Assistant Backups. When you set up this integration, your Google Drive will have a new folder called Home Assistant where all the backups will be stored. You can rename this folder to whatever you like in Google Drive at any point in time. If you delete the folder, it will automatically be re-created as long as you have the {% term integration %} enabled.


## Prerequisites

You need to configure developer credentials to allow Home Assistant to access your Google Account.
These credentials are the same as the ones for [Google Sheets](/integrations/google_sheets), [Nest](/integrations/nest), [YouTube](/integrations/youtube), and [Google Mail](/integrations/google_mail).
These are not the same as *Device Auth* credentials previously recommended for [Google Calendar](/integrations/google).

{% include integrations/google_client_secret.md %}

{% include integrations/config_flow.md %}

{% include integrations/google_oauth.md %}

## Removing the integration

{% include integrations/remove_device_service.md %}

- If you remove the integration, the Home Assistant folder in Google Drive is not automatically deleted. You have to manually delete it in Google Drive.

## Known limitations

- The integration can only access files that it creates in the Home Assistant folder. It cannot access or modify any other files in your Google Drive.

## Troubleshooting

If you have an error with your credentials, you can delete them in the [Application Credentials](/integrations/application_credentials/) user interface.
