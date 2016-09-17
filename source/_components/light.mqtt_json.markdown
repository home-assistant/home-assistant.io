---
layout: page
title: "MQTT JSON Light"
description: "Instructions for how to setup MQTT JSON lights within Home Assistant."
date: 2016-08-09 08:30
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
ha_category: Light
ha_iot_class: "Local Push"
ha_release: 0.26
---


The `mqtt_json` light platform let you control a MQTT-enabled light that can receive [JSON](https://en.wikipedia.org/wiki/JSON) messages.

This platform supports on/off, brightness, RGB colors, transitions, and short/long flashing. The messages sent to/from the lights look similar to this, omitting fields when they aren't needed:

```json
{
  "brightness": 255,
  "color": {
    "g": 255,
    "b": 255,
    "r": 255
  },
  "transition": 2,
  "state": "ON"
}
```


In an ideal scenario, the MQTT device will have a state topic to publish state changes. If these messages are published with the RETAIN flag, the MQTT light will receive an instant state update after subscription and will start with correct state. Otherwise, the initial state of the light will be off.

When a state topic is not available, the light will work in optimistic mode. In this mode, the light will immediately change state after every command. Otherwise, the light will wait for state confirmation from device (message from `state_topic`).

Optimistic mode can be forced, even if state topic is available. Try enabling it if the light is operating incorrectly.

To enable a light with brightness and RGB support in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: mqtt_json
    name: mqtt_json_light_1
    state_topic: "home/rgb1"
    command_topic: "home/rgb1/set"
    brightness: true
    rgb: true
```

To enable a light with brightness (but no color support) in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: mqtt_json
    name: mqtt_json_light_1
    state_topic: "home/rgb1"
    command_topic: "home/rgb1/set"
    brightness: true
```

Configuration variables:

- **name** (*Optional*): The name of the light. Default is "MQTT JSON Light."
- **state_topic** (*Optional*): The MQTT topic subscribed to receive state updates.
- **command_topic** (*Required*): The MQTT topic to publish commands to change the light's state.
- **brightness** (*Optional*): Flag that defines if the light supports brightness. Default is false.
- **rgb** (*Optional*): Flag that defines if the light supports RGB colors. Default is false.
- **flash_time_short** (*Optional*): The duration, in seconds, of a "short" flash. Default is 2.
- **flash_time_long** (*Optional*): The duration, in seconds, of a "long" flash. Default is 10.
- **optimistic** (*Optional*): Flag that defines if the light works in optimistic mode. Default is true if no state topic defined, else false.
- **qos** (*Optional*): The maximum QoS level of the state topic. Default is 0 and will also be used to publishing messages.

<p class='note warning'>
  Make sure that your topics match exact. `some-topic/` and `some-topic` are different topics.
</p>

A full example of custom lighting using this platform and an ESP8266 microcontroller can be found [here](https://github.com/corbanmailloux/esp-mqtt-rgb-led). It supports on/off, brightness, transitions, RGB colors, and flashing.
