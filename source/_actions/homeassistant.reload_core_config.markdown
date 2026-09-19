---
title: "Reload Core configuration"
action: homeassistant.reload_core_config
domain: homeassistant
description: "Reloads the Core configuration under the homeassistant section of your YAML."
related_actions:
  - homeassistant.reload_all
  - homeassistant.set_location
---

Use this action to reload the Core configuration found under the `homeassistant:` section of your YAML, along with the files it links to. Once reloaded, the new configuration is applied. A common use is to apply changes to the `homeassistant:` section without a full restart.

New `customize:` settings are applied the next time the state of the affected entity updates.

Only users with administrator rights can run this action.

{% include actions/ui_header.md %}

To reload the Core configuration from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Reload Core configuration**.
6. Select **Save**.

### Options in the UI

This action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `homeassistant.reload_core_config`. A basic example looks like this:

{% example %}
action: |
  action: homeassistant.reload_core_config
{% endexample %}

### Options in YAML

This action has no options.

## Good to know

- New `customize:` settings take effect the next time the state of the affected entity updates.
- To reload everything at once, use the [Reload all Home Assistant configuration](/actions/homeassistant.reload_all/) action.

{% include actions/stuck.md %}

{% include actions/related.md %}
