---
title: "Create a partial backup"
action: hassio.backup_partial
domain: hassio
description: "Creates a partial backup."
related_actions:
  - hassio.backup_full
  - hassio.restore_partial
---

Use this action to create a partial backup, where you choose exactly what to include: Home Assistant settings, specific apps, and specific folders. A common use is a small, frequent backup of just your Home Assistant settings, alongside a full backup that runs less often.

{% include actions/ui_header.md %}

To create a partial backup from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Create a partial backup**.
6. Choose what to include, and optionally fill in the other options described below.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Home Assistant settings:
  description: Includes Home Assistant settings in the backup.
  required: false
Apps:
  description: The apps to include in the backup.
  required: false
Folders:
  description: The folders to include in the backup.
  required: false
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

In YAML, refer to this action as `hassio.backup_partial`. A basic example looks like this:

{% example %}
action: |
  action: hassio.backup_partial
  data:
    name: "Settings backup"
    homeassistant: true
{% endexample %}

For `apps`, use the slug of each app, which you can find on the app's page under **Settings** > **Add-ons**.

### Options in YAML

{% options_yaml %}
homeassistant:
  description: Includes Home Assistant settings in the backup.
  required: false
  type: boolean
  default: false
apps:
  description: A list of app slugs to include in the backup.
  required: false
  type: list
folders:
  description: A list of folders to include in the backup.
  required: false
  type: list
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

This action returns the slug of the backup it created, so you can use it in later steps.

{% example %}
action: |
  action: hassio.backup_partial
  data:
    name: "Settings backup"
    homeassistant: true
  response_variable: backup
{% endexample %}

The `backup` variable then holds the slug:

```yaml
backup: 1f2e3d4c
```

{% include actions/more_examples.md %}

### Automation: a daily backup of your settings

Create a small, frequent backup of just your Home Assistant settings, so a quick mistake is easy to undo.

- **Trigger**: Time, at 02:00
- **Action**: Create a partial backup, with Home Assistant settings included

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Daily settings backup"
  triggers:
    - trigger: time
      at: "02:00:00"
  actions:
    - action: hassio.backup_partial
      data:
        name: "Daily settings backup"
        homeassistant: true
{% endexample %}

{% enddetails %}

### Automation: a backup of specific apps

Back up a couple of specific apps along with your settings, for example before you update them.

- **Trigger**: Manual or scheduled
- **Action**: Create a partial backup, with selected apps

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Backup selected apps"
  triggers:
    - trigger: time
      at: "02:30:00"
  actions:
    - action: hassio.backup_partial
      data:
        name: "App backup"
        homeassistant: true
        apps:
          - core_mosquitto
          - a0d7b954_nodered
{% endexample %}

{% enddetails %}

## Good to know

- Only administrators can run this action.
- This action is only available when you run {% term "Home Assistant Operating System" %} or the Supervised installation method. It is not available on {% term "Home Assistant Container" %} or {% term "Home Assistant Core" %}.
- To include Home Assistant settings, set **Home Assistant settings** to on. Older configurations that listed `"homeassistant"` under `folders` still work, but the `homeassistant` option is the current way to do this.

{% include actions/stuck.md %}

{% include actions/related.md %}
