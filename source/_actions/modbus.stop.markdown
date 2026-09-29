---
title: Stop hub
action: modbus.stop
domain: modbus
description: "Stops a Modbus hub and closes its connection."
related_actions:
  - modbus.reload
  - modbus.write_register
  - modbus.write_coil
---

The **Stop hub** action stops a Modbus hub and closes its connection to your hardware. Use it when you need to release the connection, for example before another application takes over the serial port or network connection.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Modbus: Stop hub**.
6. Enter the name of the hub you want to stop.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. Instead, you select the Modbus hub by name.

### Options in the UI

{% options_ui %}
Hub:
  description: The name of the Modbus hub to stop. Defaults to `modbus_hub`.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `modbus.stop`. A basic example looks like this:

{% example %}
action: |
  action: modbus.stop
  data:
    hub: modbus_hub
{% endexample %}

This stops the hub named `modbus_hub`.

### Options in YAML

{% options_yaml %}
hub:
  description: The name of the Modbus hub to stop.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- To start the hub again, use the [Reload](/actions/modbus.reload/) action.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
