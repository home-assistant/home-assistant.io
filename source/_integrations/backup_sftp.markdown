---
title: SFTP Backup
description: Allows storing backups created with Backup system onto remote SFTP host.
ha_category:
  - Other
ha_release: 2023.3
ha_quality_scale: internal
ha_domain: backup_sftp
ha_codeowners:
  - '@maretodoric'
ha_iot_class: Local Push
ha_config_flow: true
ha_integration_type: integration
related:
  - docs: /common-tasks/general/#backups
    title: Backups
  - docs: /more-info/backup-emergency-kit/
    title: backup emergency kit
---

The **SFTP Backup** {% term integration %} is used by core [Backup](/integrations/backup) integration to automatically store manual or automatic backups to remote SSH/SFTP Server if you have enabled **SFTP Backup Storage** in **Locations** section of your [Backup](/integrations/backup) integration settings.

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
  description: Password to authenticate with. Provide this or Private Key File.
  required: true
  type: string
Private Key File:
  description: Location to the private key file to authenticate with. File must be uploaded to the Home Assistant `/config` folder. If file name provided here does not start with `/` (to designate full path to private key file), `/config` is automatically prepended to file name. Provide this or password.
  required: true
  type: string
Remote path:
  description: Remote path where to upload backups. Directory must already exist and user provided in `Username` must have write access to it.
  required: true
  type: string
{% endconfiguration_basic %}

If both `Password` and `Private Key File` are provided, service will try to login with private key first, then fallback to password-based authentication if private key authentication fails.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

- If you remove the integration, all previous Home Assistant backups that were previously stored on remote server are not automatically deleted. You have to manually delete them from remote filesystem.
