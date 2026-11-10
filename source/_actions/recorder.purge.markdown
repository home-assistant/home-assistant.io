---
title: "Purge Recorder database"
action: recorder.purge
domain: recorder
description: "Cleans up old data from the recorder database."
related_actions:
  - recorder.purge_entities
  - recorder.enable
  - recorder.disable
  - recorder.get_statistics
---

Use this action to clean up old data from the recorder database. It removes events and state changes older than the number of days you keep, which helps control how large the database becomes. This is handy when you want to free up space or keep growth in check, for example by running a regular cleanup.

Only users with administrator rights can run this action.

{% include actions/ui_header.md %}

To purge the database from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the list of actions, search for and select **Recorder: Purge Recorder database**.
6. Set the options you want to use.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Days to keep:
  description: The number of days of history to keep, counting back from today. For example, a value of 7 keeps the last week and removes everything older. If omitted, the recorder uses the number of days set in its configuration.
  required: false
Repack:
  description: Rewrites the entire database to try to free up disk space. This is a heavy operation that can cause slowdowns and temporarily use more disk space while it runs.
  required: false
Apply filter:
  description: Also applies the entity and event filters from your recorder configuration, on top of the time-based cleanup. Useful for removing data that was recorded by mistake.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `recorder.purge`. A basic example looks like this:

{% example %}
action: |
  action: recorder.purge
  data:
    keep_days: 7
{% endexample %}

### Options in YAML

{% options_yaml %}
keep_days:
  description: The number of days of history to keep, counting back from today. For example, a value of 7 keeps the last week and removes everything older. If omitted, the recorder uses the number of days set in its configuration.
  required: false
  type: integer
repack:
  description: Rewrites the entire database to try to free up disk space. This is a heavy operation that can cause slowdowns and temporarily use more disk space while it runs.
  required: false
  type: boolean
  default: false
apply_filter:
  description: Also applies the entity and event filters from your recorder configuration, on top of the time-based cleanup. Useful for removing data that was recorded by mistake.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

## Good to know

- Purging does not immediately reduce disk usage, but it significantly slows down further growth. To reclaim disk space, use the **Repack** option, keeping in mind it is a heavy operation.
- To remove data for specific entities, domains, or patterns instead of a time-based cleanup, use the [Purge Recorder entities](/actions/recorder.purge_entities/) action.

{% include actions/stuck.md %}

{% include actions/related.md %}
