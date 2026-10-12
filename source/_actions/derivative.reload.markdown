---
title: "Reload derivative sensors"
action: derivative.reload
domain: derivative
description: "Reloads derivative sensors from the YAML configuration."
related_actions:
  - homeassistant.reload_all
---

Use this action to load your [derivative sensors](/integrations/derivative/) from YAML again, without restarting Home Assistant. Run it after you change them in your YAML configuration so the changes take effect right away.

Derivative sensors you create or edit in the UI are updated for you when you save them, so you don't need this action for those.

{% include actions/ui_header.md %}

To reload the derivative sensors from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Reload derivative sensors**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `derivative.reload`. A basic example looks like this:

{% example %}
action: |
  action: derivative.reload
{% endexample %}

This reloads all derivative sensors from your YAML configuration.

### Options in YAML

This action has no additional options in YAML.

## Good to know

- Reloading removes derivative sensors you deleted from your configuration and adds the ones you added.
- Only administrators can run this action.
- When the reload is done, Home Assistant fires the `event_derivative_reloaded` event.
- To reload everything in one step, use [Reload all Home Assistant configuration](/actions/homeassistant.reload_all/).

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
