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

## Actions

The **Backup** integration exposes actions you can use to automate the backup process.

However, you no longer need to create your own automation. You can [set up an automatic backup from the UI](/common-tasks/general/#setting-up-an-automatic-backup-process) instead.

### Action: Create automatic

The `backup.create_automatic` action allows you to create a backup of your Home Assistant instance.

The automation editor does not show a UI editor because the action uses the same settings you defined under {% my backup title="**Settings** > **System** > **Backups**" %}, under **Backup settings**. For a more detailed description, refer to the documentation on [automatic backups](/common-tasks/general/#setting-up-an-automatic-backup-process).

Use this action to create backups with predefined settings on a more flexible schedule than the built-in automatic backup schedule.

The action has no additional options or parameters.

Example action:

```yaml
action: backup.create_automatic
```

### Action: Create

The `backup.create` action allows you to create a backup of your Home Assistant instance.

- This action is only available in [core and container installations](/installation/#about-installation-types).
- The action has no additional options or parameters.
- The backup is only saved to local storage.
- The backup created with `backup.create` always includes the database.
- The backup is created without a password.

Example action:

```yaml
action: backup.create
```

### Example: Backing up every night at 3:00 AM

Here's a YAML example of an automation that creates a backup every night at 3 AM:

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
