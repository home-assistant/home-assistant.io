---
title: Write coil
action: modbus.write_coil
domain: modbus
description: "Writes a state to one or more Modbus coils."
related_actions:
  - modbus.write_register
  - modbus.stop
  - modbus.reload
---

The **Write coil** action writes an on or off state to one or more Modbus coils on a connected device. Use it to switch outputs, relays, or other binary controls directly on your hardware.

You can write a single state or a list of states. A single state uses Modbus function code `0x05` (write single coil), while a list uses function code `0x0F` (write multiple coils).

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Modbus: Write coil**.
6. Fill in the address, the state to write, and optionally the device address and hub.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. Instead, you select the Modbus hub by name.

### Options in the UI

{% options_ui %}
Address:
  description: The address of the coil to write to.
State:
  description: A single state or a list of states to write.
Slave:
  description: The device (slave) address on the Modbus network. Defaults to 1.
  required: false
Hub:
  description: The name of the Modbus hub to use. Defaults to `modbus_hub`.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `modbus.write_coil`. A basic example looks like this:

{% example %}
action: |
  action: modbus.write_coil
  data:
    address: 17
    state: true
{% endexample %}

This switches the coil at address `17` on, using the default hub.

### Options in YAML

{% options_yaml %}
address:
  description: The address of the coil to write to.
  required: true
  type: integer
state:
  description: A single state or a list of states. A single state calls Modbus function code `0x05`, a list calls function code `0x0F`.
  required: true
  type: any
slave:
  description: The device (slave) address on the Modbus network, between 0 and 255. Defaults to 1.
  required: false
  type: integer
hub:
  description: The name of the Modbus hub to use.
  required: false
  type: string
  default: modbus_hub
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
