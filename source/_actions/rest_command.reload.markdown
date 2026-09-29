---
title: "Reload RESTful commands"
action: rest_command.reload
domain: rest_command
description: "Reloads RESTful commands from the YAML configuration."
related_actions:
  - homeassistant.reload_all
---

Use this action to load your [RESTful commands](/integrations/rest_command/) again, without restarting Home Assistant. Run it after you change the `rest_command` section of your YAML configuration so the changes take effect right away.

{% include actions/ui_header.md %}

To reload your RESTful commands from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Reload**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `rest_command.reload`. A basic example looks like this:

{% example %}
action: |
  action: rest_command.reload
{% endexample %}

This reloads your RESTful commands from your YAML configuration.

### Options in YAML

This action has no additional options in YAML.

## Good to know

- Each RESTful command is its own action, like `rest_command.my_request`. Reloading removes the actions of commands you deleted from your configuration and adds the ones you added.
- If your YAML configuration can't be loaded, nothing is reloaded and your current RESTful commands keep working. Check the logs to see what went wrong.
- To reload everything in one step, use [Reload all Home Assistant configuration](/actions/homeassistant.reload_all/).

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
