---
title: "Reload custom Jinja2 templates"
action: homeassistant.reload_custom_templates
domain: homeassistant
description: "Reloads the custom Jinja2 templates from your custom_templates folder."
related_actions:
  - homeassistant.reload_all
---

Use this action to reload the custom Jinja templates stored in the `custom_templates` folder of your configuration. A common use is to apply edits to a shared template macro without restarting Home Assistant.

The new template values take effect the next time a template that imports them is rendered.

Only users with administrator rights can run this action.

{% include actions/ui_header.md %}

To reload custom templates from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Reload custom Jinja2 templates**.
6. Select **Save**.

### Options in the UI

This action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `homeassistant.reload_custom_templates`. A basic example looks like this:

{% example %}
action: |
  action: homeassistant.reload_custom_templates
{% endexample %}

### Options in YAML

This action has no options.

## Good to know

- The new values are applied the next time an importing template is rendered, not instantly.
- To reload everything at once, use the [Reload all Home Assistant configuration](/actions/homeassistant.reload_all/) action.

{% include actions/stuck.md %}

{% include actions/related.md %}
