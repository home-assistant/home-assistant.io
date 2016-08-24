---
layout: page
title: "MQTT Cover"
description: "Instructions how to integrate MQTT covers into Home Assistant."
date: 2016-06-28 17:30
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
ha_category: Cover
---


The `mqtt` cover platform enables the possibility to control an MQTT
cover. The device state will be updated only after receiving the a new
state from `state_topic`. If these messages are published with RETAIN flag, the
MQTT device will receive an instant state update after subscription and will
start with correct state. Otherwise, the initial state will be `unknown`.

There is a state attribute that stores the relative position of the device,
where 0 means the device is `closed` and all other intermediate positions
means the device is `open`.

When a state topic is not available, the switch will work in optimistic mode.
In this mode, the switch will immediately change state after every command.
Otherwise, the switch will wait for state confirmation from device (message
from `state_topic`).

Optimistic mode can be forced, even if state topic is available. Try to enable
it, if experiencing incorrect switch operation.

To use your MQTT binary sensor in your installation, add the following to your
`configuration.yaml` file:

```yaml
# Example configuration.yml entry
cover:
  platform: mqtt
  state_topic: "home-assistant/cover"
  command_topic: "home-assistant/cover/set"
  name: "MQTT Sensor"
  optimistic: false
  qos: 0
  retain: true
  state_open: "STATE_OPEN"
  state_closed: "STATE_CLOSED"
  service_open: "SERVICE_OPEN"
  service_close: "SERVICE_CLOSE"
  value_template: '{% raw %}{{ value.x }}{% endraw %}'
```

Configuration variables:

- **state_topic** (*Required*): The MQTT topic subscribed to receive sensor values.
- **name** (*Optional*): The name of the sensor. Default is 'MQTT Sensor'. 
- **state_open** (*Optional*): The payload that represents open state. Default is"STATE_OPEN"
- **state_closed** (*Optional*): The payload that represents closed state. Default is "STATE_CLOSED"
- **service_open** (*Optional*):  The payload that represents open state in service mode. Default is"SERVICE_OPEN"
- **service_close** (*Optional*): The payload that represents closed state in service mode. Default is "SERVICE_CLOSE"
- **optimistic** (*Optional*): Flag that defines if switch works in optimistic mode. Default is true if no state topic defined, else false.
- **qos** (*Optional*): The maximum QoS level of the state topic. Default is 0 and will also be used to publishing messages.
- **retain** (*Optional*): If the published message should have the retain flag on or not.
- **value_template** (*Optional*): Defines a [template](/topics/templating/) to extract a value from the payload.

For a quick check you can use the commandline tools shipped with `mosquitto` to send MQTT messages. Set the state of your sensor manually:

```bash
$  mosquitto_pub -h 127.0.0.1 -t home-assistant/cover/set -m "OFF"
```

