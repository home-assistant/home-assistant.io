---
title: Dropbox
description: Instructions on how to set up backup to a Dropbox account within Home Assistant.
ha_category:
  - Backup
ha_release: 2025.12
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bdr99'
ha_domain: dropbox
ha_integration_type: service
ha_quality_scale: bronze
---

This {% term integration %} allows you to connect your [Dropbox](https://dropbox.com) account with Home Assistant Backups.

## Setting up the integration

{% include integrations/config_flow.md %}

## Using the integration

After the integration is set up, Dropbox will appear as a backup location in Home Assistant's Backup feature. Backups will be stored in a folder named "Home Assistant" in your Dropbox.

## Removing the integration

{% include integrations/remove_device_service.md %}

If you remove the integration, the Home Assistant folder in Dropbox containing your backups is not automatically deleted. You have to manually delete it in Dropbox.