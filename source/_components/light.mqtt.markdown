---
layout: page
title: "MQTT Light"
description: "Instructions on how to setup MQTT lights within Home Assistant."
date: 2015-11-13 08:30
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
ha_category: Light
ha_iot_class: depends
---

The `mqtt` light platform lets you control your MQTT enabled lights. It supports setting brightness, color temperature, effects, flashing, on/off, RGB colors, transitions, XY colors and white values.

In an ideal scenario, the MQTT device will have a state topic to publish state changes. If these messages are published with a `RETAIN` flag, the MQTT light will receive an instant state update after subscription and will start with the correct state. Otherwise, the initial state of the switch will be `false` / `off`.

When a state topic is not available, the light will work in optimistic mode. In this mode, the light will immediately change state after every command. Otherwise, the light will wait for state confirmation from the device (message from `state_topic`).

Optimistic mode can be forced, even if the `state_topic` is available. Try to enable it, if experiencing incorrect light operation.

```yaml
# Example configuration.yml entry
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
  description: "The MQTT topic to publish commands to change the light's RGB state."
  required: false
  type: string
rgb_state_topic:
  description: The MQTT topic subscribed to receive RGB state updates. The expected payload is the RGB values separated by commas, for example `255,0,127`.
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
{% endconfiguration %}

<p class='note warning'>
  Make sure that your topics match exactly. `some-topic/` and `some-topic` are different topics.
</p>

<p class='note warning'>
  XY and RGB can not be used at the same time. If both are provided, XY overrides RGB.
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
| White Value       | ✔                                                          | ✔                                                                    | ✔                                                                            |

## {% linkable_title Examples %}

In this section you will find some real life examples of how to use this sensor.

### {% linkable_title Brightness and RGB support %}

To enable a light with brightness and RGB support in your installation, add the following to your `configuration.yaml` file:

{% raw %}
```yaml
# Example configuration.yml entry
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
# Example configuration.yml entry
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
# Example configuration.yml entry
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

### {% linkable_title Implementations %}

- A [basic example](https://github.com/mertenats/open-home-automation/tree/master/ha_mqtt_light) using a nodeMCU board (ESP8266) to control its built-in LED (on/off).
- Another [example](https://github.com/mertenats/open-home-automation/tree/master/ha_mqtt_rgb_light) to control a RGB LED (on/off, brightness, and colors).
