---
title: "Set the alarm panel time"
action: risco.set_time
domain: risco
description: "Sets the time of a Risco alarm panel."
---

Use this action to set the clock on your Risco alarm panel, for example to keep it in sync with Home Assistant after a power loss or a time change.

{% include actions/ui_header.md %}

To set the alarm panel time from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Risco: Set the alarm panel time**.
6. Select the **Config entry** for the alarm panel you want to set, and optionally a **Time**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Config entry:
  description: The Risco alarm panel to set the time for.
  required: true
Time:
  description: The time to send to the alarm panel. Leave it empty to use the Home Assistant system time.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `risco.set_time`:

{% example %}
action: |
  action: risco.set_time
  data:
    config_entry_id: 1b9a8a9d2c3e4f5061728394a5b6c7d8
{% endexample %}

This sets the alarm panel clock to the current Home Assistant system time.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: The Risco alarm panel to set the time for.
  required: true
  type: string
time:
  description: The time to send to the alarm panel. Leave it empty to use the Home Assistant system time.
  required: false
  type: datetime
{% endoptions_yaml %}

## Good to know

- Setting the panel time is only available on a local connection, not over Risco Cloud.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: keep the alarm panel clock in sync

Re-sync the alarm panel clock with the Home Assistant system time every night, so it stays accurate after a power loss or a daylight saving time change.

- **Trigger**: Time: 03:00:00
- **Action**: Risco: Set the alarm panel time
  - **Config entry**: Your Risco alarm panel

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Sync the Risco alarm panel clock"
    triggers:
      - trigger: time
        at: "03:00:00"
    actions:
      - action: risco.set_time
        data:
          config_entry_id: 1b9a8a9d2c3e4f5061728394a5b6c7d8
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
