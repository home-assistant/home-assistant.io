---
title: "MQTT Lock"
description: "Instructions on how to integrate MQTT locks into Home Assistant."
ha_category:
  - Lock
ha_release: 0.15
ha_iot_class: Configurable
ha_domain: mqtt
---

The `mqtt` lock platform lets you control your MQTT enabled locks.

## Configuration

In an ideal scenario, the MQTT device will have a `state_topic` to publish state changes. If these messages are published with a `RETAIN` flag, the MQTT lock will receive an instant state update after subscription and will start with correct state. Otherwise, the initial state of the lock will be `false` / unlocked.

When a `state_topic` is not available, the lock will work in optimistic mode. In this mode, the lock will immediately change state after every command. Otherwise, the lock will wait for state confirmation from the device (message from `state_topic`).

Optimistic mode can be forced, even if state topic is available. Try to enable it, if experiencing incorrect lock operation.

It's mandatory for locks to support `lock` and `unlock`. A lock may optionally support `open`, (e.g. to open the bolt in addition to the latch), in this case, `payload_open` is required in the configuration. If the lock is in optimistic mode, it will change states to `unlocked` when handling the `open` command.

An MQTT lock can also report the intermediate states `unlocking`, `locking` or `jammed` if the motor reports a jammed state.
To enable MQTT locks in your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
mqtt:
  - lock:
      command_topic: "home/frontdoor/set"
```

{% configuration %}
availability:
  description: A list of MQTT topics subscribed to receive availability (online/offline) updates. Must not be used together with `availability_topic`.
  required: false
  type: list
  keys:
    payload_available:
      description: The payload that represents the available state.
      required: false
      type: string
      default: online
    payload_not_available:
      description: The payload that represents the unavailable state.
      required: false
      type: string
      default: offline
    topic:
      description: An MQTT topic subscribed to receive availability (online/offline) updates.
      required: true
      type: string
    value_template:
      description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract device's availability from the `topic`. To determine the devices's availability result of this template will be compared to `payload_available` and `payload_not_available`."
      required: false
      type: template
availability_mode:
  description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
  required: false
  type: string
  default: latest
availability_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract device's availability from the `availability_topic`. To determine the devices's availability result of this template will be compared to `payload_available` and `payload_not_available`."
  required: false
  type: template
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates. Must not be used together with `availability`.
  required: false
  type: string
code_format:
  description: A regular expression to validate a supplied code when it is set during the action to `open`, `lock` or `unlock` the MQTT lock.
  required: false
  type: string
command_template:
  description: Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to generate the payload to send to `command_topic`. The lock command template accepts the parameters `value` and `code`. The `value` parameter will contain the configured value for either `payload_open`, `payload_lock` or `payload_unlock`. The `code` parameter is set during the action to `open`, `lock` or `unlock` the MQTT lock and will be set `None` if no code was passed.
  required: false
  type: template
command_topic:
  description: The MQTT topic to publish commands to change the lock state.
  required: true
  type: string
device:
  description: 'Information about the device this lock is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works when [`unique_id`](#unique_id) is set. At least one of identifiers or connections must be present to identify the device.'
  required: false
  type: map
  keys:
    configuration_url:
      description: 'A link to the webpage that can manage the configuration of this device. Can be either an `http://`, `https://` or an internal `homeassistant://` URL.'
      required: false
      type: string
    connections:
      description: 'A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `"connections": [["mac", "02:5b:26:a8:dc:12"]]`.'
      required: false
      type: list
    hw_version:
      description: The hardware version of the device.
      required: false
      type: string
    identifiers:
      description: 'A list of IDs that uniquely identify the device. For example a serial number.'
      required: false
      type: [string, list]
    manufacturer:
      description: 'The manufacturer of the device.'
      required: false
      type: string
    model:
      description: 'The model of the device.'
      required: false
      type: string
    model_id:
      description: The model identifier of the device.
      required: false
      type: string
    name:
      description: 'The name of the device.'
      required: false
      type: string
    serial_number:
      description: "The serial number of the device."
      required: false
      type: string
    suggested_area:
      description: 'Suggest an area if the device isn’t in one yet.'
      required: false
      type: string
    sw_version:
      description: 'The firmware version of the device.'
      required: false
      type: string
    via_device:
      description: 'Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device. This is used to show device topology in Home Assistant.'
      required: false
      type: string
enabled_by_default:
  description: Flag which defines if the entity should be enabled when first added.
  required: false
  type: boolean
  default: true
encoding:
  description: The encoding of the payloads received and published messages. Set to `""` to disable decoding of incoming payload.
  required: false
  type: string
  default: "utf-8"
