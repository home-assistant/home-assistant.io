---
title: "Check Home Assistant configuration"
action: homeassistant.check_config
domain: homeassistant
description: "Checks the Home Assistant YAML configuration files for errors."
related_actions:
  - homeassistant.restart
  - homeassistant.reload_all
---

Use this action to check your Home Assistant YAML configuration files for errors without applying them. It reads the files and validates them, but does not load them into Home Assistant. A common use is to confirm your configuration is valid before you restart.

If errors are found, Home Assistant creates a persistent notification and writes the details to the logs.

Only users with administrator rights can run this action.

{% include actions/ui_header.md %}

To check the configuration from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Check Home Assistant configuration**.
6. Select **Save**.

### Options in the UI

This action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `homeassistant.check_config`. A basic example looks like this:

{% example %}
action: |
  action: homeassistant.check_config
{% endexample %}

### Options in YAML

This action has no options.

## Good to know

- This action only checks the configuration. It does not load or apply any changes.
- If errors are found, look in the [logs]({% my logs %}) for the details.

{% include actions/stuck.md %}

{% include actions/related.md %}
