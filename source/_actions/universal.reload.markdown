---
title: "Reload universal media players"
action: universal.reload
domain: universal
description: "Reloads universal media players from the YAML configuration."
related_actions:
  - homeassistant.reload_all
---

Use this action to load your [universal media players](/integrations/universal/) from YAML again, without restarting Home Assistant. Run it after you change them in your YAML configuration so the changes take effect right away.

{% include actions/ui_header.md %}

To reload the universal media players from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Universal media player: Reload**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `universal.reload`. A basic example looks like this:

{% example %}
action: |
  action: universal.reload
{% endexample %}

This reloads all universal media players from your YAML configuration.

## Good to know

- Reloading removes universal media players you deleted from your configuration and adds the ones you added.
- Only administrators can run this action.
- When the reload is done, Home Assistant fires the `event_universal_reloaded` event.
- To reload everything in one step, use [Reload all Home Assistant configuration](/actions/homeassistant.reload_all/).

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
