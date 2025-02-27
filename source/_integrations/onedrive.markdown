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
ha_quality_scale: platinum
ha_platforms:
  - sensor
---

This integration allows you to use [Microsoft OneDrive](https://www.microsoft.com/en-us/microsoft-365/onedrive/online-cloud-storage) for [Home Assistant Backups](/common-tasks/general/#backups).

Backups will be created in a folder called `Home Assistant\backups_<id>` in the `App Folder` of your OneDrive by default.
`id` is part of your Home Assistant instance's unique id to allow backups from multiple instances to the same OneDrive account.

The integration only has access to an application specific `Home Assistant` folder in the `App Folder` and cannot access any other parts of your OneDrive.

{% important %}
Because of an issue in Microsoft's APIs, the application-specific folder is often called `Graph` instead of `Home Assistant`. More on that [below](#backup-folder-is-called-graph).
{% endimportant %}

{% include integrations/config_flow.md %}
{% configuration_basic %}
Client ID:
  description: "Application ID of the app registration to be used with the integration. Uses Home Assistant provided by default."
Client secret:
  description: "Application secret for the app registration. Uses Home Assistant provided by default."
Folder name:
  description: "The name of the instance specific [backup folder](#backup-folder)."

{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
Delete files permanently:
  description: By default, files are put into the Recycle Bin when deleted, where they remain available for another 30 days. If you enable this option, files will be deleted immediately when they are cleaned up by the backup system.
{% endconfiguration_basic %}

## Backup folder

The backup folder is `root:\Apps\[Home Assistant | Graph]\backups_{id}`. This is not configurable because otherwise the integration would need permissions to write into your entire drive. You can, however, rename the application folder which is called `Home Assistant` or `Graph` in your OneDrive. 

The last folder in the hierarchy (`backups_{id}`) is always a unique folder per Home Assistant instance to ensure that backups from different instances are not mixed. The name of this folder can be set during integration setup and can be changed later through reconfiguring the integration or by renaming the folder in OneDrive.

### Backup folder is called `Graph`

This integration uses Microsoft's Graph API to communicate with your OneDrive. Because of an [issue](https://github.com/OneDrive/onedrive-api-docs/issues/1866) in that API, the application folder is often not named with the name of the application (`Home Assistant`), but `Graph` instead. 

There is no risk of different applications mixing in that `Graph` folder, if you already have such a `Graph` folder from a different application, the next folders will just be called `Graph 1`, `Graph 2` and so on. 

You should be able to manually rename the folder to something else, without the integration breaking.

## Requested permissions by the integration

The integration will request the following permissions on your OneDrive for the integration to work:

- `Files.ReadWrite.AppFolder`: Grants the application permission to read and write in its own, app-specific folder inside your OneDrive
- `offline_access`: Grants the application permission to refresh its authentication token without requiring your manual intervention
- `openid`: Grants the application permission to read basic information, e.g. if you have a OneDrive


<img src='/images/integrations/onedrive/onedrive-permissions.png' alt='Lists of permissions that the application will request.'>

## Sensors

The integration provides the following sensors, which are updated every 5 minutes:

- **Total available storage**: The total size of your drive (disabled by default)
- **Used storage**: The amount of storage you have used up
- **Remaining storage**: The amount of storage that is left in your drive
- **Drive state**: Calculated state of your drive, based on the storage left. Possible values: `Normal`, `Nearing limit`, `Critical`, `Exceeded`

{% note %}
A drive that is in **Drive state** `Exceeded` will be automatically frozen (meaning you can't upload any more backups & files), until you clear up enough storage.
{% endnote %}

## Automations

Get started with these automation examples.

### Send alert when drive is near storage limit

Send an alert when the drive usage is close to the storage limit and needs cleanup.

{% details "Example YAML configuration" %}

{% raw %}

```yaml
alias: Alert when OneDrive is close to storage limit
description: Send notification to phone when drive needs cleanup.
triggers:
  - trigger: state
    entity_id:
      - sensor.my_drive_drive_state
    from: "normal"
    to: "nearing"
  - trigger: state
    entity_id:
      - sensor.my_drive_drive_state
    from: "nearing"
    to: "critical"
actions:
  - action: notify.mobile_app_iphone
    data:
      title: OneDrive is almost full!
      message: >
        OneDrive has used up {{ states('sensor.my_drive_used_storage') }} of {{
        states('sensor.my_drive_total_available') }}GB.  Only {{ states('sensor.my_drive_remaining_storage') }}GB remaining.
mode: single
```

{% endraw %}
{% enddetails %}


## Getting application credentials

This integration comes with a predefined set of [application credentials](https://www.home-assistant.io/integrations/application_credentials/) through Home Assistant account linking. This means you should not need to provide credentials, but get redirected to Microsoft's sign-in page.

Even if you use the default credentials, nobody will ever have access to your data except you, as the app does not have permission to do anything on its own. It only works with a signed-in user (it only has `delegated` not `application permissions`). 

However, if you want to use your own credentials, follow [this guide](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app?tabs=certificate) to create your own client ID and secret.

{% tip %}
You will need an Azure tenant with an active Azure subscription to create your own client credentials.
{% endtip %}

Make sure to configure the following settings on the app registration:

- **Supported account types**: Personal Microsoft accounts only
- **Redirect URI**: Type: `Web`, URL: `https://my.home-assistant.io/redirect/oauth`

<img src='/images/integrations/onedrive/onedrive-app-registration.png' alt='Configuring a custom app.'>


{% note %}
If you set the integration up with the default credentials and switch to custom credentials later, your backup folder will change inside your OneDrive, and you will have to manually copy existing backups from the old folder to the new one.
{% endnote %}

## Known limitations

- Only personal OneDrives are supported at the moment.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

## Troubleshooting

{% details "Unknown error while adding the integration" %}

Make sure that your OneDrive is not frozen. This can happen if you haven't used it for a longer period of time, or went over your data quota. {% enddetails %}

{% details "Default credentials not available" %}

If the integration asks you for a `client ID` and a `client secret`, that likely means you disabled part of the `default_config` in your Home Assistant configuration. For account linking to work you'll need `my` & `cloud` integrations loaded. {% enddetails %}
