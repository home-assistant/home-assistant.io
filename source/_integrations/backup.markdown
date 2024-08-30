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
related:
  - docs: /installation/#advanced-installation-methods
    title: Home Assistant installation methods
  - docs: /getting-started/onboarding/
    title: Recover from backup during onboarding
  - docs: /docs/configuration/
    title: Configuration file
  - docs: /common-tasks/os/#restoring-a-backup
    title: Home Assistant Operating System- Restoring a backup
---

The **Backup** {% term integration %} is used for {% term "Home Assistant Core" %} and {% term "Home Assistant Container" %} installations to create and download backups. This backup file can be used if you migrate to {% term "Home Assistant Operating System" %}.

Note: If you use {% term "Home Assistant Operating System" %} or {% term "Home Assistant Supervised" %} installation, this page is not for you. Instead, refer to the documentation on using the [built-in back up](/common-tasks/os/#backups).

## Actions

The **Backup** integration exposes an action that can be used to automate the backup
process.

### Action {% my developer_call_service service="backup.create" %}

The {% my developer_call_service service="backup.create" %} action can be used
to create a backup for your Home Assistant instance.

The action has no additional options or parameters.

Example action:

```yaml
action: backup.create
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
      action: backup.create
```

## Restoring a backup

Backups created via the **Backup** integration are in a subdirectory `backups`, located in your [configuration directory](/docs/configuration/#editing-configurationyaml).
The {% term "Home Assistant Container" %} installation typically mounts this directory via `docker-compose.yml` or `docker run` to a directory of your choice.

The steps on recovering from a backup depend on the installation type and use case. Follow one of these steps:

1. If you use {% term "Home Assistant Operating System" %} or {% term "Home Assistant Supervised" %}:
   - Follow the steps described in [Restoring a backup](/common-tasks/os/#restoring-a-backup).
2. If you use a {% term "Home Assistant Core" %} or {% term "Home Assistant Container" %} installation:
   - A Home Assistant backup is just a tar file of the [configuration directory](/docs/configuration/#editing-configurationyaml), plus some metadata.
   - To manually restore a backup, use the following command:

     ```shell
        tar -xOf <backup_tar_file> "./homeassistant.tar.gz" | tar --strip-components=1 -zxf - -C <restore_directory>
     ```

3. If you migrate from a {% term "Home Assistant Core" %} or {% term "Home Assistant Container" %} installation to {% term "Home Assistant Operating System" %}:
   - You can use these backup files during [onboarding](/getting-started/onboarding/) to recover your installation from backup.
