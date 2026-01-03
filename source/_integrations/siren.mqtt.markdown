---
title: "MQTT Siren"
description: "Instructions on how to integrate MQTT sirens into Home Assistant."
ha_category:
  - Siren
ha_release: 2022.3
ha_iot_class: Configurable
ha_domain: mqtt
---

The `mqtt` siren platform lets you control your MQTT enabled sirens and text based notification devices.

## Configuration

In an ideal scenario, the MQTT device will have a `state_topic` to publish state changes. If these messages are published with a `RETAIN` flag, the MQTT siren will receive an instant state update after subscription, and will start with the correct state. Otherwise, the initial state of the siren will be `false` / `off`.

When a `state_topic` is not available, the siren will work in optimistic mode. In this mode, the siren will immediately change state after every command. Otherwise, the siren will wait for state confirmation from the device (message from `state_topic`).

Optimistic mode can be forced, even if the `state_topic` is available. Try to enable it, if experiencing incorrect operation.

To enable this siren in your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
mqtt:
  - siren:
      command_topic: "home/bedroom/siren/set"
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
available_tones:
  description: A list of available tones the siren supports. When configured, this enables the support for setting a `tone` and enables the `tone` state attribute.
  required: false
  type: list
command_template:
  description: Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to generate a custom payload to send to `command_topic`. The variable `value` will be assigned with the configured `payload_on` or `payload_off` setting. The siren turn on action parameters `tone`, `volume_level` or `duration` can be used as variables in the template. When operation in optimistic mode the corresponding state attributes will be set. Turn on parameters will be filtered if a device misses the support.
  required: false
  type: template
command_off_template:
  description: Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to generate a custom payload to send to `command_topic` when the siren turn off action is called. By default `command_template` will be used as template for action turn off. The variable `value` will be assigned with the configured `payload_off` setting.
  required: false
  type: template
command_topic:
  description: > 
    The MQTT topic to publish commands to change the siren state. Without command templates, a default JSON payload like `{"state":"ON", "tone": "bell", "duration": 10, "volume_level": 0.5 }` is published. When the siren turn on action is performed, the startup parameters will be added to the JSON payload. The `state` value of the JSON payload will be set to the the `payload_on` or `payload_off` configured payload.
  required: false
  type: string
device:
  description: "Information about the device this siren is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works when [`unique_id`](#unique_id) is set. At least one of identifiers or connections must be present to identify the device."
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
      description: A list of IDs that uniquely identify the device. For example a serial number.
      required: false
      type: [string, list]
    manufacturer:
      description: The manufacturer of the device.
      required: false
      type: string
    model:
      description: The model of the device.
      required: false
      type: string
    model_id:
      description: The model identifier of the device.
      required: false
      type: string
    name:
      description: The name of the device.
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
      description: The firmware version of the device.
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
  description: The name to use when displaying this siren. Can be set to `null` if only the device name is relevant.
  required: false
  type: string
  default: MQTT Siren
object_id:
  description: Used instead of `name` for automatic generation of `entity_id`
  required: false
  type: string
optimistic:
  description: Flag that defines if siren works in optimistic mode.
  required: false
  type: boolean
  default: "`true` if no `state_topic` defined, else `false`."
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
payload_off:
  description: The payload that represents `off` state. If specified, will be used for both comparing to the value in the `state_topic` (see `value_template` and `state_off` for details) and sending as `off` command to the `command_topic`.
  required: false
  type: string
  default: "OFF"
payload_on:
  description: The payload that represents `on` state. If specified, will be used for both comparing to the value in the `state_topic` (see `value_template` and `state_on`  for details) and sending as `on` command to the `command_topic`.
  required: false
  type: string
  default: "ON"
platform:
  description: Must be `siren`. Only allowed and required in [MQTT auto discovery device messages](/integrations/mqtt/#device-discovery-payload).
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
state_off:
  description: The payload that represents the `off` state. Used when value that represents `off` state in the `state_topic` is different from value that should be sent to the `command_topic` to turn the device `off`.
  required: false
  type: string
  default: "`payload_off` if defined, else `'OFF'`"
state_on:
  description: The payload that represents the `on` state. Used when value that represents `on` state in the `state_topic` is different from value that should be sent to the `command_topic` to turn the device `on`.
  required: false
  type: string
  default: "`payload_on` if defined, else `'ON'`"
state_topic:
  description: "The MQTT topic subscribed to receive state updates. The state update may be either JSON or a simple string. When a JSON payload is detected, the `state` value of the JSON payload should supply the `payload_on` or `payload_off` defined payload to turn the siren on or off. Additionally, the state attributes `duration`, `tone` and `volume_level` can be updated. Use `value_template` to transform the received state update to a compliant JSON payload. Attributes will only be set if the function is supported by the device and a valid value is supplied. When a non JSON payload is detected, it should be either of the `payload_on` or `payload_off` defined payloads or `None` to reset the siren's state to `unknown`. The initial state will be `unknown`. The state will be reset to `unknown` if a `None` payload or `null` JSON value is received as a state update."
  required: false
  type: string
state_value_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract device's state from the `state_topic`. To determine the siren's state result of this template will be compared to `state_on` and `state_off`. Alternatively `value_template` can be used to render to a valid JSON payload."
  required: false
  type: template
support_duration:
  description: Set to `true` if the MQTT siren supports the `duration` turn on action parameter and enables the `duration` state attribute.
  required: false
  type: boolean
  default: true
support_volume_set:
  description: Set to `true` if the MQTT siren supports the `volume_set` turn on action parameter and enables the `volume_level` state attribute.
  required: false
  type: boolean
  default: true
unique_id:
  description: An ID that uniquely identifies this siren device. If two sirens have the same unique ID, Home Assistant will raise an exception. Required when used with device-based discovery.
  required: false
  type: string
{% endconfiguration %}

{% important %}
Make sure that your topic matches exactly. `some-topic/` and `some-topic` are different topics.
{% endimportant %}

## Examples

In this section, you will find an example of how to use this siren platform.

### Full configuration

The example below shows a full configuration for a siren.

{% raw %}

```yaml
# Example configuration.yaml entry
mqtt:
  - siren:
      unique_id: custom_siren
      name: "Intrusion siren"
      state_topic: "home/alarm/siren1"
      command_topic: "home/alarm/siren1/set"
      available_tones:
        - ping
        - siren
      availability:
        - topic: "home/alarm/siren1/available"
      payload_on: "ON"
      payload_off: "OFF"
      state_on: "ON"
      state_off: "OFF"
      optimistic: false
      qos: 0
      retain: true
```

{% endraw %}

### On/Off only siren controlling a Tasmota relay

The example below shows a configuration for an On/Off type siren, which does not accept JSON commands.

{% raw %}

```yaml
# Example configuration.yaml entry
mqtt:
  - siren:
      unique_id: tasmota_siren
      name: "garage"
      state_topic: "stat/SIREN/RESULT"
      command_topic: "cmnd/SIREN/POWER"
      availability_topic: "tele/SIREN/LWT"
      command_template: "{{ value }}"
      state_value_template: "{{ value_json.POWER }}"
      payload_on: "ON"
      payload_off: "OFF"
      payload_available: "Online"
      payload_not_available: "Offline"
```

{% endraw %}

For a check, you can use the command line tools `mosquitto_pub` shipped with `mosquitto` to send MQTT messages. This allows you to operate your siren manually:

```bash
mosquitto_pub -h 127.0.0.1 -t home/alarm/siren1 -m "ON"
```
