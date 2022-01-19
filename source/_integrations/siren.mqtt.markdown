---
title: "MQTT Siren"
description: "Instructions on how to integrate MQTT sirens into Home Assistant."
ha_category:
  - Siren
ha_release: 2022.2
ha_iot_class: Configurable
ha_domain: mqtt
---

The `mqtt` siren platform lets you control your MQTT enabled sirens and text based notification devices.

## Configuration

In an ideal scenario, the MQTT device will have a `state_topic` to publish state changes. If these messages are published with a `RETAIN` flag, the MQTT siren will receive an instant state update after subscription, and will start with the correct state. Otherwise, the initial state of the siren will be `false` / `off`.

When a `state_topic` is not available, the siren will work in optimistic mode. In this mode, the siren will immediately change state after every command. Otherwise, the siren will wait for state confirmation from the device (message from `state_topic`).

Optimistic mode can be forced, even if the `state_topic` is available. Try to enable it, if experiencing incorrect operation.

The MQTT siren platform has a built-in integration with the notify platform. If `message_command_topic` is configured the siren platform will also setup the MQTT notify platform. The `{service_name}` is derived from `target`, or if `target` is not configured from `name` and will finally fallback to `message_command_topic`. Invalid characters in the service name will be removed. For each siren entity that is set up with `message_command_topic` a notify service is registered with name `notify.mqtt_{service_name}`.

Additional there is a common service `notify.mqtt`. This service can be called using the `target` attribute that takes a list of siren targets that should be notified. The following target naming is supported:

- The value configured with `message_command_topic` (the `target_id`).
- The value configured with `target` or `name`.
- The derived `{service_name}`.

To enable this siren in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
siren:
  - platform: mqtt
    command_topic: "home/bedroom/siren/set"
    message_command_topic: "home/bedroom/siren/notify_set"
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
      description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract device's availability from the `topic`. To determine the devices's availability result of this template will be compared to `payload_available` and `payload_not_available`."
      required: false
      type: template
availability_mode:
  description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
  required: false
  type: string
  default: latest
availability_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract device's availability from the `availability_topic`. To determine the devices's availability result of this template will be compared to `payload_available` and `payload_not_available`."
  required: false
  type: template
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates. Must not be used together with `availability`.
  required: false
  type: string
available_tones:
  description: A list of available tones the siren supports. Works together with `tone_command_topic`.
  required: false
  type: list
