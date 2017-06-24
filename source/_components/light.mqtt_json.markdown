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
ha_iot_class: depends
ha_release: 0.26
---

The `mqtt_json` light platform lets you control a MQTT-enabled light that can receive [JSON](https://en.wikipedia.org/wiki/JSON) messages.

This platform supports on/off, brightness, RGB colors, XY colors, color temperature, transitions, short/long flashing and white values. The messages sent to/from the lights look similar to this, omitting fields when they aren't needed:

```json
{
  "brightness": 255,
  "color_temp": 155,
  "color": {
    "r": 255,
    "g": 255,
    "b": 255,
    "x": 0.123,
    "y": 0.123
  },
  "effect": "colorloop",
  "state": "ON",
  "transition": 2,
  "white_value": 150
}
```

In an ideal scenario, the MQTT device will have a state topic to publish state changes. If these messages are published with the RETAIN flag, the MQTT light will receive an instant state update after subscription and will start with the correct state. Otherwise, the initial state of the light will be off.

When a state topic is not available, the light will work in optimistic mode. In this mode, the light will immediately change state after every command. Otherwise, the light will wait for state confirmation from the device (message from `state_topic`).

Optimistic mode can be forced, even if state topic is available. Try enabling it if the light is operating incorrectly.

```yaml
# Example configuration.yaml entry
light:
  - platform: mqtt_json
    command_topic: "home/rgb1/set"
```

Configuration variables:

- **command_topic** (*Required*): The MQTT topic to publish commands to change the light's state.
- **brightness** (*Optional*): Flag that defines if the light supports brightness. Default is false.
- **color_temp** (*Optional*): Flag that defines if the light supports color temperature. Default is false.
- **effect** (*Optional*): Flag that defines if the light supports effects. Default is false.
- **effect_list** (*Optional*): The list of effects the light supports.
- **flash_time_long** (*Optional*): The duration, in seconds, of a "long" flash. Default is 10.
- **flash_time_short** (*Optional*): The duration, in seconds, of a "short" flash. Default is 2.
- **name** (*Optional*): The name of the light. Default is "MQTT JSON Light."
- **optimistic** (*Optional*): Flag that defines if the light works in optimistic mode. Default is true if no state topic defined, else false.
- **qos** (*Optional*): The maximum QoS level of the state topic. Default is 0 and will also be used to publishing messages.
- **retain** (*Optional*): If the published message should have the retain flag on or not.
- **rgb** (*Optional*): Flag that defines if the light supports RGB colors. Default is false.
- **state_topic** (*Optional*): The MQTT topic subscribed to receive state updates.
- **white_value** (*Optional*): Flag that defines if the light supports white values. Default is false.
- **xy** (*Optional*): Flag that defines if the light supports XY colors. Default is false.

<p class='note warning'>
  Make sure that your topics match exact. `some-topic/` and `some-topic` are different topics.
</p>

<p class='note warning'>
  XY and RGB can not be used at the same time. If both are provided, XY overrides RGB.
</p>

## {% linkable_title Comparison of light MQTT platforms %}

| Function          | [`mqtt`](https://home-assistant.io/components/light.mqtt/) | [`mqtt_json`](https://home-assistant.io/components/light.mqtt_json/) | [`mqtt_template`](https://home-assistant.io/components/light.mqtt_template/) |
|-------------------|------------------------------------------------------------|----------------------------------------------------------------------|------------------------------------------------------------------------------|
| Brightness        | ✔                                                          | ✔                                                                    | ✔                                                                            |
| Color temperature | ✔                                                          | ✔                                                                    | ✔                                                                            |
| Effects           | ✔                                                          | ✔                                                                    | ✔                                                                            |
| Flashing          | ✘                                                          | ✔                                                                    | ✔                                                                            |
| RGB Color         | ✔                                                          | ✔                                                                    | ✔                                                                            |
| Transitions       | ✘                                                          | ✔                                                                    | ✔                                                                            |
| XY Color          | ✔                                                          | ✔                                                                    | ✘                                                                            |
| White Value       | ✔                                                          | ✔                                                                    | ✔                                                                            |

## {% linkable_title Examples %}

In this section you find some real life examples of how to use this sensor.

### {% linkable_title Brightness and RGB support %}

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

### {% linkable_title Brightness and no RGB support %}

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

### {% linkable_title Implementations %}

- A full example of custom lighting using this platform and an ESP8266 microcontroller can be found [here](https://github.com/corbanmailloux/esp-mqtt-rgb-led). It supports on/off, brightness, transitions, RGB colors, and flashing.

- There is also another implementation forked from the above repo, it supports all the same features but is made for addressable LED strips using FastLED on a NodeMCU V3 it can be found [here](https://github.com/JammyDodger231/nodemcu-mqtt-rgb-led).

- [MQTT JSON Light](https://github.com/mertenats/Open-Home-Automation/tree/master/ha_mqtt_rgbw_light_with_discovery) is another implementation for ESP8266 including [MQTT discovery](/docs/mqtt/discovery/).
