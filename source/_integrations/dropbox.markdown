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

## Removing the integration

{% include integrations/remove_device_service.md %}

If you remove the integration, the Home Assistant folder in Dropbox containing your backups is not automatically deleted. If you want to delete the backup files, you need to manually delete the Home Assistant folder in Dropbox.
