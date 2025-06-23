---
title: SFTP Client
description: Instructions on how to use  SFTP Client in Home Assistant.
ha_category:
  - Backup
ha_iot_class: Local Polling
ha_release: '2025.2'
ha_config_flow: true
ha_domain: sftp_client
ha_codeowners:
  - '@cyr-ius'
ha_integration_type: service
ha_quality_scale: platinum
related:
  - docs: /common-tasks/general/#backups
    title: Creating backups in Home Assistant
---

This {% term integration %} allows you to perform Home Assistant backups to a server via SFTP. Once this integration is configured, your server will contain a new folder called backup where all backups will be stored. If you delete the folder, it will be automatically recreated as long as the {% term integration %} is enabled.

## Removing the integration

{% include integrations/remove_device_service.md %}

- If you remove the integration, the Assistant Home folder on your server is not automatically deleted. You must delete it manually.

## Known limitations

- The integration can only access files that it creates in the Home Assistant folder. It cannot access or modify any other files.

