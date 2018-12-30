---
layout: page
title: "MQTT Cover"
description: "Instructions on how to integrate MQTT covers into Home Assistant."
date: 2016-09-28 17:30
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
ha_category: Cover
ha_iot_class: "depends"
ha_release: 0.18
---

The `mqtt` cover platform allows you to control an MQTT cover (such as blinds, a rollershutter or a garage door).

## {% linkable_title Configuration %}

The device state (`open` or `closed`) will be updated only after a new message is published on `state_topic` matching `state_open` or `state_closed`. If these messages are published with the `retain` flag set, the cover will receive an instant state update after subscription and Home Assistant will display the correct state on startup. Otherwise, the initial state displayed in Home Assistant will be `unknown`.
`state_topic` can only manage `state_open` and `state_closed`. No percentage positons etc.

For this purpose is `position_topic` which can set state of the cover and positon.
Default setting are 0 means the device is `closed` and all other intermediate positions means the device is `open`.
`position_topic` is managed by `position_open` and `position_closed`
You can set it up in opossite way as well.
If position topic is defined than state topic is ignored.

If a state topic and position topic are not defined, the cover will work in optimistic mode. In this mode, the cover will immediately change state (`open` or `closed`) after every command sent by Home Assistant. If a state topic/position topic is defined, the cover will wait for a message on `state_topic` or `position_topic`.

Optimistic mode can be forced, even if a `state_topic` / `position_topic` is defined. Try to enable it if experiencing incorrect cover operation (Google Assistant gauge may need optimistic mode as it often send request to your Home Assistant immediately after send set_cover_position in which case MQTT could be too slow).

The `mqtt` cover platform optionally supports an `availability_topic` to receive online and offline messages (birth and LWT messages) from the MQTT cover device. During normal operation, if the MQTT cover device goes offline (i.e. publishes `payload_not_available` to `availability_topic`), Home Assistant will display the cover as "unavailable". If these messages are published with the `retain` flag set, the cover will receive an instant update after subscription and Home Assistant will display correct availability state of the cover when Home Assistant starts up. If the `retain` flag is not set, Home Assistant will display the cover as "unavailable" when Home Assistant starts up.

To use your MQTT cover in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
cover:
  - platform: mqtt
    command_topic: "home-assistant/cover/set"
