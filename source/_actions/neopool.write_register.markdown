---
title: "Write register"
action: neopool.write_register
domain: neopool
description: "Write a value directly to a Modbus register on the NeoPool controller, with optional read-back verification."
since: "2026.7"
related_actions:
  - neopool.read_register
  - neopool.set_timer
---

The **Write register** action writes a value directly to a Modbus holding register on the NeoPool controller using function code `FC16` (Write Multiple Registers). It is an advanced action intended for use cases that fall outside the surface area exposed by entities.

{% important %}
The **Write register** action bypasses the integration's regulation and capability detection logic. Incorrect register writes can put the controller into an unsupported state or trigger an alarm. Use only after consulting the official _NeoPool Control System MODBUS Register description_ documentation.
{% endimportant %}

{% include actions/ui_header.md %}

To write a register from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **NeoPool: Write register**.
6. Enter the **Register address** (decimal or hexadecimal, for example `1539` or `0x0603`).
7. Enter the **Value** to write.
8. _Optional_: leave **Apply** enabled to commit the value to non-volatile memory and execute it.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Entry ID:
  description: Config entry ID of the NeoPool integration. Optional when only one NeoPool entry is configured.
  required: false
Register address:
  description: Modbus register address (decimal or hexadecimal, for example `1539` or `0x0603`).
Value:
  description: Value to write to the register (decimal or hexadecimal).
Apply:
  description: Save the new value to EEPROM and execute it after writing. When disabled, the value is held in RAM only and lost on the next reboot. Defaults to enabled.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `neopool.write_register`. A basic example looks like this:

{% example %}
action: |
  action: neopool.write_register
  data:
    address: "0x0603"
    value: 1
{% endexample %}

This writes the value `1` to register `0x0603` and commits it to EEPROM.

### Options in YAML

{% options_yaml %}
entry_id:
  description: >
    Config entry ID of the NeoPool integration. Optional when only one NeoPool entry is configured.
  required: false
  type: string
address:
  description: >
    Modbus register address (decimal or hexadecimal, for example `1539` or `0x0603`).
  required: true
  type: string
value:
  description: >
    Value to write to the register (decimal or hexadecimal).
  required: true
  type: string
apply:
  description: >
    Save the new value to EEPROM and execute it after writing. When disabled, the value is held in RAM only and lost on the next reboot.
  required: false
  type: boolean
  default: true
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Action: toggle a feature not exposed as an entity

Write a value directly to a controller register that the integration does not yet expose.

{% details "YAML example for writing a register" %}

{% example %}
action: |
  action: neopool.write_register
  data:
    address: "0x0400"
    value: 1
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
