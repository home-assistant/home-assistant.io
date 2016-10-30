---
layout: page
title: "MQTT Fan"
description: "Instructions how to integrate MQTT fans into Home Assistant."
date: 2016-08-27 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
ha_category: Fan
ha_release: 0.27
ha_iot_class: depends
---

The `mqtt` fan platform let you control your MQTT enabled fans.

In an ideal scenario, the MQTT device will have a `state_topic` to publish state changes. If these messages are published with `RETAIN` flag, the MQTT fan will receive an instant state update after subscription and will start with correct state. Otherwise, the initial state of the fan will be `false`.

When a `state_topic` is not available, the fan will work in optimistic mode. In this mode, the fan will immediately change state after every command. Otherwise, the fan will wait for state confirmation from device (message from `state_topic`).

Optimistic mode can be forced, even if state topic is available. Try to enable it, if experiencing incorrect fan operation.

To enable MQTT fans in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yml entry
fan:
  platform: mqtt
  command_topic: "home/living-room/fan/set"
```

Configuration variables:

- **command_topic** (*Required*): The MQTT topic to publish commands to change the fan state.
- **state_topic** (*Optional*): The MQTT topic subscribed to receive state updates.
- **name** (*Optional*): The name of the fan. Default is 'MQTT Fan'.
- **payload_on** (*Optional*): The payload that represents the running state. Default is "ON".
- **payload_off** (*Optional*): The payload that represents the stop state. Default is "OFF".
- **optimistic** (*Optional*): Flag that defines if lock works in optimistic mode. Default is `true` if no state topic defined, else `false`.
- **qos** (*Optional*): The maximum QoS level of the state topic. Default is 0 and will also be used to publishing messages.
- **retain** (*Optional*): If the published message should have the retain flag on or not.
- **state_value_template** (*Optional*): Defines a [template](/topics/templating/) to extract a value from the state.
- **speed_state_topic** (*Optional*): The MQTT topic subscribed to receive speed updates.
- **speed_command_topic** (*Optional*): The MQTT topic to publish commands to change the fan speed.
- **speed_value_template** (*Optional*): Defines a [template](/topics/templating/) to extract a value from the speed.
- **oscillation_state_topic** (*Optional*): The MQTT topic subscribed to receive oscillation updates.
- **oscillation_command_topic** (*Optional*): The MQTT topic to publish commands to change the fan oscillation.
- **oscillation_value_template** (*Optional*): Defines a [template](/topics/templating/) to extract a value from the oscillation.
- **payload_oscillation_on** (*Optional*): The payload that represents the oscillation state. Default is "ON".
- **payload_oscillation_off** (*Optional*): The payload that represents the oscillation state. Default is "OFF".
- **payload_low_speed** (*Optional*): The payload that represents the low speed state. Default is "low".
- **payload_medium_speed** (*Optional*): The payload that represents the low speed state. Default is "med".
- **payload_high_speed** (*Optional*): The payload that represents the low speed state. Default is "high".
- **speeds** array (*Optional*): Valid entries for the list are `off`, `low`, `med`, and `high`.

<p class='note warning'>
Make sure that your topic match exact. `some-topic/` and `some-topic` are different topics.
</p>
