---
title: "Reload themes"
action: frontend.reload_themes
domain: frontend
description: "Reloads the theme configuration from your configuration.yaml file."
related_actions:
  - frontend.set_theme
---

Use this action to reload your themes from your {% term "`configuration.yaml`" %} file after you edit them. This applies your changes without restarting Home Assistant.

If the theme that is currently set no longer exists after the reload, Home Assistant falls back to the standard theme.

{% include actions/ui_header.md %}

To reload themes from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Reload themes**.
6. Select **Save**.

### Options in the UI

This action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `frontend.reload_themes`. It takes no options:

{% example %}
action: |
  action: frontend.reload_themes
{% endexample %}

### Options in YAML

This action has no options.

## Good to know

- You usually run this action straight from {% my developer_services title="**Settings** > **Tools** > **Actions**" %} right after editing your themes, so you can see the result without a restart.
- Only administrators can run this action.

{% include actions/stuck.md %}

{% include actions/related.md %}
