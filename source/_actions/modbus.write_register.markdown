---
title: Write register
action: modbus.write_register
domain: modbus
description: "Writes a value to one or more Modbus holding registers."
related_actions:
  - modbus.write_coil
  - modbus.stop
  - modbus.reload
---

The **Write register** action writes a value to one or more Modbus holding registers on a connected device. Use it to send setpoints, commands, or other numeric values directly to your hardware.

You can write a single value or a list of values. A single value uses Modbus function code `0x06` (write single register), while a list uses function code `0x10` (write multiple registers).

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Modbus: Write register**.
6. Fill in the address, the value to write, and optionally the device address and hub.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. Instead, you select the Modbus hub by name.

### Options in the UI

{% options_ui %}
Address:
  description: The address of the register to write to.
Value:
  description: "A single value or a list of 16-bit values. To set a value like `0x0004`, you may need to reverse the byte order, for example `[4, 0]`, depending on the byte order of your device."
Slave:
  description: The device (slave) address on the Modbus network. Defaults to 1.
  required: false
Hub:
  description: The name of the Modbus hub to use. Defaults to `modbus_hub`.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `modbus.write_register`. A basic example looks like this:

{% example %}
action: |
  action: modbus.write_register
  data:
    address: 138
    value: 42
{% endexample %}

This writes the value `42` to register `138` on the default hub.

### Options in YAML

{% options_yaml %}
address:
  description: The address of the register to write to.
  required: true
  type: integer
value:
  description: "A single value or a list of 16-bit values. A single value calls Modbus function code `0x06`, a list calls function code `0x10`. To set a value like `0x0004`, you may need to reverse the byte order, for example `[4, 0]`, depending on the byte order of your device."
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

## Good to know

- Whether you need to reverse the byte or word order depends on the device and the byte order of your CPU.

{% include actions/more_examples.md %}

### Write a float32 value

To write a `float32` value, use the network format. For example, `10.0` is `0x41200000` in network-order hexadecimal, which you write as two 16-bit registers.

{% example %}
action: |
  action: modbus.write_register
  data:
    address: 138
    slave: 1
    hub: modbus_hub
    value:
      - 0x4120
      - 0x0000
{% endexample %}

{% include actions/stuck.md %}

{% include actions/related.md %}
