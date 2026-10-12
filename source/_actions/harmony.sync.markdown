---
title: "Sync"
action: harmony.sync
domain: harmony
description: "Synchronizes the Harmony Hub configuration with the Harmony cloud."
related_actions:
  - harmony.change_channel
---

Use this action to force a synchronization between your Harmony Hub and the Harmony cloud. Run it after you change activities, devices, or commands in the Harmony app so Home Assistant picks up the latest configuration.

{% include actions/ui_header.md %}

To synchronize the Harmony Hub from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Harmony remote you want to control.
6. From the actions shown for that target, select **Sync**.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `harmony.sync`. A basic example looks like this:

{% example %}
action: |
  action: harmony.sync
  target:
    entity_id: remote.tv_room
{% endexample %}

This synchronizes the configuration of `remote.tv_room` with the Harmony cloud.

{% include actions/targets.md domain="remote" %}

## Good to know

- A configuration file with the available activities, devices, and commands is written to your Home Assistant configuration directory at startup. Run this action when you want that information refreshed after making changes in the Harmony app.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
