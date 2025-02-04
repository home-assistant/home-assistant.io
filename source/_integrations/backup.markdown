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
  - docs: /common-tasks/general/#backups
    title: Backups
  - docs: /common-tasks/general/#defining-backup-locations
    title: Backup locations
  - docs: /getting-started/onboarding/
    title: Recover from backup during onboarding
  - docs: /more-info/backup-emergency-kit/
    title: backup emergency kit
---

The **Backup** {% term integration %} is used by all [installation types](/installation/#advanced-installation-methods) to create and restore backups.

To learn how to create and restore a backup, refer to the backup section under [common tasks](/common-tasks/general/#backups).

## Actions

The **Backup** integration exposes actions that can be used to automate the backup
process.

However, it is no longer needed to create your own automation. Follow these steps to [set up an automatic backup from the UI](/common-tasks/general/#setting-up-an-automatic-backup-process).

### Action backup.create_automatic

The {% my developer_call_service service="backup.create_automatic" %} action can be used
to create a backup of your Home Assistant instance, using the same settings as those used
by [automatic backups](/common-tasks/general/#setting-up-an-automatic-backup-process).

This action can be called to create backups with pre-defined settings at a more flexible
schedule than the schedule which can be configured for automatic backups.

The action has no additional options or parameters.

Example action:

```yaml
action: backup.create_automatic
```

### Action backup.create

The {% my developer_call_service service="backup.create" %} action can be used
to create a backup of your Home Assistant instance.
This action is only available in [core and container installations](/installation/#advanced-installation-methods).
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
    triggers:
      - trigger: time
        at: "03:00:00"
    actions:
      - alias: "Create backup now"
        action: backup.create
```

## Restoring a backup

To restore a backup, follow the steps described in [Restoring a backup](/common-tasks/general/#restoring-a-backup).
