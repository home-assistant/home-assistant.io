---
title: "Restore from full backup"
action: hassio.restore_full
domain: hassio
description: "Restores from a full backup."
related_actions:
  - hassio.restore_partial
  - hassio.backup_full
---

Use this action to restore your system from a full backup. This replaces your current Home Assistant, apps, and their data with what is in the backup.

{% caution %}
Restoring overwrites your current setup with the contents of the backup. Anything you changed after the backup was made is lost. Most people restore from the backup page in the UI rather than from an automation.
{% endcaution %}

{% include actions/ui_header.md %}

To restore from a full backup from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Restore from full backup**.
6. Enter the **Slug** of the backup to restore, and optionally its **Password**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Slug:
  description: The slug of the backup to restore from.
  required: true
Password:
  description: The password of the backup, if it is password-protected.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `hassio.restore_full`. A basic example looks like this:

{% example %}
action: |
  action: hassio.restore_full
  data:
    slug: 1f2e3d4c
{% endexample %}

You can find the slug of a backup under **Settings** > **System** > **Backups**.

### Options in YAML

{% options_yaml %}
slug:
  description: The slug of the backup to restore from.
  required: true
  type: string
password:
  description: The password of the backup, if it is password-protected.
  required: false
  type: string
{% endoptions_yaml %}

## Good to know

- Only administrators can run this action.
- This action is only available when you run {% term "Home Assistant Operating System" %} or the Supervised installation method. It is not available on {% term "Home Assistant Container" %} or {% term "Home Assistant Core" %}.
- Home Assistant restarts as part of the restore, so it is unavailable for a while.

{% include actions/stuck.md %}

{% include actions/related.md %}
