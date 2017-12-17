---
layout: page
title: "MQTT Switch"
description: "Instructions how to integrate MQTT switches into Home Assistant."
date: 2015-08-30 23:38
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
ha_category: Switch
ha_release: 0.7
ha_iot_class: depends
---

The `mqtt` switch platform lets you control your MQTT enabled switches.

In an ideal scenario, the MQTT device will have a `state_topic` to publish state changes. If these messages are published with a `RETAIN` flag, the MQTT switch will receive an instant state update after subscription, and will start with the correct state. Otherwise, the initial state of the switch will be `false` / `off`.

When a `state_topic` is not available, the switch will work in optimistic mode. In this mode, the switch will immediately change state after every command. Otherwise, the switch will wait for state confirmation from the device (message from `state_topic`).

Optimistic mode can be forced, even if the `state_topic` is available. Try to enable it, if experiencing incorrect switch operation.

To enable this switch in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yml entry
switch:
  - platform: mqtt
    command_topic: "home/bedroom/switch1/set"
```

Configuration variables:

- **name** (*Optional*): The name of the switch. Default is 'MQTT Switch'.
- **state_topic** (*Optional*): The MQTT topic subscribed to receive state updates.
- **command_topic** (*Required*): The MQTT topic to publish commands to change the switch state.
- **availability_topic** (*Optional*): The MQTT topic subscribed to receive availability (online/offline) updates.
- **payload_on** (*Optional*): The payload that represents enabled state. Default is "ON".
- **payload_off** (*Optional*): The payload that represents disabled state. Default is "OFF".
- **payload_available** (*Optional*): The payload that represents the available state, e.g. 'online'. Default is "ON".
- **payload_not_available** (*Optional*): The payload that represents the unavailable state, e.g. 'offline'. Default is "OFF".
- **optimistic** (*Optional*): Flag that defines if switch works in optimistic mode. Default is `true` if no `state_topic` defined, else `false`.
- **qos** (*Optional*): The maximum QoS level of the state topic. Default is 0 and will also be used to publishing messages.
- **retain** (*Optional*): If the published message should have the retain flag on or not.
- **value_template** (*Optional*): Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the payload.

<p class='note warning'>
Make sure that your topic matches exactly. `some-topic/` and `some-topic` are different topics.
</p>

## {% linkable_title Examples %}

In this section you will find some real life examples of how to use this sensor.

### {% linkable_title Full configuration %}

The example below shows a full configuration for a switch.

```yaml
# Example configuration.yml entry
switch:
  - platform: mqtt
    name: "Bedroom Switch"
    state_topic: "home/bedroom/switch1"
    command_topic: "home/bedroom/switch1/set"
    availability_topic: "home/bedroom/switch1/available"
    payload_on: "ON"
    payload_off: "OFF"
    optimistic: false
    qos: 0
    retain: true
```

For a check you can use the command line tools `mosquitto_pub` shipped with `mosquitto` to send MQTT messages. This allows you to operate your switch manually:

```bash
$  mosquitto_pub -h 127.0.0.1 -t home/bedroom/switch1 -m "ON"
```
