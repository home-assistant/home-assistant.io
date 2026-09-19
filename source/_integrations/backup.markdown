---
title: Backup
description: Create and restore backups of your Home Assistant installation.
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
    title: Backup emergency kit
---

The **Backup** {% term integration %} creates and restores backups across all [installation types](/installation/#about-installation-types).

To learn how to create and restore a backup, refer to the backup section under [common tasks](/common-tasks/general/#backups).

You no longer need to create your own automation to make backups. You can [set up an automatic backup from the UI](/common-tasks/general/#setting-up-an-automatic-backup-process) instead. If you do want to trigger a backup yourself, the integration provides actions for it.

{% include integrations/actions.md %}

## Restoring a backup

To restore a backup, follow the steps described in [Restoring a backup](/common-tasks/general/#restoring-a-backup).

## Event entity

The **Backup** {% term integration %} provides an {% term "Event entity" %} that represents the state of the last automatic backup (_completed_, _in progress_, or _failed_). It also provides several event attributes you can use in automations.

| Attribute | Description |
| --- | --- |
| `event_type` | The translated state of the last automatic backup task (_possible states: completed, in progress, failed_). |
| `backup_stage` | The current automatic backup stage (_is `None` when `event_type` is not in progress_). |
| `failed_reason` | The reason for a failed automatic backup (_is `None` when `event_type` is completed or in progress_). |

### Usage examples

Send a notification to the mobile app when an automatic backup fails:

```yaml
alias: "Backup failed"
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
  - action: notify.send_message
    target:
      entity_id: notify.my_device
    data:
      title: "Automatic backup failed"
      message: >-
        The last automatic backup failed due to
        {{ state_attr('event.backup_automatic_backup', 'failed_reason') }}
```


## Sensors

The **Backup** {% term integration %} provides several sensors.

### Backup manager state

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
