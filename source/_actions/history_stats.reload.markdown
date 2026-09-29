---
title: "Reload history stats sensors"
action: history_stats.reload
domain: history_stats
description: "Reloads history stats sensors from the YAML configuration."
related_actions:
  - homeassistant.reload_all
---

Use this action to load your [history stats sensors](/integrations/history_stats/) from YAML again, without restarting Home Assistant. Run it after you change them in your YAML configuration so the changes take effect right away.

History stats sensors you create or edit in the UI are updated for you when you save them, so you don't need this action for those.

{% include actions/ui_header.md %}

To reload the history stats sensors from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Reload history stats sensors**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `history_stats.reload`. A basic example looks like this:

{% example %}
action: |
  action: history_stats.reload
{% endexample %}

This reloads all history stats sensors from your YAML configuration.

### Options in YAML

This action has no additional options in YAML.

## Good to know

- Reloading removes history stats sensors you deleted from your configuration and adds the ones you added.
- Only administrators can run this action.
- When the reload is done, Home Assistant fires the `event_history_stats_reloaded` event.
- To reload everything in one step, use [Reload all Home Assistant configuration](/actions/homeassistant.reload_all/).

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
