---
title: "Z-Wave JS node status"
condition: zwave_js.node_status
domain: zwave_js
description: "Tests if one or more Z-Wave JS nodes have the given status."
related_conditions:
  - zwave_js.config_parameter
  - zwave_js.value
---

The **Z-Wave JS node status** condition passes when the selected Z-Wave nodes report the status you choose. Use it to check whether a node is reachable before an automation tries to talk to it.

Z-Wave nodes report one of four statuses. A mains-powered node is normally `alive`, and becomes `dead` when the controller can no longer reach it. A battery-powered node spends most of its life `asleep` and briefly becomes `awake` when it checks in.

This condition is useful when:

- You want to skip an action for a node that has gone `dead` instead of letting the action fail.
- You want to send a notification only while a node is unreachable.
- You want to queue work for a battery-powered node only while it is `awake`.

{% include conditions/ui_header.md %}

To use **Z-Wave JS node status** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Search for **Z-Wave JS node status** and select it.
5. Under **Devices** (see [Selecting nodes](#selecting-nodes)), pick the Z-Wave devices whose nodes you want to check.
6. Under **Status**, choose the status to test for.
7. Under **Condition passes if** (see [Behavior with multiple nodes](#behavior-with-multiple-nodes)), choose how multiple nodes should combine. The default is **Any**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Devices:
  description: The Z-Wave devices whose nodes to test. Select one or more.
Status:
  description: |
    The node status to test for:

    - **Alive**: the controller can reach the node.
    - **Asleep**: a battery-powered node is sleeping.
    - **Awake**: a battery-powered node is briefly awake.
    - **Dead**: the controller cannot reach the node.
Condition passes if:
  description: |
    When several nodes are selected, controls how results combine:

    - **Any**: passes if at least one node has the status (default).
    - **All**: passes only when every node has the status.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `zwave_js.node_status`. A basic example looks like this:

{% example %}
condition: |
  condition: zwave_js.node_status
  options:
    device_id: 45d7d3230dbb7441473ec883dab294d4
    status: alive
{% endexample %}

This passes when the node behind that device is reachable.

To require every listed node to be dead:

{% example %}
condition: |
  condition: zwave_js.node_status
  options:
    device_id:
      - 45d7d3230dbb7441473ec883dab294d4
      - 8f4219cfa57e23f6f669c4616c2205e2
    behavior: all
    status: dead
{% endexample %}

### Options in YAML

{% options_yaml %}
condition:
  description: The condition type. For this condition, use `zwave_js.node_status`.
  required: true
  type: string
device_id:
  description: One or more device IDs of the Z-Wave devices whose nodes to test.
  required: true
  type: [string, list]
status:
  description: "The node status to test for. One of `alive`, `asleep`, `awake`, or `dead`."
  required: true
  type: string
behavior:
  description: |
    When several nodes are selected, controls how results combine:

    - `any` (**Any** in the UI, default): passes if at least one node has the status.
    - `all` (**All** in the UI): passes only when every node has the status.
  required: false
  type: string
  default: any
{% endoptions_yaml %}

## Selecting nodes

A Z-Wave node is represented in Home Assistant as a device, so this condition selects nodes with a device picker rather than a target. Pick one or more Z-Wave devices, and the condition tests the node behind each one.

## Behavior with multiple nodes

When you select more than one device, the **Condition passes if** option controls how the results combine:

- **Any** (default): the condition passes if at least one node has the status. This suits questions like "is any node in this group unreachable?"
- **All**: the condition passes only when every node has the status. This suits "is the whole group back online?" checks, so an automation does not report an all-clear while one node is still dead.

## Good to know

- The condition does not pass when none of the selected devices resolve to a Z-Wave node, whichever behavior you choose.
- A selected device that no longer resolves to a node, because the config entry is unloaded or the device was removed, counts as unresolved and makes **All** fail. It is simply skipped for **Any**.
- Selecting the same node twice does not change the result. Nodes are de-duplicated before the check.
- Node statuses are also exposed as a diagnostic sensor per node, so you can use the standard [state condition](/docs/scripts/conditions/#state-condition) instead if you prefer to check that entity.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: only notify while a lock is unreachable

Check a lock's node every hour and notify only while the controller cannot reach it.

- **Trigger**: Time pattern, every hour
- **Condition**: Z-Wave JS node status
  - **Devices**: Front door lock
  - **Status**: Dead
- **Action**: Send a notification message

{% details "YAML example for notifying about an unreachable node" %}

{% example %}
automation: |
  alias: "Notify while the front door lock is unreachable"
  triggers:
    - trigger: time_pattern
      hours: "/1"
  conditions:
    - condition: zwave_js.node_status
      options:
        device_id: 45d7d3230dbb7441473ec883dab294d4
        status: dead
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The front door lock is not responding."
{% endexample %}

{% enddetails %}

### Automation: refresh a battery node only while it is awake

Battery-powered nodes only accept commands while they are awake. This automation refreshes a sensor's values when the node checks in.

- **Trigger**: Z-Wave JS node status changed, to Awake
- **Condition**: Z-Wave JS node status
  - **Devices**: Motion sensor
  - **Status**: Awake
- **Action**: Z-Wave refresh value

{% details "YAML example for refreshing a node while it is awake" %}

{% example %}
automation: |
  alias: "Refresh the motion sensor while it is awake"
  triggers:
    - trigger: state
      entity_id: sensor.motion_sensor_node_status
      to: "awake"
  conditions:
    - condition: zwave_js.node_status
      options:
        device_id: 8f4219cfa57e23f6f669c4616c2205e2
        status: awake
  actions:
    - action: zwave_js.refresh_value
      target:
        entity_id: sensor.motion_sensor_air_temperature
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
