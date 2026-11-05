---
description: Create and restore backups of your Home Assistant installation.
ha_release: 2022.4
ha_domain: backup
related:
  - docs: /common-tasks/general/backups/
    title: Backups
  - docs: /common-tasks/general/backups/#defining-backup-locations
    title: Backup locations
  - docs: /getting-started/onboarding/
    title: Recover from backup during onboarding
  - docs: /more-info/backup-emergency-kit/
    title: Backup emergency kit
---

The **Backup** {% term integration %} creates and restores backups across all [installation types](/installation/#about-installation-types).

To learn how to create and restore a backup, refer to the backup section under [common tasks](/common-tasks/general/backups/).

You no longer need to create your own automation to make backups. You can [set up an automatic backup from the UI](/common-tasks/general/backups/#setting-up-an-automatic-backup-process) instead. If you do want to trigger a backup yourself, the integration provides actions for it.

{% include integrations/actions.md %}

## Restoring a backup

To restore a backup, follow the steps described in [Restoring a backup](/common-tasks/general/backups/#restoring-a-backup).

## Event entity

The **Backup** {% term integration %} provides the **Automatic backup** {% term "Event entity" %} (`event.backup_automatic_backup`). It shows the state of the last backup that Home Assistant created. Despite its name, it also reports manual backups and the backups that Home Assistant creates before an update. You can use its attributes in automations, for example, to get notified when a backup fails. To react to the result of a backup, use the [**Event received**](/triggers/event.received/) trigger, and select the event type.

The event entity has the following attributes:

- **Event type** (`event_type`): The state of the last backup. The UI shows the following values:
  - **Completed successfully** (`completed`)
  - **In progress** (`in_progress`)
  - **Failed** (`failed`)
- **Backup stage** (`backup_stage`): The stage of a running backup, for example, `home_assistant`, `addons`, or `upload_to_agents`. It has no value when no backup is running.
- **Failure reason** (`failed_reason`): Why the last backup failed. It has no value when the backup didn't fail. The UI shows the following values:
  - **Backup agent error** (`backup_agent_error`)
  - **Backup agent unreachable** (`backup_agent_unreachable`)
  - **Backup manager error** (`backup_manager_error`)
  - **Backup not found** (`backup_not_found`)
  - **Backup reader/writer error** (`backup_reader_writer_error`)
  - **Decrypt on download not supported** (`decrypt_on_download_not_supported`)
  - **Invalid backup filename** (`invalid_backup_filename`)
  - **Multiple errors** (`multiple_errors`)
  - **Password incorrect** (`password_incorrect`)
  - **Unknown error** (`unknown_error`)
  - **Upload failed** (`upload_failed`)

The **Backup stage** and **Failure reason** attributes are not saved in the history. You can only use their current values, for example, in an automation that reacts to a failed backup.

## Sensors

The **Backup** {% term integration %} provides the following sensors.

### Backup Manager state

What the backup system is doing. The sensor has one of the following states:

- **Idle**: No backup is being created, received, or restored.
- **Creating a backup**
- **Receiving a backup**: A backup is being uploaded to Home Assistant.
- **Restoring a backup**
- **Blocked**: Home Assistant is still starting. Backups can't start until it has started.

### Next scheduled automatic backup

The date and time of the next scheduled automatic backup.

### Last attempted automatic backup

The date and time of the last automatic backup that Home Assistant tried to create, even if it failed.

### Last successful automatic backup

The date and time of the last automatic backup that Home Assistant created successfully.

### Last successful automatic backup size

The size of the last successful automatic backup, as it was created. You can use it to follow how the size of your backups changes over time, for example after changing what is included in them.

## Backup automation examples

### Automation: Get notified when a backup fails

When a backup fails, send a notification to your phone with the reason.

- **Trigger**: Event received
  - **Target**: Automatic backup (`event.backup_automatic_backup`)
  - **Event type**: Failed
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)
  - **Message**: {% raw %}`The last backup failed: {{ state_attr('event.backup_automatic_backup', 'failed_reason') }}`{% endraw %}

{% details "YAML example for getting notified when a backup fails" %}

{% example %}
automation: |
  alias: "Notify when a backup fails"
  triggers:
    - trigger: event.received
      target:
        entity_id: event.backup_automatic_backup
      options:
        event_type:
          - failed
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Backup failed"
        message: >-
          The last backup failed:
          {{ state_attr('event.backup_automatic_backup', 'failed_reason') }}
{% endexample %}

{% enddetails %}

### Automation: Shut down the NAS after a backup

If your backups are stored on a NAS that you only turn on for backups, shut it down when a backup is complete. This example uses the **Shut down** button that the [Synology DSM](/integrations/synology_dsm/) integration provides. Other NAS integrations can provide a similar button.

- **Trigger**: Event received
  - **Target**: Automatic backup (`event.backup_automatic_backup`)
  - **Event type**: Completed successfully
- **Action**: Press button
  - **Target**: NAS Shut down (`button.nas_shut_down`)

{% details "YAML example for shutting down the NAS after a backup" %}

{% example %}
automation: |
  alias: "Shut down the NAS after a backup"
  triggers:
    - trigger: event.received
      target:
        entity_id: event.backup_automatic_backup
      options:
        event_type:
          - completed
  actions:
    - action: button.press
      target:
        entity_id: button.nas_shut_down
{% endexample %}

{% enddetails %}
