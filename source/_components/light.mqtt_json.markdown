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

In an ideal scenario, the MQTT device will have a state topic to publish state changes. If these messages are published with the RETAIN flag, the MQTT light will receive an instant state update after subscription and will start with the correct state. Otherwise, the initial state of the light will be off.

When a state topic is not available, the light will work in optimistic mode. In this mode, the light will immediately change state after every command. Otherwise, the light will wait for state confirmation from the device (message from `state_topic`).

Optimistic mode can be forced, even if state topic is available. Try enabling it if the light is operating incorrectly.

```yaml
# Example configuration.yaml entry
light:
  - platform: mqtt_json
    command_topic: "home/rgb1/set"
```

{% configuration %}
name:
  description: The name of the light.
  required: false
  type: string
  default: MQTT JSON Light
command_topic:
  description: The MQTT topic to publish commands to change the light’s state.
  required: true
  type: string
brightness:
  description: Flag that defines if the light supports brightness.
  required: false
  type: boolean
  default: false
brightness_scale:
  description: "Defines the maximum brightness value (i.e. 100%) of the MQTT device."
  required: false
  type: integer
  default: 255
color_temp:
  description: Flag that defines if the light supports color temperature.
  required: false
  type: boolean
  default: false
effect:
  description: Flag that defines if the light supports effects.
  required: false
  type: boolean
  default: false
effect_list:
  description: The list of effects the light supports.
  required: false
  type: string list
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
optimistic:
  description: Flag that defines if the light works in optimistic mode.
  required: false
  type: boolean
  default: "`true` if no state topic defined, else `false`."
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
state_topic:
  description: The MQTT topic subscribed to receive state updates.
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
hs:
  description: Flag that defines if the light supports HS colors.
  required: false
  type: boolean
  default: false
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates.
  required: false
  type: string
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
{% endconfiguration %}

<p class='note warning'>
  Make sure that your topics match exact. `some-topic/` and `some-topic` are different topics.
</p>

<p class='note warning'>
  RGB, XY and HSV can not be used at the same time in `state_topic` messages. Make sure that only one of the color models is in the "color" section of the state MQTT payload.
</p>

## {% linkable_title Comparison of light MQTT platforms %}

| Function          | [`mqtt`](/components/light.mqtt/) | [`mqtt_json`](/components/light.mqtt_json/) | [`mqtt_template`](/components/light.mqtt_template/) |
|-------------------|------------------------------------------------------------|----------------------------------------------------------------------|------------------------------------------------------------------------------|
| Brightness        | ✔                                                          | ✔                                                                    | ✔                                                                            |
| Color temperature | ✔                                                          | ✔                                                                    | ✔                                                                            |
| Effects           | ✔                                                          | ✔                                                                    | ✔                                                                            |
| Flashing          | ✘                                                          | ✔                                                                    | ✔                                                                            |
| RGB Color         | ✔                                                          | ✔                                                                    | ✔                                                                            |
| Transitions       | ✘                                                          | ✔                                                                    | ✔                                                                            |
| XY Color          | ✔                                                          | ✔                                                                    | ✘                                                                            |
| HS Color          | ✘                                                          | ✔                                                                    | ✘                                                                            |
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

### {% linkable_title Brightness Scaled %}

To enable a light using a brightness scale other than 8bit the `brightness_scale` option may be added to denote the "fully on" value:
```yaml
# Example configuration.yaml entry
light:
  - platform: mqtt_json
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

### {% linkable_title HS Color %}

To use a light with hue+saturation as the color model, set `hs` to `true` in the platform configuration:

```yaml
light:
  - platform: mqtt_json
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

### {% linkable_title Implementations %}

- A full example of custom lighting using this platform and an ESP8266 microcontroller can be found [here](https://github.com/corbanmailloux/esp-mqtt-rgb-led). It supports on/off, brightness, transitions, RGB colors, and flashing.

- There is also another implementation forked from the above repo, it supports all the same features but is made for addressable LED strips using FastLED on a NodeMCU V3 it can be found [here](https://github.com/JammyDodger231/nodemcu-mqtt-rgb-led).

- [MQTT JSON Light](https://github.com/mertenats/Open-Home-Automation/tree/master/ha_mqtt_rgbw_light_with_discovery) is another implementation for ESP8266 including [MQTT discovery](/docs/mqtt/discovery/).

- [esphomelib](https://github.com/OttoWinter/esphomelib) is a library for ESP8266 and ESP32 boards that has many of Home Assistant's MQTT features (like [discovery](/docs/mqtt/discovery/)) pre-implemented and provides high-level abstractions for components such as lights or sensors.

- [AiLight](https://github.com/stelgenhof/AiLight) is a custom firmware for the Ai-Thinker (and equivalent) RGBW WiFi light bulbs that has an ESP8266 onboard and controlled by the MY9291 LED driver. It implements the [MQTT JSON light](/components/light.mqtt_json/) platform and supports ON/OFF, RGBW colours, brightness, colour temperature, flashing and transitions. Also it includes [MQTT Auto Discovery](/docs/mqtt/discovery/)) and the MQTT Last Will and Testament is enabled as well.
