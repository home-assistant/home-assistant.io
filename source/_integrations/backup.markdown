---
title: Backup
description: Allow creating backups of container and core installations.
ha_category:
  - Event
  - Other
  - Sensor
ha_release: 2022.4
ha_quality_scale: internal
ha_domain: backup
ha_codeowners:
  - '@home-assistant/core'
ha_iot_class: Calculated
ha_platforms:
  - diagnostics
  - event
  - sensor
ha_integration_type: service
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

The **Backup** {% term integration %} is used by all [installation types](/installation/#about-installation-methods) to create and restore backups.

To learn how to create and restore a backup, refer to the backup section under [common tasks](/common-tasks/general/#backups).

## Actions

The **Backup** integration exposes actions that can be used to automate the backup
process.

However, it is no longer needed to create your own automation. Follow these steps to [set up an automatic backup from the UI](/common-tasks/general/#setting-up-an-automatic-backup-process).

### Action backup.create_automatic

The {% my developer_call_service service="backup.create_automatic" %} action can be used
to create a backup of your Home Assistant instance.

The automation editor does not show a UI editor because the action uses the same settings you defined under {% my backup title="**Settings** > **System** > **Backups**" %}, under **Backup settings**. For a more detailed description, refer to the documentation on [automatic backups](/common-tasks/general/#setting-up-an-automatic-backup-process).

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

- This action is only available in [core and container installations](/installation/#about-installation-methods).
- The action has no additional options or parameters.
- The backup will only be saved on the local storage.
- The backup created with `backup.create` always includes the database.
- The backup will be created without a password.

Example action:

```yaml
action: backup.create
```

### Example: Backing up every night at 3:00 AM

This is a YAML example for an automation that initiate a backup every night
at 3 AM:

{% raw %}

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

{% endraw %}

## Restoring a backup

To restore a backup, follow the steps described in [Restoring a backup](/common-tasks/general/#restoring-a-backup).

## Event entity

The **Backup** {% term integration %} provides an {% term "Event entity" %} which represents the state of the last automatic backup (_completed, in progress, failed_). It also provides several event attributes which can be used in automations.

| Attribute | Description |
| --- | --- |
| `event_type` | The translated state of the last automatic backup task (_possible states: completed, in progress, failed_)
| `backup_stage` | The current automatic backup stage (_is `None` when `event_type` is not in progress_) |
| `failed_reason` | The reason for a failed automatic backup (_is `None` when `event_type` is completed or in progress_) |

### Usage examples

Send notification to mobile app, when an automatic backup failed.

{% raw %}

```yaml
alias: Backup failed
triggers:
  - trigger: state
    entity_id:
      - event.backup_automatic_backup
conditions:
  - condition: state
    entity_id: event.backup_automatic_backup
    attribute: event_type
    state: failed
actions:
  - data:
      title: Automatic backup failed
      message: The last automatic backup failed due to {{ state_attr('event.backup_automatic_backup', 'failed_reason') }}
    action: notify.mobile-app
mode: single
```

{% endraw %}

## Sensors

The **Backup** {% term integration %} provides several sensors.

### Backup Manager State

The current state of the backup system. Possible states are:

- Idle
- Creating a backup
- Receiving a backup
- Restoring a backup

### Next scheduled automatic backup

The timestamp of the next scheduled automatic backup.

### Last attempted automatic backup

The timestamp of the last attempted automatic backup.

### Last successful automatic backup

The timestamp of the last successful automatic backup.
