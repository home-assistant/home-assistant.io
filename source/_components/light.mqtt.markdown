---
layout: page
title: "MQTT Light"
description: "Instructions on how to setup MQTT lights using default schema within Home Assistant."
date: 2015-11-13 08:30
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
ha_category: Light
ha_iot_class: depends
redirect_from:
 - /components/light.mqtt_json/
 - /components/light.mqtt_template/
---

The `mqtt` light platform with lets you control your MQTT enabled lights through one of the supported message schemas.

## {% linkable_title Comparison of light MQTT schemas %}

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


## {% linkable_title Default schema %}

The `mqtt` light platform with default schema lets you control your MQTT enabled lights. It supports setting brightness, color temperature, effects, flashing, on/off, RGB colors, transitions, XY colors and white values.

## {% linkable_title Default schema - Configuration %}

In an ideal scenario, the MQTT device will have a state topic to publish state changes. If these messages are published with a `RETAIN` flag, the MQTT light will receive an instant state update after subscription and will start with the correct state. Otherwise, the initial state of the switch will be `false` / `off`.

When a state topic is not available, the light will work in optimistic mode. In this mode, the light will immediately change state after every command. Otherwise, the light will wait for state confirmation from the device (message from `state_topic`).

Optimistic mode can be forced, even if the `state_topic` is available. Try to enable it, if experiencing incorrect light operation.

```yaml
# Example configuration.yaml entry
light:
  - platform: mqtt
    command_topic: "office/rgb1/light/switch"
```

{% configuration %}
name:
  description: The name of the light.
  required: false
  type: string
  default: MQTT Light
unique_id:
  description: An ID that uniquely identifies this light. If two lights have the same unique ID, Home Assistant will raise an exception.
  required: false
  type: string
command_topic:
  description: The MQTT topic to publish commands to change the switch state.
  required: true
  type: string
brightness_command_topic:
  description: The MQTT topic to publish commands to change the light’s brightness.
  required: false
  type: string
brightness_scale:
  description: "Defines the maximum brightness value (i.e. 100%) of the MQTT device."
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
color_temp_command_topic:
  description: The MQTT topic to publish commands to change the light’s color temperature state. The color temperature command slider has a range of 153 to 500 mireds (micro reciprocal degrees).
  required: false
  type: string
color_temp_state_topic:
  description: The MQTT topic subscribed to receive color temperature state updates.
  required: false
  type: string
color_temp_value_template:
  description: "Defines a [template](/topics/templating/) to extract the color temperature value."
  required: false
  type: string
effect_command_topic:
  description: "The MQTT topic to publish commands to change the light's effect state."
  required: false
  type: string
effect_state_topic:
  description: The MQTT topic subscribed to receive effect state updates.
  required: false
  type: string
effect_value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the effect value."
  required: false
  type: string
effect_list:
  description: The list of effects the light supports.
  required: false
  type: string list
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
on_command_type:
  description: "Defines when on the payload_on is sent. Using `last` (the default) will send any style (brightness, color, etc) topics first and then a `payload_on` to the `command_topic`. Using `first` will send the `payload_on` and then any style topics. Using `brightness` will only send brightness commands instead of the `payload_on` to turn the light on."
  required: false
  type: string
optimistic:
  description: Flag that defines if switch works in optimistic mode.
  required: false
  type: boolean
  default: "`true` if no state topic defined, else `false`."
payload_on:
  description: The payload that represents enabled state.
  required: false
  type: string
  default: "ON"
payload_off:
  description: The payload that represents disabled state.
  required: false
  type: string
  default: "OFF"
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
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to compose message which will be sent to `rgb_command_topic`. Available variables: `red`, `green` and `blue`."
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
state_topic:
  description: The MQTT topic subscribed to receive state updates.
  required: false
  type: string
state_value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the state value. The template should match the payload `on` and `off` values, so if your light uses `power on` to turn on, your `state_value_template` string should return `power on` when the switch is on. For example if the message is just `on`, your `state_value_template` should be `power {{ value }}`."
  required: false
  type: string
white_value_command_topic:
  description: "The MQTT topic to publish commands to change the light's white value."
  required: false
  type: string
white_value_scale:
  description: "Defines the maximum white value (i.e. 100%) of the MQTT device."
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
device:
  description: 'Information about the device this light is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works through [MQTT discovery](/docs/mqtt/discovery/) and when [`unique_id`](#unique_id) is set.'
  required: false
  type: map
  keys:
    identifiers:
      description: 'A list of IDs that uniquely identify the device. For example a serial number.'
      required: false
      type: list, string
    connections:
      description: 'A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `"connections": [["mac", "02:5b:26:a8:dc:12"]]`.'
      required: false
      type: list
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
{% endconfiguration %}

<p class='note warning'>
  Make sure that your topics match exactly. `some-topic/` and `some-topic` are different topics.
</p>

