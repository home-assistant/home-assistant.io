---
title: "MQTT Vacuum"
description: "Instructions on how to integrate your MQTT enabled Vacuum within Home Assistant."
ha_category:
  - Vacuum
ha_release: 0.54
ha_domain: mqtt
---

The `mqtt` vacuum integration allows you to control your MQTT-enabled vacuum.
There are two possible message schemas - `legacy` and `state`, chosen by setting the `schema` configuration parameter.
New installations should use the `state` schema as `legacy` is deprecated and might be removed someday in the future.
The `state` schema is preferred because the vacuum will then be represented as a `StateVacuumDevice` which is the preferred parent vacuum entity.

This documentation has 3 sections. Configuration for `legacy` vacuum with examples, configuration for `state` vacuum with examples and shared section with examples which are the same for both schemas.

## Configuration

To add your MQTT vacuum to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
vacuum:
  - platform: mqtt
```

## Legacy Configuration

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

### Legacy configuration example

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

### Legacy MQTT Protocol

The above configuration for this integration expects an MQTT protocol like the following.
See also [Shared MQTT Protocol](#shared-mqtt-protocol).

#### Legacy Basic Commands

MQTT topic: `vacuum/command`

Possible MQTT payloads:

- `turn_on` - Begin cleaning
- `turn_off` - Turn the Vacuum off
- `return_to_base` - Return to base/dock
- `stop` - Stop the Vacuum
- `clean_spot` - Initialize a spot cleaning cycle
- `locate` - Locate the vacuum (typically by playing a song)
- `start_pause` - Toggle the vacuum between cleaning and stopping

#### Status/Sensor Updates

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

## State Configuration

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

### State configuration example

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

### State MQTT Protocol

The above configuration for this integration expects an MQTT protocol like the following.
See also [Shared MQTT Protocol](#shared-mqtt-protocol).

#### State Basic Commands

MQTT topic: `vacuum/command`

Possible MQTT payloads:

- `start` - Start cleaning
- `pause` - Pause cleaning
- `return_to_base` - Return to base/dock
- `stop` - Stop the vacuum.
- `clean_spot` - Initialize a spot cleaning cycle
- `locate` - Locate the vacuum (typically by playing a song)

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

#### Status/Sensor Updates

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

## Shared MQTT Protocol

The configuration for this integration expects an MQTT protocol like the following.
These services are identical for both - legacy and state vacuum.

### Set Fan Speed

MQTT topic: `vacuum/set_fan_speed`

Possible MQTT payloads:

- `min` - Minimum fan speed
- `medium` - Medium fan speed
- `high` - High fan speed
- `max` - Max fan speed

### Send Custom Command

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

## Usage examples

### Usage with cloudless Xiaomi vacuums

This integration is supported by the cloud-free Xiaomi Vacuum Webinterface [Valetudo](https://github.com/Hypfer/Valetudo).

### Retrofitting non-wifi vacuums

- Retrofitting your old Roomba with an ESP8266. [This repository](https://github.com/johnboiles/esp-roomba-mqtt) provides MQTT client firmware.
- If you own a non-wifi Neato, you can refer to [this repository](https://github.com/jeroenterheerdt/neato-serial) that uses a Raspberry Pi to retrofit an old Neato.
