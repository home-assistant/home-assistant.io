---
title: Backup
description: Allow creating backups of container and core installations.
ha_category:
  - Other
ha_release: 2022.4
ha_quality_scale: internal
ha_domain: backup
ha_codeowners:
  - '@home-assistant/core'
ha_iot_class: Calculated
ha_integration_type: system
---

The Backup integration allow you to create and download backups for your Home Assistant Core and Home Assistant Container installations. This backup file can be used if you migrate to Home Assistant Operating System.

<div class="note">

If you use Home Assistant Operating System or Home Assistant Supervised, [back up functionality is already built-in](/common-tasks/os/#backups).

</div>


## Manual configuration

The backup integration is by default enabled. If you've disabled or removed the [`default_config:`](/integrations/default_config/) line from your configuration the following example shows you how to enable this integration manually:

```yaml
# Example configuration.yaml entry
backup:
```

You need to restart Home Assistant after you add this configuration.
When it has started up again you will find a new "Backup" entry in the main menu (**{% my backup title="Settings > System > Backups" %}**).

The backup files are stored in a new "backups" subdirectory in the root of your configuration directory.

## Services

The backup integration exposes a service that can be used to automate the backup
process.

### Service {% my developer_call_service service="backup.create" %}

The {% my developer_call_service service="backup.create" %} service can be used
to create a backup for your Home Assistant instance. 

The service has no additional options or parameters.

Example service call:

```yaml
service: backup.create
```

### Example: Backing up every night at 3:00 AM


This is a YAML example for an automation that initiate a backup every night
at 3 AM:

```yaml
automation:
  - alias: "Backup Home Assistant every night at 3 AM"
    trigger:
      platform: time
      at: "03:00:00"
    action:
      alias: "Create backup now"
      service: backup.create
```

## Restoring a backup

<div class="note">

If you use Home Assistant Operating System or Home Assistant Supervised, [restore functionality is already built-in](/common-tasks/os/#restoring-a-backup).

</div>

Backups created via the integrations are located in you `/config/backups` directory. Home Assistant Container installation will typically mount this directory via `docker-compose.yml` or `docker run` to a directory of they choice.  
There is currently no builtin way to restore a backup. However, a Home Assistant backup is just a tar file of the `/config` directory, plus some metadata. To manually restore a back, one can do:

```shell
$ tar -xOf <backup_tar_file> "./homeassistant.tar.gz" | tar --strip-components=1 -zxf - -C <restore_directory>
```
