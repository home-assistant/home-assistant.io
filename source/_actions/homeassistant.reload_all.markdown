---
title: "Reload all Home Assistant configuration"
action: homeassistant.reload_all
domain: homeassistant
description: "Reloads all YAML configuration that can be reloaded without a restart."
related_actions:
  - homeassistant.reload_core_config
  - homeassistant.reload_custom_templates
  - homeassistant.check_config
---

Use this action to reload all the YAML configuration that can be reloaded without restarting Home Assistant. A common use is to apply changes you made to your YAML files in one step, instead of reloading each part separately.

It calls the reload action on every domain that supports it. It also reloads the core configuration, themes, and custom Jinja templates. Before reloading, Home Assistant runs a basic configuration check. If that check fails, nothing is reloaded and the action raises an error.

Only users with administrator rights can run this action.

{% include actions/ui_header.md %}

To reload all configuration from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Reload all Home Assistant configuration**.
6. Select **Save**.

### Options in the UI

This action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `homeassistant.reload_all`. A basic example looks like this:

{% example %}
action: |
  action: homeassistant.reload_all
{% endexample %}

### Options in YAML

This action has no options.

## Good to know

- This action includes the work done by the [Reload Core configuration](/actions/homeassistant.reload_core_config/) and [Reload custom Jinja2 templates](/actions/homeassistant.reload_custom_templates/) actions, plus a reload of themes.
- If the configuration check fails, nothing is reloaded. Fix the reported errors and try again.

{% include actions/stuck.md %}

{% include actions/related.md %}
