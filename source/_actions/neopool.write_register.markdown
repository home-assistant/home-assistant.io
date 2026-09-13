---
title: "Write register"
action: neopool.write_register
domain: neopool
description: "Writes a value to a Modbus holding register and reads it back to verify the write."
related_actions:
  - neopool.read_register
  - neopool.get_device_time
  - neopool.set_device_time
  - neopool.set_timer
---

Use this action to write a value to a Modbus holding register and read it back to verify the write. It is intended for diagnostics and for values the integration does not expose as entities.

This action requires a Home Assistant administrator account.

{% warning %}
Writing raw registers can put the controller into an unexpected state. Only use this action when you know what a register does.
{% endwarning %}

{% include actions/ui_header.md %}

To write a register from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **NeoPool: Write register**.
6. Fill in the **Register address** and **Value**.
7. Optionally select the **Device**. With a single controller, you can leave it empty.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The NeoPool controller to target. Optional when only one controller is configured.
  required: false
Register address:
  description: "Modbus register address in decimal or hexadecimal, such as `1539` or `0x0603`."
  required: true
Value:
  description: "Value to write, from 0 to 65535, in decimal or hexadecimal."
  required: true
Apply:
  description: "Save the value to the controller's memory and apply it after the write. Enabled by default."
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `neopool.write_register`. A basic example looks like this:

{% example %}
action: |
  action: neopool.write_register
  data:
    device_id: abc123device456
    address: "0x0603"
    value: "1"
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The NeoPool controller to target. Optional when only one controller is configured.
  required: false
  type: string
address:
  description: "Modbus register address in decimal or hexadecimal, such as `1539` or `0x0603`."
  required: true
  type: string
value:
  description: "Value to write, from 0 to 65535, in decimal or hexadecimal."
  required: true
  type: string
apply:
  description: "Save the value to the controller's memory and apply it after the write. Enabled by default."
  required: false
  type: boolean
  default: true
{% endoptions_yaml %}

## Good to know

- With **Apply** enabled, the value is saved to the controller's memory, which has a limited number of write cycles. Avoid running this action on a fixed schedule or in a loop.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
