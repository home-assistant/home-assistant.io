---
title: "Create automatic backup"
action: backup.create_automatic
domain: backup
description: "Creates a backup using your configured automatic backup settings."
related_actions:
  - backup.create
---

Use this action to create a backup using the settings you already configured for automatic backups. It backs up exactly what your scheduled backups do, including the same add-ons, folders, password, location, and retention, but it runs whenever you call it.

This is handy when you want an extra backup on your own schedule, on top of the built-in automatic backup, or right before you make a big change. You set up what goes into the backup once under {% my backup title="**Settings** > **System** > **Backups**" %}, in **Backup settings**, and this action reuses it.

This action is available on all installation types.

{% include actions/ui_header.md %}

To create a backup from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Create automatic backup**.
6. Select **Save**.

### Options in the UI

This action has no options. It uses your configured backup settings.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `backup.create_automatic`. It takes no options:

{% example %}
action: |
  action: backup.create_automatic
{% endexample %}

### Options in YAML

This action has no options. It uses your configured backup settings.

## Good to know

- This action follows everything you set under **Backup settings**, so it uploads to the same locations, applies the same password, and respects the same retention as your scheduled backups.
- Only administrators can run this action.
- The backup runs in the background. The action returns right away, before the backup finishes.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: an extra backup every night

The built-in automatic backup already runs on a schedule. If you want a second safety copy at a different time, for example right before your nightly maintenance routine, you can trigger one yourself.

- **Trigger**: Time: 04:00
- **Action**: Create automatic backup

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Extra nightly backup"
  triggers:
    - trigger: time
      at: "04:00:00"
  actions:
    - action: backup.create_automatic
{% endexample %}

{% enddetails %}

### Automation: a fresh backup before a Home Assistant update

When a new Home Assistant update appears, create a fresh backup right away. That way you always have a recent backup to fall back on before you install the update.

- **Trigger**: A Home Assistant update becomes available
- **Action**: Create automatic backup

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Back up when an update is available"
  triggers:
    - trigger: state
      entity_id: update.home_assistant_core_update
      to: "on"
  actions:
    - action: backup.create_automatic
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
