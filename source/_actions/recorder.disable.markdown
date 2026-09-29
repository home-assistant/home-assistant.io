---
title: "Disable Recorder"
action: recorder.disable
domain: recorder
description: "Stops recording events and state changes to the database."
related_actions:
  - recorder.enable
  - recorder.purge
  - recorder.purge_entities
  - recorder.get_statistics
---

Use this action to stop the recorder from saving events and state changes to the database. This is handy when you want to skip recording during a noisy or temporary period, for example while running a test that would otherwise fill the database with values you don't need to keep.

Only users with administrator rights can run this action.

{% include actions/ui_header.md %}

To disable the recorder from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the list of actions, search for and select **Disable Recorder**.
6. Select **Save**.

### Options in the UI

This action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `recorder.disable`. A basic example looks like this:

{% example %}
action: |
  action: recorder.disable
{% endexample %}

### Options in YAML

This action has no options.

## Good to know

- Recording stays disabled until you call the [Enable Recorder](/actions/recorder.enable/) action or restart Home Assistant. After a restart, recording is active again.
- Any events and state changes that happen while the recorder is disabled are not stored, so they won't appear in your history.

{% include actions/stuck.md %}

{% include actions/related.md %}
