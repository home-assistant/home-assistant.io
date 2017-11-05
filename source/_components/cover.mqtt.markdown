---
layout: page
title: "MQTT Cover"
description: "Instructions how to integrate MQTT covers into Home Assistant."
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

The `mqtt` cover platform allows you to control an MQTT cover (such as blinds, a rollershutter, or a garage door).

The device state (`open` or `closed`) will be updated only after a new message is published on `state_topic` matching `state_open` or `state_closed`. If these messages are published with the `retain` flag set, the cover will receive an instant state update after subscription and Home Assistant will display the correct state on startup. Otherwise, the initial state displayed in Home Assistant will be `unknown`.

There is an attribute that stores the relative position of the device, where 0 means the device is `closed` and all other intermediate positions means the device is `open`.

If a state topic is not defined, the cover will work in optimistic mode. In this mode, the cover will immediately change state (`open` or `closed`) after every command sent by Home Assistant. If a state topic is defined, the cover will wait for a message on `state_topic` matching `state_open` or `state_closed` before changing state in Home Assistant.

Optimistic mode can be forced, even if a `state_topic` is defined. Try to enable it if experiencing incorrect cover operation.

The `mqtt` cover platform optionally supports an `availability_topic` to receive online and offline messages (birth and LWT messages) from the MQTT cover device. During normal operation, if the MQTT cover device goes offline (i.e. publishes `payload_not_available` to `availability_topic`), Home Assistant will display the cover as "unavailable". If these messages are published with the `retain` flag set, the cover will receive an instant update after subscription and Home Assistant will display correct availability state of the cover when Home Assistant starts up. If the `retain` flag is not set, Home Assistant will display the cover as "unavailable" when Home Assistant starts up.

To use your MQTT cover in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
cover:
  - platform: mqtt
    name: "MQTT Cover"
    command_topic: "home-assistant/cover/set"
```

Configuration variables:

- **name** (*Optional*): The name of the sensor. Default is `MQTT Cover`.
- **command_topic** (*Optional*): The MQTT topic to publish commands to control the cover.
- **payload_open** (*Optional*): The payload that opens the cover. Default is `OPEN`.
- **payload_close** (*Optional*): The payload that closes the cover. Default is `CLOSE`.
- **payload_stop** (*Optional*):  The payload that stops the cover. default is `STOP`.
- **state_topic** (*Optional*): The MQTT topic subscribed to receive cover state messages.
- **state_open** (*Optional*): The payload that represents the open state. Default is `open`.
- **state_closed** (*Optional*): The payload that represents the closed state. Default is `closed`.
- **availability_topic** (*Optional*): The MQTT topic subscribed to to receive birth and LWT messages from the MQTT cover device. If `availability_topic` is not defined, the cover availability state will always be "available". If `availability_topic` is defined, the cover availability state will be "unavailable" by default.
- **payload_available** (*Optional*): The payload that represents the online state. Default is `online`.
- **payload_not_available** (*Optional*): The payload that represents the offline state. Default is `offline`.
- **optimistic** (*Optional*): Flag that defines if switch works in optimistic mode. Default is `true` if no state topic defined, else `false`.
- **qos** (*Optional*): The maximum QoS level to be used when receiving and publishing messages. Default is `0`.
- **retain** (*Optional*): Defines if published messages should have the retain flag set. Default is `false`.
- **value_template** (*Optional*): Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the payload.
- **set_position_topic** (*Optional*): The MQTT topic to publish position commands to.
- **set_position_template** (*Optional*): Defines a [template](/topics/templating/) to define the position to be sent to the `set_position_topic` topic. Incoming position value is available for use in the template `{{position}}`. If no template is defined, the numeric position (0-100) will be written directly to the topic.
- **tilt_command_topic** (*Optional*): The MQTT topic to publish commands to control the cover tilt.
- **tilt_status_topic** (*Optional*): The MQTT topic subscribed to receive tilt status update values.
- **tilt_min** (*Optional*): The minimum tilt value. Default is `0`
- **tilt_max** (*Optional*): The maximum tilt value. Default is `100`
- **tilt_closed_value** (*Optional*): The value that will be sent on a `close_cover_tilt` command. Default is `0`
- **tilt_opened_value** (*Optional*): The value that will be sent on an `open_cover_tilt` command. Default is `100`
- **tilt_status_optimistic** (*Optional*): Flag that determines if tilt works in optimistic mode. Default is `true` if `tilt_status_topic` is not defined, else `false`
- **tilt_invert_state** (*Optional*): Flag that determines if open/close are flipped; higher values toward closed and lower values toward open. Default is `False`

## {% linkable_title Examples %}

In this section you will find some real life examples of how to use this platform.

### {% linkable_title Full configuration without tilt %}

The example below shows a full configuration for a cover without tilt.

```yaml
# Example configuration.yml entry
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
    value_template: '{% raw %}{{ value.x }}{% endraw %}'
```

### {% linkable_title Full configuration %}

The example below shows a full configuration for a cover.

```yaml
# Example configuration.yml entry
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
    value_template: '{% raw %}{{ value.x }}{% endraw %}'
    tilt_command_topic: 'home-assistant/cover/tilt'
    tilt_status_topic: 'home-assistant/cover/tilt-state'
    tilt_min: 0
    tilt_max: 180
    tilt_closed_value: 70
    tilt_opened_value: 180
```

To test, you can use the command line tool `mosquitto_pub` shipped with `mosquitto` or the `mosquitto-clients` package to send MQTT messages. This allows you to operate your cover manually:

```bash
$  mosquitto_pub -h 127.0.0.1 -t home-assistant/cover/set -m "CLOSE"
```
