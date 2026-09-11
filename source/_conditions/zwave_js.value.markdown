---
title: "Z-Wave JS value"
condition: zwave_js.value
domain: zwave_js
description: "Tests if a Z-Wave value on one or more nodes equals the given value."
related_conditions:
  - zwave_js.config_parameter
  - zwave_js.node_status
---

The **Z-Wave JS value** condition passes when a Z-Wave value on the selected nodes equals the value you specify. Use it to check a Command Class value directly, including values that Home Assistant does not expose as an entity.

This condition is the counterpart of the [Z-Wave value updated](/triggers/zwave_js.value_updated/) trigger. Where that trigger fires on a change, this condition tests the current value.

This condition is useful when:

- You want to check a Z-Wave value that has no Home Assistant entity.
- You want to test a specific Command Class, property, property key, or endpoint.
- A device reports detail in a value that its entity state flattens away.

{% include conditions/ui_header.md %}

To use **Z-Wave JS value** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Search for **Z-Wave JS value** and select it.
5. Under **Devices** (see [Selecting nodes](#selecting-nodes)), pick the Z-Wave devices whose nodes you want to check.
6. Under **Command class**, pick the Command Class of the value.
7. Under **Property**, enter the property of the value, and under **Value**, enter the value to compare with.
8. Optionally set **Property key** and **Endpoint**.
9. Under **Condition passes if** (see [Behavior with multiple nodes](#behavior-with-multiple-nodes)), choose how multiple nodes should combine. The default is **Any**.
10. Select **Save**.

### Options in the UI

{% options_ui %}
Devices:
  description: The Z-Wave devices whose nodes to test. Select one or more.
Command class:
  description: The Command Class of the Z-Wave value.
Property:
  description: The property of the Z-Wave value.
Value:
  description: The value to compare with, either the raw value or its state label.
Property key:
  description: The property key of the Z-Wave value, for values that have one.
Endpoint:
  description: The endpoint of the Z-Wave value.
Condition passes if:
  description: |
    When several nodes are selected, controls how results combine:

    - **Any**: passes if at least one node matches (default).
    - **All**: passes only when every node matches.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `zwave_js.value`. A basic example looks like this:

{% example %}
condition: |
  condition: zwave_js.value
  options:
    device_id: 45d7d3230dbb7441473ec883dab294d4
    command_class: 98
    property: currentMode
    value: "Unsecured"
{% endexample %}

This passes when the Door Lock Command Class reports the lock as unsecured.

To require every listed node to match, and to select a value that has a property key and an endpoint:

{% example %}
condition: |
  condition: zwave_js.value
  options:
    device_id:
      - 45d7d3230dbb7441473ec883dab294d4
      - 8f4219cfa57e23f6f669c4616c2205e2
    command_class: 51
    property: currentColor
    property_key: 0
    endpoint: 0
    value: 255
    behavior: all
{% endexample %}

### Options in YAML

{% options_yaml %}
condition:
  description: The condition type. For this condition, use `zwave_js.value`.
  required: true
  type: string
device_id:
  description: One or more device IDs of the Z-Wave devices whose nodes to test.
  required: true
  type: [string, list]
command_class:
  description: The numeric ID of the Command Class of the Z-Wave value.
  required: true
  type: integer
property:
  description: The property of the Z-Wave value.
  required: true
  type: [string, integer]
value:
  description: The value to compare with, either the raw value or its state label.
  required: true
  type: [string, integer, boolean, float]
property_key:
  description: The property key of the Z-Wave value.
  required: false
  type: [string, integer]
endpoint:
  description: The endpoint of the Z-Wave value.
  required: false
  type: integer
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

- **Any** (default): the condition passes if at least one node's value matches.
- **All**: the condition passes only when every node's value matches.

## Good to know

- Property names, property keys, and Command Class IDs come from Z-Wave JS. Refer to the [Z-Wave JS documentation](https://zwave-js.github.io/node-zwave-js/#/api/valueid) for the available values.
- A value with named states can be compared either by its raw value or by its state label, for example `0` or `"Unsecured"`. The raw value written as a string, such as `"0"`, also matches.
- A property key of `0` is a real key, for example a Color Switch component, and is not the same as leaving the property key out.
- The condition is rejected when it is saved if none of the selected nodes has the value at all, so a typo in the Command Class or property surfaces immediately rather than silently never passing.
- A node that does have the value but with a different reading simply does not match.
- The condition does not pass when none of the selected devices resolve to a Z-Wave node. A device that no longer resolves counts as unresolved and makes **All** fail.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: only close the garage if the latch reports closed

- **Trigger**: Time: 23:00
- **Condition**: Z-Wave JS value
  - **Devices**: Garage door lock
  - **Command class**: 98 (Door Lock)
  - **Property**: latchStatus
  - **Value**: closed
- **Action**: Send a notification message

{% details "YAML example for checking a Z-Wave value" %}

{% example %}
automation: |
  alias: "Confirm the latch is closed at night"
  triggers:
    - trigger: time
      at: "23:00:00"
  conditions:
    - condition: zwave_js.value
      options:
        device_id: 45d7d3230dbb7441473ec883dab294d4
        command_class: 98
        property: latchStatus
        value: "closed"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The front door latch is closed for the night."
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
