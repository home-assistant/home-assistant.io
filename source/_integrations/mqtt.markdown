---
title: MQTT
description: Instructions on how to setup MQTT within Home Assistant.
ha_category:
  - Hub
  - Alarm
  - Binary Sensor
  - Camera
  - Climate
  - Cover
  - Presence Detection
  - Device Automation
  - Fan
  - Light
  - Lock
  - Number
  - Other
  - Scene
  - Sensor
  - Switch
  - Tag Scanner
  - Vacuum
featured: true
ha_release: pre 0.7
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@emontnemery'
ha_domain: mqtt
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - camera
  - climate
  - cover
  - device_tracker
  - fan
  - lock
  - sensor
  - switch
---

MQTT (aka MQ Telemetry Transport) is a machine-to-machine or "Internet of Things" connectivity protocol on top of TCP/IP. It allows extremely lightweight publish/subscribe messaging transport.

There is currently support for the following device types within Home Assistant:

- [Alarm Control Panel](#alarm-control-panel)
- [Binary Sensor](#binary-sensor)
- [Camera](#camera)
- [Climate](#climate)
- [Cover](#cover)
- [Device Tracker](#device-tracker)
- [Device Trigger](#device-trigger)
- [Eventstream](#eventstream)
- [Fan](#fan)
- [JSON](#json)
- [Light](#light)
- [Lock](#lock)
- [Manual Alarm](#manual-alarm)
- [Number](#number)
- [Room Presence](#room-presence)
- [Scene](#scene)
- [Sensor](#sensor)
- [Statestream](#statestream)
- [Switch](#switch)
- [Tag Scanner](#tag-scanner)
- [Vacuum](#vacuum)


Your first step to get MQTT and Home Assistant working is to choose a [broker](/docs/mqtt/broker).

{% include integrations/config_flow.md %}

## Manual configuration

Alternatively, if you want to manually configure MQTT, you will need to add the following to your `configuration.yaml` file.

To connect to your [own MQTT broker](/docs/mqtt/broker#run-your-own):

```yaml
# Example configuration.yaml entry
mqtt:
  broker: IP_ADDRESS_BROKER
```

## Additional features

- [Certificate](/docs/mqtt/certificate/)
- [Discovery](/docs/mqtt/discovery/)
- [Publish & Dump services](/docs/mqtt/service/)
- [Birth and last will messages](/docs/mqtt/birth_will/)
- [Testing your setup](/docs/mqtt/testing/)
- [Logging](/docs/mqtt/logging/)

## Alarm Control Panel

The `mqtt` alarm panel platform enables the possibility to control MQTT capable alarm panels. The Alarm icon will change state after receiving a new state from `state_topic`. If these messages are published with *RETAIN* flag, the MQTT alarm panel will receive an instant state update after subscription and will start with the correct state. Otherwise, the initial state will be `unknown`.

The integration will accept the following states from your Alarm Panel (in lower case):

- `disarmed`
- `armed_home`
- `armed_away`
- `armed_night`
- `armed_custom_bypass`
- `pending`
- `triggered`
- `arming`
- `disarming`

The integration can control your Alarm Panel by publishing to the `command_topic` when a user interacts with the Home Assistant frontend.

### Configuration

To enable this platform, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  - platform: mqtt
    state_topic: "home/alarm"
    command_topic: "home/alarm/set"
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
availability_mode:
  description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
  required: false
  type: string
  default: latest
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates. Must not be used together with `availability`.
  required: false
  type: string
code:
  description: If defined, specifies a code to enable or disable the alarm in the frontend.
  required: false
  type: string
code_arm_required:
  description: If true the code is required to arm the alarm. If false the code is not validated.
  required: false
  type: boolean
  default: true
code_disarm_required:
  description: If true the code is required to disarm the alarm. If false the code is not validated.
  required: false
  type: boolean
  default: true
command_template:
  description: "The [template](/docs/configuration/templating/#processing-incoming-data) used for the command payload. Available variables: `action` and `code`."
  required: false
  type: string
  default: action
command_topic:
  description: The MQTT topic to publish commands to change the alarm state.
  required: true
  type: string
device:
  description: "Information about the device this alarm panel is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works through [MQTT discovery](/docs/mqtt/discovery/) and when [`unique_id`](#unique_id) is set."
  required: false
  type: map
  keys:
    connections:
      description: 'A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `"connections": [["mac", "02:5b:26:a8:dc:12"]]`.'
      required: false
      type: list
    identifiers:
      description: "A list of IDs that uniquely identify the device. For example a serial number."
      required: false
      type: [list, string]
    manufacturer:
      description: "The manufacturer of the device."
      required: false
      type: string
    model:
      description: "The model of the device."
      required: false
      type: string
    name:
      description: "The name of the device."
      required: false
      type: string
    sw_version:
      description: "The firmware version of the device."
      required: false
      type: string
    via_device:
      description: "Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device. This is used to show device topology in Home Assistant."
      required: false
      type: string
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
name:
  description: The name of the alarm.
  required: false
  type: string
  default: MQTT Alarm
payload_arm_away:
  description: The payload to set armed-away mode on your Alarm Panel.
  required: false
  type: string
  default: ARM_AWAY
payload_arm_home:
  description: The payload to set armed-home mode on your Alarm Panel.
  required: false
  type: string
  default: ARM_HOME
payload_arm_night:
  description: The payload to set armed-night mode on your Alarm Panel.
  required: false
  type: string
  default: ARM_NIGHT
payload_arm_custom_bypass:
  description: The payload to set armed-custom-bypass mode on your Alarm Panel.
  required: false
  type: string
  default: ARM_CUSTOM_BYPASS
payload_available:
  description: The payload that represents the available state.
  required: false
  type: string
  default: online
payload_disarm:
  description: The payload to disarm your Alarm Panel.
  required: false
  type: string
  default: DISARM
payload_not_available:
  description: The payload that represents the unavailable state.
  required: false
  type: string
  default: offline
qos:
  description: The maximum QoS level of the state topic.
  required: false
  type: integer
  default: 0
retain:
  description: If the published message should have the retain flag on or not.
  required: false
  type: boolean
  default: false
state_topic:
  description: The MQTT topic subscribed to receive state updates.
  required: true
  type: string
unique_id:
   description: An ID that uniquely identifies this alarm panel. If two alarm panels have the same unique ID, Home Assistant will raise an exception.
   required: false
   type: string
value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the value."
  required: false
  type: template
{% endconfiguration %}

## Binary Sensor

The `mqtt` binary sensor platform uses an MQTT message received to set the binary sensor's state to `on` or `off`.

The state will be updated only after a new message is published on `state_topic` matching `payload_on` or `payload_off`. If these messages are published with the `retain` flag set,
the binary sensor will receive an instant state update after subscription and Home Assistant will display the correct state on startup.
Otherwise, the initial state displayed in Home Assistant will be `unknown`.

Stateless devices such as buttons, remote controls etc are better represented by [MQTT device triggers](/integrations/device_trigger.mqtt/) than by binary sensors.

### Configuration

The `mqtt` binary sensor platform optionally supports a list of  `availability` topics to receive online and offline messages (birth and LWT messages) from the MQTT device. During normal operation, if the MQTT sensor device goes offline (i.e., publishes `payload_not_available` to an `availability` topic), Home Assistant will display the binary sensor as `unavailable`. If these messages are published with the `retain` flag set, the binary sensor will receive an instant update after subscription and Home Assistant will display the correct availability state of the binary sensor when Home Assistant starts up. If the `retain` flag is not set, Home Assistant will display the binary sensor as `unavailable` when Home Assistant starts up. If no `availability` topic is defined, Home Assistant will consider the MQTT device to be `available` and will display its state.

To use an MQTT binary sensor in your installation,
add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: mqtt
    state_topic: "home-assistant/window/contact"
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
availability_mode:
  description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
  required: false
  type: string
  default: latest
availability_topic:
  description: "The MQTT topic subscribed to receive birth and LWT messages from the MQTT device. If `availability` is not defined, the binary sensor will always be considered `available` and its state will be `on`, `off` or `unknown`. If `availability` is defined, the binary sensor will be considered as `unavailable` by default and the sensor's initial state will be `unavailable`. Must not be used together with `availability`."
  required: false
  type: string
device:
  description: "Information about the device this binary sensor is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works through [MQTT discovery](/docs/mqtt/discovery/) and when [`unique_id`](#unique_id) is set."
  required: false
  type: map
  keys:
    connections:
      description: "A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `'connections': ['mac', '02:5b:26:a8:dc:12']`."
      required: false
      type: [list, map]
    identifiers:
      description: A list of IDs that uniquely identify the device. For example a serial number.
      required: false
      type: [list, string]
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
    sw_version:
      description: The firmware version of the device.
      required: false
      type: string
    via_device:
      description: 'Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device. This is used to show device topology in Home Assistant.'
      required: false
      type: string
device_class:
  description: Sets the [class of the device](/integrations/binary_sensor/#device-class), changing the device state and icon that is displayed on the frontend.
  required: false
  type: string
expire_after:
  description: Defines the number of seconds after the sensor's state expires, if it's not updated. After expiry, the sensor's state becomes `unavailable`.
  required: false
  type: integer
force_update:
  description: Sends update events (which results in update of [state object](/docs/configuration/state_object/)'s `last_changed`) even if the sensor's state hasn't changed. Useful if you want to have meaningful value graphs in history or want to create an automation that triggers on *every* incoming state message (not only when the sensor's new state is different to the current one).
  required: false
  type: boolean
  default: false
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
name:
  description: The name of the binary sensor.
  required: false
  type: string
  default: MQTT Binary Sensor
off_delay:
  description: "For sensors that only send `on` state updates (like PIRs), this variable sets a delay in seconds after which the sensor's state will be updated back to `off`."
  required: false
  type: integer
payload_available:
  description: The string that represents the `online` state.
  required: false
  type: string
  default: online
payload_not_available:
  description: The string that represents the `offline` state.
  required: false
  type: string
  default: offline
payload_off:
  description: The string that represents the `off` state. It will be compared to the message in the `state_topic` (see `value_template` for details)
  required: false
  type: string
  default: "OFF"
payload_on:
  description: The string that represents the `on` state. It will be compared to the message in the `state_topic` (see `value_template` for details)
  required: false
  type: string
  default: "ON"
qos:
  description: The maximum QoS level to be used when receiving messages.
  required: false
  type: integer
  default: 0
state_topic:
  description: The MQTT topic subscribed to receive sensor's state.
  required: true
  type: string
unique_id:
  description: An ID that uniquely identifies this sensor. If two sensors have the same unique ID, Home Assistant will raise an exception.
  required: false
  type: string
value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) that returns a string to be compared to `payload_on`/`payload_off` or an empty string, in which case the MQTT message will be removed. Available variables: `entity_id`. Remove this option when 'payload_on' and 'payload_off' are sufficient to match your payloads (i.e no pre-processing of original message is required)."
  required: false
  type: string
{% endconfiguration %}

### Examples

In this section, you will find some real-life examples of how to use this sensor.

### Full configuration with JSON data

This is an example of a configuration where the state is extracted from a JSON formatted MQTT message.
To test, you can use the command line tool `mosquitto_pub` shipped with `mosquitto` or the `mosquitto-clients` package to send MQTT messages.

To set the state of the binary sensor manually:

```bash
mosquitto_pub -h 127.0.0.1 -t home-assistant/window/availability -m "online"
mosquitto_pub -h 127.0.0.1 -t home-assistant/window/contact -m '{"state":"ON"}'
mosquitto_pub -h 127.0.0.1 -t home-assistant/window/contact -m '{"state":"OFF"}'
```

The example below shows a full configuration for a binary sensor:

{% raw %}

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: mqtt
    name: "Window Contact Sensor"
    state_topic: "home-assistant/window/contact"
    payload_on: "ON"
    availability:
      - topic: "home-assistant/window/availability"
        payload_available: "online"
        payload_not_available: "offline"
    qos: 0
    device_class: opening
    value_template: "{{ value_json.state }}"
```

{% endraw %}

#### Toggle the binary sensor each time a message is received on state_topic

{% raw %}

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: mqtt
    state_topic: "lab_button/cmnd/POWER"
    value_template: "{%if is_state(entity_id,\"on\")-%}OFF{%-else-%}ON{%-endif%}"
```

{% endraw %}

### Get the state of a device with ESPEasy

Assuming that you have flashed your ESP8266 unit with [ESPEasy](https://github.com/letscontrolit/ESPEasy). Under "Config" is a name ("Unit Name:") set for your device (here it's "bathroom"). A configuration for a "Controller" for MQTT with the protocol "OpenHAB MQTT" is present and the entries ("Controller Subscribe:" and "Controller Publish:") are adjusted to match your needs. In this example, the topics are prefixed with "home". Also, add a "Switch Input" in the "Devices" tap with the name "switch" and "button" as value.

As soon as the unit is online, you will get the state of the attached button.

```txt
home/bathroom/status Connected
...
home/bathroom/switch/button 1
```

The configuration will look like the example below:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: mqtt
    name: Bathroom
    state_topic: "home/bathroom/switch/button"
    payload_on: "1"
    payload_off: "0"
```

## Camera

The `mqtt` camera platform allows you to integrate the content of an image file sent through MQTT into Home Assistant as a camera. Every time a message under the `topic` in the configuration is received, the image displayed in Home Assistant will also be updated.

This can be used with an application or a service capable of sending images through MQTT.

### Configuration

To enable this camera in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: mqtt
    topic: zanzito/shared_locations/my-device
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
availability_mode:
  description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
  required: false
  type: string
  default: latest
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates. Must not be used together with `availability`.
  required: false
  type: string
device:
  description: "Information about the device this camera is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works through [MQTT discovery](/docs/mqtt/discovery/) and when [`unique_id`](#unique_id) is set."
  required: false
  type: map
  keys:
    connections:
      description: 'A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `"connections": ["mac", "02:5b:26:a8:dc:12"]`.'
      required: false
      type: list
    identifiers:
      description: 'A list of IDs that uniquely identify the device. For example a serial number.'
      required: false
      type: [list, string]
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
    sw_version:
      description: The firmware version of the device.
      required: false
      type: string
    via_device:
      description: 'Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device. This is used to show device topology in Home Assistant.'
      required: false
      type: string
icon:
  description: "[Icon](/docs/configuration/customizing-devices/#icon) for the entity."
  required: false
  type: icon
json_attributes_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the JSON dictionary from messages received on the `json_attributes_topic`."
  required: false
  type: template
json_attributes_topic:
  description: The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes. Implies `force_update` of the current sensor state when a message is received on this topic.
  required: false
  type: string
name:
  description: The name of the camera.
  required: false
  type: string
topic:
  description: The MQTT topic to subscribe to.
  required: true
  type: string
unique_id:
  description: An ID that uniquely identifies this camera. If two cameras have the same unique ID Home Assistant will raise an exception.
  required: false
  type: string
{% endconfiguration %}

## Climate

The `mqtt` climate platform lets you control your MQTT enabled HVAC devices.

### Configuration

To enable this climate platform in your installation, first add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
climate:
  - platform: mqtt
```

{% configuration %}
action_template:
  description: A template to render the value received on the `action_topic` with.
  required: false
  type: template
action_topic:
  description: >-
    The MQTT topic to subscribe for changes of the current action. If this is set, the climate graph uses the value received as data source.
    Valid values: `off`, `heating`, `cooling`, `drying`, `idle`, `fan`.
  required: false
  type: string
aux_command_topic:
  description: The MQTT topic to publish commands to switch auxiliary heat.
  required: false
  type: string
aux_state_template:
  description: A template to render the value received on the `aux_state_topic` with.
  required: false
  type: template
aux_state_topic:
  description: The MQTT topic to subscribe for changes of the auxiliary heat mode. If this is not set, the auxiliary heat mode works in optimistic mode (see below).
  required: false
  type: string
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
availability_mode:
  description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
  required: false
  type: string
  default: latest
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates. Must not be used together with `availability`.
  required: false
  type: string
away_mode_command_topic:
  description: The MQTT topic to publish commands to change the away mode.
  required: false
  type: string
away_mode_state_template:
  description: A template to render the value received on the `away_mode_state_topic` with.
  required: false
  type: template
away_mode_state_topic:
  description: The MQTT topic to subscribe for changes of the HVAC away mode. If this is not set, the away mode works in optimistic mode (see below).
  required: false
  type: string
current_temperature_template:
  description: A template with which the value received on `current_temperature_topic` will be rendered.
  required: false
  type: template
current_temperature_topic:
  description: The MQTT topic on which to listen for the current temperature.
  required: false
  type: string
device:
  description: 'Information about the device this HVAC device is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works through [MQTT discovery](/docs/mqtt/discovery/) and when [`unique_id`](#unique_id) is set.'
  required: false
  type: map
  keys:
    connections:
      description: 'A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `"connections": [["mac", "02:5b:26:a8:dc:12"]]`.'
      required: false
      type: list
    identifiers:
      description: 'A list of IDs that uniquely identify the device. For example a serial number.'
      required: false
      type: [list, string]
    manufacturer:
      description: 'The manufacturer of the device.'
      required: false
      type: string
    model:
      description: 'The model of the device.'
      required: false
      type: string
    name:
      description: 'The name of the device.'
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
fan_mode_command_template:
  description: A template to render the value sent to the `fan_mode_command_topic` with.
  required: false
  type: template
fan_mode_command_topic:
  description: The MQTT topic to publish commands to change the fan mode.
  required: false
  type: string
fan_mode_state_template:
  description: A template to render the value received on the `fan_mode_state_topic` with.
  required: false
  type: template
fan_mode_state_topic:
  description: The MQTT topic to subscribe for changes of the HVAC fan mode. If this is not set, the fan mode works in optimistic mode (see below).
  required: false
  type: string
fan_modes:
  description: A list of supported fan modes.
  required: false
  default: ['auto', 'low', 'medium', 'high']
  type: list
hold_command_template:
  description: A template to render the value sent to the `hold_command_topic` with.
  required: false
  type: template
hold_command_topic:
  description: The MQTT topic to publish commands to change the hold mode.
  required: false
  type: string
hold_state_template:
  description: A template to render the value received on the `hold_state_topic` with.
  required: false
  type: template
hold_state_topic:
  description: The MQTT topic to subscribe for changes of the HVAC hold mode. If this is not set, the hold mode works in optimistic mode (see below).
  required: false
  type: string
hold_modes:
  description: A list of available hold modes.
  required: false
  type: list
initial:
  description: Set the initial target temperature.
  required: false
  type: integer
  default: 21
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
max_temp:
  description: Maximum set point available.
  type: float
  required: false
min_temp:
  description: Minimum set point available.
  type: float
  required: false
mode_command_template:
  description: A template to render the value sent to the `mode_command_topic` with.
  required: false
  type: template
mode_command_topic:
  description: The MQTT topic to publish commands to change the HVAC operation mode.
  required: false
  type: string
mode_state_template:
  description: A template to render the value received on the `mode_state_topic` with.
  required: false
  type: template
mode_state_topic:
  description: The MQTT topic to subscribe for changes of the HVAC operation mode. If this is not set, the operation mode works in optimistic mode (see below).
  required: false
  type: string
modes:
  description: A list of supported modes. Needs to be a subset of the default values.
  required: false
  default: ['auto', 'off', 'cool', 'heat', 'dry', 'fan_only']
  type: list
name:
  description: The name of the HVAC.
  required: false
  type: string
  default: MQTT HVAC
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
  description: The payload that represents disabled state.
  required: false
  type: string
  default: "OFF"
payload_on:
  description: The payload that represents enabled state.
  required: false
  type: string
  default: "ON"
power_command_topic:
  description: The MQTT topic to publish commands to change the power state. This is useful if your device has a separate power toggle in addition to mode.
  required: false
  type: string
precision:
  description: The desired precision for this device. Can be used to match your actual thermostat's precision. Supported values are `0.1`, `0.5` and `1.0`.
  required: false
  type: float
  default: 0.1 for Celsius and 1.0 for Fahrenheit.
qos:
  description: The maximum QoS level to be used when receiving and publishing messages.
  required: false
  type: integer
  default: 0
retain:
  description: Defines if published messages should have the retain flag set.
  required: false
  type: boolean
  default: false
send_if_off:
  description: "Set to `false` to suppress sending of all MQTT messages when the current mode is `Off`."
  required: false
  type: boolean
  default: true
swing_mode_command_template:
  description: A template to render the value sent to the `swing_mode_command_topic` with.
  required: false
  type: template
swing_mode_command_topic:
  description: The MQTT topic to publish commands to change the swing mode.
  required: false
  type: string
swing_mode_state_template:
  description: A template to render the value received on the `swing_mode_state_topic` with.
  required: false
  type: template
swing_mode_state_topic:
  description: The MQTT topic to subscribe for changes of the HVAC swing mode. If this is not set, the swing mode works in optimistic mode (see below).
  required: false
  type: string
swing_modes:
  description: A list of supported swing modes.
  required: false
  default: ['on', 'off']
  type: list
temperature_command_template:
  description: A template to render the value sent to the `temperature_command_topic` with.
  required: false
  type: template
temperature_command_topic:
  description: The MQTT topic to publish commands to change the target temperature.
  required: false
  type: string
temperature_high_command_template:
  description: A template to render the value sent to the `temperature_high_command_topic` with.
  required: false
  type: template
temperature_high_command_topic:
  description: The MQTT topic to publish commands to change the high target temperature.
  required: false
  type: string
temperature_high_state_template:
  description: A template to render the value received on the `temperature_high_state_topic` with.
  required: false
  type: template
temperature_high_state_topic:
  description: The MQTT topic to subscribe for changes in the target high temperature. If this is not set, the target high temperature works in optimistic mode (see below).
  required: false
  type: string
temperature_low_command_template:
  description: A template to render the value sent to the `temperature_low_command_topic` with.
  required: false
  type: template
temperature_low_command_topic:
  description: The MQTT topic to publish commands to change the target low temperature.
  required: false
  type: string
temperature_low_state_template:
  description: A template to render the value received on the `temperature_low_state_topic` with.
  required: false
  type: template
temperature_low_state_topic:
  description: The MQTT topic to subscribe for changes in the target low temperature. If this is not set, the target low temperature works in optimistic mode (see below).
  required: false
  type: string
temperature_state_template:
  description: A template to render the value received on the `temperature_state_topic` with.
  required: false
  type: template
temperature_state_topic:
  description: The MQTT topic to subscribe for changes in the target temperature. If this is not set, the target temperature works in optimistic mode (see below).
  required: false
  type: string
temperature_unit:
  description: Defines the temperature unit of the device, `C` or `F`. If this is not set, the temperature unit is set to the system temperature unit.
  required: false
  type: string
temp_step:
  description: Step size for temperature set point.
  type: float
  required: false
  default: 1
unique_id:
   description: An ID that uniquely identifies this HVAC device. If two HVAC devices have the same unique ID, Home Assistant will raise an exception.
   required: false
   type: string
value_template:
  description: Default template to render the payloads on *all* `*_state_topic`s with.
  type: template
  required: false
{% endconfiguration %}

#### Optimistic mode

If a property works in *optimistic mode* (when the corresponding state topic is not set), Home Assistant will assume that any state changes published to the command topics did work and change the internal state of the entity immediately after publishing to the command topic. If it does not work in optimistic mode, the internal state of the entity is only updated when the requested update is confirmed by the device through the state topic.

#### Using Templates

For all `*_state_topic`s, a template can be specified that will be used to render the incoming payloads on these topics. Also, a default template that applies to all state topis can be specified as `value_template`. This can be useful if you received payloads are e.g., in JSON format. Since in JSON, a quoted string (e.g., `"foo"`) is just a string, this can also be used for unquoting.

Say you receive the operation mode `"auto"` via your `mode_state_topic`, but the mode is actually called just `auto`, here's what you could do:

{% raw %}

```yaml
climate:
  - platform: mqtt
    name: Study
    modes:
      - "off"
      - "heat"
      - "auto"
    mode_command_topic: "study/ac/mode/set"
    mode_state_topic: "study/ac/mode/state"
    mode_state_template: "{{ value_json }}"
```

{% endraw %}

This will parse the incoming `"auto"` as JSON, resulting in `auto`. Obviously, in this case you could also just set `value_template: {% raw %}"{{ value_json }}"{% endraw %}`.

Similarly for `*_command_topic`s, a template can be specified to render the outgoing payloads on these topics.

### Example

A full configuration example looks like the one below.

```yaml
# Full example configuration.yaml entry
climate:
  - platform: mqtt
    name: Study
    modes:
      - "off"
      - "cool"
      - "fan_only"
    swing_modes:
      - "on"
      - "off"
    fan_modes:
      - "high"
      - "medium"
      - "low"
    power_command_topic: "study/ac/power/set"
    mode_command_topic: "study/ac/mode/set"
    temperature_command_topic: "study/ac/temperature/set"
    fan_mode_command_topic: "study/ac/fan/set"
    swing_mode_command_topic: "study/ac/swing/set"
    precision: 1.0
```

## Cover

The `mqtt` cover platform allows you to control an MQTT cover (such as blinds, a roller shutter or a garage door).

### Configuration

A cover entity can be in states (`open`, `opening`, `closed` or `closing`).

If a `state_topic` is configured, the entity's state will be updated only after an MQTT message is received on `state_topic` matching `state_open`, `state_opening`, `state_closed` or `state_closing`. For covers that only report 3 states (`opening`, `closing`, `stopped`), a `state_stopped` state can be configured to indicate that the device is not moving. When this payload is received on the `state_topic`, and a `position_topic` is not configured, the cover will be set to state `closed` if its state was `closing` and to state `open` otherwise. If a `position_topic` is set, the cover's position will be used to set the state to either `open` or `closed` state.

If the cover reports its position, a `position_topic` can be configured for receiving the position. If no `state_topic` is configured, the cover's state will be set to either `open` or `closed` when a position is received.

If the cover reports its tilt position, a `tilt_status_topic` can be configured for receiving the tilt position.
If position topic and state topic are both defined, the device state (`open`, `opening`, `closed` or `closing`) will be set by the state topic and the cover position will be set by the position topic.

If neither a state topic nor a position topic are defined, the cover will work in optimistic mode. In this mode, the cover will immediately change state (`open` or `closed`) after every command sent by Home Assistant. If a state topic/position topic is defined, the cover will wait for a message on `state_topic` or `position_topic`.

Optimistic mode can be forced, even if a `state_topic` / `position_topic` is defined. Try to enable it if experiencing incorrect cover operation (Google Assistant gauge may need optimistic mode as it often send request to your Home Assistant immediately after send set_cover_position in which case MQTT could be too slow).

The `mqtt` cover platform optionally supports a list of `availability` topics to receive online and offline messages (birth and LWT messages) from the MQTT cover device. During normal operation, if the MQTT cover device goes offline (i.e., publishes a matching `payload_not_available` to any `availability` topic), Home Assistant will display the cover as "unavailable". If these messages are published with the `retain` flag set, the cover will receive an instant update after subscription and Home Assistant will display correct availability state of the cover when Home Assistant starts up. If the `retain` flag is not set, Home Assistant will display the cover as "unavailable" when Home Assistant starts up.

To use your MQTT cover in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
cover:
  - platform: mqtt
    command_topic: "home-assistant/cover/set"
```

{% configuration %}
availability:
  description: "A list of MQTT topics subscribed to receive availability (online/offline) updates. Must not be used together with `availability_topic`."
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
availability_mode:
  description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
  required: false
  type: string
  default: latest
availability_topic:
  description: "The MQTT topic subscribed to to receive birth and LWT messages from the MQTT cover device. If an `availability` topic is not defined, the cover availability state will always be `available`. If an `availability` topic is defined, the cover availability state will be `unavailable` by default. Must not be used together with `availability`."
  required: false
  type: string
command_topic:
  description: The MQTT topic to publish commands to control the cover.
  required: false
  type: string
device:
  description: "Information about the device this cover is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works through [MQTT discovery](/docs/mqtt/discovery/) and when [`unique_id`](#unique_id) is set."
  required: false
  type: map
  keys:
    connections:
      description: 'A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `"connections": ["mac", "02:5b:26:a8:dc:12"]`.'
      required: false
      type: list
    identifiers:
      description: 'A list of IDs that uniquely identify the device. For example a serial number.'
      required: false
      type: [list, string]
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
    sw_version:
      description: The firmware version of the device.
      required: false
      type: string
    via_device:
      description: 'Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device. This is used to show device topology in Home Assistant.'
      required: false
      type: string
device_class:
  description: Sets the [class of the device](/integrations/cover/), changing the device state and icon that is displayed on the frontend.
  required: false
  type: string
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
name:
  description: The name of the cover.
  required: false
  type: string
  default: MQTT Cover
optimistic:
  description: Flag that defines if switch works in optimistic mode.
  required: false
  type: string
  default: "`false` if state or position topic defined, else `true`."
payload_available:
  description: The payload that represents the online state.
  required: false
  type: string
  default: online
payload_close:
  description: The command payload that closes the cover.
  required: false
  type: string
  default: CLOSE
payload_not_available:
  description: The payload that represents the offline state.
  required: false
  type: string
  default: offline
payload_open:
  description: The command payload that opens the cover.
  required: false
  type: string
  default: OPEN
payload_stop:
  description: The command payload that stops the cover.
  required: false
  type: string
  default: STOP
position_closed:
  description: Number which represents closed position.
  required: false
  type: integer
  default: 0
position_open:
  description: Number which represents open position.
  required: false
  type: integer
  default: 100
position_template:
  description: "Defines a [template](/topics/templating/) that can be used to extract the payload for the `position_topic` topic."
  required: false
  type: string
position_topic:
  description: The MQTT topic subscribed to receive cover position messages.
  required: false
  type: string
qos:
  description: The maximum QoS level to be used when receiving and publishing messages.
  required: false
  type: integer
  default: 0
retain:
  description: Defines if published messages should have the retain flag set.
  required: false
  type: boolean
  default: false
set_position_template:
  description: "Defines a [template](/topics/templating/) to define the position to be sent to the `set_position_topic` topic. Incoming position value is available for use in the template `{{position}}`. If no template is defined, the position (0-100) will be calculated according to `position_open` and `position_closed` values."
  required: false
  type: string
set_position_topic:
  description: "The MQTT topic to publish position commands to. You need to set position_topic as well if you want to use position topic. Use template if position topic wants different values than within range `position_closed` - `position_open`. If template is not defined and `position_closed != 100` and `position_open != 0` then proper position value is calculated from percentage position."
  required: false
  type: string
state_closed:
  description: The payload that represents the closed state.
  required: false
  type: string
  default: closed
state_closing:
  description: The payload that represents the closing state.
  required: false
  type: string
  default: closing
state_open:
  description: The payload that represents the open state.
  required: false
  type: string
  default: open
state_opening:
  description: The payload that represents the opening state.
  required: false
  type: string
  default: opening
state_stopped:
  description: The payload that represents the stopped state (for covers that do not report `open`/`closed` state).
  required: false
  type: string
  default: stopped
state_topic:
  description: The MQTT topic subscribed to receive cover state messages. State topic can only read (`open`, `opening`, `closed`, `closing` or `stopped`) state.
  required: false
  type: string
tilt_closed_value:
  description: The value that will be sent on a `close_cover_tilt` command.
  required: false
  type: integer
  default: 0
tilt_command_template:
  description: "Defines a [template](/topics/templating/) that can be used to extract the payload for the `tilt_command_topic` topic."
  required: false
  type: string
tilt_command_topic:
  description: The MQTT topic to publish commands to control the cover tilt.
  required: false
  type: string
tilt_max:
  description: The maximum tilt value
  required: false
  type: integer
  default: 100
tilt_min:
  description: The minimum tilt value.
  required: false
  type: integer
  default: 0
tilt_opened_value:
  description: The value that will be sent on an `open_cover_tilt` command.
  required: false
  type: integer
  default: 100
tilt_optimistic:
  description: Flag that determines if tilt works in optimistic mode.
  required: false
  type: boolean
  default: "`true` if `tilt_status_topic` is not defined, else `false`"
tilt_status_template:
  description: "Defines a [template](/topics/templating/) that can be used to extract the payload for the `tilt_status_topic` topic."
  required: false
  type: string
tilt_status_topic:
  description: The MQTT topic subscribed to receive tilt status update values.
  required: false
  type: string
unique_id:
  description: An ID that uniquely identifies this cover. If two covers have the same unique ID, Home Assistant will raise an exception.
  required: false
  type: string
value_template:
  description: "Defines a [template](/topics/templating/) that can be used to extract the payload for the `state_topic` topic."
  required: false
  type: string
{% endconfiguration %}

<div class="note">

MQTT cover expects position and tilt values to be in range of 0 to 100, where 0 indicates closed position and 100 indicates fully open position.
If position `min` or `max` are set to a different range (e.g. 40 to 140), when sending command to the device the range will be adjusted to the device range (position 0 will send a value of 40 to device) and when position payload is received from the device it will be adjusted back to the 0 to 100 range (device value of 40 will report cover position 0).
`min` and `max` can also be used to reverse the direction of the device, if `min` is set to 100 and `max` is set to `0` device operation will be inverted (e.g. when setting position to 40, a value of 60 will be sent to device).

</div>

### Examples

In this section you will find some real-life examples of how to use this platform.

#### Full configuration state topic without tilt

The example below shows a full configuration for a cover without tilt with state topic only.

{% raw %}

```yaml
# Example configuration.yaml entry
cover:
  - platform: mqtt
    name: "MQTT Cover"
    command_topic: "home-assistant/cover/set"
    state_topic: "home-assistant/cover/state"
    availability:
      - topic: "home-assistant/cover/availability"
    qos: 0
    retain: true
    payload_open: "OPEN"
    payload_close: "CLOSE"
    payload_stop: "STOP"
    state_open: "open"
    state_opening: "opening"
    state_closed: "closed"
    state_closing: "closing"
    payload_available: "online"
    payload_not_available: "offline"
    optimistic: false
    value_template: "{{ value.x }}"
```

{% endraw %}

#### Full configuration position topic without tilt

The example below shows a full configuration for a cover without tilt with position topic.

{% raw %}

```yaml
# Example configuration.yaml entry
cover:
  - platform: mqtt
    name: "MQTT Cover"
    command_topic: "home-assistant/cover/set"
    position_topic: "home-assistant/cover/position"
    availability:
      - "home-assistant/cover/availability"
    set_position_topic: "home-assistant/cover/set_position"
    qos: 0
    retain: true
    payload_open: "OPEN"
    payload_close: "CLOSE"
    payload_stop: "STOP"
    position_open: 100
    position_closed: 0
    payload_available: "online"
    payload_not_available: "offline"
    optimistic: false
    value_template: "{{ value.x }}"
```

{% endraw %}

#### Full configuration for position, state and tilt

The example below shows a full configuration for a cover with position, state & tilt.

{% raw %}

```yaml
# Example configuration.yaml entry
cover:
  - platform: mqtt
    name: "MQTT Cover"
    command_topic: "home-assistant/cover/set"
    state_topic: "home-assistant/cover/state"
    position_topic: "home-assistant/cover/position"
    availability:
      - topic: "home-assistant/cover/availability"
    qos: 0
    retain: true
    payload_open: "OPEN"
    payload_close: "CLOSE"
    payload_stop: "STOP"
    state_open: "open"
    state_opening: "opening"
    state_closed: "closed"
    state_closing: "closing"
    payload_available: "online"
    payload_not_available: "offline"
    optimistic: false
    value_template: "{{ value.x }}"
    position_template: "{{ value.y }}"
    tilt_command_topic: "home-assistant/cover/tilt"
    tilt_status_topic: "home-assistant/cover/tilt-state"
    tilt_status_template: "{{ value_json["PWM"]["PWM1"] }}"
    tilt_min: 0
    tilt_max: 180
    tilt_closed_value: 70
    tilt_opened_value: 180
```

{% endraw %}

#### Full configuration using stopped state

The example below shows a full configuration for a cover using stopped state.

{% raw %}

```yaml
# Example configuration.yaml entry
cover:
  - platform: mqtt
    name: "MQTT Cover"
    command_topic: "home-assistant/cover/set"
    state_topic: "home-assistant/cover/state"
    position_topic: "home-assistant/cover/position"
    availability:
      - topic: "home-assistant/cover/availability"
    qos: 0
    retain: true
    payload_open: "OPEN"
    payload_close: "CLOSE"
    payload_stop: "STOP"
    state_opening: "opening"
    state_closed: "closed"
    state_stopped: "stopped"
    payload_available: "online"
    payload_not_available: "offline"
    optimistic: false
    value_template: "{{ value.x }}"
    position_template: "{{ value.y }}"
```

{% endraw %}

To test, you can use the command line tool `mosquitto_pub` shipped with `mosquitto` or the `mosquitto-clients` package to send MQTT messages. This allows you to operate your cover manually:

```bash
mosquitto_pub -h 127.0.0.1 -t home-assistant/cover/set -m "CLOSE"
```

## Device Tracker

The `mqtt` device tracker platform allows you to define new device_trackers through [manual YAML configuration](#yaml-configuration) in `configuration.yaml` and also to automatically discover device_trackers through a [discovery schema](#discovery-schema) using the MQTT Discovery protocol.
### YAML Configuration

To use this device tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: mqtt
    devices:
      paulus_oneplus: "location/paulus"
      annetherese_n4: "location/annetherese"
```

{% configuration %}
devices:
  description: List of devices with their topic.
  required: true
  type: list
qos:
  description: The QoS level of the topic.
  required: false
  type: integer
payload_home:
  description: The payload value that represents the 'home' state for the device.
  required: false
  type: string
  default: "home"
payload_not_home:
  description: The payload value that represents the 'not_home' state for the device.
  required: false
  type: string
  default: "not_home"
source_type:
  description: Attribute of a device tracker that affects state when being used to track a [person](/integrations/person/). Valid options are `gps`, `router`, `bluetooth`, or `bluetooth_le`.
  required: false
  type: string
{% endconfiguration %}

### Complete YAML example configuration

```yaml
# Complete configuration.yaml entry
device_tracker:
  - platform: mqtt
    devices:
      paulus_oneplus: 'location/paulus'
      annetherese_n4: 'location/annetherese'
    qos: 1
    payload_home: "present"
    payload_not_home: "not present"
    source_type: bluetooth
```

### YAML Usage

Example JSON you can publish to the topic (e.g., via mqtt.publish service):

```json
{
  "topic": "location/paulus",
  "payload": "present"
}
```

### Discovery Schema

MQTT device_trackers are also supported through [MQTT discovery](/docs/mqtt/discovery/). This is different to the YAML configuration from above. Here, the device_tracker can be created via a discovery topic that follows the following topic name convention: `<discovery_prefix>/device_tracker/[<node_id>/]<object_id>/config` and the JSON message content of a specific format as defined below.

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
availability_mode:
  description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
  required: false
  type: string
  default: latest
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates. Must not be used together with `availability`.
  required: false
  type: string
device:
  description: "Information about the device this device tracker is a part of that ties it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html)."
  required: false
  type: map
  keys:
    connections:
      description: "A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `'connections': ['mac', '02:5b:26:a8:dc:12']`."
      required: false
      type: [list, map]
    identifiers:
      description: A list of IDs that uniquely identify the device. For example a serial number.
      required: false
      type: [list, string]
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
    sw_version:
      description: The firmware version of the device.
      required: false
      type: string
    via_device:
      description: 'Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device. This is used to show device topology in Home Assistant.'
      required: false
      type: string
icon:
  description: "[Icon](/docs/configuration/customizing-devices/#icon) for the entity."
  required: false
  type: icon
json_attributes_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the JSON dictionary from messages received on the `json_attributes_topic`. Usage example can be found in [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-template-configuration) documentation."
  required: false
  type: template
json_attributes_topic:
  description: The MQTT topic subscribed to receive a JSON dictionary payload and then set as device_tracker attributes. Usage example can be found in [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-topic-configuration) documentation.
  required: false
  type: string
name:
  description: The name of the MQTT device_tracker.
  required: false
  type: string
payload_available:
  description: The payload that represents the available state.
  required: false
  type: string
  default: online
payload_home:
  description: The payload value that represents the 'home' state for the device.
  required: false
  type: string
  default: home
payload_not_available:
  description: The payload that represents the unavailable state.
  required: false
  type: string
  default: offline
payload_not_home:
  description: The payload value that represents the 'not_home' state for the device.
  required: false
  type: string
  default: not_home
qos:
  description: The maximum QoS level of the state topic.
  required: false
  type: integer
  default: 0
source_type:
  description: Attribute of a device tracker that affects state when being used to track a [person](/integrations/person/). Valid options are `gps`, `router`, `bluetooth`, or `bluetooth_le`.
  required: false
  type: string
state_topic:
  description: The MQTT topic subscribed to receive device tracker state changes.
  required: true
  type: string
unique_id:
  description: "An ID that uniquely identifies this device_tracker. If two device_trackers have the same unique ID, Home Assistant will raise an exception."
  required: false
  type: string
value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) that returns a device tracker state."
  required: false
  type: template
{% endconfiguration %}

### Discovery Example

You can use the discovery protocol to create a new device tracker and set it's state using the command line tool `mosquitto_pub` shipped with `mosquitto` or the `mosquitto-clients` package to send MQTT messages.

To create the device_tracker:

```bash
mosquitto_pub -h 127.0.0.1 -t home-assistant/device_tracker/a4567d663eaf/config -m '{"state_topic": "a4567d663eaf/state", "name": "My Tracker", "payload_home": "home", "payload_not_home": "not_home"}'
```

To set the state of the device tracker to "home":

```bash
mosquitto_pub -h 127.0.0.1 -t a4567d663eaf/state -m 'home'
```

## Device Trigger

The `mqtt` device trigger platform uses an MQTT message payload to generate device trigger events.

An MQTT device trigger is a better option than a [binary sensor](/integrations/binary_sensor.mqtt/) for buttons, remote controls etc.

### Configuration

MQTT device triggers are only supported through [MQTT discovery](/docs/mqtt/discovery/), manual setup through `configuration.yaml` is not supported.
The discovery topic needs to be: `<discovery_prefix>/device_automation/[<node_id>/]<object_id>/config`.

{% configuration %}
automation_type:
  description: The type of automation, must be 'trigger'.
  required: true
  type: string
payload:
  description: Optional payload to match the payload being sent over the topic.
  required: false
  type: string
qos:
  description: The maximum QoS level to be used when receiving messages.
  required: false
  type: integer
  default: 0
topic:
  description: The MQTT topic subscribed to receive trigger events.
  required: true
  type: string
type:
  description: "The type of the trigger, e.g. `button_short_press`. Entries supported by the frontend: `button_short_press`, `button_short_release`, `button_long_press`, `button_long_release`, `button_double_press`, `button_triple_press`, `button_quadruple_press`, `button_quintuple_press`. If set to an unsupported value, will render as `subtype type`, e.g. `First button spammed` with `type` set to `spammed` and `subtype` set to `button_1`"
  required: true
  type: string
subtype:
  description: "The subtype of the trigger, e.g. `button_1`. Entries supported by the frontend: `turn_on`, `turn_off`, `button_1`, `button_2`, `button_3`, `button_4`, `button_5`, `button_6`. If set to an unsupported value, will render as `subtype type`, e.g. `left_button pressed` with `type` set to `button_short_press` and `subtype` set to `left_button`"
  required: true
  type: string
device:
  description: "Information about the device this device trigger is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html)."
  required: true
  type: map
  keys:
    connections:
      description: "A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `'connections': ['mac', '02:5b:26:a8:dc:12']`."
      required: false
      type: [list, map]
    identifiers:
      description: A list of IDs that uniquely identify the device. For example a serial number.
      required: false
      type: [list, string]
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
    sw_version:
      description: The firmware version of the device.
      required: false
      type: string
    via_device:
      description: 'Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device. This is used to show device topology in Home Assistant.'
      required: false
      type: string
{% endconfiguration %}

## Eventstream
The `mqtt_eventstream` integration connects two Home Assistant instances via MQTT.

### Configuration

To integrate MQTT Eventstream into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
mqtt_eventstream:
  publish_topic: MyServerName
  subscribe_topic: OtherHaServerName
```

{% configuration %}
publish_topic:
  description: Topic for publishing local events.
  required: false
  type: string
subscribe_topic:
  description: Topic to receive events from the remote server.
  required: false
  type: string
ignore_event:
  description: Ignore sending these [events](/docs/configuration/events/) over mqtt.
  required: false
  type: list
{% endconfiguration %}

### Multiple Instances

Events from multiple instances can be aggregated to a single master instance by subscribing to a wildcard topic from the master instance.

```yaml
# Example master instance configuration.yaml entry
mqtt_eventstream:
  publish_topic: master/topic
  subscribe_topic: slaves/#
  ignore_event:
    - call_service
    - state_changed
```

For a multiple instance setup, each slave would publish to their own topic.

```yaml
# Example slave instance configuration.yaml entry
mqtt_eventstream:
  publish_topic: slaves/upstairs
  subscribe_topic: master/topic
```

```yaml
# Example slave instance configuration.yaml entry
mqtt_eventstream:
  publish_topic: slaves/downstairs
  subscribe_topic: master/topic
```

## Fan

The `mqtt` fan platform lets you control your MQTT enabled fans.

### Configuration

In an ideal scenario, the MQTT device will have a `state_topic` to publish state changes. If these messages are published with a `RETAIN` flag, the MQTT fan will receive an instant state update after subscription and will start with the correct state. Otherwise, the initial state of the fan will be `false` / `off`.

When a `state_topic` is not available, the fan will work in optimistic mode. In this mode, the fan will immediately change state after every command. Otherwise, the fan will wait for state confirmation from the device (message from `state_topic`).

Optimistic mode can be forced even if a `state_topic` is available. Try to enable it if you are experiencing incorrect fan operation.

To enable MQTT fans in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
fan:
  - platform: mqtt
    command_topic: "bedroom_fan/on/set"
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
availability_mode:
  description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
  required: false
  type: string
  default: latest
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates. Must not be used together with `availability`.
  required: false
  type: string
command_topic:
  description: The MQTT topic to publish commands to change the fan state.
  required: true
  type: string
device:
  description: "Information about the device this fan is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works through [MQTT discovery](/docs/mqtt/discovery/) and when [`unique_id`](#unique_id) is set."
  required: false
  type: map
  keys:
    connections:
      description: 'A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `"connections": [["mac", "02:5b:26:a8:dc:12"]]`.'
      required: false
      type: [list, map]
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
    sw_version:
      description: The firmware version of the device.
      required: false
      type: string
    via_device:
      description: 'Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device. This is used to show device topology in Home Assistant.'
      required: false
      type: string
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
name:
  description: The name of the fan.
  required: false
  type: string
  default: MQTT Fan
optimistic:
  description: Flag that defines if lock works in optimistic mode
  required: false
  type: boolean
  default: "`true` if no state topic defined, else `false`."
oscillation_command_topic:
  description: The MQTT topic to publish commands to change the oscillation state.
  required: false
  type: string
oscillation_state_topic:
  description: The MQTT topic subscribed to receive oscillation state updates.
  required: false
  type: string
oscillation_value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the oscillation."
  required: false
  type: string
payload_available:
  description: The payload that represents the available state.
  required: false
  type: string
  default: online
payload_high_speed:
  description: The payload that represents the fan's high speed.
  required: false
  type: string
  default: high
payload_low_speed:
  description: The payload that represents the fan's low speed.
  required: false
  type: string
  default: low
payload_medium_speed:
  description: The payload that represents the fan's medium speed.
  required: false
  type: string
  default: medium
payload_not_available:
  description: The payload that represents the unavailable state.
  required: false
  type: string
  default: offline
payload_off:
  description: The payload that represents the stop state.
  required: false
  type: string
  default: "OFF"
payload_on:
  description: The payload that represents the running state.
  required: false
  type: string
  default: "ON"
payload_oscillation_off:
  description: The payload that represents the oscillation off state.
  required: false
  type: string
  default: oscillate_off
payload_oscillation_on:
  description: The payload that represents the oscillation on state.
  required: false
  type: string
  default: oscillate_on
qos:
  description: The maximum QoS level of the state topic.
  required: false
  type: integer
  default: 0
retain:
  description: If the published message should have the retain flag on or not.
  required: false
  type: boolean
  default: true
speed_command_topic:
  description: The MQTT topic to publish commands to change speed state.
  required: false
  type: string
speed_state_topic:
  description: The MQTT topic subscribed to receive speed state updates.
  required: false
  type: string
speed_value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the speed payload."
  required: false
  type: string
speeds:
  description: "List of speeds this fan is capable of running at. Valid entries are `off`, `low`, `medium` and `high`."
  required: false
  type: [string, list]
state_topic:
  description: The MQTT topic subscribed to receive state updates.
  required: false
  type: string
state_value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the state."
  required: false
  type: string
unique_id:
  description: An ID that uniquely identifies this fan. If two fans have the same unique ID, Home Assistant will raise an exception.
  required: false
  type: string
{% endconfiguration %}

<div class='note warning'>

Make sure that your topics match exactly. `some-topic/` and `some-topic` are different topics.

</div>

### Examples

In this section you find some real-life examples of how to use this fan.

#### Full configuration

The example below shows a full configuration for a MQTT fan.

```yaml
# Example configuration.yaml entry
fan:
  - platform: mqtt
    name: "Bedroom Fan"
    state_topic: "bedroom_fan/on/state"
    command_topic: "bedroom_fan/on/set"
    oscillation_state_topic: "bedroom_fan/oscillation/state"
    oscillation_command_topic: "bedroom_fan/oscillation/set"
    speed_state_topic: "bedroom_fan/speed/state"
    speed_command_topic: "bedroom_fan/speed/set"
    qos: 0
    payload_on: "true"
    payload_off: "false"
    payload_oscillation_on: "true"
    payload_oscillation_off: "false"
    payload_low_speed: "low"
    payload_medium_speed: "medium"
    payload_high_speed: "high"
    speeds:
      - "off"
      - low
      - medium
      - high
```

## JSON

The `mqtt_json` device tracker platform allows you to detect presence by monitoring an MQTT topic for new locations. To use this platform, you specify a unique topic for each device.

### Configuration

To use this device tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: mqtt_json
    devices:
      paulus_oneplus: location/paulus
      annetherese_n4: location/annetherese
```

{% configuration %}
devices:
  description: List of devices with their topic.
  required: true
  type: list
qos:
  description: The QoS level of the topic.
  required: false
  type: string
{% endconfiguration %}

### Usage

This platform receives JSON formatted payloads containing GPS information, for example:

```json
{"longitude": 1.0,"gps_accuracy": 60,"latitude": 2.0,"battery_level": 99.9}
```

Where `longitude` is the longitude, `latitude` is the latitude, `gps_accuracy` is the accuracy in meters, `battery_level` is the current battery level of the device sending the update.
`longitude` and `latitude` are required keys, `gps_accuracy` and `battery_level` are optional.

## Light

The `mqtt` light platform lets you control your MQTT enabled lights through one of the supported message schemas, `default`, `json` or `template`.

### Comparison of light MQTT schemas

| Function          | [`default`](#default-schema) | [`json`](#json-schema) | [`template`](#template-schema) |
|-------------------|------------------------------------------------------------|----------------------------------------------------------------------|------------------------------------------------------------------------------|
| Brightness        | ✔                                                          | ✔                                                                    | ✔                                                                            |
| Color temperature | ✔                                                          | ✔                                                                    | ✔                                                                            |
| Effects           | ✔                                                          | ✔                                                                    | ✔                                                                            |
| Flashing          | ✘                                                          | ✔                                                                    | ✔                                                                            |
| RGB Color         | ✔                                                          | ✔                                                                    | ✔                                                                            |
| Transitions       | ✘                                                          | ✔                                                                    | ✔                                                                            |
| XY Color          | ✔                                                          | ✔                                                                    | ✘                                                                            |
| HS Color          | ✔                                                          | ✔                                                                    | ✘                                                                            |
| White Value       | ✔                                                          | ✔                                                                    | ✔                                                                            |

### Default schema

The `mqtt` light platform with default schema lets you control your MQTT enabled lights. It supports setting brightness, color temperature, effects, on/off, RGB colors, XY colors and white values.

### Default schema - Configuration

In an ideal scenario, the MQTT device will have a state topic to publish state changes. If these messages are published with a `RETAIN` flag, the MQTT light will receive an instant state update after subscription and will start with the correct state. Otherwise, the initial state of the switch will be `false` / `off`.

When a state topic is not available, the light will work in optimistic mode. In this mode, the light will immediately change state after every command. Otherwise, the light will wait for state confirmation from the device (message from `state_topic`).

Optimistic mode can be forced, even if the `state_topic` is available. Try to enable it, if experiencing incorrect light operation.

Home Assistant internally assumes that a light either has a color or a color temperature.
The state of MQTT lights with default schema and support for both color and color temperature will include a color if `white_value` is 0 or None and a `color_temp` is white_value > 0.

```yaml
# Example configuration.yaml entry
light:
  - platform: mqtt
    command_topic: "office/rgb1/light/switch"
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
availability_mode:
  description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
  required: false
  type: string
  default: latest
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates. Must not be used together with `availability`.
  required: false
  type: string
brightness_command_topic:
  description: The MQTT topic to publish commands to change the light’s brightness.
  required: false
  type: string
brightness_scale:
  description: "Defines the maximum brightness value (i.e., 100%) of the MQTT device."
  required: false
  type: integer
  default: 255
brightness_state_topic:
  description: The MQTT topic subscribed to receive brightness state updates.
  required: false
  type: string
brightness_value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the brightness value."
  required: false
  type: string
color_temp_command_template:
  description: "Defines a [template](/docs/configuration/templating/) to compose message which will be sent to `color_temp_command_topic`. Available variables: `value`."
  required: false
  type: string
color_temp_command_topic:
  description: The MQTT topic to publish commands to change the light’s color temperature state. The color temperature command slider has a range of 153 to 500 mireds (micro reciprocal degrees).
  required: false
  type: string
color_temp_state_topic:
  description: "The MQTT topic subscribed to receive color temperature state updates. If the light also supports setting colors, also define a `white_value_state_topic`. "
  required: false
  type: string
color_temp_value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the color temperature value."
  required: false
  type: string
command_topic:
  description: The MQTT topic to publish commands to change the switch state.
  required: true
  type: string
device:
  description: 'Information about the device this light is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works through [MQTT discovery](/docs/mqtt/discovery/) and when [`unique_id`](#unique_id) is set.'
  required: false
  type: map
  keys:
    connections:
      description: 'A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `"connections": [["mac", "02:5b:26:a8:dc:12"]]`.'
      required: false
      type: list
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
    name:
      description: 'The name of the device.'
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
effect_command_topic:
  description: "The MQTT topic to publish commands to change the light's effect state."
  required: false
  type: string
effect_list:
  description: The list of effects the light supports.
  required: false
  type: [string, list]
effect_state_topic:
  description: The MQTT topic subscribed to receive effect state updates.
  required: false
  type: string
effect_value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the effect value."
  required: false
  type: string
hs_command_topic:
  description: "The MQTT topic to publish commands to change the light's color state in HS format (Hue Saturation).
  Range for Hue: 0° .. 360°, Range of Saturation: 0..100.
  Note: Brightness is sent separately in the `brightness_command_topic`."
  required: false
  type: string
hs_state_topic:
  description: "The MQTT topic subscribed to receive color state updates in HS format.
  Note: Brightness is received separately in the `brightness_state_topic`."
  required: false
  type: string
hs_value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the HS value."
  required: false
  type: string
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
max_mireds:
  description: The maximum color temperature in mireds.
  required: false
  type: integer
min_mireds:
  description: The minimum color temperature in mireds.
  required: false
  type: integer
name:
  description: The name of the light.
  required: false
  type: string
  default: MQTT Light
on_command_type:
  description: "Defines when on the payload_on is sent. Using `last` (the default) will send any style (brightness, color, etc) topics first and then a `payload_on` to the `command_topic`. Using `first` will send the `payload_on` and then any style topics. Using `brightness` will only send brightness commands instead of the `payload_on` to turn the light on."
  required: false
  type: string
optimistic:
  description: Flag that defines if switch works in optimistic mode.
  required: false
  type: boolean
  default: "`true` if no state topic defined, else `false`."
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
  description: The payload that represents disabled state.
  required: false
  type: string
  default: "OFF"
payload_on:
  description: The payload that represents enabled state.
  required: false
  type: string
  default: "ON"
qos:
  description: The maximum QoS level of the state topic.
  required: false
  type: integer
  default: 0
retain:
  description: If the published message should have the retain flag on or not.
  required: false
  type: boolean
  default: false
rgb_command_template:
  description: "Defines a [template](/docs/configuration/templating/) to compose message which will be sent to `rgb_command_topic`. Available variables: `red`, `green` and `blue`."
  required: false
  type: string
rgb_command_topic:
  description: "The MQTT topic to publish commands to change the light's RGB state. Please note that the color value sent by Home Assistant is normalized to full brightness if `brightness_command_topic` is set. Brightness information is in this case sent separately in the `brightness_command_topic`. This will cause a light that expects an absolute color value (including brightness) to flicker."
  required: false
  type: string
rgb_state_topic:
  description: "The MQTT topic subscribed to receive RGB state updates. The expected payload is the RGB values separated by commas, for example, `255,0,127`. Please note that the color value received by Home Assistant is normalized to full brightness. Brightness information is received separately in the `brightness_state_topic`."
  required: false
  type: string
rgb_value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the RGB value."
  required: false
  type: string
schema:
  description: The schema to use. Must be `default` or omitted to select the default schema".
  required: false
  type: string
  default: default
state_topic:
  description: The MQTT topic subscribed to receive state updates.
  required: false
  type: string
state_value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the state value. The template should match the payload `on` and `off` values, so if your light uses `power on` to turn on, your `state_value_template` string should return `power on` when the switch is on. For example if the message is just `on`, your `state_value_template` should be `power {{ value }}`."
  required: false
  type: string
unique_id:
  description: An ID that uniquely identifies this light. If two lights have the same unique ID, Home Assistant will raise an exception.
  required: false
  type: string
white_value_command_topic:
  description: "The MQTT topic to publish commands to change the light's white value."
  required: false
  type: string
white_value_scale:
  description: "Defines the maximum white value (i.e., 100%) of the MQTT device."
  required: false
  type: integer
  default: 255
white_value_state_topic:
  description: The MQTT topic subscribed to receive white value updates.
  required: false
  type: string
white_value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the white value."
  required: false
  type: string
xy_command_topic:
  description: "The MQTT topic to publish commands to change the light's XY state."
  required: false
  type: string
xy_state_topic:
  description: The MQTT topic subscribed to receive XY state updates.
  required: false
  type: string
xy_value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the XY value."
  required: false
  type: string
{% endconfiguration %}

<div class='note warning'>

  Make sure that your topics match exactly. `some-topic/` and `some-topic` are different topics.

</div>

<div class='note warning'>
  XY and RGB can not be used at the same time. If both are provided, XY overrides RGB.
</div>

### Default schema - Examples

In this section you will find some real-life examples of how to use this sensor.

#### Brightness and RGB support

To enable a light with brightness and RGB support in your installation, add the following to your `configuration.yaml` file:

{% raw %}

```yaml
# Example configuration.yaml entry
light:
  - platform: mqtt
    name: "Office Light RGB"
    state_topic: "office/rgb1/light/status"
    command_topic: "office/rgb1/light/switch"
    brightness_state_topic: "office/rgb1/brightness/status"
    brightness_command_topic: "office/rgb1/brightness/set"
    rgb_state_topic: "office/rgb1/rgb/status"
    rgb_command_topic: "office/rgb1/rgb/set"
    state_value_template: "{{ value_json.state }}"
    brightness_value_template: "{{ value_json.brightness }}"
    rgb_value_template: "{{ value_json.rgb | join(',') }}"
    qos: 0
    payload_on: "ON"
    payload_off: "OFF"
    optimistic: false
```

{% endraw %}

#### Brightness and no RGB support

To enable a light with brightness (no RGB version) in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: mqtt
    name: "Office light"
    state_topic: "office/light/status"
    command_topic: "office/light/switch"
    brightness_state_topic: 'office/light/brightness'
    brightness_command_topic: 'office/light/brightness/set'
    qos: 0
    payload_on: "ON"
    payload_off: "OFF"
    optimistic: false
```

#### Brightness without on commands

To enable a light that sends only brightness topics to turn it on, add the following to your `configuration.yaml` file. The `command_topic` is only used to send an off command in this case:

```yaml
# Example configuration.yaml entry
light:
  - platform: mqtt
    name: "Brightness light"
    state_topic: "office/light/status"
    command_topic: "office/light/switch"
    payload_off: "OFF"
    brightness_state_topic: 'office/light/brightness'
    brightness_command_topic: 'office/light/brightness/set'
    on_command_type: 'brightness'
```

### Default schema - Implementations

- A [basic example](https://github.com/mertenats/open-home-automation/tree/master/ha_mqtt_light) using a NodeMCU board (ESP8266) to control its built-in LED (on/off).
- Another [example](https://github.com/mertenats/open-home-automation/tree/master/ha_mqtt_rgb_light) to control a RGB LED (on/off, brightness, and colors).
- [Integration guide](https://github.com/xoseperez/espurna/wiki/HomeAssistant) for the ESPUrna firmware (ESP8285/ESP8266).

### JSON schema

The `mqtt` light platform with JSON schema lets you control a MQTT-enabled light that can receive [JSON](https://en.wikipedia.org/wiki/JSON) messages.

This schema supports on/off, brightness, RGB colors, XY colors, color temperature, transitions, short/long flashing and white values. The messages sent to/from the lights look similar to this, omitting fields when they aren't needed:

```json
{
  "brightness": 255,
  "color_temp": 155,
  "color": {
    "r": 255,
    "g": 180,
    "b": 200,
    "x": 0.406,
    "y": 0.301,
    "h": 344.0,
    "s": 29.412
  },
  "effect": "colorloop",
  "state": "ON",
  "transition": 2,
  "white_value": 150
}
```

### JSON schema - Configuration

In an ideal scenario, the MQTT device will have a state topic to publish state changes. If these messages are published with the RETAIN flag, the MQTT light will receive an instant state update after subscription and will start with the correct state. Otherwise, the initial state of the light will be off.

When a state topic is not available, the light will work in optimistic mode. In this mode, the light will immediately change state after every command. Otherwise, the light will wait for state confirmation from the device (message from `state_topic`).

Optimistic mode can be forced, even if state topic is available. Try enabling it if the light is operating incorrectly.

```yaml
# Example configuration.yaml entry
light:
  - platform: mqtt
    schema: json
    command_topic: "home/rgb1/set"
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
availability_mode:
  description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
  required: false
  type: string
  default: latest
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates. Must not be used together with `availability`.
  required: false
  type: string
brightness:
  description: Flag that defines if the light supports brightness.
  required: false
  type: boolean
  default: false
brightness_scale:
  description: "Defines the maximum brightness value (i.e., 100%) of the MQTT device."
  required: false
  type: integer
  default: 255
color_temp:
  description: Flag that defines if the light supports color temperature.
  required: false
  type: boolean
  default: false
command_topic:
  description: The MQTT topic to publish commands to change the light’s state.
  required: true
  type: string
device:
  description: 'Information about the device this light is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works through [MQTT discovery](/docs/mqtt/discovery/) and when [`unique_id`](#unique_id) is set.'
  required: false
  type: map
  keys:
    connections:
      description: 'A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `"connections": [["mac", "02:5b:26:a8:dc:12"]]`.'
      required: false
      type: list
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
    name:
      description: 'The name of the device.'
      required: false
      type: string
    sw_version:
      description: 'The firmware version of the device.'
      required: false
      type: string
effect:
  description: Flag that defines if the light supports effects.
  required: false
  type: boolean
  default: false
effect_list:
  description: The list of effects the light supports.
  required: false
  type: [string, list]
flash_time_long:
  description: The duration, in seconds, of a “long” flash.
  required: false
  type: integer
  default: 10
flash_time_short:
  description: The duration, in seconds, of a “short” flash.
  required: false
  type: integer
  default: 2
hs:
  description: Flag that defines if the light supports HS colors.
  required: false
  type: boolean
  default: false
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
max_mireds:
  description: The maximum color temperature in mireds.
  required: false
  type: integer
min_mireds:
  description: The minimum color temperature in mireds.
  required: false
  type: integer
name:
  description: The name of the light.
  required: false
  type: string
  default: MQTT JSON Light
optimistic:
  description: Flag that defines if the light works in optimistic mode.
  required: false
  type: boolean
  default: "`true` if no state topic defined, else `false`."
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
qos:
  description: The maximum QoS level of the state topic.
  required: false
  type: integer
  default: 0
retain:
  description: If the published message should have the retain flag on or not.
  required: false
  type: boolean
  default: false
rgb:
  description: Flag that defines if the light supports RGB colors.
  required: false
  type: boolean
  default: false
schema:
  description: The schema to use. Must be `json` to select the JSON schema".
  required: false
  type: string
  default: default
state_topic:
  description: The MQTT topic subscribed to receive state updates.
  required: false
  type: string
unique_id:
   description: An ID that uniquely identifies this light. If two lights have the same unique ID, Home Assistant will raise an exception.
   required: false
   type: string
white_value:
  description: Flag that defines if the light supports white values.
  required: false
  type: boolean
  default: false
xy:
  description: Flag that defines if the light supports XY colors.
  required: false
  type: boolean
  default: false
{% endconfiguration %}

<div class='note warning'>

  Make sure that your topics match exact. `some-topic/` and `some-topic` are different topics.

</div>

<div class='note warning'>

  RGB, XY and HSV can not be used at the same time in `state_topic` messages. Make sure that only one of the color models is in the "color" section of the state MQTT payload.

</div>

### JSON schema - Examples

In this section you find some real-life examples of how to use this sensor.

#### Brightness and RGB support

To enable a light with brightness and RGB support in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: mqtt
    schema: json
    name: mqtt_json_light_1
    state_topic: "home/rgb1"
    command_topic: "home/rgb1/set"
    brightness: true
    rgb: true
```

### Brightness and no RGB support

To enable a light with brightness (but no color support) in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: mqtt
    schema: json
    name: mqtt_json_light_1
    state_topic: "home/rgb1"
    command_topic: "home/rgb1/set"
    brightness: true
```

### Brightness Scaled

To enable a light using a brightness scale other than 8bit the `brightness_scale` option may be added to denote the "fully on" value:
```yaml
# Example configuration.yaml entry
light:
  - platform: mqtt
    schema: json
    name: mqtt_json_light_1
    state_topic: "home/light"
    command_topic: "home/light/set"
    brightness: true
    brightness_scale: 4095
```

Home Assistant will then convert its 8bit value in the message to and from the device:

```json
{
  "brightness": 4095,
  "state": "ON"
}
```

#### HS Color

To use a light with hue+saturation as the color model, set `hs` to `true` in the platform configuration:

```yaml
light:
  - platform: mqtt
    schema: json
    name: mqtt_json_hs_light
    state_topic: "home/light"
    command_topic: "home/light/set"
    hs: true
```

Home Assistant expects the hue values to be in the range 0 to 360 and the saturation values to be scaled from 0 to 100. For example, the following is a blue color shade:

```json
{
  "state": "ON",
  "color": {
    "h": 24.0,
    "s": 100.0
  }
}
```

#### Brightness and RGBW support

To enable a light with brightness, RGB support and a separate white channel (RGBW) in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: mqtt
    schema: json
    name: mqtt_json_light_1
    state_topic: "home/rgbw1"
    command_topic: "home/rgbw1/set"
    brightness: true
    rgb: true
    white_value: true
```


### Implementations

- A full example of custom lighting using this platform and an ESP8266 microcontroller can be found [here](https://github.com/corbanmailloux/esp-mqtt-rgb-led). It supports on/off, brightness, transitions, RGB colors, and flashing.

- There is also another implementation forked from the above repository, it supports all the same features but is made for addressable LED strips using FastLED on a NodeMCU V3 it can be found [here](https://github.com/JammyDodger231/nodemcu-mqtt-rgb-led).

- [McLighting](https://github.com/toblum/McLighting) is another ESP8266 firmware for WS2812 addressable LEDs.

- [MQTT JSON Light](https://github.com/mertenats/Open-Home-Automation/tree/master/ha_mqtt_rgbw_light_with_discovery) is another implementation for ESP8266 including [MQTT discovery](/docs/mqtt/discovery/).

- [ESPHome](https://esphome.io) implements the JSON schema for MQTT based installs and supports [MQTT discovery](/docs/mqtt/discovery/).

- [AiLight](https://github.com/stelgenhof/AiLight) is a custom firmware for the Ai-Thinker (and equivalent) RGBW WiFi light bulbs that has an ESP8266 onboard and controlled by the MY9291 LED driver. It implements the [MQTT JSON light](/integrations/light.mqtt) platform and supports ON/OFF, RGBW colours, brightness, color temperature, flashing and transitions. Also it includes [MQTT Auto Discovery](/docs/mqtt/discovery/)) and the MQTT Last Will and Testament is enabled as well.

- [h801-mqtt-json](https://github.com/starkillerOG/h801-mqtt-json) is a custom firmware for the H801 LED dimmer, a 5 channel (RGBWWCW)  WiFi LED strip controller for 12V LED strips. The firmware is meant to control the 5 channels of the H801 to simultaneously control an RGB and a Warm-white/Cold-white LED strip such as a 5050 RGB LED strip and a 5025 Dual White strip. It implements the [MQTT JSON light](/integrations/light.mqtt) platform and supports ON/OFF, RGBW colours (RGB strip), brightness, color temperature (CW/WW strip) and transitions.

### Template schema

The `mqtt` light platform with template schema lets you control a MQTT-enabled light that receive commands on a command topic and optionally sends status update on a state topic.
It is format-agnostic so you can use any data format you want (i.e., string, JSON), just configure it with templating.

This schema supports on/off, brightness, RGB colors, XY colors, color temperature, transitions, short/long flashing, effects and white values.

### Template schema - Configuration

In an ideal scenario, the MQTT device will have a state topic to publish state changes. If these messages are published with the RETAIN flag, the MQTT light will receive an instant state update after subscription and will start with the correct state. Otherwise, the initial state of the light will be off.

When a state topic is not available, the light will work in optimistic mode. In this mode, the light will immediately change state after every command. Otherwise, the light will wait for state confirmation from the device (message from `state_topic`).

Optimistic mode can be forced, even if state topic is available. Try enabling it if the light is operating incorrectly.

```yaml
# Example configuration.yaml entry
light:
  - platform: mqtt
    schema: template
    command_topic: "home/rgb1/set"
    command_on_template: "on"
    command_off_template: "off"
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
availability_mode:
  description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
  required: false
  type: string
  default: latest
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates. Must not be used together with `availability`.
  required: false
  type: string
blue_template:
  description: "[Template](/docs/configuration/templating/#processing-incoming-data) to extract blue color from the state payload value."
  required: false
  type: string
brightness_template:
  description: "[Template](/docs/configuration/templating/#processing-incoming-data) to extract brightness from the state payload value."
  required: false
  type: string
color_temp_template:
  description: "[Template](/docs/configuration/templating/#processing-incoming-data) to extract color temperature from the state payload value."
  required: false
  type: string
command_off_template:
  description: "The [template](/docs/configuration/templating/#processing-incoming-data) for *off* state changes. Available variables: `state` and `transition`."
  required: true
  type: string
command_on_template:
  description: "The [template](/docs/configuration/templating/#processing-incoming-data) for *on* state changes. Available variables: `state`, `brightness`, `red`, `green`, `blue`, `white_value`, `flash`, `transition` and `effect`."
  required: true
  type: string
command_topic:
  description: The MQTT topic to publish commands to change the light’s state.
  required: true
  type: string
device:
  description: 'Information about the device this light is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works through [MQTT discovery](/docs/mqtt/discovery/) and when [`unique_id`](#unique_id) is set.'
  required: false
  type: map
  keys:
    connections:
      description: 'A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `"connections": [["mac", "02:5b:26:a8:dc:12"]]`.'
      required: false
      type: list
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
    name:
      description: 'The name of the device.'
      required: false
      type: string
    sw_version:
      description: 'The firmware version of the device.'
      required: false
      type: string
effect_list:
  description: List of possible effects.
  required: false
  type: [string, list]
effect_template:
  description: "[Template](/docs/configuration/templating/#processing-incoming-data) to extract effect from the state payload value."
  required: false
  type: string
green_template:
  description: "[Template](/docs/configuration/templating/#processing-incoming-data) to extract green color from the state payload value."
  required: false
  type: string
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
max_mireds:
  description: The maximum color temperature in mireds.
  required: false
  type: integer
min_mireds:
  description: The minimum color temperature in mireds.
  required: false
  type: integer
name:
  description: The name of the light.
  required: false
  type: string
  default: MQTT Template Light
optimistic:
  description: Flag that defines if the light works in optimistic mode.
  required: false
  type: string
  default: "`true` if no state topic or state template is defined, else `false`."
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
qos:
  description: The maximum QoS level of the state topic.
  required: false
  type: integer
  default: 0
red_template:
  description: "[Template](/docs/configuration/templating/#processing-incoming-data) to extract red color from the state payload value."
  required: false
  type: string
schema:
  description: The schema to use. Must be `template` to select the template schema".
  required: false
  type: string
  default: default
state_template:
  description: "[Template](/docs/configuration/templating/#processing-incoming-data) to extract state from the state payload value."
  required: false
  type: string
state_topic:
  description: The MQTT topic subscribed to receive state updates.
  required: false
  type: string
unique_id:
   description: An ID that uniquely identifies this light. If two lights have the same unique ID, Home Assistant will raise an exception.
   required: false
   type: string
white_value_template:
  description: "[Template](/docs/configuration/templating/#processing-incoming-data) to extract white value from the state payload value."
  required: false
  type: string
{% endconfiguration %}

<div class='note warning'>

  Make sure that your topics match exact. `some-topic/` and `some-topic` are different topics.

</div>

### Template schema - Examples

In this section you find some real-life examples of how to use this light.

#### Simple string payload

For a simple string payload with the format `state,brightness,r-g-b` (e.g., `on,255,255-255-255`), add the following to your `configuration.yaml` file:

{% raw %}

```yaml
# Example configuration.yaml entry
light:
  - platform: mqtt
    schema: template
    command_topic: "home/rgb1/set"
    state_topic: "home/rgb1/status"
    command_on_template: "on,{{ brightness|d }},{{ red|d }}-{{ green|d }}-{{ blue|d }}"
    command_off_template: "off"
    state_template: "{{ value.split(',')[0] }}"  # must return `on` or `off`
    brightness_template: "{{ value.split(',')[1] }}"
    red_template: "{{ value.split(',')[2].split('-')[0] }}"
    green_template: "{{ value.split(',')[2].split('-')[1] }}"
    blue_template: "{{ value.split(',')[2].split('-')[2] }}"
```

{% endraw %}

#### JSON payload

For a JSON payload with the format `{"state": "on", "brightness": 255, "color": [255, 255, 255], "effect": "rainbow"}`, add the following to your `configuration.yaml` file:

{% raw %}

```yaml
# Example configuration.yaml entry
light:
  - platform: mqtt
    schema: template
    effect_list:
      - rainbow
      - colorloop
    command_topic: "home/rgb1/set"
    state_topic: "home/rgb1/status"
    command_on_template: >
      {"state": "on"
      {%- if brightness is defined -%}
      , "brightness": {{ brightness }}
      {%- endif -%}
      {%- if red is defined and green is defined and blue is defined -%}
      , "color": [{{ red }}, {{ green }}, {{ blue }}]
      {%- endif -%}
      {%- if effect is defined -%}
      , "effect": "{{ effect }}"
      {%- endif -%}
      }
    command_off_template: '{"state": "off"}'
    state_template: '{{ value_json.state }}'
    brightness_template: '{{ value_json.brightness }}'
    red_template: '{{ value_json.color[0] }}'
    green_template: '{{ value_json.color[1] }}'
    blue_template: '{{ value_json.color[2] }}'
    effect_template: '{{ value_json.effect }}'
```

{% endraw %}

#### Template schema - No brightness or color support

If you don't want brightness, color or effect support, just omit the corresponding configuration sections.

## Lock

The `mqtt` lock platform lets you control your MQTT enabled locks.

### Configuration

In an ideal scenario, the MQTT device will have a `state_topic` to publish state changes. If these messages are published with a `RETAIN` flag, the MQTT lock will receive an instant state update after subscription and will start with correct state. Otherwise, the initial state of the lock will be `false` / unlocked.

When a `state_topic` is not available, the lock will work in optimistic mode. In this mode, the lock will immediately change state after every command. Otherwise, the lock will wait for state confirmation from the device (message from `state_topic`).

Optimistic mode can be forced, even if state topic is available. Try to enable it, if experiencing incorrect lock operation.

To enable MQTT locks in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
lock:
  - platform: mqtt
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
availability_mode:
  description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
  required: false
  type: string
  default: latest
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates. Must not be used together with `availability`.
  required: false
  type: string
command_topic:
  description: The MQTT topic to publish commands to change the lock state.
  required: true
  type: string
device:
  description: 'Information about the device this lock is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works through [MQTT discovery](/docs/mqtt/discovery/) and when [`unique_id`](#unique_id) is set.'
  required: false
  type: map
  keys:
    connections:
      description: 'A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `"connections": [["mac", "02:5b:26:a8:dc:12"]]`.'
      required: false
      type: list
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
    name:
      description: 'The name of the device.'
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
name:
  description: The name of the lock.
  required: false
  type: string
  default: MQTT Lock
optimistic:
  description: Flag that defines if lock works in optimistic mode.
  required: false
  type: string
  default: "`true` if no `state_topic` defined, else `false`."
payload_available:
  description: The payload that represents the available state.
  required: false
  type: string
  default: online
payload_lock:
  description: The payload that represents enabled/locked state.
  required: false
  type: string
  default: LOCK
payload_not_available:
  description: The payload that represents the unavailable state.
  required: false
  type: string
  default: offline
payload_unlock:
  description: The payload that represents disabled/unlocked state.
  required: false
  type: string
  default: UNLOCK
qos:
  description: The maximum QoS level of the state topic.
  required: false
  type: integer
  default: 0
retain:
  description: If the published message should have the retain flag on or not.
  required: false
  type: boolean
  default: false
state_locked:
  description: The value that represents the lock to be in locked state
  required: false
  type: string
  default: LOCKED
state_topic:
  description: The MQTT topic subscribed to receive state updates.
  required: false
  type: string
state_unlocked:
  description: The value that represents the lock to be in unlocked state
  required: false
  type: string
  default: UNLOCKED
unique_id:
   description: An ID that uniquely identifies this lock. If two locks have the same unique ID, Home Assistant will raise an exception.
   required: false
   type: string
value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the payload."
  required: false
  type: string
{% endconfiguration %}

<div class='note warning'>

Make sure that your topics match exactly. `some-topic/` and `some-topic` are different topics.

</div>

### Examples

In this section you will find some real-life examples of how to use this lock.

#### Full configuration

The example below shows a full configuration for a MQTT lock.

{% raw %}

```yaml
# Example configuration.yaml entry
lock:
  - platform: mqtt
    name: Frontdoor
    state_topic: "home-assistant/frontdoor/"
    command_topic: "home-assistant/frontdoor/set"
    payload_lock: "LOCK"
    payload_unlock: "UNLOCK"
    state_locked: "LOCK"
    state_unlocked: "UNLOCK"
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

## Manual Alarm

The `mqtt` platform extends the [manual alarm](/integrations/manual) by adding support for MQTT control of the alarm by a remote device. It can be used to create external keypads which simply change the state of the manual alarm in Home Assistant.

It's essentially the opposite of the [MQTT Alarm Panel](/integrations/alarm_control_panel.mqtt/) which allows Home Assistant to observe an existing, fully-featured alarm where all of the alarm logic is embedded in that physical device.

The integration will accept the following commands from your Alarm Panel via the `command_topic`:

- `DISARM`
- `ARM_HOME`
- `ARM_AWAY`
- `ARM_NIGHT`

When the state of the manual alarm changes, Home Assistant will publish one of the following states to the `state_topic`:

- 'disarmed'
- 'armed_home'
- 'armed_away'
- 'armed_night'
- 'pending'
- 'triggered'

### Configuration

To use your panel in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  - platform: manual_mqtt
    state_topic: home/alarm
    command_topic: home/alarm/set
```

The following configuration variables from the base manual alarm platform are available:

{% configuration %}
name:
  description: The name of the alarm.
  required: false
  type: string
  default: HA Alarm
code:
  description: >
    If defined, specifies a code to enable or disable the alarm in the frontend.
    This code is not required for MQTT interactions.
    Only one of **code** and **code_template** can be specified.
  required: exclusive
  type: string
code_template:
  description: >
    If defined, returns a code to enable or disable the alarm in the frontend; an empty string disables checking the code.
    Inside the template, the variables **from_state** and **to_state** identify the current and desired state.
    Only one of **code** and **code_template** can be specified.
  required: exclusive
  type: string
code_arm_required:
  description: >
   If true, the code is required to arm the alarm. If false, the code is not validated.
  required: false
  type: boolean
  default: true
delay_time:
  description: The time in seconds of delay added to the triggered state's **pending_time** before triggering the alarm.
  required: false
  type: integer
  default: 0
pending_time:
  description: The time in seconds of the pending time before effecting a state change.
  required: false
  type: integer
  default: 60
trigger_time:
  description: The time in seconds of the trigger time in which the alarm is firing.
  required: false
  type: integer
  default: 120
disarm_after_trigger:
  description: If true, the alarm will automatically disarm after it has been triggered instead of returning to the previous state.
  required: false
  type: boolean
  default: false
armed_home/armed_away/armed_night/disarmed/triggered:
  description: State specific settings
  required: false
  type: list
  keys:
    delay_time:
      description: State specific setting for **delay_time** (all states except **triggered**).
      required: false
      type: integer
    pending_time:
      description: State specific setting for **pending_time** (all states except **disarmed**).
      required: false
      type: integer
    trigger_time:
      description: State specific setting for **trigger_time** (all states except **triggered**).
      required: false
      type: integer
{% endconfiguration %}

See the documentation for the [manual alarm platform](/integrations/manual) for a description.

Additionally, the following MQTT configuration variables are also available.

{% configuration %}
state_topic:
  description: The MQTT topic Home Assistant will publish state updates to.
  required: true
  type: string
command_topic:
  description: The MQTT topic Home Assistant will subscribe to, to receive commands from a remote device to change the alarm state.
  required: true
  type: string
qos:
  description: The maximum QoS level for subscribing and publishing to MQTT messages.
  required: false
  type: integer
  default: 0
payload_disarm:
  description: The payload to disarm this Alarm Panel.
  required: false
  type: string
  default: DISARM
payload_arm_home:
  description: The payload to set armed-home mode on this Alarm Panel.
  required: false
  type: string
  default: ARM_HOME
payload_arm_away:
  description: The payload to set armed-away mode on this Alarm Panel.
  required: false
  type: string
  default: ARM_AWAY
payload_arm_night:
  description: The payload to set armed-night mode on this Alarm Panel.
  required: false
  type: string
  default: ARM_NIGHT
{% endconfiguration %}

### Examples

In the configuration example below:

- The disarmed state never triggers the alarm
- The armed_home state will leave no time to leave the building or disarm the alarm
- While other states state will give 30 seconds to leave the building before triggering the alarm, and 20 seconds to disarm the alarm when coming back
- Setting pending_time to 0 for triggered state allows the alarm to trigger after previous state's delay time only. If not set, the alarm will be pending for previous state's delay_time plus the default pending_time before triggering.

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  - platform: manual_mqtt
    state_topic: home/alarm
    command_topic: home/alarm/set
    pending_time: 30
    delay_time: 20
    trigger_time: 4
    disarmed:
      trigger_time: 0
    armed_home:
      pending_time: 0
      delay_time: 0
    triggered:
      pending_time: 0
```

Refer to the [Manual Alarm Control page](/integrations/manual#examples) for more real-life examples on how to use this panel.

### MQTT Control

The state of this alarm can be controlled using [MQTT](/integrations/mqtt/). Ensure you've configured that before adding this component.

To change the state of the alarm, publish one of the following messages to the `command_topic`:

 - `DISARM`
 - `ARM_HOME`
 - `ARM_AWAY`
 - `ARM_NIGHT`

To receive state updates from HA, subscribe to the `state_topic`. Home Assistant will publish a new message whenever the state changes:

 - `disarmed`
 - `armed_home`
 - `armed_away`
 - `armed_night`
 - `pending`
 - `triggered`

## Number

The `mqtt` Number platform allows you to integrate devices that might expose configuration options through MQTT into Home Assistant as a Number. Every time a message under the `topic` in the configuration is received, the number entity will be updated in Home Assisant and vice-versa, keeping the device and Home Assistant in-sync.

### Configuration

To enable MQTT Number in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
number:
  - platform: mqtt
    command_topic: my-device/threshold
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
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates. Must not be used together with `availability`.
  required: false
  type: string
availability_mode:
   description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
   required: false
   type: string
   default: latest
command_topic:
  description: The MQTT topic to publish commands to change the number.
  required: false
  type: string
device:
  description: "Information about the device this Number is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works through [MQTT discovery](/docs/mqtt/discovery/) and when [`unique_id`](#unique_id) is set."
  required: false
  type: map
  keys:
    connections:
      description: 'A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `"connections": ["mac", "02:5b:26:a8:dc:12"]`.'
      required: false
      type: list
    identifiers:
      description: 'A list of IDs that uniquely identify the device. For example a serial number.'
      required: false
      type: [list, string]
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
    sw_version:
      description: The firmware version of the device.
      required: false
      type: string
    via_device:
      description: 'Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device. This is used to show device topology in Home Assistant.'
      required: false
      type: string
icon:
  description: "[Icon](/docs/configuration/customizing-devices/#icon) for the entity."
  required: false
  type: icon
json_attributes_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the JSON dictionary from messages received on the `json_attributes_topic`."
  required: false
  type: template
json_attributes_topic:
  description: The MQTT topic subscribed to receive a JSON dictionary payload and then set as number attributes. Implies `force_update` of the current number state when a message is received on this topic.
  required: false
  type: string
name:
  description: The name of the Number.
  required: false
  type: string
optimistic:
  description: Flag that defines if number works in optimistic mode.
  required: false
  type: boolean
  default: "`true` if no `state_topic` defined, else `false`."
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
state_topic:
  description: The MQTT topic subscribed to receive number values.
  required: false
  type: string
unique_id:
  description: An ID that uniquely identifies this Number. If two Numbers have the same unique ID Home Assistant will raise an exception.
  required: false
  type: string
{% endconfiguration %}

<div class='note warning'>

Make sure that your topic matches exactly. `some-topic/` and `some-topic` are different topics.

</div>

## Room Presence

The `mqtt_room` sensor platform allows you to detect the indoor location of devices using MQTT clients.

### Configuration

To use this device tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: mqtt_room
    device_id: 123testid
```

{% configuration %}
device_id:
  description: The device id to track for this sensor.
  required: true
  type: string
name:
  description: The name of the sensor.
  required: false
  default: Room Sensor
  type: string
state_topic:
  description: The topic that contains all subtopics for the rooms.
  required: true
  type: string
timeout:
  description: "The time in seconds after which a room presence state is considered old. An example: device1 is reported at scanner1 with a distance of 1. No further updates are sent from scanner1. After 5 seconds scanner2 reports device1 with a distance of 2. The old location info is discarded in favor of the new scanner2 information as the timeout has passed."
  required: false
  default: 5
  type: integer
away_timeout:
  description: The time in seconds after which the state should be set to `not_home` if there were no updates. `0` disables the check.
  required: false
  default: 0
  type: integer
{% endconfiguration %}

### Usage

Example JSON that should be published to the room topics:

```json
{
  "id": "123testid",
  "name": "Test Device",
  "distance": 5.678
}
```

#### Setting up clients

This integration works with any software that is sending data in the given format. Each client should post the discovered devices in its own subtopic of the configured topic.
Instead of developing your own application, you can also use any of these already existing clients:

- [**room-assistant**](https://github.com/mKeRix/room-assistant): looks for Bluetooth LE beacons, based on Node.js
- [**Happy Bubbles Presence Server**](https://github.com/happy-bubbles/presence): presence detection server for Happy Bubbles BLE-scanning devices, based on Go
- [**ESP32-MQTT-room**](https://jptrsn.github.io/ESP32-mqtt-room/): runs on an ESP32, and looks for Bluetooth LE devices, based on C++/Arduino
- [**OpenMQTTGateway**](https://github.com/1technophile/OpenMQTTGateway): uses ESP32 Bluetooth Low Energy to scan BLE Broadcaster like smart watches/bands and much more to get sensor values

## Scene

The `mqtt` scene platform lets you control your MQTT enabled scenes.

### Configuration

To enable a MQTT scene in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
scene:
  - platform: mqtt
    command_topic: zigbee2mqtt/living_room_group/set
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
availability_mode:
  description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
  required: false
  type: string
  default: latest
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates. Must not be used together with `availability`.
  required: false
  type: string
command_topic:
  description: The MQTT topic to publish commands to change the switch state.
  required: false
  type: string
icon:
  description: Icon for the switch.
  required: false
  type: icon
name:
  description: The name to use when displaying this switch.
  required: false
  type: string
  default: MQTT Switch
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
unique_id:
  description: An ID that uniquely identifies this switch device. If two switches have the same unique ID, Home Assistant will raise an exception.
  required: false
  type: string
{% endconfiguration %}

<div class='note warning'>

Make sure that your topic matches exactly. `some-topic/` and `some-topic` are different topics.

</div>

### Examples

In this section, you will find some real-life examples of how to use this sensor.

### Full configuration

The example below shows a full configuration for a switch.

```yaml
# Example configuration.yaml entry
switch:
  - platform: mqtt
    unique_id: living_room_party_scene
    name: "Living Room Party Scene"
    command_topic: "home/living_room/party_scene/set"
    availability:
      - topic: "home/living_room/party_scene/available"
    payload_on: "ON"
    qos: 0
    retain: true
```

#### Use with a JSON Payload

The example below shows a configuration using a JSON payload.

```yaml
# Example configuration.yaml entry
scene:
  - platform: mqtt
    name: Living Room Blue Scene
    unique_id: living_room_blue_scene
    command_topic: "home/living_room/set"
    payload_on: '{"activate_scene": "Blue Scene"}'
```

## Sensor

This `mqtt` sensor platform uses the MQTT message payload as the sensor value. If messages in this `state_topic` are published with *RETAIN* flag, the sensor will receive an instant update with last known value. Otherwise, the initial state will be undefined.

### Configuration

To use your MQTT sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: mqtt
    state_topic: "home/bedroom/temperature"
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
availability_mode:
  description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
  required: false
  type: string
  default: latest
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates.
  required: false
  type: string
device:
  description: "Information about the device this sensor is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works through [MQTT discovery](/docs/mqtt/discovery/) and when [`unique_id`](#unique_id) is set."
  required: false
  type: map
  keys:
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
    sw_version:
      description: The firmware version of the device.
      required: false
      type: string
    via_device:
      description: 'Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device. This is used to show device topology in Home Assistant.'
      required: false
      type: string
device_class:
  description: The [type/class](/integrations/sensor/#device-class) of the sensor to set the icon in the frontend.
  required: false
  type: device_class
  default: None
expire_after:
  description: Defines the number of seconds after the sensor's state expires, if it's not updated. After expiry, the sensor's state becomes `unavailable`.
  required: false
  type: integer
  default: 0
force_update:
  description: Sends update events even if the value hasn't changed. Useful if you want to have meaningful value graphs in history.
  required: false
  type: boolean
  default: false
icon:
  description: "[Icon](/docs/configuration/customizing-devices/#icon) for the entity."
  required: false
  type: icon
json_attributes_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the JSON dictionary from messages received on the `json_attributes_topic`."
  required: false
  type: template
json_attributes_topic:
  description: The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes. Implies `force_update` of the current sensor state when a message is received on this topic.
  required: false
  type: string
name:
  description: The name of the MQTT sensor.
  required: false
  type: string
  default: MQTT Sensor
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
qos:
  description: The maximum QoS level of the state topic.
  required: false
  type: integer
  default: 0
state_topic:
  description: The MQTT topic subscribed to receive sensor values.
  required: true
  type: string
unique_id:
  description: "An ID that uniquely identifies this sensor. If two sensors have the same unique ID, Home Assistant will raise an exception."
  required: false
  type: string
unit_of_measurement:
  description: Defines the units of measurement of the sensor, if any.
  required: false
  type: string
value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the value."
  required: false
  type: template
{% endconfiguration %}

### Examples

In this section you find some real-life examples of how to use this sensor.

#### JSON attributes topic configuration

The example sensor below shows a configuration example which uses a JSON dict: `{"ClientName": <string>, "IP": <string>, "MAC": <string>, "RSSI": <string>, "HostName": <string>, "ConnectedSSID": <string>}` in a separate topic `home/sensor1/attributes` to add extra attributes. It also makes use of the `availability` topic.

Extra attributes will be displayed in the frontend and can also be extracted in [Templates](/docs/configuration/templating/#attributes). For example, to extract the `ClientName` attribute from the sensor below, use a template similar to: {% raw %}`{{ state_attr('sensor.bs_rssi', 'ClientName') }}`{% endraw %}.

{% raw %}
```yaml
# Example configuration.yaml entry
sensor:
  - platform: mqtt
    name: "RSSI"
    state_topic: "home/sensor1/infojson"
    unit_of_measurement: "dBm"
    value_template: "{{ value_json.RSSI }}"
    availability:
      - topic: "home/sensor1/status"
    payload_available: "online"
    payload_not_available: "offline"
    json_attributes_topic: "home/sensor1/attributes"
```
{% endraw %}

#### JSON attributes template configuration

The example sensor below shows a configuration example which uses a JSON dict: `{"Timer1":{"Arm": <status>, "Time": <time>}, "Timer2":{"Arm": <status>, "Time": <time>}}` on topic `tele/sonoff/sensor` with a template to add `Timer1.Arm` and `Timer1.Time` as extra attributes. To instead only add `Timer1.Arm`as an extra attribute, change `json_attributes_template` to: {% raw %}`"{{ {'Arm': value_json.Timer1} | tojson }}"`{% endraw %}.

Extra attributes will be displayed in the frontend and can also be extracted in [Templates](/docs/configuration/templating/#attributes). For example, to extract the `Arm` attribute from the sensor below, use a template similar to: {% raw %}`{{ state_attr('sensor.timer1', 'Arm') }}`{% endraw %}.

{% raw %}
```yaml
# Example configuration.yaml entry
sensor:
  - platform: mqtt
    name: "Timer 1"
    state_topic: "tele/sonoff/sensor"
    value_template: "{{ value_json.Timer1.Arm }}"
    json_attributes_topic: "tele/sonoff/sensor"
    json_attributes_template: "{{ value_json.Timer1 | tojson }}"
  - platform: mqtt
    name: "Timer 2"
    state_topic: "tele/sonoff/sensor"
    value_template: "{{ value_json.Timer2.Arm }}"
    json_attributes_topic: "tele/sonoff/sensor"
    json_attributes_template: "{{ value_json.Timer2 | tojson }}"
```
{% endraw %}

The state and the attributes of the sensor by design do not update in a synchronous manner if they share the same MQTT topic. Temporal mismatches between the state and the attribute data may occur if both the state and the attributes are changed simultaneously by the same MQTT message. An automation that triggers on any state change of the sensor will also trigger both on the change of the state or a change of the attributes. Such automations will be triggered twice if both the state and the attributes change. Please use a [MQTT trigger](/docs/automation/trigger/#mqtt-trigger) and process the JSON in the automation directly via the {% raw %}`{{ trigger.payload_json }}`{% endraw %} [trigger data](/docs/automation/templating/#mqtt) for automations that must synchronously handle multiple JSON values within the same MQTT message.

#### Owntracks battery level sensor

If you are using the [OwnTracks](/integrations/owntracks) and enable the reporting of the battery level then you can use an MQTT sensor to keep track of your battery. A regular MQTT message from OwnTracks looks like this:

```bash
owntracks/tablet/tablet {"_type":"location","lon":7.21,"t":"u","batt":92,"tst":144995643,"tid":"ta","acc":27,"lat":46.12}
```

Thus the trick is extracting the battery level from the payload.

{% raw %}
```yaml
# Example configuration.yaml entry
sensor:
  - platform: mqtt
    name: "Battery Tablet"
    state_topic: "owntracks/tablet/tablet"
    unit_of_measurement: "%"
    value_template: "{{ value_json.batt }}"
```
{% endraw %}

#### Temperature and humidity sensors

If you are using a DHT sensor and a NodeMCU board (esp8266), you can retrieve temperature and humidity with a MQTT sensor. A code example can be found [here](https://github.com/mertenats/open-home-automation/tree/master/ha_mqtt_sensor_dht22). A regular MQTT message from this example looks like this:

```json
office/sensor1
  {
    "temperature": 23.20,
    "humidity": 43.70
  }
```

Then use this configuration example to extract the data from the payload:

{% raw %}
```yaml
# Example configuration.yaml entry
sensor:
  - platform: mqtt
    name: "Temperature"
    state_topic: "office/sensor1"
    unit_of_measurement: "°C"
    value_template: "{{ value_json.temperature }}"
  - platform: mqtt
    name: "Humidity"
    state_topic: "office/sensor1"
    unit_of_measurement: "%"
    value_template: "{{ value_json.humidity }}"
```
{% endraw %}

#### Get sensor value from a device with ESPEasy

Assuming that you have flashed your ESP8266 unit with [ESPEasy](https://github.com/letscontrolit/ESPEasy). Under "Config" set a name ("Unit Name:") for your device (here it's "bathroom"). A "Controller" for MQTT with the protocol "OpenHAB MQTT" is present and the entries ("Controller Subscribe:" and "Controller Publish:") are adjusted to match your needs. In this example the topics are prefixed with "home". Please keep in mind that the ESPEasy default topics start with a `/` and only contain the name when writing your entry for the `configuration.yaml` file.

- **Controller Subscribe**: `home/%sysname%/#` (instead of `/%sysname%/#`)
- **Controller Publish**: `home/%sysname%/%tskname%/%valname%` (instead of `/%sysname%/%tskname%/%valname%`)

Also, add a sensor in the "Devices" tap with the name "analog" and "brightness" as value.

As soon as the unit is online, you will get the state of the sensor.

```bash
home/bathroom/status Connected
...
home/bathroom/analog/brightness 290.00
```

The configuration will look like the example below:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: mqtt
    name: "Brightness"
    state_topic: "home/bathroom/analog/brightness"
```

## Statestream

The `mqtt_statestream` integration publishes state changes in Home Assistant to individual MQTT topics.

### Configuration

To enable MQTT Statestream in Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
mqtt_statestream:
  base_topic: homeassistant
  publish_attributes: true
  publish_timestamps: true
```

{% configuration %}
base_topic:
  description: Base topic used to generate the actual topic used to publish.
  required: true
  type: string
publish_attributes:
  description: Publish attributes of the entity as well as the state.
  required: false
  default: false
  type: boolean
publish_timestamps:
  description: Publish the last_changed and last_updated timestamps for the entity.
  required: false
  default: false
  type: boolean
exclude:
  description: Configure which integrations should be excluded from recordings. ([Configure Filter](#configure-filter))
  required: false
  type: list
  keys:
    entities:
      description: The list of entity ids to be excluded from recordings.
      required: false
      type: list
    entity_globs:
      description: Exclude all entities matching a listed pattern from recordings (e.g., `sensor.weather_*`).
      required: false
      type: list
    domains:
      description: The list of domains to be excluded from recordings.
      required: false
      type: list
include:
  description: Configure which integrations should be included in recordings. If set, all other entities will not be recorded. ([Configure Filter](#configure-filter))
  required: false
  type: list
  keys:
    entities:
      description: The list of entity ids to be included from recordings.
      required: false
      type: list
    entity_globs:
      description: Include all entities matching a listed pattern in recordings (e.g., `sensor.weather_*`).
      required: false
      type: list
    domains:
      description: The list of domains to be included from recordings.
      required: false
      type: list
{% endconfiguration %}

#### Configure Filter

By default, no entity will be excluded. To limit which entities are being exposed to `MQTT Statestream`, you can use the `include` and `exclude` parameters.

```yaml
# Example filter to include specified domains and exclude specified entities
mqtt_statestream:
  base_topic: homeassistant
  include:
    domains:
      - alarm_control_panel
      - light
    entity_globs:
      - binary_sensor.*_occupancy
  exclude:
    entities:
      - light.kitchen_light
```

Filters are applied as follows:

1. No includes or excludes - pass all entities
2. Includes, no excludes - only include specified entities
3. Excludes, no includes - only exclude specified entities
4. Both includes and excludes:
   - Include domain and/or glob patterns specified
      - If domain is included, and entity not excluded or match exclude glob pattern, pass
      - If entity matches include glob pattern, and entity does not match any exclude criteria (domain, glob pattern or listed), pass
      - If domain is not included, glob pattern does not match, and entity not included, fail
   - Exclude domain and/or glob patterns specified and include does not list domains or glob patterns
      - If domain is excluded and entity not included, fail
      - If entity matches exclude glob pattern and entity not included, fail
      - If entity does not match any exclude criteria (domain, glob pattern or listed), pass
   - Neither include or exclude specifies domains or glob patterns
      - If entity is included, pass (as #2 above)
      - If entity include and exclude, the entity exclude is ignored

#### Common filtering examples

```yaml
# Example of excluding entities
mqtt_statestream:
  base_topic: homeassistant
  exclude:
    domains:
      - switch
    entities:
      - sensor.nopublish
```

In the above example, all entities except for *switch.x* and *sensor.nopublish* will be published to MQTT.

```yaml
# Example of excluding entities
mqtt_statestream:
  base_topic: homeassistant
  include:
    domains:
      - sensor
    entities:
      - lock.important
```

In this example, only *sensor.x* and *lock.important* will be published.

```yaml
# Example of excluding entities
mqtt_statestream:
  base_topic: homeassistant
  include:
    domains:
      - sensor
  exclude:
    entities:
      - sensor.noshow
```

In this example, all sensors except for *sensor.noshow* will be published.

### Operation

When any Home Assistant entity changes, this integration will publish that change to MQTT.

The topic for each entity is different, so you can easily subscribe other systems to just the entities you are interested in.
The topic will be in the form `base_topic/domain/entity/state`.

For example, with the example configuration above, if an entity called 'light.master_bedroom_dimmer' is turned on, this integration will publish `on` to `homeassistant/light/master_bedroom_dimmer/state`.

If that entity also has an attribute called `brightness`, the integration will also publish the value of that attribute to `homeassistant/light/master_bedroom_dimmer/brightness`.

All states and attributes are passed through JSON serialization before publishing. **Please note** that this causes strings to be quoted (e.g., the string 'on' will be published as '"on"'). You can access the JSON deserialized values (as well as unquoted strings) at many places by using `value_json` instead of `value`.

The last_updated and last_changed values for the entity will be published to `homeassistant/light/master_bedroom_dimmer/last_updated` and `homeassistant/light/master_bedroom_dimmer/last_changed`, respectively. The timestamps are in ISO 8601 format - for example, `2017-10-01T23:20:30.920969+00:00`.

## Switch

The `mqtt` switch platform lets you control your MQTT enabled switches.

### Configuration

In an ideal scenario, the MQTT device will have a `state_topic` to publish state changes. If these messages are published with a `RETAIN` flag, the MQTT switch will receive an instant state update after subscription, and will start with the correct state. Otherwise, the initial state of the switch will be `false` / `off`.

When a `state_topic` is not available, the switch will work in optimistic mode. In this mode, the switch will immediately change state after every command. Otherwise, the switch will wait for state confirmation from the device (message from `state_topic`).

Optimistic mode can be forced, even if the `state_topic` is available. Try to enable it, if experiencing incorrect switch operation.

To enable this switch in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: mqtt
    command_topic: "home/bedroom/switch1/set"
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
availability_mode:
  description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
  required: false
  type: string
  default: latest
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates. Must not be used together with `availability`.
  required: false
  type: string
command_topic:
  description: The MQTT topic to publish commands to change the switch state.
  required: false
  type: string
device:
  description: "Information about the device this switch is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works through [MQTT discovery](/docs/mqtt/discovery/) and when [`unique_id`](#unique_id) is set."
  required: false
  type: map
  keys:
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
    sw_version:
      description: The firmware version of the device.
      required: false
      type: string
    via_device:
      description: 'Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device. This is used to show device topology in Home Assistant.'
      required: false
      type: string
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
name:
  description: The name to use when displaying this switch.
  required: false
  type: string
  default: MQTT Switch
optimistic:
  description: Flag that defines if switch works in optimistic mode.
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
unique_id:
  description: An ID that uniquely identifies this switch device. If two switches have the same unique ID, Home Assistant will raise an exception.
  required: false
  type: string
value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract device's state from the `state_topic`. To determine the switches's state result of this template will be compared to `state_on` and `state_off`."
  required: false
  type: string
{% endconfiguration %}

<div class='note warning'>

Make sure that your topic matches exactly. `some-topic/` and `some-topic` are different topics.

</div>

### Examples

In this section, you will find some real-life examples of how to use this sensor.

#### Full configuration

The example below shows a full configuration for a switch.

```yaml
# Example configuration.yaml entry
switch:
  - platform: mqtt
    unique_id: bedroom_switch
    name: "Bedroom Switch"
    state_topic: "home/bedroom/switch1"
    command_topic: "home/bedroom/switch1/set"
    availability:
      - topic: "home/bedroom/switch1/available"
    payload_on: "ON"
    payload_off: "OFF"
    state_on: "ON"
    state_off: "OFF"
    optimistic: false
    qos: 0
    retain: true
```

For a check, you can use the command line tools `mosquitto_pub` shipped with `mosquitto` to send MQTT messages. This allows you to operate your switch manually:

```bash
mosquitto_pub -h 127.0.0.1 -t home/bedroom/switch1 -m "ON"
```

#### Set the state of a device with ESPEasy

Assuming that you have flashed your ESP8266 unit with [ESPEasy](https://github.com/letscontrolit/ESPEasy). Under "Config" is a name ("Unit Name:") set for your device (here it's "bathroom"). A configuration for a "Controller" for MQTT with the protocol "OpenHAB MQTT" is present and the entries ("Controller Subscribe:" and "Controller Publish:") are adjusted to match your needs. In this example, the topics are prefixed with "home". There is no further configuration needed as the [GPIOs](https://www.letscontrolit.com/wiki/index.php/GPIO) can be controlled with MQTT directly.

Manually you can set pin 13 to high with `mosquitto_pub` or another MQTT tool:

```bash
mosquitto_pub -h 127.0.0.1 -t home/bathroom/gpio/13 -m "1"
```

The configuration will look like the example below:

```yaml
# Example configuration.yaml entry
switch:
  - platform: mqtt
    name: bathroom
    state_topic: "home/bathroom/gpio/13"
    command_topic: "home/bathroom/gpio/13"
    payload_on: "1"
    payload_off: "0"
```

## Tag Scanner

The `mqtt` tag scanner platform uses an MQTT message payload to generate tag scanned events.

### Configuration

MQTT scanners are only supported through [MQTT discovery](/docs/mqtt/discovery/), manual setup through `configuration.yaml` is not supported.
The discovery topic needs to be: `<discovery_prefix>/tag/[<node_id>/]<object_id>/config`.

{% configuration %}
topic:
  description: The MQTT topic subscribed to receive tag scanned events.
  required: true
  type: string
value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) that returns a tag ID."
  required: false
  type: string
device:
  description: "Information about the device this device trigger is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html)."
  required: true
  type: map
  keys:
    connections:
      description: "A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `'connections': ['mac', '02:5b:26:a8:dc:12']`."
      required: false
      type: [list, map]
    identifiers:
      description: A list of IDs that uniquely identify the device. For example a serial number.
      required: false
      type: [list, string]
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
    sw_version:
      description: The firmware version of the device.
      required: false
      type: string
    via_device:
      description: 'Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device. This is used to show device topology in Home Assistant.'
      required: false
      type: string
{% endconfiguration %}

### Examples

In this section, you will find some real-life examples of how to use this sensor.

#### Full configuration with tag ID extracted from JSON data

This is an example of a configuration where the tag ID is extracted from a JSON formatted MQTT message.
To test, you can use the command line tool `mosquitto_pub` shipped with `mosquitto` or the `mosquitto-clients` package to send MQTT messages.

Discover the tag scanner:

```bash
mosquitto_pub -h 127.0.0.1 -t homeassistant/tag/0AFFD2/config -m '{"topic": "0AFFD2/tag_scanned", "value_template": "{{ value_json.PN532.UID }}"}'
```

Generate tag scanned event:

{% raw %}

```bash
mosquitto_pub -h 127.0.0.1 -t 0AFFD2/tag_scanned -m '{"Time":"2020-09-28T17:02:10","PN532":{"UID":"E9F35959", "DATA":"ILOVETASMOTA"}}'
```

{% endraw %}

## Vacuum

The `mqtt` vacuum integration allows you to control your MQTT-enabled vacuum.
There are two possible message schemas - `legacy` and `state`, chosen by setting the `schema` configuration parameter.
New installations should use the `state` schema as `legacy` is deprecated and might be removed someday in the future.
The `state` schema is preferred because the vacuum will then be represented as a `StateVacuumDevice` which is the preferred parent vacuum entity.

This documentation has 3 sections. Configuration for `legacy` vacuum with examples, configuration for `state` vacuum with examples and shared section with examples which are the same for both schemas.

### Configuration

To add your MQTT vacuum to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
vacuum:
  - platform: mqtt
```

### Legacy Configuration

Legacy MQTT vacuum configuration section.

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
availability_mode:
  description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
  required: false
  type: string
  default: latest
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates. Must not be used together with `availability`.
  required: false
  type: string
battery_level_template:
  description: Defines a [template](/topics/templating/) to define the battery level of the vacuum. This is required if `battery_level_topic` is set.
  required: false
  type: string
battery_level_topic:
  description: The MQTT topic subscribed to receive battery level values from the vacuum.
  required: false
  type: string
charging_template:
  description: Defines a [template](/topics/templating/) to define the charging state of the vacuum. This is required if `charging_topic` is set.
  required: false
  type: string
charging_topic:
  description: The MQTT topic subscribed to receive charging state values from the vacuum.
  required: false
  type: string
cleaning_template:
  description: Defines a [template](/topics/templating/) to define the cleaning state of the vacuum. This is required if `cleaning_topic` is set.
  required: false
  type: string
cleaning_topic:
  description: The MQTT topic subscribed to receive cleaning state values from the vacuum.
  required: false
  type: string
command_topic:
  description: The MQTT topic to publish commands to control the vacuum.
  required: false
  type: string
docked_template:
  description: Defines a [template](/topics/templating/) to define the docked state of the vacuum. This is required if `docked_topic` is set.
  required: false
  type: string
docked_topic:
  description: The MQTT topic subscribed to receive docked state values from the vacuum.
  required: false
  type: string
error_template:
  description: Defines a [template](/topics/templating/) to define potential error messages emitted by the vacuum. This is required if `error_topic` is set.
  required: false
  type: string
error_topic:
  description: The MQTT topic subscribed to receive error messages from the vacuum.
  required: false
  type: string
fan_speed_list:
  description: List of possible fan speeds for the vacuum.
  required: false
  type: [string, list]
fan_speed_template:
  description: Defines a [template](/topics/templating/) to define the fan speed of the vacuum. This is required if `fan_speed_topic` is set.
  required: false
  type: string
fan_speed_topic:
  description: The MQTT topic subscribed to receive fan speed values from the vacuum.
  required: false
  type: string
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
name:
  description: The name of the vacuum.
  required: false
  type: string
  default: MQTT Vacuum
payload_available:
  description: The payload that represents the available state.
  required: false
  type: string
  default: online
payload_clean_spot:
  description: The payload to send to the `command_topic` to begin a spot cleaning cycle.
  required: false
  type: string
  default: clean_spot
payload_locate:
  description: The payload to send to the `command_topic` to locate the vacuum (typically plays a song).
  required: false
  type: string
  default: locate
payload_not_available:
  description: The payload that represents the unavailable state.
  required: false
  type: string
  default: offline
payload_return_to_base:
  description: The payload to send to the `command_topic` to tell the vacuum to return to base.
  required: false
  type: string
  default: return_to_base
payload_start_pause:
  description: The payload to send to the `command_topic` to start or pause the vacuum.
  required: false
  type: string
  default: start_pause
payload_stop:
  description: The payload to send to the `command_topic` to stop the vacuum.
  required: false
  type: string
  default: stop
payload_turn_off:
  description: The payload to send to the `command_topic` to turn the vacuum off.
  required: false
  type: string
  default: turn_off
payload_turn_on:
  description: The payload to send to the `command_topic` to begin the cleaning cycle.
  required: false
  type: string
  default: turn_on
qos:
  description: The maximum QoS level of the state topic.
  required: false
  type: integer
  default: 0
retain:
  description: If the published message should have the retain flag on or not.
  required: false
  type: boolean
  default: false
schema:
  description: The schema to use. Must be `legacy` or omitted to select the legacy schema.
  required: false
  type: string
  default: legacy
send_command_topic:
  description: The MQTT topic to publish custom commands to the vacuum.
  required: false
  type: string
set_fan_speed_topic:
  description: The MQTT topic to publish commands to control the vacuum's fan speed.
  required: false
  type: string
supported_features:
  description: List of features that the vacuum supports (possible values are `turn_on`, `turn_off`, `pause`, `stop`, `return_home`, `battery`, `status`, `locate`, `clean_spot`, `fan_speed`, `send_command`).
  required: false
  type: [string, list]
  default: "`turn_on`, `turn_off`, `stop`, `return_home`, `status`, `battery`, `clean_spot`"
unique_id:
   description: An ID that uniquely identifies this vacuum. If two vacuums have the same unique ID, Home Assistant will raise an exception.
   required: false
   type: string
{% endconfiguration %}

#### Legacy configuration example

{% raw %}

```yaml
# Example configuration.yaml entry
vacuum:
  - platform: mqtt
    name: "MQTT Vacuum"
    supported_features:
      - turn_on
      - turn_off
      - pause
      - stop
      - return_home
      - battery
      - status
      - locate
      - clean_spot
      - fan_speed
      - send_command
    command_topic: "vacuum/command"
    battery_level_topic: "vacuum/state"
    battery_level_template: "{{ value_json.battery_level }}"
    charging_topic: "vacuum/state"
    charging_template: "{{ value_json.charging }}"
    cleaning_topic: "vacuum/state"
    cleaning_template: "{{ value_json.cleaning }}"
    docked_topic: "vacuum/state"
    docked_template: "{{ value_json.docked }}"
    error_topic: "vacuum/state"
    error_template: "{{ value_json.error }}"
    fan_speed_topic: "vacuum/state"
    fan_speed_template: "{{ value_json.fan_speed }}"
    set_fan_speed_topic: "vacuum/set_fan_speed"
    fan_speed_list:
      - min
      - medium
      - high
      - max
    send_command_topic: "vacuum/send_command"
```

{% endraw %}

#### Legacy MQTT Protocol

The above configuration for this integration expects an MQTT protocol like the following.
See also [Shared MQTT Protocol](#shared-mqtt-protocol).

##### Legacy Basic Commands

MQTT topic: `vacuum/command`

Possible MQTT payloads:

- `turn_on` - Begin cleaning
- `turn_off` - Turn the Vacuum off
- `return_to_base` - Return to base/dock
- `stop` - Stop the Vacuum
- `clean_spot` - Initialize a spot cleaning cycle
- `locate` - Locate the vacuum (typically by playing a song)
- `start_pause` - Toggle the vacuum between cleaning and stopping

##### Status/Sensor Updates

MQTT topic: `vacuum/state`

MQTT payload:

```json
{
    "battery_level": 61,
    "docked": true,
    "cleaning": false,
    "charging": true,
    "fan_speed": "off",
    "error": "Error message"
}
```

### State Configuration

State MQTT vacuum configuration section.

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
availability_mode:
  description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
  required: false
  type: string
  default: latest
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates. Must not be used together with `availability`.
  required: false
  type: string
command_topic:
  description: The MQTT topic to publish commands to control the vacuum.
  required: false
  type: string
device:
  description: "Information about the device this switch is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works through [MQTT discovery](/docs/mqtt/discovery/) and when [`unique_id`](#unique_id) is set."
  required: false
  type: map
  keys:
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
    sw_version:
      description: The firmware version of the device.
      required: false
      type: string
    via_device:
      description: 'Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device. This is used to show device topology in Home Assistant.'
      required: false
      type: string
fan_speed_list:
  description: List of possible fan speeds for the vacuum.
  required: false
  type: [string, list]
json_attributes_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the JSON dictionary from messages received on the `json_attributes_topic`. Usage example can be found in [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-template-configuration) documentation."
  required: false
  type: template
json_attributes_topic:
  description: The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes. Usage example can be found in [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-topic-configuration) documentation.
  required: false
  type: string
name:
  description: The name of the vacuum.
  required: false
  type: string
  default: MQTT Vacuum
payload_available:
  description: The payload that represents the available state.
  required: false
  type: string
  default: online
payload_clean_spot:
  description: The payload to send to the `command_topic` to begin a spot cleaning cycle.
  required: false
  type: string
  default: clean_spot
payload_locate:
  description: The payload to send to the `command_topic` to locate the vacuum (typically plays a song).
  required: false
  type: string
  default: locate
payload_not_available:
  description: The payload that represents the unavailable state.
  required: false
  type: string
  default: offline
payload_pause:
  description: The payload to send to the `command_topic` to pause the vacuum.
  required: false
  type: string
  default: pause
payload_return_to_base:
  description: The payload to send to the `command_topic` to tell the vacuum to return to base.
  required: false
  type: string
  default: return_to_base
payload_start:
  description: "The payload to send to the `command_topic` to begin the cleaning cycle."
  required: false
  type: string
  default: start
payload_stop:
  description: "The payload to send to the `command_topic` to stop cleaning."
  required: false
  type: string
  default: stop
qos:
  description: The maximum QoS level of the state topic.
  required: false
  type: integer
  default: 0
retain:
  description: If the published message should have the retain flag on or not.
  required: false
  type: boolean
  default: false
schema:
  description: The schema to use. Must be `state` to select the state schema.
  required: false
  type: string
  default: legacy
send_command_topic:
  description: The MQTT topic to publish custom commands to the vacuum.
  required: false
  type: string
set_fan_speed_topic:
  description: The MQTT topic to publish commands to control the vacuum's fan speed.
  required: false
  type: string
state_topic:
  description: "The MQTT topic subscribed to receive state messages from the vacuum. Messages received on the `state_topic` must be a valid JSON dictionary, with a mandatory `state` key and optionally `battery_level` and `fan_speed` keys as shown in the [example](#state-mqtt-protocol)."
  required: false
  type: string
supported_features:
  description: "List of features that the vacuum supports (possible values are `start`, `stop`, `pause`, `return_home`, `battery`, `status`, `locate`, `clean_spot`, `fan_speed`, `send_command`)."
  required: false
  type: [string, list]
  default: "`start`, `stop`, `return_home`, `status`, `battery`, `clean_spot`"
unique_id:
   description: An ID that uniquely identifies this vacuum. If two vacuums have the same unique ID, Home Assistant will raise an exception.
   required: false
   type: string
{% endconfiguration %}

#### State configuration example

```yaml
# Example configuration.yaml entry
vacuum:
  - platform: mqtt
    name: "MQTT Vacuum"
    schema: state
    supported_features:
      - start
      - pause
      - stop
      - return_home
      - battery
      - status
      - locate
      - clean_spot
      - fan_speed
      - send_command
    command_topic: "vacuum/command"
    state_topic: "vacuum/state"
    set_fan_speed_topic: "vacuum/set_fan_speed"
    fan_speed_list:
      - min
      - medium
      - high
      - max
    send_command_topic: "vacuum/send_command"
```

#### State MQTT Protocol

The above configuration for this integration expects an MQTT protocol like the following.
See also [Shared MQTT Protocol](#shared-mqtt-protocol).

##### State Basic Commands

MQTT topic: `vacuum/command`

Possible MQTT payloads:

- `start` - Start cleaning
- `pause` - Pause cleaning
- `return_to_base` - Return to base/dock
- `stop` - Stop the vacuum.
- `clean_spot` - Initialize a spot cleaning cycle
- `locate` - Locate the vacuum (typically by playing a song)

##### Send Custom Command

Vacuum send_command allows three parameters:

- entity_id
- command
- params - optional

If params are not provided it sends command as payload to MQTT send_command topic.
If params are provided service sends JSON as payload with such structure:

```json
{
  'command': 'command',
  'param1-key': 'param1-value'
}
```

Service trigger example:

```yaml
- alias: "Push command based on sensor"
    trigger:
      - platform: state
        entity_id: sensor.sensor
    action:
      service: vacuum.send_command
      target:
        entity_id: vacuum.vacuum_entity
      data:
        command: "custom_command"
        params:
          - key: value
```

MQTT topic: `vacuum/send_command`

##### Status/Sensor Updates

MQTT topic: `vacuum/state`

MQTT payload:

```json
{
    "battery_level": 61,
    "state": "docked",
    "fan_speed": "off"
}
```

State has to be one of vacuum states supported by Home Assistant:

- cleaning,
- docked,
- paused,
- idle,
- returning,
- error.

### Shared MQTT Protocol

The configuration for this integration expects an MQTT protocol like the following.
These services are identical for both - legacy and state vacuum.

#### Set Fan Speed

MQTT topic: `vacuum/set_fan_speed`

Possible MQTT payloads:

- `min` - Minimum fan speed
- `medium` - Medium fan speed
- `high` - High fan speed
- `max` - Max fan speed

#### Send Custom Command

Vacuum send_command allows three parameters:

- entity_id
- command
- params - optional

If params are not provided it sends command as payload to MQTT send_command topic.
If params are provided service sends JSON as payload with such structure:

```json
{
  'command': 'command',
  'param1-key': 'param1-value'
}
```

Service trigger example:

```yaml
- alias: "Push command based on sensor"
    trigger:
      - platform: state
        entity_id: sensor.sensor
    action:
      service: vacuum.send_command
      target:
        entity_id: vacuum.vacuum_entity
      data:
        command: "custom_command"
        params:
          - key: value
```

MQTT topic: `vacuum/send_command`

### Usage examples

#### Usage with cloudless Xiaomi vacuums

This integration is supported by the cloud-free Xiaomi Vacuum Webinterface [Valetudo](https://github.com/Hypfer/Valetudo).

#### Retrofitting non-wifi vacuums

- Retrofitting your old Roomba with an ESP8266. [This repository](https://github.com/johnboiles/esp-roomba-mqtt) provides MQTT client firmware.
- If you own a non-wifi Neato, you can refer to [this repository](https://github.com/jeroenterheerdt/neato-serial) that uses a Raspberry Pi to retrofit an old Neato.
