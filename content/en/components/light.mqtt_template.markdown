---
layout: page
title: "MQTT Template Light"
description: "Instructions for how to setup MQTT Template lights within Home Assistant."
date: 2016-11-06 21:16
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
ha_category: Light
ha_iot_class: depends
ha_release: 0.33
---

The `mqtt_template` light platform lets you control a MQTT-enabled light that receive commands on a command topic and optionally sends status update on a state topic.
It is format-agnostic so you can use any data format you want (i.e. string, JSON), just configure it with templating.

This platform supports on/off, brightness, RGB colors, XY colors, color temperature, transitions, short/long flashing, effects and white values.

In an ideal scenario, the MQTT device will have a state topic to publish state changes. If these messages are published with the RETAIN flag, the MQTT light will receive an instant state update after subscription and will start with the correct state. Otherwise, the initial state of the light will be off.

When a state topic is not available, the light will work in optimistic mode. In this mode, the light will immediately change state after every command. Otherwise, the light will wait for state confirmation from the device (message from `state_topic`).

Optimistic mode can be forced, even if state topic is available. Try enabling it if the light is operating incorrectly.

```yaml
# Example configuration.yaml entry
light:
  - platform: mqtt_template
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
  description: "The [template](/docs/configuration/templating/#processing-incoming-data) for *on* state changes. Available variables: `state`, `brightness`, `red`, `green`, `blue`, `flash`, `transition` and `effect`."
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
{% endconfiguration %}

<p class='note warning'>
  Make sure that your topics match exact. `some-topic/` and `some-topic` are different topics.
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

In this section you find some real life examples of how to use this light.

### {% linkable_title Simple string payload %}

For a simple string payload with the format `state,brightness,r-g-b` (e.g., `on,255,255-255-255`), add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: mqtt_template
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
  - platform: mqtt_template
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

### {% linkable_title No brightness or color support %}

If you don't want brightness, color or effect support, just omit the corresponding configuration sections.

