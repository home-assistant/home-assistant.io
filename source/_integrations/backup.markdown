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

The **Backup** {% term integration %} allows you to create and download backups for your {% term "Home Assistant Core" %} and {% term "Home Assistant Container" %} installations. This backup file can be used if you migrate to {% term "Home Assistant Operating System" %}.

<div class="note">

If you use {% term "Home Assistant Operating System" %} or {% term "Home Assistant Supervised" %} , the [back up functionality is already built-in](/common-tasks/os/#backups). This integration is for {% term "Home Assistant Core" %} and {% term "Home Assistant Container" %} installations.

</div>

## Services

The **Backup** integration exposes a service that can be used to automate the backup
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

Backups created via the **Backup** integration are located in your a subdirectory named `backups` which are located in your [configuration directory](/docs/configuration/#editing-configurationyaml).
The {% term "Home Assistant Container" %} installation typically mounts this directory via `docker-compose.yml` or `docker run` to a directory of your choice.

The steps on recovering from a backup depend on the installation type and use case. Follow one of these steps:

1. If you use {% term "Home Assistant Operating System" %} or {% term "Home Assistant Supervised" %}:
   - The restore functionality is already built-in.
   - Follow the steps described in [Restoring a backup](/common-tasks/os/#restoring-a-backup).
2. If you use a {% term "Home Assistant Core" %} or {% term "Home Assistant Container" %} installation:
   - A Home Assistant backup is just a tar file of the [configuration directory](/docs/configuration/#editing-configurationyaml), plus some metadata.
   - To manually restore a backup, use the following command:

     ```shell
        tar -xOf <backup_tar_file> "./homeassistant.tar.gz" | tar --strip-components=1 -zxf - -C <restore_directory>
     ```

3. If you migrate from a {% term "Home Assistant Core" %} or {% term "Home Assistant Container" %} installation to {% term "Home Assistant Operating System" %}:
   - You can use these backup files during [onboarding](/getting-started/onboarding/) to recover your installation from backup.

## Manual configuration

The backup integration is enabled by default. If you've disabled or removed the [`default_config:`](/integrations/default_config/) line from your configuration, the backup functionality won't be available. Follow these steps to re-enable the backup integration.

1. In your [configuration file](/docs/configuration/), re-add the following entry:

    ```yaml
    # Example configuration.yaml entry
    backup:
    ```

2. Go to {% my system_dashboard title="**Settings**" %} and in the top right corner, select the three dots menu and select **Restart** > **Restart Home Assistant**.
   - **Result**: When it has started up again, you will find a new **Backup** entry under ({% my backup title="**Settings** > **System** > **Backups**" %}**).
   - The backup files are stored in a new **backups** subdirectory in the root of your configuration directory, `/config/backups/`.

## Related topics

- [Home Assistant installation methods](/installation/#advanced-installation-methods)
- [Recover from backup during onboarding](/getting-started/onboarding/)
- [Configuration file](/docs/configuration/)
- [Home Assistant Operating System: Restoring a backup](/common-tasks/os/#restoring-a-backup)
