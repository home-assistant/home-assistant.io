---
title: "Read register"
action: neopool.read_register
domain: neopool
description: "Read one or more Modbus registers from the controller and return the raw u16 values."
since: "2026.7"
related_actions:
  - neopool.set_timer
  - neopool.write_register
---

The **Read register** action reads one or more Modbus registers from the NeoPool controller and returns the raw u16 values. The integration auto-selects the right Modbus function code based on the address: Read Input Registers (FC04) for the MEASURE page (`0x0100`-`0x01FF`), Read Holding Registers (FC03) elsewhere. The caller does not need to know which is which.

This is useful for diagnostics, prototyping new entities, or watching a register the integration does not yet expose. The action has no side-effect; the response carries the values back via the `response_variable` mechanism.

{% include actions/ui_header.md %}

To read a register from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **NeoPool: Read register**.
6. Enter the **Register address** (decimal or hexadecimal, for example `258` or `0x0102`).
7. _Optional_: set **Count** to read multiple consecutive registers.
8. Provide a **response variable** name to capture the result.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Entry ID:
  description: Config entry ID of the NeoPool integration. Optional when only one NeoPool entry is configured.
  required: false
Register address:
  description: Modbus register address (decimal or hexadecimal, for example `258` or `0x0102`).
Count:
  description: Number of consecutive registers to read (1-31; the firmware refuses larger requests). Defaults to `1`.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `neopool.read_register`. A basic example looks like this:

{% example %}
action: |
  action: neopool.read_register
  data:
    address: "0x0102"
  response_variable: ph_raw
{% endexample %}

This reads the pH measurement register and stores the response in `ph_raw`.

### Options in YAML

{% options_yaml %}
entry_id:
  description: >
    Config entry ID of the NeoPool integration. Optional when only one NeoPool entry is configured.
  required: false
  type: string
address:
  description: >
    Modbus register address (decimal or hexadecimal, for example `258` or `0x0102`).
  required: true
  type: string
count:
  description: >
    Number of consecutive registers to read (1-31; the firmware refuses larger requests).
  required: false
  type: integer
  default: 1
{% endoptions_yaml %}

### Response

The action returns a structure with the following keys:

{% options_yaml %}
address:
  description: >
    The requested address, formatted as `0xXXXX`.
  type: string
count:
  description: >
    Number of registers read.
  type: integer
values:
  description: >
    List of u16 register values, length equal to `count`.
  type: list
value:
  description: >
    Only present when `count == 1`; equal to `values[0]`. Provided for ergonomic templating of single-register reads.
  type: integer
{% endoptions_yaml %}

For `MBF_MEASURE_PH` at `0x0102`, the displayed pH equals `value / 100`.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Action: read the pH measurement register

Read the controller's pH measurement and store it for use later in the automation.

{% details "YAML example for reading a single register" %}

{% example %}
action: |
  action: neopool.read_register
  data:
    address: "0x0102"
  response_variable: ph_raw
{% endexample %}

{% enddetails %}

### Action: bulk read 31 user registers

Read 31 consecutive registers starting at `0x0500` (USER page) in a single Modbus request. `count` is capped at 31, the value the controller firmware accepts in a single request; to read more, issue several calls.

{% details "YAML example for a bulk read" %}

{% example %}
action: |
  action: neopool.read_register
  data:
    address: "0x0500"
    count: 31
  response_variable: user_dump
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
