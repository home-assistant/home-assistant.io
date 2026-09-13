---
title: "Read register"
action: neopool.read_register
domain: neopool
description: "Reads one or more Modbus registers and returns their raw 16-bit values."
related_actions:
  - neopool.write_register
  - neopool.get_device_time
  - neopool.set_device_time
  - neopool.set_timer
---

Use this action to read one or more Modbus registers and return their raw 16-bit values. It is intended for diagnostics and for values the integration does not expose as entities. The action returns a response and does not change the controller.

{% include actions/ui_header.md %}

To read a register from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **NeoPool: Read register**.
6. Fill in the **Register address** and, optionally, the **Count**.
7. Optionally select the **Device**. With a single controller, you can leave it empty.
8. In the **Response variable** field, enter a name to store the result in, such as `registers`.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The NeoPool controller to read. Optional when only one controller is configured.
  required: false
Register address:
  description: "Modbus register address in decimal or hexadecimal, such as `258` or `0x0102`."
  required: true
Count:
  description: "Number of consecutive registers to read, from 1 to 31."
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `neopool.read_register`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: neopool.read_register
  data:
    device_id: abc123device456
    address: "0x0102"
    count: 1
  response_variable: registers
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The NeoPool controller to read. Optional when only one controller is configured.
  required: false
  type: string
address:
  description: "Modbus register address in decimal or hexadecimal, such as `258` or `0x0102`."
  required: true
  type: string
count:
  description: "Number of consecutive registers to read, from 1 to 31."
  required: false
  type: integer
{% endoptions_yaml %}

## Response data

The action returns the following fields:

- `address`: The register address that was read.
- `count`: The number of registers that were read.
- `values`: A list of the raw 16-bit register values.
- `value`: A single value, returned only when `count` is 1, for convenience.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