<p class='note warning'>
  XY and RGB can not be used at the same time. If both are provided, XY overrides RGB.
</p>

## {% linkable_title Default schema - Examples %}

In this section you will find some real-life examples of how to use this sensor.

### {% linkable_title Brightness and RGB support %}

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

### {% linkable_title Brightness and no RGB support %}

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

### {% linkable_title Brightness without on commands %}

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

## {% linkable_title Default schema - Implementations %}

- A [basic example](https://github.com/mertenats/open-home-automation/tree/master/ha_mqtt_light) using a nodeMCU board (ESP8266) to control its built-in LED (on/off).
- Another [example](https://github.com/mertenats/open-home-automation/tree/master/ha_mqtt_rgb_light) to control a RGB LED (on/off, brightness, and colors).
- [Integration guide](https://github.com/xoseperez/espurna/wiki/HomeAssistant) for the ESPUrna firmware (ESP8285/ESP8266).

## {% linkable_title JSON schema %}

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

## {% linkable_title JSON schema - Configuration %}

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
name:
  description: The name of the light.
  required: false
  type: string
  default: MQTT JSON Light
unique_id:
   description: An ID that uniquely identifies this light. If two lights have the same unique ID, Home Assistant will raise an exception.
   required: false
   type: string
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
device:
  description: 'Information about the device this light is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works through [MQTT discovery](/docs/mqtt/discovery/) and when [`unique_id`](#unique_id) is set.'
  required: false
  type: map
  keys:
    identifiers:
      description: 'A list of IDs that uniquely identify the device. For example a serial number.'
      required: false
      type: list, string
    connections:
      description: 'A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `"connections": [["mac", "02:5b:26:a8:dc:12"]]`.'
      required: false
      type: list
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
{% endconfiguration %}

<p class='note warning'>
  Make sure that your topics match exact. `some-topic/` and `some-topic` are different topics.
</p>

<p class='note warning'>
  RGB, XY and HSV can not be used at the same time in `state_topic` messages. Make sure that only one of the color models is in the "color" section of the state MQTT payload.
</p>

## {% linkable_title JSON schema - Examples %}

In this section you find some real-life examples of how to use this sensor.

### {% linkable_title Brightness and RGB support %}

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

### {% linkable_title Brightness and no RGB support %}

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

### {% linkable_title Brightness Scaled %}

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

### {% linkable_title HS Color %}

To use a light with hue+saturation as the color model, set `hs` to `true` in the platform configuration:

```yaml
light:
  - platform: mqtt
    schema: json
    name: mqtt_json_hs_light
    state_topic: "home/light"
    command_topic: "home/light/set"
    hs: True
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

### {% linkable_title Brightness and RGBW support %}

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


## {% linkable_title Implementations %}

- A full example of custom lighting using this platform and an ESP8266 microcontroller can be found [here](https://github.com/corbanmailloux/esp-mqtt-rgb-led). It supports on/off, brightness, transitions, RGB colors, and flashing.

- There is also another implementation forked from the above repo, it supports all the same features but is made for addressable LED strips using FastLED on a NodeMCU V3 it can be found [here](https://github.com/JammyDodger231/nodemcu-mqtt-rgb-led).

- [McLighting](https://github.com/toblum/McLighting) is another ESP8266 firmware for WS2812 addressable LEDs.

- [MQTT JSON Light](https://github.com/mertenats/Open-Home-Automation/tree/master/ha_mqtt_rgbw_light_with_discovery) is another implementation for ESP8266 including [MQTT discovery](/docs/mqtt/discovery/).

- [esphomelib](https://github.com/OttoWinter/esphomelib) is a library for ESP8266 and ESP32 boards that has many of Home Assistant's MQTT features (like [discovery](/docs/mqtt/discovery/)) pre-implemented and provides high-level abstractions for components such as lights or sensors.

- [AiLight](https://github.com/stelgenhof/AiLight) is a custom firmware for the Ai-Thinker (and equivalent) RGBW WiFi light bulbs that has an ESP8266 onboard and controlled by the MY9291 LED driver. It implements the [MQTT JSON light](/components/light.mqtt_json/) platform and supports ON/OFF, RGBW colours, brightness, colour temperature, flashing and transitions. Also it includes [MQTT Auto Discovery](/docs/mqtt/discovery/)) and the MQTT Last Will and Testament is enabled as well.

## {% linkable_title Template schema %}

The `mqtt` light platform with template schema lets you control a MQTT-enabled light that receive commands on a command topic and optionally sends status update on a state topic.
It is format-agnostic so you can use any data format you want (i.e. string, JSON), just configure it with templating.

This schema supports on/off, brightness, RGB colors, XY colors, color temperature, transitions, short/long flashing, effects and white values.

## {% linkable_title Template schema - Configuration %}

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
name:
  description: The name of the light.
  required: false
  type: string
  default: MQTT Template Light
unique_id:
   description: An ID that uniquely identifies this light. If two lights have the same unique ID, Home Assistant will raise an exception.
   required: false
   type: string
effect_list:
  description: List of possible effects.
  required: false
  type: string list
command_topic:
  description: The MQTT topic to publish commands to change the light’s state.
  required: true
  type: string
state_topic:
  description: The MQTT topic subscribed to receive state updates.
  required: false
  type: string
command_on_template:
  description: "The [template](/docs/configuration/templating/#processing-incoming-data) for *on* state changes. Available variables: `state`, `brightness`, `red`, `green`, `blue`, `white_value`, `flash`, `transition` and `effect`."
  required: true
  type: string
command_off_template:
  description: "The [template](/docs/configuration/templating/#processing-incoming-data) for *off* state changes. Available variables: `state` and `transition`."
  required: true
  type: string
state_template:
  description: "[Template](/docs/configuration/templating/#processing-incoming-data) to extract state from the state payload value."
  required: false
  type: string
brightness_template:
  description: "[Template](/docs/configuration/templating/#processing-incoming-data) to extract brightness from the state payload value."
  required: false
  type: string
red_template:
  description: "[Template](/docs/configuration/templating/#processing-incoming-data) to extract red color from the state payload value."
  required: false
  type: string
green_template:
  description: "[Template](/docs/configuration/templating/#processing-incoming-data) to extract green color from the state payload value."
  required: false
  type: string
blue_template:
  description: "[Template](/docs/configuration/templating/#processing-incoming-data) to extract blue color from the state payload value."
  required: false
  type: string
color_temp_template:
  description: "[Template](/docs/configuration/templating/#processing-incoming-data) to extract color temperature from the state payload value."
  required: false
  type: string
effect_template:
  description: "[Template](/docs/configuration/templating/#processing-incoming-data) to extract effect from the state payload value."
  required: false
  type: string
white_value_template:
  description: "[Template](/docs/configuration/templating/#processing-incoming-data) to extract white value from the state payload value."
  required: false
  type: string
optimistic:
  description: Flag that defines if the light works in optimistic mode.
  required: false
  type: string
  default: "`true` if no state topic or state template is defined, else `false`."
qos:
  description: The maximum QoS level of the state topic.
  required: false
  type: integer
  default: 0
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
device:
  description: 'Information about the device this light is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works through [MQTT discovery](/docs/mqtt/discovery/) and when [`unique_id`](#unique_id) is set.'
  required: false
  type: map
  keys:
    identifiers:
      description: 'A list of IDs that uniquely identify the device. For example a serial number.'
      required: false
      type: list, string
    connections:
      description: 'A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `"connections": [["mac", "02:5b:26:a8:dc:12"]]`.'
      required: false
      type: list
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
{% endconfiguration %}

<p class='note warning'>
  Make sure that your topics match exact. `some-topic/` and `some-topic` are different topics.
</p>

## {% linkable_title Template schema - Examples %}

In this section you find some real-life examples of how to use this light.

### {% linkable_title Simple string payload %}

For a simple string payload with the format `state,brightness,r-g-b` (e.g., `on,255,255-255-255`), add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: mqtt
    schema: template
    command_topic: "home/rgb1/set"
    state_topic: "home/rgb1/status"
    command_on_template: "{% raw %}on,{{ brightness|d }},{{ red|d }}-{{ green|d }}-{{ blue|d }}{% endraw %}"
    command_off_template: "off"
    state_template: "{% raw %}{{ value.split(',')[0] }}{% endraw %}"  # must return `on` or `off`
    brightness_template: "{% raw %}{{ value.split(',')[1] }}{% endraw %}"
    red_template: "{% raw %}{{ value.split(',')[2].split('-')[0] }}{% endraw %}"
    green_template: "{% raw %}{{ value.split(',')[2].split('-')[1] }}{% endraw %}"
    blue_template: "{% raw %}{{ value.split(',')[2].split('-')[2] }}{% endraw %}"
```

### {% linkable_title JSON payload %}

For a JSON payload with the format `{"state": "on", "brightness": 255, "color": [255, 255, 255], "effect": "rainbow"}`, add the following to your `configuration.yaml` file:

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
    command_on_template: >{% raw %}
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
      }{% endraw %}
    command_off_template: '{"state": "off"}'
    state_template: '{% raw %}{{ value_json.state }}{% endraw %}'
    brightness_template: '{% raw %}{{ value_json.brightness }}{% endraw %}'
    red_template: '{% raw %}{{ value_json.color[0] }}{% endraw %}'
    green_template: '{% raw %}{{ value_json.color[1] }}{% endraw %}'
    blue_template: '{% raw %}{{ value_json.color[2] }}{% endraw %}'
    effect_template: '{% raw %}{{ value_json.effect }}{% endraw %}'
```

### {% linkable_title Template schema - No brightness or color support %}

If you don't want brightness, color or effect support, just omit the corresponding configuration sections.
