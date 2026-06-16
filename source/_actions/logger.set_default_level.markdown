---
title: "Set logger default level"
action: logger.set_default_level
domain: logger
description: "Sets the default log level for loggers without an explicit level."
related_actions:
  - logger.set_level
---

Use this action to set the default log level. This level applies to integrations that don't have a log level of their own. This is handy when you want to see more or less detail in your logs across the board, for example raising everything to debug while you investigate a problem.

Only users with administrator rights can run this action.

{% include actions/ui_header.md %}

To set the default log level from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the list of actions, search for and select **Logger: Set logger default level**.
6. Set the **Level** you want to use as the default.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Level:
  description: "The default severity level for integrations without their own level. One of: debug, info, warning, error, fatal, or critical."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `logger.set_default_level`. A basic example looks like this:

{% example %}
action: |
  action: logger.set_default_level
  data:
    level: info
{% endexample %}

### Options in YAML

{% options_yaml %}
level:
  description: "The default severity level for integrations without their own level. One of: debug, info, warning, error, fatal, or critical."
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- This level applies only to integrations that don't have a specific level set. To set the level for one or more specific integrations, use the [Set logger level](/actions/logger.set_level/) action.
- The default level resets when you restart Home Assistant, unless you set a default in your configuration.

{% include actions/stuck.md %}

{% include actions/related.md %}
