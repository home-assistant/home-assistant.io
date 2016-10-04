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
---


The `mqtt` light platform let you control your MQTT enabled light.

In an ideal scenario, the MQTT device will have a state topic to publish state changes. If these messages are published with RETAIN flag, the MQTT switch will receive an instant state update after subscription and will start with correct state. Otherwise, the initial state of the switch will be false/off.

When a state topic is not available, the light will work in optimistic mode. In this mode, the light will immediately change state after every command. Otherwise, the light will wait for state confirmation from device (message from `state_topic`).

Optimistic mode can be forced, even if state topic is available. Try to enable it, if experiencing incorrect light operation.

```yaml
# Example configuration.yml entry
light:
  - platform: mqtt
    command_topic: "office/rgb1/light/switch"
```

Configuration variables:

- **command_topic** (*Required*): The MQTT topic to publish commands to change the switch state.
- **name** (*Optional*): The name of the switch. Default is 'MQTT Switch'.
- **state_topic** (*Optional*): The MQTT topic subscribed to receive state updates.
- **brightness_state_topic** (*Optional*): The MQTT topic subscribed to receive brightness state updates.
- **brightness_command_topic** (*Optional*): The MQTT topic to publish commands to change the light's brightness.
- **rgb_state_topic** (*Optional*): The MQTT topic subscribed to receive RGB state updates.
- **rgb_command_topic** (*Optional*): The MQTT topic to publish commands to change the light's RGB state.
- **color_temp_state_topic** (*Optional*): The MQTT topic subscribed to receive color temperature state updates.
- **color_temp_command_topic** (*Optional*): The MQTT topic to publish commands to change the light's color temperature state.
- **state_value_template** (*Optional*): Defines a [template](/topics/templating/) to extract the state value.
- **brightness_value_template** (*Optional*): Defines a [template](/topics/templating/) to extract the brightness value.
- **rgb_value_template** (*Optional*): Defines a [template](/topics/templating/) to extract the RGB value.
- **color_temp_value_template** (*Optional*): Defines a [template](/topics/templating/) to extract the color temperature value.
- **brightness_scale** (*Optional*): Defines the maximum brightness value (i.e. 100%) of the MQTT device (defaults to 255).
- **qos** (*Optional*): The maximum QoS level of the state topic. Default is 0 and will also be used to publishing messages.
- **payload_on** (*Optional*): The payload that represents enabled state. Default is "ON".
- **payload_off** (*Optional*): The payload that represents disabled state. Default is "OFF".
- **optimistic** (*Optional*): Flag that defines if switch works in optimistic mode. Default is true if no state topic defined, else false.

<p class='note warning'>
  Make sure that your topics match exact. `some-topic/` and `some-topic` are different topics.
</p>

## {% linkable_title Examples %}

In this section you find some real life examples of how to use this sensor.

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
  platform: mqtt
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

### {% linkable_title Implementations %}

A basic example using a nodeMCU board (ESP8266) to control its built-in led (on/off) can be found [here](https://github.com/mertenats/open-home-automation/tree/master/ha_mqtt_light). [Here](https://github.com/mertenats/open-home-automation/tree/master/ha_mqtt_rgb_light) is another example to control a RGB led (on/off, brightness and colors).
