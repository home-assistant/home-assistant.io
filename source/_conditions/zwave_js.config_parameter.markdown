---
title: "Z-Wave JS configuration parameter"
condition: zwave_js.config_parameter
domain: zwave_js
description: "Tests if a configuration parameter on one or more Z-Wave JS nodes has the given value."
related_conditions:
  - zwave_js.value
  - zwave_js.node_status
---

The **Z-Wave JS configuration parameter** condition passes when a configuration parameter on the selected Z-Wave nodes has the value you specify. Configuration parameters are the device's own settings, such as an LED indicator mode or a motion sensitivity level, and most of them are not exposed as Home Assistant entities.

This condition is useful when:

- You want to branch on a device setting that has no entity, such as a beeper or LED mode.
- You want to confirm a parameter was actually applied before continuing.
- You want to check a partial parameter that is packed into a bitmask.

{% include conditions/ui_header.md %}

To use **Z-Wave JS configuration parameter** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Search for **Z-Wave JS configuration parameter** and select it.
5. Under **Devices** (see [Selecting nodes](#selecting-nodes)), pick the Z-Wave devices whose nodes you want to check.
6. Under **Parameter**, enter the parameter number.
7. Under **Value**, enter the value to compare with.
8. Optionally set **Bitmask** and **Endpoint**.
9. Under **Condition passes if** (see [Behavior with multiple nodes](#behavior-with-multiple-nodes)), choose how multiple nodes should combine. The default is **Any**.
10. Select **Save**.

### Options in the UI

{% options_ui %}
Devices:
  description: The Z-Wave devices whose nodes to test. Select one or more.
Parameter:
  description: The number of the configuration parameter.
Value:
  description: The value to compare with, either the raw value or its state label.
Bitmask:
  description: Bitmask of a partial parameter, as a number or a hexadecimal string such as `0x1`, if the parameter is split into parts.
Endpoint:
  description: The endpoint of the parameter. The default is `0`.
Condition passes if:
  description: |
    When several nodes are selected, controls how results combine:

    - **Any**: passes if at least one node matches (default).
    - **All**: passes only when every node matches.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `zwave_js.config_parameter`. A basic example looks like this:

{% example %}
condition: |
  condition: zwave_js.config_parameter
  options:
    device_id: 45d7d3230dbb7441473ec883dab294d4
    parameter: 3
    value: 255
{% endexample %}

This passes when parameter 3 on that node is `255`.

Parameters that expose named values can be compared by label instead of by number, and a partial parameter is selected with a bitmask:

{% example %}
condition: |
  condition: zwave_js.config_parameter
  options:
    device_id: 45d7d3230dbb7441473ec883dab294d4
    parameter: 3
    value: "Enable Beeper"
{% endexample %}

{% example %}
condition: |
  condition: zwave_js.config_parameter
  options:
    device_id: 8f4219cfa57e23f6f669c4616c2205e2
    parameter: 101
    bitmask: "0x1"
    value: 1
{% endexample %}

### Options in YAML

{% options_yaml %}
condition:
  description: The condition type. For this condition, use `zwave_js.config_parameter`.
  required: true
  type: string
device_id:
  description: One or more device IDs of the Z-Wave devices whose nodes to test.
  required: true
  type: [string, list]
parameter:
  description: The number of the configuration parameter.
  required: true
  type: integer
value:
  description: The value to compare with, either the raw value or its state label.
  required: true
  type: [string, integer, boolean, float]
bitmask:
  description: Bitmask of a partial parameter, as a number or a hexadecimal string such as `0x1`, if the parameter is split into parts.
  required: false
  type: [string, integer]
endpoint:
  description: The endpoint of the parameter.
  required: false
  type: integer
  default: 0
behavior:
  description: |
    When several nodes are selected, controls how results combine:

    - `any` (**Any** in the UI, default): passes if at least one node matches.
    - `all` (**All** in the UI): passes only when every node matches.
  required: false
  type: string
  default: any
{% endoptions_yaml %}

## Selecting nodes

A Z-Wave node is represented in Home Assistant as a device, so this condition selects nodes with a device picker rather than a target. Pick one or more Z-Wave devices, and the condition tests the node behind each one.

## Behavior with multiple nodes

When you select more than one device, the **Condition passes if** option controls how the results combine:

- **Any** (default): the condition passes if at least one node's parameter matches.
- **All**: the condition passes only when every node's parameter matches.

## Good to know

- Parameter numbers, their allowed values, and any bitmasks are specific to the device. Look them up in the device manual or on [Z-Wave JS Config DB](https://devices.zwave-js.io/).
- A parameter with named values can be compared either by its raw number or by its label, for example `1` or `"Enable"`. The raw value written as a string, such as `"1"`, also matches.
- The condition is rejected when it is saved if none of the selected nodes has the parameter at all, so a typo in the parameter number surfaces immediately rather than silently never passing.
- A node that does have the parameter but with a different value simply does not match.
- The condition does not pass when none of the selected devices resolve to a Z-Wave node. A device that no longer resolves counts as unresolved and makes **All** fail.
- To change a parameter rather than test it, use the [`zwave_js.set_config_parameter`](/integrations/zwave_js/#action-zwave_jsset_config_parameter) action.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: only run the nightly routine while the lock beeper is on

- **Trigger**: Time: 23:00
- **Condition**: Z-Wave JS configuration parameter
  - **Devices**: Front door lock
  - **Parameter**: 3
  - **Value**: Enable Beeper
- **Action**: Send a notification message

{% details "YAML example for checking a configuration parameter" %}

{% example %}
automation: |
  alias: "Warn at night while the lock beeper is enabled"
  triggers:
    - trigger: time
      at: "23:00:00"
  conditions:
    - condition: zwave_js.config_parameter
      options:
        device_id: 45d7d3230dbb7441473ec883dab294d4
        parameter: 3
        value: "Enable Beeper"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The front door lock will beep tonight."
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