```

{% configuration %}
command_topic:
  description: The MQTT topic to publish commands to control the cover.
  required: false
  type: string
name:
  description: The name of the cover.
  required: false
  type: string
  default: MQTT Cover
payload_open:
  description: The command payload that opens the cover.
  required: false
  type: string
  default: OPEN
payload_close:
  description: The command payload that closes the cover.
  required: false
  type: string
  default: CLOSE
payload_stop:
  description: The command payload that stops the cover.
  required: false
  type: string
  default: STOP
state_topic:
  description: The MQTT topic subscribed to receive cover state messages. Use only if not using get_position_topic. State topic can only read open/close state. Cannot read position state.
  required: false
  type: string
state_open:
  description: The payload that represents the open state.
  required: false
  type: string
  default: open
state_closed:
  description: The payload that represents the closed state.
  required: false
  type: string
  default: closed
position_topic:
  description: The MQTT topic subscribed to receive cover position messages. Always in favor if used together with state_topic.
  required: false
  type: integer
position_open:
  description: Number which represents open position.
  required: false
  type: integer
  default: 100
position_closed:
  description: Number which represents closed position.
  required: false
  type: integer
  default: 0
availability_topic:
  description: "The MQTT topic subscribed to to receive birth and LWT messages from the MQTT cover device. If `availability_topic` is not defined, the cover availability state will always be `available`. If `availability_topic` is defined, the cover availability state will be `unavailable` by default."
  required: false
  type: string
payload_available:
  description: The payload that represents the online state.
  required: false
  type: string
  default: online
payload_not_available:
  description: The payload that represents the offline state.
  required: false
  type: string
  default: offline
optimistic:
  description: Flag that defines if switch works in optimistic mode.
  required: false
  type: string
  default: "`true` if no state topic defined, else `false`."
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
value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the payload."
  required: false
  type: string
set_position_topic:
  description: "The MQTT topic to publish position commands to. You need to set position_topic as well if you want to use position topic. Use template if position topic wants different values than within range `position_closed` - `position_open`. If template is not defined and `position_closed != 100` and `position_open != 0` then proper position value is calculated from percentage position."
  required: false
  type: string
set_position_template:
  description: "Defines a [template](/topics/templating/) to define the position to be sent to the `set_position_topic` topic. Incoming position value is available for use in the template `{{position}}`. If no template is defined, the position (0-100) will be calculated according to `position_open` and `position_closed` values."
  required: false
  type: string
tilt_command_topic:
  description: The MQTT topic to publish commands to control the cover tilt.
  required: false
  type: string
tilt_status_topic:
  description: The MQTT topic subscribed to receive tilt status update values.
  required: false
  type: string
tilt_min:
  description: The minimum tilt value.
  required: false
  type: integer
  default: 0
tilt_max:
  description: The maximum tilt value
  required: false
  type: integer
  default: 100
tilt_closed_value:
  description: The value that will be sent on a `close_cover_tilt` command.
  required: false
  type: integer
  default: 0
tilt_opened_value:
  description: The value that will be sent on an `open_cover_tilt` command.
  required: false
  type: integer
  default: 0
tilt_status_optimistic:
  description: Flag that determines if tilt works in optimistic mode.
  required: false
  type: boolean
  default: "`true` if `tilt_status_topic` is not defined, else `false`"
tilt_invert_state:
  description: Flag that determines if open/close are flipped; higher values toward closed and lower values toward open.
  required: false
  type: boolean
  default: false
unique_id:
  description: An ID that uniquely identifies this cover. If two covers have the same unique ID, Home Assistant will raise an exception.
  required: false
  type: string
device:
  description: "Information about the device this cover is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works through [MQTT discovery](/docs/mqtt/discovery/) and when [`unique_id`](#unique_id) is set."
  required: false
  type: map
  keys:
    identifiers:
      description: 'A list of IDs that uniquely identify the device. For example a serial number.'
      required: false
      type: list, string
    connections:
      description: 'A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `"connections": ["mac", "02:5b:26:a8:dc:12"]`.'
      required: false
      type: list
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
{% endconfiguration %}

## {% linkable_title Examples %}

In this section you will find some real-life examples of how to use this platform.

### {% linkable_title Full configuration state topic without tilt %}

The example below shows a full configuration for a cover without tilt with state topic only.

{% raw %}
```yaml
# Example configuration.yaml entry
cover:
  - platform: mqtt
    name: "MQTT Cover"
    command_topic: "home-assistant/cover/set"
    state_topic: "home-assistant/cover/state"
    availability_topic: "home-assistant/cover/availability"
    qos: 0
    retain: true
    payload_open: "OPEN"
    payload_close: "CLOSE"
    payload_stop: "STOP"
    state_open: "open"
    state_closed: "closed"
    payload_available: "online"
    payload_not_available: "offline"
    optimistic: false
    value_template: '{{ value.x }}'
```
{% endraw %}

### {% linkable_title Full configuration position topic without tilt %}

The example below shows a full configuration for a cover without tilt with position topic.

{% raw %}
```yaml
# Example configuration.yaml entry
cover:
  - platform: mqtt
    name: "MQTT Cover"
    command_topic: "home-assistant/cover/set"
    position_topic: "home-assistant/cover/position"
    availability_topic: "home-assistant/cover/availability"
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
    value_template: '{{ value.x }}'
```
{% endraw %}

### {% linkable_title Full configuration %}

The example below shows a full configuration for a cover.

{% raw %}
```yaml
# Example configuration.yaml entry
cover:
  - platform: mqtt
    name: "MQTT Cover"
    command_topic: "home-assistant/cover/set"
    state_topic: "home-assistant/cover/state"
    availability_topic: "home-assistant/cover/availability"
    qos: 0
    retain: true
    payload_open: "OPEN"
    payload_close: "CLOSE"
    payload_stop: "STOP"
    state_open: "open"
    state_closed: "closed"
    payload_available: "online"
    payload_not_available: "offline"
    optimistic: false
    value_template: '{{ value.x }}'
    tilt_command_topic: 'home-assistant/cover/tilt'
    tilt_status_topic: 'home-assistant/cover/tilt-state'
    tilt_min: 0
    tilt_max: 180
    tilt_closed_value: 70
    tilt_opened_value: 180
```
{% endraw %}

To test, you can use the command line tool `mosquitto_pub` shipped with `mosquitto` or the `mosquitto-clients` package to send MQTT messages. This allows you to operate your cover manually:

```bash
$  mosquitto_pub -h 127.0.0.1 -t home-assistant/cover/set -m "CLOSE"
```
