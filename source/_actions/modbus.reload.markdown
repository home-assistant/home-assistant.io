---
title: Reload Modbus configuration
action: modbus.reload
domain: modbus
description: "Reloads the Modbus configuration from your YAML configuration."
related_actions:
  - modbus.stop
  - modbus.write_register
  - modbus.write_coil
---

Use this action to reload your Modbus configuration from YAML without restarting Home Assistant. This applies changes to your hubs and entities and restarts the connections.

{% include actions/ui_header.md %}

To reload the Modbus configuration from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Modbus: Reload**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. Only users with administrator rights can run this action.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `modbus.reload`. A basic example looks like this:

{% example %}
action: |
  action: modbus.reload
{% endexample %}

This reloads the Modbus configuration from your YAML configuration.

### Options in YAML

This action has no additional options in YAML.

## Good to know

- Run this action after you change your Modbus configuration in YAML so the changes take effect without a restart.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
