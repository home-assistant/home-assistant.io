---
title: "Set logger level"
action: logger.set_level
domain: logger
description: "Sets the log level for one or more integrations."
related_actions:
  - logger.set_default_level
---

Use this action to set the log level for one or more specific integrations. This is handy when you want more detail from just one integration, for example raising a single integration to debug while you troubleshoot it, without making the rest of your logs noisy.

Only users with administrator rights can run this action.

{% include actions/ui_header.md %}

To set the log level for specific integrations from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the list of actions, search for and select **Logger: Set logger level**.
6. Select **Edit in YAML** and provide one or more logger names with the level for each.
7. Select **Save**.

### Options in the UI

This action does not have fixed options. You provide one or more logger names, each with the level to set for it.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `logger.set_level`. Provide one or more logger names with the level for each:

{% example %}
action: |
  action: logger.set_level
  data:
    homeassistant.core: fatal
    homeassistant.components.mqtt: warning
    homeassistant.components.smartthings.light: info
    custom_components.my_integration: debug
    aiohttp: error
{% endexample %}

### Options in YAML

This action does not have fixed options. Instead, you provide one or more entries, where each key is a logger name and each value is the level to set for it.

- The logger name follows the module path, such as `homeassistant.components.mqtt` for an integration, `custom_components.my_integration` for a custom integration, or a library name like `aiohttp`.
- The level is one of: `debug`, `info`, `warning`, `error`, `fatal`, or `critical`.

## Good to know

- The levels you set here apply on top of the default level. To change the default for integrations without their own level, use the [Set logger default level](/actions/logger.set_default_level/) action.
- The levels you set reset when you restart Home Assistant, unless you set them in your configuration.

{% include actions/stuck.md %}

{% include actions/related.md %}
