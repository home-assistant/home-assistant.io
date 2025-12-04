---
title: SFTP Storage
description: Allows storing backups created with Backup system onto remote SFTP host.
ha_category:
  - Backup
ha_release: '2025.10'
ha_quality_scale: silver
ha_domain: sftp_storage
ha_codeowners:
  - '@maretodoric'
ha_iot_class: Local Polling
ha_config_flow: true
ha_integration_type: service
related:
  - docs: /common-tasks/general/#backups
    title: Backups
  - docs: /more-info/backup-emergency-kit/
    title: Backup emergency kit
---

The **SFTP Storage** {% term integration %} works with the core [Backup](/integrations/backup) integration. When you enable **SFTP Storage** in the **Locations** section of your [Backup](/integrations/backup) integration settings, Home Assistant automatically stores manual and automatic backups on your remote SSH/SFTP server.

To learn how to create and restore a backup, refer to the backup section under [common tasks](/common-tasks/general/#backups).

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: Hostname or IP address of SSH/SFTP Server to connect to.
  required: true
  type: string
Port:
  description: Port of your SSH/SFTP Server. This is usually 22.
  required: true
  type: integer
  default: 22
Username:
  description: Username to authenticate with.
  required: true
  type: string
Password:
  description: Password to authenticate with. Provide this or a private key file.
  required: true
  type: string
Private Key File:
  description: Upload a private key file used for authentication. Provide this or password.
  required: true
  type: selector
Remote path:
  description: Remote path where to upload backups. Directory must already exist and user provided in `Username` must have write access to it.
  required: true
  type: string
{% endconfiguration_basic %}

If both `Password` and `Private Key File` are provided, service will try to login with private key first, then fallback to password-based authentication if private key authentication fails.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

- After you remove the integration, all Home Assistant backups stored on the remote server are not automatically deleted. You need to manually delete them from the remote filesystem.
