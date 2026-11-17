---
title: "Reload zones"
action: zone.reload
domain: zone
description: "Reloads the zones from the YAML configuration."
---

Use this action to load the zones from your YAML configuration again, without restarting Home Assistant. Run it after you change your zones in YAML so the changes take effect right away.

Zones you create in the UI under {% my zones title="**Settings** > **Areas, labels & zones**" %} are stored separately and are not affected by this action.

{% include actions/ui_header.md %}

To reload the zones from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Zone: Reload zones**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. Only users with administrator rights can run this action.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zone.reload`. A basic example looks like this:

{% example %}
action: |
  action: zone.reload
{% endexample %}

This reloads the zones from your YAML configuration.

### Options in YAML

This action has no options.

## Good to know

- Zones you removed from your YAML configuration disappear, and the ones you added show up.
- The default home zone comes from your general settings. If you override it in YAML, this action reloads that configuration.
- To reload everything that supports it in one step, use the [Reload all Home Assistant configuration](/actions/homeassistant.reload_all/) action.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
