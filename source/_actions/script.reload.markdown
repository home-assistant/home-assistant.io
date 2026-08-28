---
title: "Reload scripts"
action: script.reload
domain: script
description: "Reloads all the available scripts."
related_actions:
  - script.turn_on
  - script.turn_off
---

Use this action to load your scripts again, without restarting Home Assistant. Run it after you change your scripts in YAML so the changes take effect right away.

Scripts you create or edit in the UI are reloaded for you when you save them, so you don't need this action for those.

{% include actions/ui_header.md %}

To reload the scripts from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Script: Reload scripts**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `script.reload`. A basic example looks like this:

{% example %}
action: |
  action: script.reload
{% endexample %}

This reloads all your scripts.

## Good to know

- Reloading removes scripts you deleted from your configuration and adds the ones you added.
- Running scripts are stopped when the scripts are reloaded.
- To reload everything in one step, use [Reload all Home Assistant configuration](/actions/homeassistant.reload_all/).

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
