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

## Configuration Options

While initially configuring the integration, some settings are required

- **Host** : Hostname or IP address of SSH/SFTP Server to connect to.
- **Port** : Port of your SSH/SFTP Server. Default value is: `22`.
- **Username** : Username to authenticate with.
- **Password** : Password to authenticate with. Provide this or Private Key File.
- **Private Key File** : Location to private key file to authenticate with. File must be uploaded to Home Assistant `/config` folder. Provide this or password.
- **Remote path** : Remote path where to upload backups. Directory must already exist and user provided in `Username` must have write access to it.