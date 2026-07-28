---
title: Dropbox
description: Instructions on how to set up backup to a Dropbox account within Home Assistant.
ha_category:
  - Backup
ha_release: 2026.4
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bdr99'
ha_domain: dropbox
ha_integration_type: service
ha_quality_scale: bronze
---

This {% term integration %} allows you to connect your [Dropbox](https://dropbox.com) account with Home Assistant Backups.

{% include integrations/config_flow.md %}

{% note %}
By default, this integration will use the Home Assistant Cloud Account Linking service to authenticate with Dropbox. This does not require a Home Assistant Cloud subscription, and is the easiest and recommended way to set up the integration. If you want to use your own Dropbox application credentials instead, please follow the instructions in the "Using custom application credentials" section below.
{% endnote %}

{% details "Using custom application credentials" icon="mdi:account-key" %}

1. Go to the [Dropbox App Console](https://www.dropbox.com/developers/apps) and create an app.
2. Choose **Scoped access** for the API and **App folder** for the access type.
3. Give the app a unique name.
4. Take note of the **App key** and **App secret**. These are the application credentials for your newly created app.
5. In the **OAuth 2** section, under **Redirect URIs**, enter the following URL: `https://my.home-assistant.io/redirect/oauth` and select **Add**.
6. On the **Permissions** tab, enable `files.content.write` and `files.content.read`.
7. In Home Assistant, in {% my integrations title="**Settings** > **Devices & services**" %} in the top-right three dots {% icon "mdi:dots-vertical" %} menu > **Application credentials**, select the button to add an application credential.
8. Select Dropbox and enter the name of your app. For the client ID and client secret, enter the app key and app secret from step 4 and select **Add**.

{% enddetails %}

## Using the integration

After the integration is set up, Dropbox will appear as a backup location in Home Assistant's Backup feature. Backups will be stored in a folder named "Home Assistant" within the Apps folder of your Dropbox. You can rename or move this folder anywhere you want and backups will still be stored there.

## Known limitations

- The integration can only access the folder it creates. It cannot access or modify any other files in your Dropbox account.
- Backups are only detected directly in that folder. If you move a backup into a subfolder, Home Assistant no longer lists it.
- Each Dropbox account can only be added once. To store backups in a second account, add a separate configuration entry for that account.

## Troubleshooting

### Backups fail to upload

Uploads fail once your Dropbox account runs out of storage. Backup files are large, and Home Assistant keeps several of them depending on your backup settings.

To resolve this issue, try the following steps:

1. Check the available storage in your Dropbox account.
2. Delete old backups you no longer need, either from the Home Assistant backup list or from the Dropbox folder directly.
3. Go to {% my supervisor_backups title="**Settings** > **System** > **Backups**" %} and under **Automatic backups**, select **Configure automatic backups** to reduce the number of backups Home Assistant retains.

### A backup stored in Dropbox is not listed in Home Assistant

Every backup consists of two files: the backup itself, ending in `.tar`, and a metadata file with the same name, ending in `.metadata.json`. Home Assistant only lists a backup when both files are present and the metadata file is valid. If one of the files was renamed, moved, or deleted, the backup is ignored.

To resolve this issue, make sure both files are still in the folder and that their names match, apart from the file extension. If the metadata file is missing, the backup cannot be restored through the integration. You can still download the `.tar` file from Dropbox and upload it to Home Assistant manually.

### Reauthentication fails with "Wrong account"

A configuration entry stays tied to the Dropbox account it was set up with. If you sign in with a different account while reauthenticating, the flow stops with the message **Wrong account: Please authenticate with the correct account.**

To resolve this issue, sign out of Dropbox in your browser, then start the reauthentication again and sign in with the account you originally used. If you want to switch to a different Dropbox account, delete the configuration entry and set the integration up again.

### Setting up the integration fails when using custom application credentials

If you cannot complete the setup with your own Dropbox app, the stored application credentials may be incorrect. Delete them in the [Application credentials](/integrations/application_credentials/) interface, then add them again and make sure the app key and app secret match the ones shown in the Dropbox App Console.

When reporting an issue, enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics). Reload the integration. As soon as the issue reoccurs, stop debug logging again. The debug log file will be downloaded automatically.

## Removing the integration

{% include integrations/remove_device_service.md %}

If you remove the integration, the Home Assistant folder in Dropbox containing your backups is not automatically deleted. If you want to delete the backup files, you need to manually delete the Home Assistant folder in Dropbox.
