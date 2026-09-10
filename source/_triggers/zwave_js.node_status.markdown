---
title: "Z-Wave JS node status changed"
trigger: zwave_js.node_status
domain: zwave_js
description: "Triggers when the status of one or more Z-Wave JS nodes changes."
related_triggers:
  - zwave_js.event
  - zwave_js.value_updated
---

The **Z-Wave JS node status changed** trigger fires when a Z-Wave node changes status. Use it to react when a node stops responding, comes back, or wakes up to check in.

Z-Wave nodes report one of four statuses. A mains-powered node is normally `alive`, and becomes `dead` when the controller can no longer reach it. A battery-powered node spends most of its life `asleep` and briefly becomes `awake` when it checks in.

This trigger is useful when:

- You want to be told when a node stops responding, rather than discovering it when an automation fails.
- You want to run work against a battery-powered node in the short window while it is awake.
- You want to know when a node recovers, so an automation can re-apply settings.

{% include triggers/ui_header.md %}

To use **Z-Wave JS node status changed** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Search for **Z-Wave JS node status changed** and select it.
5. Under **Devices** (see [Selecting nodes](#selecting-nodes)), pick the Z-Wave devices whose nodes you want to watch.
6. Optionally set **From** and **To** to only fire on specific status changes.
7. Under **Trigger when** (see [Behavior with multiple nodes](#behavior-with-multiple-nodes)), pick **Each**, **First**, or **All**.
8. Under **For at least**, enter how long the new status must hold before the trigger fires.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Devices:
  description: The Z-Wave devices whose node status to watch. Select one or more.
From:
  description: Only fire when the previous status is one of these. Leave empty to fire from any status.
To:
  description: Only fire when the new status is one of these. Leave empty to fire on any status change.
Trigger when:
  description: |
    When several nodes are selected, controls when the trigger fires:

    - **Each** (default): fire every time any selected node changes status.
    - **First**: fire only for the first node that changes.
    - **All**: fire only once every selected node matches.
For at least:
  description: How long the new status must hold before the trigger fires. The default is `0`, which fires immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `zwave_js.node_status`. A basic example looks like this:

{% example %}
trigger: |
  trigger: zwave_js.node_status
  options:
    device_id: 45d7d3230dbb7441473ec883dab294d4
    to: dead
{% endexample %}

This fires when the node behind that device stops responding.

To wait until every selected node has been dead for five minutes:

{% example %}
trigger: |
  trigger: zwave_js.node_status
  options:
    device_id:
      - 45d7d3230dbb7441473ec883dab294d4
      - 8f4219cfa57e23f6f669c4616c2205e2
    to: dead
    behavior: all
    for: "00:05:00"
{% endexample %}

### Options in YAML

{% options_yaml %}
trigger:
  description: The trigger type. For this trigger, use `zwave_js.node_status`.
  required: true
  type: string
device_id:
  description: One or more device IDs of the Z-Wave devices whose node status to watch.
  required: true
  type: [string, list]
from:
  description: "One previous status or a list of them. One of `alive`, `asleep`, `awake`, or `dead`. The trigger fires when the previous status matches any of them."
  required: false
  type: [string, list]
to:
  description: "One new status or a list of them. One of `alive`, `asleep`, `awake`, or `dead`. The trigger fires when the new status matches any of them."
  required: false
  type: [string, list]
behavior:
  description: |
    When several nodes are selected, controls when the trigger fires:

    - `each` (**Each** in the UI, default): fire for every node that changes.
    - `first` (**First** in the UI): fire only for the first node that changes.
    - `all` (**All** in the UI): fire only once every node matches.
  required: false
  type: string
  default: each
for:
  description: How long the new status must hold before the trigger fires. Accepts a duration in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

## Selecting nodes

A Z-Wave node is represented in Home Assistant as a device, so this trigger picks nodes with a device picker rather than a target. Behind the scenes it watches the node status sensor of each selected device, so a device's other entities never fire it.

## Behavior with multiple nodes

When you select more than one device, the **Trigger when** option controls when the automation runs:

- **Each** (default): the automation runs every time any selected node changes status. Use this to be told about each node individually.
- **First**: the automation runs only for the first node that changes, and not again until the others have reset. Use this to avoid a burst of notifications.
- **All**: the automation runs only once every selected node matches. Use this for "the whole group is offline" checks.

## Good to know

- Every Z-Wave node has a node status sensor, and it is a diagnostic entity that is enabled by default. This trigger watches those sensors for you, so you do not need to find their entity IDs.
- Leaving both **From** and **To** empty fires on any status change, including `asleep` to `awake`, which is noisy for battery-powered nodes. Set **To** when you only care about a node going offline.
- Setting **From** on its own fires when the node leaves that status for any other one.
- Momentary `unknown` or `unavailable` states (for example, while Z-Wave JS restarts) don't count as status changes, so they never cause the trigger to fire, even with no **From**/**To** filters set.
- **For at least** is useful for flaky nodes. A node that drops out and recovers within the duration does not fire the trigger.
- If you would rather work with the sensor directly, the same changes are visible through the standard [state trigger](/docs/automation/trigger/#state-trigger) on each node status sensor.

### Available trigger data

This trigger exposes the [standard entity state trigger data](/docs/automation/templating/#state), including `trigger.entity_id`, `trigger.from_state`, and `trigger.to_state`, where the state is the node status.

{% include triggers/more_examples.md %}

### Automation: notify when a node stops responding

Send a notification once a node has been unreachable for five minutes, so a brief blip does not page you.

- **Trigger**: Z-Wave JS node status changed
  - **Devices**: Front door lock
  - **To**: Dead
  - **For at least**: 00:05:00
- **Action**: Send a notification message

{% details "YAML example for notifying about an unreachable node" %}

{% example %}
automation: |
  alias: "Notify when the front door lock stops responding"
  triggers:
    - trigger: zwave_js.node_status
      options:
        device_id: 45d7d3230dbb7441473ec883dab294d4
        to: dead
        for: "00:05:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The front door lock has been unreachable for five minutes."
{% endexample %}

{% enddetails %}

### Automation: re-apply a setting when a battery node wakes up

Battery-powered nodes only accept commands while they are awake. This automation pushes a configuration parameter the moment the node checks in.

- **Trigger**: Z-Wave JS node status changed
  - **Devices**: Motion sensor
  - **To**: Awake
- **Action**: Z-Wave set configuration parameter

{% details "YAML example for configuring a node while it is awake" %}

{% example %}
automation: |
  alias: "Set the motion sensor sensitivity when it wakes up"
  triggers:
    - trigger: zwave_js.node_status
      options:
        device_id: 8f4219cfa57e23f6f669c4616c2205e2
        to: awake
  actions:
    - action: zwave_js.set_config_parameter
      target:
        device_id: 8f4219cfa57e23f6f669c4616c2205e2
      data:
        parameter: 4
        value: 3
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
