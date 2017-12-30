---
layout: page
title: "MQTT Light"
description: "Instructions how to setup MQTT lights within Home Assistant."
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

Configuration variables:

- **command_topic** (*Required*): The MQTT topic to publish commands to change the light's state.
- **brightness_command_topic** (*Optional*): The MQTT topic to publish commands to change the light's brightness.
- **brightness_scale** (*Optional*): Defines the maximum brightness value (i.e. 100%) of the MQTT device (defaults to 255).
- **brightness_state_topic** (*Optional*): The MQTT topic subscribed to receive brightness state updates.
- **brightness_value_template** (*Optional*): Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the brightness value.
- **color_temp_command_topic** (*Optional*): The MQTT topic to publish commands to change the light's color temperature state.  The color temperature command slider has a range of 157 to 500 mireds (micro reciprocal degrees).
- **color_temp_state_topic** (*Optional*): The MQTT topic subscribed to receive color temperature state updates.
- **color_temp_value_template** (*Optional*): Defines a [template](/topics/templating/) to extract the color temperature value.
- **effect_command_topic** (*Optional*): The MQTT topic to publish commands to change the light's effect state.
- **effect_state_topic** (*Optional*): The MQTT topic subscribed to receive effect state updates.
- **effect_value_template** (*Optional*): Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the effect value.
- **effect_list** (*Optional*): The list of effects the light supports.
- **name** (*Optional*): The name of the switch. Default is 'MQTT Switch'.
- **on_command_type** (*Optional*): Defines when on the payload_on is sent. Using `last` (the default) will send any style (brightness, color, etc) topics first and then a `payload_on` to the `command_topic`. Using `first` will send the `payload_on` and then any style topics. Using `brightness` will only send brightness commands instead of the `payload_on` to turn the light on.
- **optimistic** (*Optional*): Flag that defines if switch works in optimistic mode. Default is true if no state topic defined, else false.
- **payload_off** (*Optional*): The payload that represents disabled state. Default is "OFF".
- **payload_on** (*Optional*): The payload that represents enabled state. Default is "ON".
- **qos** (*Optional*): The maximum QoS level of the state topic. Default is 0 and will also be used to publishing messages.
- **retain** (*Optional*): If the published message should have the retain flag on or not.
- **rgb_command_template** (*Optional*): Defines a [template](/docs/configuration/templating/#processing-incoming-data) to compose message which will be sent to `rgb_command_topic`. Available variables: `red`, `green` and `blue`.
- **rgb_command_topic** (*Optional*): The MQTT topic to publish commands to change the light's RGB state.
- **rgb_state_topic** (*Optional*): The MQTT topic subscribed to receive RGB state updates.
- **rgb_value_template** (*Optional*): Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the RGB value.
- **state_topic** (*Optional*): The MQTT topic subscribed to receive state updates.
- **state_value_template** (*Optional*): Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the state value. The template should match the payload "on" and "off" values, so if your light uses "power on" to turn on, your `state_value_template` string should return "power on" when the switch is on. For example if the message is just "on", your `state_value_template` should be `power {{ value }}`.
- **white_value_command_topic** (*Optional*): The MQTT topic to publish commands to change the light's white value.
- **white_value_state_topic** (*Optional*): The MQTT topic subscribed to receive white value updates.
- **white_value_value_template** (*Optional*): Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the white value.
- **xy_command_topic** (*Optional*): The MQTT topic to publish commands to change the light's XY state.
- **xy_state_topic** (*Optional*): The MQTT topic subscribed to receive XY state updates.
- **xy_value_template** (*Optional*): Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the XY value.

<p class='note warning'>
  Make sure that your topics match exactly. `some-topic/` and `some-topic` are different topics.
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

In this section you will find some real life examples of how to use this sensor.

### {% linkable_title Brightness and RGB support %}

To enable a light with brightness and RGB support in your installation, add the following to your `configuration.yaml` file:

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
    state_value_template: "{% raw %}{{ value_json.state }}{% endraw %}"
    brightness_value_template: "{% raw %}{{ value_json.brightness }}{% endraw %}"
    rgb_value_template: "{% raw %}{{ value_json.rgb | join(',') }}{% endraw %}"
    qos: 0
    payload_on: "ON"
    payload_off: "OFF"
    optimistic: false
```

### {% linkable_title Brightness and no RGB support %}

To enable a light with brightness (no RGB version) in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yml entry
light:
  - platform: mqtt
    name: "Office light"
    state_topic: "office/rgb1/light/status"
    command_topic: "office/rgb1/light/switch"
    brightness_state_topic: 'office/rgb1/light/brightness'
    brightness_command_topic: 'office/rgb1/light/brightness/set'
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
    brightness_state_topic: 'office/rgb1/light/brightness'
    brightness_command_topic: 'office/rgb1/light/brightness/set'
    on_command_type: 'brightness'
```


### {% linkable_title Implementations %}

- A [basic example](https://github.com/mertenats/open-home-automation/tree/master/ha_mqtt_light) using a nodeMCU board (ESP8266) to control its built-in LED (on/off).
- Another [example](https://github.com/mertenats/open-home-automation/tree/master/ha_mqtt_rgb_light) to control a RGB LED (on/off, brightness, and colors).
