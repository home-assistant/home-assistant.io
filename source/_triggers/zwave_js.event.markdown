---
title: "Z-Wave event"
trigger: zwave_js.event
domain: zwave_js
description: "Triggers on Z-Wave JS controller, driver, or node events, including events that are not handled by Home Assistant automatically."
related_triggers:
  - zwave_js.value_updated
  - event
---

The **Z-Wave event** trigger fires on Z-Wave JS controller, driver, or node events. Use it to react to events that the Z-Wave JS layer reports but that Home Assistant does not surface as a regular state change.

This trigger is useful when:

- You want to react to controller or driver lifecycle events, like inclusion or interview progress.
- You want to react to a node event that is not exposed as an entity state.
- You need to match a specific event by name and, optionally, by event data.

There is strict validation in place based on all known event types. If you come across an event type that is not supported, open a GitHub issue in the [`home-assistant/core`](https://github.com/home-assistant/core/issues) repository.

{% include triggers/ui_header.md %}

To use **Z-Wave JS event received** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Search for **Z-Wave JS event received** and select it.
5. Under **Event source**, choose whether you are watching a **Controller**, **Driver**, or **Node** event.
6. Point the trigger at what should emit the event:
   - For a **Node** event, pick **Devices**, **Entities**, or both.
   - For a **Controller** or **Driver** event, pick a **Config entry** instead, and leave devices and entities empty.
7. Under **Event**, enter the event name, for example `interview failed`.
8. Optionally set **Event data** to match specific fields, and turn on **Partial dictionary match** if you only want to match a subset of a nested mapping.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Event source:
  description: |
    The layer that emits the event:

    - **Controller**: events from the Z-Wave controller, such as inclusion progress.
    - **Driver**: events from the Z-Wave JS driver itself.
    - **Node**: events from a specific node.
Config entry:
  description: The Z-Wave config entry to watch. Used for **Controller** and **Driver** events instead of devices and entities.
Devices:
  description: The Z-Wave devices whose node events to watch. Used for **Node** events.
Entities:
  description: Entities whose devices should be watched. Used for **Node** events.
Event:
  description: The name of the event to match, for example `value notification`.
Event data:
  description: Event data to match against. The trigger only fires when the event data matches.
Partial dictionary match:
  description: Match only the listed keys of a nested mapping rather than the whole mapping. The default is off.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `zwave_js.event`. A basic example looks like this:

{% example %}
trigger: |
  trigger: zwave_js.event
  device_id: 45d7d3230dbb7441473ec883dab294d4
  event_source: node
  event: "interview failed"
{% endexample %}

This fires when the `interview failed` event is reported for the targeted device.

### Options in YAML

For `node` events, at least one of `device_id` or `entity_id` must be set. For `controller` and `driver` events, `config_entry_id` must be set instead.

{% options_yaml %}
trigger:
  description: The trigger type. For this trigger, use `zwave_js.event`.
  required: true
  type: string
event_source:
  description: The source of the event. One of `node`, `controller`, or `driver`.
  required: true
  type: string
event:
  description: "The event name. Refer to the [Z-Wave JS documentation](https://zwave-js.github.io/node-zwave-js/#/) for the available events."
  required: true
  type: string
device_id:
  description: One or more device IDs of Z-Wave devices to watch. Required for `node` events when `entity_id` is not set.
  required: false
  type: [string, list]
entity_id:
  description: One or more entity IDs whose devices should be watched. Required for `node` events when `device_id` is not set.
  required: false
  type: [string, list]
config_entry_id:
  description: The config entry ID of the Z-Wave network. Required for `controller` and `driver` events.
  required: false
  type: string
event_data:
  description: A mapping of event data fields that must match for the trigger to fire.
  required: false
  type: map
partial_dict_match:
  description: When `true`, only the fields listed in `event_data` need to match. Other fields in the actual event are ignored.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

## Good to know

- Event names and the structure of event data come from Z-Wave JS. The set of available fields depends on the event.
- When an event includes nested fields (for example, an `args` mapping inside `event_data`), use `partial_dict_match: true` if you only want to match a subset of those fields.
- Node events need at least one device or entity. Controller and driver events must not have any, and take a config entry instead.

### Available trigger data

In addition to the [standard automation trigger data](/docs/automation/templating/#all), this trigger exposes the following template variables:

- `trigger.device_id`: Device ID for the device in the device registry. Only included for `node` events.
- `trigger.node_id`: Z-Wave node ID. Only included for `node` events.
- `trigger.event_source`: Source of the event (`node`, `controller`, or `driver`).
- `trigger.event`: Name of the event.
- `trigger.event_data`: Any data included in the event.

{% include triggers/more_examples.md %}

### Automation: notify when a node interview fails

This automation fires when the `interview failed` event is reported for one of the listed devices, and only when the failure is final.

- **Trigger**: Z-Wave event
  - **Device**: Garage door lock
  - **Entities**: `lock.front_lock`, `lock.back_door`
  - **Event source**: `node`
  - **Event**: `interview failed`
  - **Event data**: `args.isFinal: true` with **Partial dict match** enabled
- **Action**: Send a notification

{% details "YAML example for a final interview failure notification" %}

{% example %}
automation: |
  alias: "Notify on Z-Wave interview failure"
  triggers:
    - trigger: zwave_js.event
      device_id: 45d7d3230dbb7441473ec883dab294d4
      entity_id:
        - lock.front_lock
        - lock.back_door
      event_source: node
      event: "interview failed"
      event_data:
        args:
          isFinal: true
      partial_dict_match: true
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "A Z-Wave node failed its interview."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
