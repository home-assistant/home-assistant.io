---
title: "Create backup"
action: backup.create
domain: backup
description: "Creates a basic local backup of your Home Assistant instance."
related_actions:
  - backup.create_automatic
---

Use this action to create a quick local backup of your Home Assistant instance. It always includes your Home Assistant configuration and the database, and saves the backup to local storage.

This action is meant for simple, no-setup backups. If you want control over what goes into the backup, where it is stored, or whether it is protected with a password, configure [automatic backups](/common-tasks/general/#setting-up-an-automatic-backup-process) and use the [Create automatic backup](/actions/backup.create_automatic/) action instead.

This action is only available on [core and container installations](/installation/#about-installation-types). On Home Assistant Operating System and supervised installations, use [Create automatic backup](/actions/backup.create_automatic/).

{% include actions/ui_header.md %}

To create a backup from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Create backup**.
6. Select **Save**.

### Options in the UI

This action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `backup.create`. It takes no options:

{% example %}
action: |
  action: backup.create
{% endexample %}

### Options in YAML

This action has no options.

## Good to know

- The backup always includes your Home Assistant configuration and the database. It does not include add-ons or extra folders, and it is not protected with a password.
- The backup is saved to local storage only. It is not uploaded anywhere.
- Only administrators can run this action.
- The backup runs in the background. The action returns right away, before the backup finishes.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: a local backup on demand

Add a button to your dashboard that creates a local backup whenever you select it, for example just before you try out a configuration change.

- **Trigger**: An input button is pressed
- **Action**: Create backup

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Back up now"
  triggers:
    - trigger: state
      entity_id: input_button.create_backup
  actions:
    - action: backup.create
{% endexample %}

{% enddetails %}

### Automation: a local backup every night

Keep a recent local copy by creating a backup at the same time every night.

- **Trigger**: Time: 03:00
- **Action**: Create backup

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Nightly local backup"
  triggers:
    - trigger: time
      at: "03:00:00"
  actions:
    - action: backup.create
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
