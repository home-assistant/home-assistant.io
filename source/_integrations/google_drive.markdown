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
ha_quality_scale: platinum
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
ha_platforms:
  - diagnostics
  - sensor
---

This {% term integration %} allows you to connect your [Google Drive](https://drive.google.com) with Home Assistant Backups. When you set up this integration, your Google Drive will have a new folder called `Home Assistant` where all the backups will be stored. You can rename this folder to whatever you like in Google Drive at any point in time. If you delete the folder, it will automatically be re-created as long as you have the {% term integration %} enabled.

For a video walkthrough of the setup instructions, see this video from 13:50 to 19:20
<lite-youtube videoid="pZlYu9bN72U" videoStartAt="830" videotitle="Automate Your Home Assistant Backups Like A Pro!" posterquality="maxresdefault"></lite-youtube>

## Prerequisites

You need to configure developer credentials to allow Home Assistant to access your Google Account.
These credentials are the same as the ones for [Google Sheets](/integrations/google_sheets), [Nest](/integrations/nest), [YouTube](/integrations/youtube), and [Google Mail](/integrations/google_mail).
These are not the same as *Device Auth* credentials previously recommended for [Google Calendar](/integrations/google).

{% include integrations/google_client_secret.md %}

{% include integrations/config_flow.md %}

{% include integrations/google_oauth.md %}

## Sensors
The integration provides the following sensors, which are updated every 6 hours:

- **Total available storage**: The storage limit, if applicable. This will be unknown if the user has unlimited storage.
- **Used storage**: The total storage usage across all Google services.
- **Used storage in Drive**: The usage by all files in Google Drive. This entity is disabled by default.
- **Used storage in Drive Trash**: The usage by trashed files in Google Drive. This entity is disabled by default.
- **Total size of backups**: The sum of the size of all backups for the current Home Assistant's installation.

For users that are part of an organization with pooled storage, information about the available storage and used storage across all services is for the organization, rather than the individual user.

## Examples

Get started with these automation examples.

### Send alert when drive is near storage limit

Send an alert when the drive usage is close to the storage limit and needs clean up.

{% details "Example YAML configuration" %}

{% raw %}

```yaml
alias: Alert when Google Account is close to storage limit
description: Send notification to phone when drive needs clean up.
triggers:
  - trigger: numeric_state
    entity_id: sensor.example_gmail_com_used_storage
    above: "{{ states('sensor.example_gmail_com_total_available_storage') | float * 0.9 }}"
actions:
  - action: notify.mobile_app_iphone
    data:
      title: Google Account is almost full!
      message: >
        Google Account has used up {{ states('sensor.example_gmail_com_used_storage') }}GB of {{
        states('sensor.example_gmail_com_total_available_storage') | float }}GB.
```

{% endraw %}
{% enddetails %}

## Removing the integration

{% include integrations/remove_device_service.md %}

- If you remove the integration, the Home Assistant folder in Google Drive is not automatically deleted. You have to manually delete it in Google Drive.

## Known limitations

- The integration can only access files that it creates in the Home Assistant folder. It cannot access or modify any other files in your Google Drive.

## Troubleshooting

If you have an error with your credentials, you can delete them in the [Application Credentials](/integrations/application_credentials/) user interface.