command_template:
  description: Defines a [template](/docs/configuration/templating/#processing-incoming-data) to generate the payload to send to `command_topic`. The siren turn on service parameters `tone`, `volume_level` or `duration` can be used as variables in the template.
  required: false
  type: template
command_off_template:
  description: Defines a [template](/docs/configuration/templating/#processing-incoming-data) to generate the payload to send to `command_topic` when the siren turn off service is called. By default `command_template` will be used as template for service turn off.
  required: false
  type: template
command_topic:
  description: The MQTT topic to publish commands to change the siren state.
  required: false
  type: string
device:
  description: "Information about the device this siren is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works through [MQTT discovery](/docs/mqtt/discovery/) and when [`unique_id`](#unique_id) is set. At least one of identifiers or connections must be present to identify the device."
  required: false
  type: map
  keys:
    configuration_url:
      description: 'A link to the webpage that can manage the configuration of this device. Can be either an HTTP or HTTPS link.'
      required: false
      type: string
    connections:
      description: 'A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `"connections": [["mac", "02:5b:26:a8:dc:12"]]`.'
      required: false
      type: list
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
    name:
      description: The name of the device.
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
duration_command_template:
  description: Defines a [template](/docs/configuration/templating/#processing-incoming-data) to generate the payload to send to `duration_command_topic`. The variable `value` holds value of the `duration` parameter. The siren turn on service parameters `tone`, `volume_level` or `duration` can also be used as variables in the template.
  required: false
  type: template
duration_command_topic:
  description: The MQTT topic to publish commands to change the siren's duration if a `duration` parameter is supplied with the siren turn on service.
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
  default: None
icon:
  description: "[Icon](/docs/configuration/customizing-devices/#icon) for the entity."
  required: false
  type: icon
json_attributes_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the JSON dictionary from messages received on the `json_attributes_topic`. Usage example can be found in [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-template-configuration) documentation."
  required: false
  type: template
json_attributes_topic:
  description: The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes. Usage example can be found in [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-topic-configuration) documentation.
  required: false
  type: string
message_command_template:
  description: Defines a [template](/docs/configuration/templating/#processing-incoming-data) to generate the payload to send to `message_command_topic`. The notify service parameters `message`, `name` (is `target` or `name`), `target_id` (is `message_command_topic`) and `title` can be used as variables in the template. Additional variables can be added by supplying them as a `dict` to the  `data` service parameter.
  required: false
  type: template
message_command_topic:
  description: The MQTT topic to publish a message sent thought to notify service. If `message_command_topic` is configured the siren will automatically register a notify service for the siren. The `target` for this siren can also be used when calling the the generic `notify.mqtt` service with the `target` parameter. The `message_command_topic` will be used as `target_id` as well and can also be used as `target` parameter when calling the the generic `notify.mqtt` service.
  required: false
  type: string
name:
  description: The name to use when displaying this siren.
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
qos:
  description: The maximum QoS level of the state topic. Default is 0 and will also be used to publishing messages.
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
  default: "`payload_off` if defined, else OFF"
state_on:
  description: The payload that represents the `on` state. Used when value that represents `on` state in the `state_topic` is different from value that should be sent to the `command_topic` to turn the device `on`.
  required: false
  type: string
  default: "`payload_on` if defined, else ON"
state_topic:
  description: The MQTT topic subscribed to receive state updates.
  required: false
  type: string
supported_duration:
  description: Set to `true` if the MQTT siren supports the `duration` service turn on parameter.
  required: false
  type: boolean
  default: true
supported_turn_on:
  description: Set to `true` if the MQTT siren supports the siren turn on service.
  required: false
  type: boolean
  default: true
supported_turn_off:
  description: Set to `true` if the MQTT siren supports the siren turn off service.
  required: false
  type: boolean
  default: true
supported_volume_set:
  description: Set to `true` if the MQTT siren supports the `volume_set` service turn on parameter.
  required: false
  type: boolean
  default: true
target:
  description: If `message_command_topic` is configured a notify service will be configured. The `target` will be used to derive the notify service name. E.g. a target name `beer` will register `notify.mqtt_beer`. Invalid service name characters will be replaced automatically. The `target` name can also be used as a parameter when calling service `notify.mqtt`. If `target` is not configured `name` will be used as target name. If `name` is not configured either `message_command_topic` will be used as target name.
  required: false
  type: string
title:
  description: The default `title` to be used in `message_command_template` as a variable. If `title` is supplied as parameter with a notify service call, then the parameter will replace the `title` configuration option.
  required: false
  type: string
  default: "Home Assistant"
tone_command_template:
  description: Defines a [template](/docs/configuration/templating/#processing-incoming-data) to generate the payload to send to `tone_command_topic`. The variable `value` holds value of the `tone` parameter. The siren turn on service parameters `tone`, `volume_level` or `duration` can be used as variables in the template.
  required: false
  type: template
tone_command_topic:
  description: The MQTT topic to publish commands to change the siren's tone if a `tone` parameter is supplied with the siren turn on service. The configuration parameter `available_tones` must be configured together with `tone_command_topic`.
  required: false
  type: string
unique_id:
  description: An ID that uniquely identifies this siren device. If two sirens have the same unique ID, Home Assistant will raise an exception.
  required: false
  type: string
value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract device's state from the `state_topic`. To determine the siren's state result of this template will be compared to `state_on` and `state_off`."
  required: false
  type: string
volume_command_template:
  description: Defines a [template](/docs/configuration/templating/#processing-incoming-data) to generate the payload to send to `volume_command_topic`. The variable `value` holds value of the `volume_level` parameter. The siren turn on service parameters `tone`, `volume_level` or `duration` can be used as variables in the template.
  required: false
  type: template
volume_command_topic:
  description: The MQTT topic to publish commands to change the siren's volume level if a `volume_level` parameter is supplied with the siren turn on service.
  required: false
  type: string
{% endconfiguration %}

<div class='note warning'>

Make sure that your topic matches exactly. `some-topic/` and `some-topic` are different topics.

</div>

## Examples

In this section, you will find some real-life examples of how to use this sensor.

### Full configuration

The example below shows a full configuration for a siren.

{% raw %}

```yaml
# Example configuration.yaml entry
siren:
  - platform: mqtt
    unique_id: custom_siren
    name: "Intrusion siren"
    state_topic: "home/alarm/siren1"
    command_topic: "home/alarm/siren1/set"
    tone_command_topic: "home/alarm/siren1/tone_set"
    available_tones:
      - ping
      - siren
    duration_command_topic: "home/alarm/siren1/duration_set"
    volume_command_topic: "home/alarm/siren1/volume_set"
    message_command_topic: "home/alarm/siren1/message_set"
    message_command_template: "{{ title }}: {{ message }}"
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

For a check, you can use the command line tools `mosquitto_pub` shipped with `mosquitto` to send MQTT messages. This allows you to operate your siren manually:

```bash
mosquitto_pub -h 127.0.0.1 -t home/alarm/siren1 -m "ON"
```
