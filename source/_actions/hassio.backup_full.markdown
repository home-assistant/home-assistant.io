---
title: "Create a full backup"
action: hassio.backup_full
domain: hassio
description: "Creates a full backup."
related_actions:
  - hassio.backup_partial
  - hassio.restore_full
---

Use this action to create a full backup of your system. A full backup includes Home Assistant, all your apps, and their data, so you can restore everything later if something goes wrong. A common use is an automatic nightly backup, or a backup right before you install an update.

{% include actions/ui_header.md %}

To create a full backup from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Create a full backup**.
6. Optionally, fill in the options described below.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Name:
  description: A name for the backup. If you leave this empty, the current date and time are used.
  required: false
Password:
  description: A password to protect the backup with.
  required: false
Compressed:
  description: Compresses the backup files. Compression is on by default.
  required: false
Location:
  description: The name of a network storage to host the backup. If you leave this empty, the backup is stored locally.
  required: false
Home Assistant exclude database:
  description: Excludes the Home Assistant database file from the backup.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `hassio.backup_full`. A basic example looks like this:

{% example %}
action: |
  action: hassio.backup_full
  data:
    name: "Manual full backup"
{% endexample %}

### Options in YAML

{% options_yaml %}
name:
  description: A name for the backup. If you leave this out, the current date and time are used.
  required: false
  type: string
password:
  description: A password to protect the backup with.
  required: false
  type: string
compressed:
  description: Compresses the backup files.
  required: false
  type: boolean
  default: true
location:
  description: The name of a network storage to host the backup. If you leave this out, the backup is stored locally.
  required: false
  type: string
homeassistant_exclude_database:
  description: Excludes the Home Assistant database file from the backup.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

## Response data

This action returns the slug of the backup it created, so you can use it in later steps, for example to copy or to reference the backup.

{% example %}
action: |
  action: hassio.backup_full
  data:
    name: "Manual full backup"
  response_variable: backup
{% endexample %}

The `backup` variable then holds the slug:

```yaml
backup: 1f2e3d4c
```

{% include actions/more_examples.md %}

### Automation: a full backup every night

Create a full backup automatically every night, so you always have a recent one to fall back on.

- **Trigger**: Time, at 03:00
- **Action**: Create a full backup

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Nightly full backup"
  triggers:
    - trigger: time
      at: "03:00:00"
  actions:
    - action: hassio.backup_full
      data:
        name: "Nightly backup"
{% endexample %}

{% enddetails %}

### Automation: a full backup before a core update

Create a full backup whenever an update for Home Assistant Core becomes available, so you can roll back if the update causes trouble.

- **Trigger**: Home Assistant Core update becomes available
- **Action**: Create a full backup

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Backup before a core update"
  triggers:
    - trigger: state
      entity_id: update.home_assistant_core_update
      to: "on"
  actions:
    - action: hassio.backup_full
      data:
        name: "Before core update"
{% endexample %}

{% enddetails %}

## Good to know

- Only administrators can run this action.
- This action is only available when you run {% term "Home Assistant Operating System" %} or the Supervised installation method. It is not available on {% term "Home Assistant Container" %} or {% term "Home Assistant Core" %}.
- A backup runs in the background. Depending on the size of your system, it can take a while to finish.

{% include actions/stuck.md %}

{% include actions/related.md %}
