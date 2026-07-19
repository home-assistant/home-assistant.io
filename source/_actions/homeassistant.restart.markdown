---
title: "Restart Home Assistant"
action: homeassistant.restart
domain: homeassistant
description: "Restarts Home Assistant after checking the configuration."
related_actions:
  - homeassistant.stop
  - homeassistant.check_config
  - homeassistant.reload_all
---

Use this action to restart Home Assistant. Before it restarts, Home Assistant checks the configuration. If the check fails, the restart is canceled so you are not left with a broken setup. A common use is to apply changes that only take effect after a full restart.

You can also restart into safe mode, which starts Home Assistant without custom integrations and custom dashboard cards. This is useful when one of these is preventing Home Assistant from starting normally.

Only users with administrator rights can run this action.

{% include actions/ui_header.md %}

To restart Home Assistant from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Restart Home Assistant**.
6. To start without custom integrations and cards, turn on **Safe mode**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Safe mode:
  description: Restart without custom integrations and custom dashboard cards.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `homeassistant.restart`. A basic example looks like this:

{% example %}
action: |
  action: homeassistant.restart
{% endexample %}

To restart into safe mode:

{% example %}
action: |
  action: homeassistant.restart
  data:
    safe_mode: true
{% endexample %}

### Options in YAML

{% options_yaml %}
safe_mode:
  description: Restart without custom integrations and custom dashboard cards.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

## Good to know

- If the configuration check fails, Home Assistant does not restart. Instead, it creates a persistent notification with the ID `persistent_notification.homeassistant_check_config`, and the logs show what failed the check.
- To check the configuration without restarting, use the [Check Home Assistant configuration](/actions/homeassistant.check_config/) action.

{% include actions/stuck.md %}

{% include actions/related.md %}
