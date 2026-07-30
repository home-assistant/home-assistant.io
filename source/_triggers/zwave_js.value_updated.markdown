---
title: "Z-Wave value updated"
trigger: zwave_js.value_updated
domain: zwave_js
description: "Triggers when a Z-Wave value updates, including values that are not exposed as Home Assistant entities."
related_triggers:
  - zwave_js.event
  - state
---

The **Z-Wave value updated** trigger fires when a Z-Wave value changes on a node. Use it to react to value changes that Home Assistant does not expose as a regular entity state, or to watch a specific Command Class value directly.

This trigger is useful when:

- You want to act on a Z-Wave value that is not represented by a Home Assistant entity.
- A device sends value updates without changing entity state, for example, when the device does not follow the Z-Wave specification.
- You need to filter on a specific Command Class, property, property key, or endpoint.

## Prerequisites

- Configure this trigger in YAML mode. It is not available in the automation editor.

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `zwave_js.value_updated`. A basic example looks like this:

{% example %}
trigger: |
  trigger: zwave_js.value_updated
  entity_id: lock.front_lock
  command_class: 98
  property: "latchStatus"
  to: "opened"
{% endexample %}

This fires whenever the `latchStatus` value of the Door Lock Command Class on the front lock changes to `opened`.

### Options in YAML

At least one of `device_id` or `entity_id` is required. The `command_class` and `property` fields are required to identify the Z-Wave value to watch.

{% options_yaml %}
trigger:
  description: The trigger type. For this trigger, use `zwave_js.value_updated`.
  required: true
  type: string
device_id:
  description: One or more device IDs of Z-Wave devices to watch. At least one of `device_id` or `entity_id` must be set.
  required: false
  type: [string, list]
entity_id:
  description: One or more entity IDs whose devices should be watched. At least one of `device_id` or `entity_id` must be set.
  required: false
  type: [string, list]
command_class:
  description: The numeric ID of the Command Class of the Z-Wave value to watch.
  required: true
  type: integer
property:
  description: The property of the Z-Wave value to watch.
  required: true
  type: [string, integer]
property_key:
  description: The property key of the Z-Wave value to watch.
  required: false
  type: [string, integer]
endpoint:
  description: The endpoint of the Z-Wave value to watch.
  required: false
  type: integer
from:
  description: One previous value or a list of previous values to match against. The trigger fires when the previous value matches any of the listed values.
  required: false
  type: [string, integer, list]
to:
  description: One new value or a list of new values to match against. The trigger fires when the new value matches any of the listed values.
  required: false
  type: [string, integer, list]
{% endoptions_yaml %}

## Good to know

- Property names, property keys, and Command Class IDs come from Z-Wave JS. Refer to the [Z-Wave JS documentation](https://zwave-js.github.io/node-zwave-js/#/api/valueid) for the available values.
- When `from` or `to` is a list, the trigger fires if the value matches any item in the list.

### Available trigger data

In addition to the [standard automation trigger data](/docs/automation/templating/#all), this trigger exposes the following template variables:

- `trigger.device_id`: Device ID for the device in the device registry.
- `trigger.node_id`: Z-Wave node ID.
- `trigger.command_class`: Command Class ID.
- `trigger.command_class_name`: Command Class name.
- `trigger.property`: Z-Wave value's property.
- `trigger.property_name`: Z-Wave value's property name.
- `trigger.property_key`: Z-Wave value's property key.
- `trigger.property_key_name`: Z-Wave value's property key name.
- `trigger.endpoint`: Z-Wave value's endpoint.
- `trigger.previous_value`: The previous value (translated to a state name when possible).
- `trigger.previous_value_raw`: The raw previous value.
- `trigger.current_value`: The current value (translated to a state name when possible).
- `trigger.current_value_raw`: The raw current value.

{% include triggers/more_examples.md %}

### Automation: refresh related switches when a relay reports a value update

Some devices report value updates without a corresponding state change. This automation refreshes related switches when the in-wall dual relay switch reports a `currentValue` update.

- **Trigger**: Z-Wave value updated
  - **Entity**: `switch.in_wall_dual_relay_switch`
  - **Command Class**: `37` (Switch Binary)
  - **Property**: `currentValue`
- **Action**: Z-Wave refresh value
  - **Targets**: the related switches

{% details "YAML example for refreshing related switches" %}

{% example %}
automation: |
  alias: "Refresh related switches on value update"
  triggers:
    - trigger: zwave_js.value_updated
      entity_id: switch.in_wall_dual_relay_switch
      command_class: 37
      property: "currentValue"
  actions:
    - action: zwave_js.refresh_value
      data:
        entity_id:
          - switch.in_wall_dual_relay_switch_2
          - switch.in_wall_dual_relay_switch_3
{% endexample %}

{% enddetails %}

### Automation: react when a door lock latch opens

This automation fires whenever the `latchStatus` value of one of the listed locks changes from `closed` or `jammed` to `opened`.

- **Trigger**: Z-Wave value updated
  - **Device**: Garage Door Lock
  - **Entities**: `lock.front_lock`, `lock.back_door`
  - **Command Class**: `98` (Door Lock)
  - **Property**: `latchStatus`
  - **From**: `closed`, `jammed`
  - **To**: `opened`
- **Action**: Send a notification

{% details "YAML example for reacting to a latch opening" %}

{% example %}
automation: |
  alias: "Notify when a lock latch opens"
  triggers:
    - trigger: zwave_js.value_updated
      device_id: 45d7d3230dbb7441473ec883dab294d4
      entity_id:
        - lock.front_lock
        - lock.back_door
      command_class: 98
      property: "latchStatus"
      property_key: null
      endpoint: 0
      from:
        - "closed"
        - "jammed"
      to: "opened"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "A lock latch was opened."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