entity_category:
  description: The [category](https://developers.home-assistant.io/docs/core/entity#generic-properties) of the entity.
  required: false
  type: string
entity_picture:
  description: "Picture URL for the entity."
  required: false
  type: string
icon:
  description: "[Icon](/docs/configuration/customizing-devices/#icon) for the entity."
  required: false
  type: icon
json_attributes_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract the JSON dictionary from messages received on the `json_attributes_topic`. Usage example can be found in [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-template-configuration) documentation."
  required: false
  type: template
json_attributes_topic:
  description: The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes. Usage example can be found in [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-topic-configuration) documentation.
  required: false
  type: string
name:
  description: The name of the lock. Can be set to `null` if only the device name is relevant.
  required: false
  type: string
  default: MQTT Lock
object_id:
  description: Used instead of `name` for automatic generation of `entity_id`
  required: false
  type: string
optimistic:
  description: Flag that defines if lock works in optimistic mode.
  required: false
  type: boolean
  default: "`true` if no `state_topic` defined, else `false`."
payload_available:
  description: The payload that represents the available state.
  required: false
  type: string
  default: online
payload_lock:
  description: The payload sent to the lock to lock it.
  required: false
  type: string
  default: LOCK
payload_not_available:
  description: The payload that represents the unavailable state.
  required: false
  type: string
  default: offline
payload_unlock:
  description: The payload sent to the lock to unlock it.
  required: false
  type: string
  default: UNLOCK
payload_open:
  description: The payload sent to the lock to open it.
  required: false
  type: string
payload_reset:
  description: A special payload that resets the state to `unknown` when received on the `state_topic`.
  required: false
  type: string
  default: '"None"'
platform:
  description: Must be `lock`. Only allowed and required in [MQTT auto discovery device messages](/integrations/mqtt/#device-discovery-payload).
  required: true
  type: string
qos:
  description: The maximum QoS level to be used when receiving and publishing messages.
  required: false
  type: integer
  default: 0
retain:
  description: If the published message should have the retain flag on or not.
  required: false
  type: boolean
  default: false
state_jammed:
  description: The payload sent to `state_topic` by the lock when it's jammed.
  required: false
  type: string
  default: JAMMED
state_locked:
  description: The payload sent to `state_topic` by the lock when it's locked.
  required: false
  type: string
  default: LOCKED
state_locking:
  description: The payload sent to `state_topic` by the lock when it's locking.
  required: false
  type: string
  default: LOCKING
state_topic:
  description: The MQTT topic subscribed to receive state updates. It accepts states configured with `state_jammed`, `state_locked`, `state_unlocked`, `state_locking` or `state_unlocking`. A "None" payload resets to an `unknown` state. An empty payload is ignored.
  required: false
  type: string
state_unlocked:
  description: The payload sent to `state_topic` by the lock when it's unlocked.
  required: false
  type: string
  default: UNLOCKED
state_unlocking:
  description: The payload sent to `state_topic` by the lock when it's unlocking.
  required: false
  type: string
  default: UNLOCKING
unique_id:
   description: An ID that uniquely identifies this lock. If two locks have the same unique ID, Home Assistant will raise an exception. Required when used with device-based discovery.
   required: false
   type: string
value_template:
  description: Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract a state value from the payload.
  required: false
  type: template
{% endconfiguration %}

{% important %}
Make sure that your topics match exactly. `some-topic/` and `some-topic` are different topics.
{% endimportant %}

## Examples

In this section you will find some real-life examples of how to use this lock.

### Full configuration

The example below shows a full configuration for a MQTT lock.

{% raw %}

```yaml
# Example configuration.yaml entry
mqtt:
  - lock:
      name: Frontdoor
      state_topic: "home-assistant/frontdoor/state"
      code_format: "^\\d{4}$"
      command_topic: "home-assistant/frontdoor/set"
      command_template: '{ "action": "{{ value }}", "code":"{{ code }}" }'
      payload_lock: "LOCK"
      payload_unlock: "UNLOCK"
      state_locked: "LOCK"
      state_unlocked: "UNLOCK"
      state_locking: "LOCKING"
      state_unlocking: "UNLOCKING"
      state_jammed: "MOTOR_JAMMED"
      state_ok: "MOTOR_OK"
      optimistic: false
      qos: 1
      retain: true
      value_template: "{{ value.x }}"
```

{% endraw %}

Keep an eye on retaining messages to keep the state as you don't want to unlock your door by accident when you restart something.

For a check you can use the command line tools `mosquitto_pub` shipped with `mosquitto` to send MQTT messages. This allows you to operate your lock manually:

```bash
mosquitto_pub -h 127.0.0.1 -t home-assistant/frontdoor/set -m "LOCK"
```
