---
title: "MQTT Light"
description: "Instructions on how to setup MQTT lights using default schema within Home Assistant."
ha_category:
  - Light
ha_iot_class: Configurable
ha_release: 0.8
ha_domain: mqtt
---

The `mqtt` light platform lets you control your MQTT enabled lights through one of the supported message schemas, `default`, `json` or `template`.

## Comparison of light MQTT schemas

| Function          | [`default`](#default-schema) | [`json`](#json-schema) | [`template`](#template-schema) |
| ----------------- | ---------------------------- | ---------------------- | ------------------------------ |
| Brightness        | ✔                            | ✔                      | ✔                              |
| Color mode        | ✔                            | ✔                      | ✘                              |
| Color temperature | ✔                            | ✔                      | ✔                              |
| Effects           | ✔                            | ✔                      | ✔                              |
| Flashing          | ✘                            | ✔                      | ✔                              |
| HS Color          | ✔                            | ✔                      | ✔                              |
| RGB Color         | ✔                            | ✔                      | ✔                              |
| RGBW Color        | ✔                            | ✔                      | ✘                              |
| RGBWW Color       | ✔                            | ✔                      | ✘                              |
| Transitions       | ✘                            | ✔                      | ✔                              |
| White             | ✔                            | ✔                      | ✘                              |
| XY Color          | ✔                            | ✔                      | ✘                              |

## Default schema

The `mqtt` light platform with default schema lets you control your MQTT enabled lights. It supports setting brightness, color temperature, effects, on/off, RGB colors, XY colors and white.

## Default schema - Configuration

In an ideal scenario, the MQTT device will have a state topic to publish state changes. If these messages are published with a `RETAIN` flag, the MQTT light will receive an instant state update after subscription and will start with the correct state. Otherwise, the initial state of the switch will be `unknown`. A MQTT device can reset the current state to `unknown` using a `None` payload.

When a state topic is not available, the light will work in optimistic mode. In this mode, the light will immediately change state after every command. Otherwise, the light will wait for state confirmation from the device (message from `state_topic`). The initial state is set to `False` / `off` in optimistic mode.

Optimistic mode can be forced, even if the `state_topic` is available. Try to enable it, if experiencing incorrect light operation.

Home Assistant internally assumes that a light's state corresponds to a defined `color_mode`.
The state of MQTT lights with default schema and support for both color and color temperature will set the `color_mode` according to the last received valid color or color temperature. Optionally, a `color_mode_state_topic` can be configured for explicit control of the `color_mode`.

```yaml
# Example configuration.yaml entry
mqtt:
  - light:
      command_topic: "office/rgb1/light/switch"
```

{% configuration %}
availability:
  description: A list of MQTT topics subscribed to receive availability (online/offline) updates. Must not be used together with `availability_topic`.
  required: false
  type: list
  keys:
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
    topic:
      description: An MQTT topic subscribed to receive availability (online/offline) updates.
      required: true
      type: string
    value_template:
      description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract device's availability from the `topic`. To determine the devices's availability result of this template will be compared to `payload_available` and `payload_not_available`."
      required: false
      type: template
availability_mode:
  description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
  required: false
  type: string
  default: latest
availability_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract device's availability from the `availability_topic`. To determine the devices's availability result of this template will be compared to `payload_available` and `payload_not_available`."
  required: false
  type: template
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates. Must not be used together with `availability`.
  required: false
  type: string
brightness_command_topic:
  description: The MQTT topic to publish commands to change the light’s brightness.
  required: false
  type: string
brightness_command_template:
  description: "Defines a [template](/docs/configuration/templating/) to compose message which will be sent to `brightness_command_topic`. Available variables: `value`."
  required: false
  type: template
brightness_scale:
  description: "Defines the maximum brightness value (i.e., 100%) of the MQTT device."
  required: false
  type: integer
  default: 255
brightness_state_topic:
  description: The MQTT topic subscribed to receive brightness state updates.
  required: false
  type: string
brightness_value_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract the brightness value."
  required: false
  type: template
color_mode_state_topic:
  description: "The MQTT topic subscribed to receive color mode updates. If this is not configured, `color_mode` will be automatically set according to the last received valid color or color temperature. The unit used is mireds, or if `color_temp_kelvin` is set to `true`, in Kelvin."
  required: false
  type: string
color_mode_value_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract the color mode."
  required: false
  type: template
color_temp_command_template:
  description: "Defines a [template](/docs/configuration/templating/) to compose message which will be sent to `color_temp_command_topic`. Available variables: `value`."
  required: false
  type: template
color_temp_command_topic:
  description: The MQTT topic to publish commands to change the light’s color temperature state. By default the color temperature command slider has a range of 153 to 500 mireds (micro reciprocal degrees) or a range of 2000 to 6535 Kelvin if `color_temp_kelvin` is set to `true`.
  required: false
  type: string
color_temp_kelvin:
  description: "When set to `true`, `color_temp_command_topic` will publish color mode updates in Kelvin and process `color_temp_state_topic` will process state updates in Kelvin. When not set the `color_temp` values are converted to mireds."
  required: false
  type: boolean
  default: false
color_temp_state_topic:
  description: "The MQTT topic subscribed to receive color temperature state updates."
  required: false
  type: string
color_temp_value_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract the color temperature value."
  required: false
  type: template
command_topic:
  description: The MQTT topic to publish commands to change the switch state.
  required: true
  type: string
device:
  description: 'Information about the device this light is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works when [`unique_id`](#unique_id) is set. At least one of identifiers or connections must be present to identify the device.'
  required: false
  type: map
  keys:
    configuration_url:
      description: 'A link to the webpage that can manage the configuration of this device. Can be either an `http://`, `https://` or an internal `homeassistant://` URL.'
      required: false
      type: string
    connections:
      description: 'A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `"connections": [["mac", "02:5b:26:a8:dc:12"]]`.'
      required: false
      type: list
    hw_version:
      description: The hardware version of the device.
      required: false
      type: string
    identifiers:
      description: 'A list of IDs that uniquely identify the device. For example a serial number.'
      required: false
      type: [string, list]
    manufacturer:
      description: 'The manufacturer of the device.'
      required: false
      type: string
    model:
      description: 'The model of the device.'
      required: false
      type: string
    model_id:
      description: The model identifier of the device.
      required: false
      type: string
    name:
      description: 'The name of the device.'
      required: false
      type: string
    serial_number:
      description: "The serial number of the device."
      required: false
      type: string
    suggested_area:
      description: 'Suggest an area if the device isn’t in one yet.'
      required: false
      type: string
    sw_version:
      description: 'The firmware version of the device.'
      required: false
      type: string
    via_device:
      description: 'Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device. This is used to show device topology in Home Assistant.'
      required: false
      type: string
enabled_by_default:
  description: Flag which defines if the entity should be enabled when first added.
  required: false
  type: boolean
  default: true
encoding:
  description: The encoding of the payloads received and published messages. Set to `""` to disable decoding of incoming payload.
  required: false
  type: string
  default: "utf-8"
entity_category:
  description: The [category](https://developers.home-assistant.io/docs/core/entity#generic-properties) of the entity.
  required: false
  type: string
entity_picture:
  description: "Picture URL for the entity."
  required: false
  type: string
effect_command_topic:
  description: "The MQTT topic to publish commands to change the light's effect state."
  required: false
  type: string
effect_command_template:
  description: "Defines a [template](/docs/configuration/templating/) to compose message which will be sent to `effect_command_topic`. Available variables: `value`."
  required: false
  type: template
effect_list:
  description: The list of effects the light supports.
  required: false
  type: [string, list]
effect_state_topic:
  description: The MQTT topic subscribed to receive effect state updates.
  required: false
  type: string
effect_value_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract the effect value."
  required: false
  type: template
hs_command_template:
  description: "Defines a [template](/docs/configuration/templating/) to compose message which will be sent to `hs_command_topic`. Available variables: `hue` and `sat`."
  required: false
  type: template
hs_command_topic:
  description: "The MQTT topic to publish commands to change the light's color state in HS format (Hue Saturation).
  Range for Hue: 0° .. 360°, Range of Saturation: 0..100.
  Note: Brightness is sent separately in the `brightness_command_topic`."
  required: false
  type: string
hs_state_topic:
  description: "The MQTT topic subscribed to receive color state updates in HS format. The expected payload is the hue and saturation values separated by commas, for example, `359.5,100.0`.
  Note: Brightness is received separately in the `brightness_state_topic`."
  required: false
  type: string
hs_value_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract the HS value."
  required: false
  type: template
icon:
  description: "[Icon](/docs/configuration/customizing-devices/#icon) for the entity."
  required: false
  type: icon
json_attributes_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract the JSON dictionary from messages received on the `json_attributes_topic`. Usage example can be found in [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-template-configuration) documentation."
  required: false
  type: template
json_attributes_topic:
  description: The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes. Usage example can be found in [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-topic-configuration) documentation.
  required: false
  type: string
max_kelvin:
  description: The maximum color temperature in Kelvin.
  required: false
  type: integer
  default: 6535
max_mireds:
  description: The maximum color temperature in mireds.
  required: false
  type: integer
min_kelvin:
  description: The minimum color temperature in Kelvin.
  required: false
  type: integer
  default: 2000
min_mireds:
  description: The minimum color temperature in mireds.
  required: false
  type: integer
name:
  description: The name of the light. Can be set to `null` if only the device name is relevant.
  required: false
  type: string
  default: MQTT Light
object_id:
  description: Used instead of `name` for automatic generation of `entity_id`
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
payload_off:
  description: The payload that represents disabled state.
  required: false
  type: string
  default: "OFF"
payload_on:
  description: The payload that represents enabled state.
  required: false
  type: string
  default: "ON"
platform:
  description: Must be `light`. Only allowed and required in [MQTT auto discovery device messages](/integrations/mqtt/#device-discovery-payload).
  required: true
  type: string
qos:
  description: The maximum QoS level to be used when receiving and publishing messages.
  required: false
  type: integer
  default: 0
retain:
  description: If the published message should have the retain flag on or not.
  required: false
  type: boolean
  default: false
rgb_command_template:
  description: "Defines a [template](/docs/configuration/templating/) to compose message which will be sent to `rgb_command_topic`. Available variables: `red`, `green` and `blue`."
  required: false
  type: template
rgb_command_topic:
  description: "The MQTT topic to publish commands to change the light's RGB state."
  required: false
  type: string
rgb_state_topic:
  description: "The MQTT topic subscribed to receive RGB state updates. The expected payload is the RGB values separated by commas, for example, `255,0,127`."
  required: false
  type: string
rgb_value_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract the RGB value."
  required: false
  type: template
rgbw_command_template:
  description: "Defines a [template](/docs/configuration/templating/) to compose message which will be sent to `rgbw_command_topic`. Available variables: `red`, `green`, `blue` and `white`."
  required: false
  type: template
rgbw_command_topic:
  description: "The MQTT topic to publish commands to change the light's RGBW state."
  required: false
  type: string
rgbw_state_topic:
  description: "The MQTT topic subscribed to receive RGBW state updates. The expected payload is the RGBW values separated by commas, for example, `255,0,127,64`."
  required: false
  type: string
rgbw_value_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract the RGBW value."
  required: false
  type: template
rgbww_command_template:
  description: "Defines a [template](/docs/configuration/templating/) to compose message which will be sent to `rgbww_command_topic`. Available variables: `red`, `green`, `blue`, `cold_white` and `warm_white`."
  required: false
  type: template
rgbww_command_topic:
  description: "The MQTT topic to publish commands to change the light's RGBWW state."
  required: false
  type: string
rgbww_state_topic:
  description: "The MQTT topic subscribed to receive RGBWW state updates. The expected payload is the RGBWW values separated by commas, for example, `255,0,127,64,32`."
  required: false
  type: string
rgbww_value_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract the RGBWW value."
  required: false
  type: template
schema:
  description: The schema to use. Must be `default` or omitted to select the default schema.
  required: false
  type: string
  default: default
state_topic:
  description: "The MQTT topic subscribed to receive state updates. A \"None\" payload resets to an `unknown` state. An empty payload is ignored. By default, valid state payloads are `OFF` and `ON`. The accepted payloads can be overridden with the `payload_off` and `payload_on` config options."
  required: false
  type: string
state_value_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract the state value. The template should return the `payload_on` and `payload_off` values, so if your light uses `power on` to turn on, your `state_value_template` string should return `power on` when the switch is on. For example, if the message is just `on`, your `state_value_template` should be `power {{ value }}`. When your `payload_on = 27` and `payload_off = 'off'`, then this template might be `'off' if value_json.my_custom_brightness_field <= 0 else 27`."
  required: false
  type: template
unique_id:
  description: An ID that uniquely identifies this light. If two lights have the same unique ID, Home Assistant will raise an exception. Required when used with device-based discovery.
  required: false
  type: string
white_command_topic:
  description: "The MQTT topic to publish commands to change the light to white mode with a given brightness."
  required: false
  type: string
white_scale:
  description: "Defines the maximum white level (i.e., 100%) of the MQTT device."
  required: false
  type: integer
  default: 255
xy_command_template:
  description: "Defines a [template](/docs/configuration/templating/) to compose message which will be sent to `xy_command_topic`. Available variables: `x` and `y`."
  required: false
  type: template
xy_command_topic:
  description: "The MQTT topic to publish commands to change the light's XY state."
  required: false
  type: string
xy_state_topic:
  description: The MQTT topic subscribed to receive XY state updates. The expected payload is the X and Y color values separated by commas, for example, `0.675,0.322`.
  required: false
  type: string
xy_value_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract the XY value."
  required: false
  type: template
{% endconfiguration %}

{% important %}
Make sure that your topics match exactly. `some-topic/` and `some-topic` are different topics.
{% endimportant %}

{% note %}
XY and RGB can not be used at the same time. If both are provided, XY overrides RGB.
{% endnote %}

## Default schema - Examples

In this section you will find some real-life examples of how to use this sensor.

### Brightness and RGB support

To enable a light with brightness and RGB support in your installation, add the following to your {% term "`configuration.yaml`" %} file:

{% raw %}

```yaml
# Example configuration.yaml entry
mqtt:
  - light:
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

### Brightness and no RGB support

To enable a light with brightness (no RGB version) in your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
mqtt:
  - light:
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

### Brightness without on commands

To enable a light that sends only brightness topics to turn it on, add the following to your {% term "`configuration.yaml`" %} file. The `command_topic` is only used to send an off command in this case:

```yaml
# Example configuration.yaml entry
mqtt:
  - light:
      name: "Brightness light"
      state_topic: "office/light/status"
      command_topic: "office/light/switch"
      payload_off: "OFF"
      brightness_state_topic: 'office/light/brightness'
      brightness_command_topic: 'office/light/brightness/set'
      on_command_type: 'brightness'
```

## Default schema - Implementations

- A [basic example](https://github.com/mertenats/open-home-automation/tree/master/ha_mqtt_light) using a NodeMCU board (ESP8266) to control its built-in LED (on/off).
- Another [example](https://github.com/mertenats/open-home-automation/tree/master/ha_mqtt_rgb_light) to control a RGB LED (on/off, brightness, and colors).
- [Integration guide](https://github.com/xoseperez/espurna/wiki/HomeAssistant) for the ESPUrna firmware (ESP8285/ESP8266).

## JSON schema

The `mqtt` light platform with JSON schema lets you control a MQTT-enabled light that can receive [JSON](https://en.wikipedia.org/wiki/JSON) messages.

This schema supports on/off, brightness, RGB colors, XY colors, color temperature, transitions and short/long flashing. The messages sent to/from the lights look similar to this, omitting fields when they aren't needed. The `color_mode` will not be present in messages sent to the light. It is optional in messages received from the light, but can be used to disambiguate the current mode in the light. In the example below, `color_mode` is set to `rgb` and `color_temp`, `color.c`, `color.w`, `color.x`, `color.y`, `color.h`, `color.s` will all be ignored by Home Assistant:

```json
{
  "brightness": 255,
  "color_mode": "rgb",
  "color_temp": 155,
  "color": {
    "r": 255,
    "g": 180,
    "b": 200,
    "c": 100,
    "w": 50,
    "x": 0.406,
    "y": 0.301,
    "h": 344.0,
    "s": 29.412
  },
  "effect": "colorloop",
  "state": "ON",
  "transition": 2,
}
```

## JSON schema - Configuration

In an ideal scenario, the MQTT device will have a state topic to publish state changes. If these messages are published with the RETAIN flag, the MQTT light will receive an instant state update after subscription and will start with the correct state. Otherwise, the initial state of the light will be off.

When a state topic is not available, the light will work in optimistic mode. In this mode, the light will immediately change state after every command. Otherwise, the light will wait for state confirmation from the device (message from `state_topic`).

Optimistic mode can be forced, even if state topic is available. Try enabling it if the light is operating incorrectly.

```yaml
# Example configuration.yaml entry
mqtt:
  - light:
      schema: json
      command_topic: "home/rgb1/set"
```

{% configuration %}
availability:
  description: A list of MQTT topics subscribed to receive availability (online/offline) updates. Must not be used together with `availability_topic`.
  required: false
  type: list
  keys:
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
    topic:
      description: An MQTT topic subscribed to receive availability (online/offline) updates.
      required: true
      type: string
    value_template:
      description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract device's availability from the `topic`. To determine the devices's availability result of this template will be compared to `payload_available` and `payload_not_available`."
      required: false
      type: template
availability_mode:
  description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
  required: false
  type: string
  default: latest
availability_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract device's availability from the `availability_topic`. To determine the devices's availability result of this template will be compared to `payload_available` and `payload_not_available`."
  required: false
  type: template
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates. Must not be used together with `availability`.
  required: false
  type: string
brightness:
  description: Flag that defines if light supports brightness when the `rgb`, `rgbw`, or `rgbww` color mode is supported.
  required: false
  type: boolean
  default: false
brightness_scale:
  description: "Defines the maximum brightness value (i.e., 100%) of the MQTT device."
  required: false
  type: integer
  default: 255
color_temp_kelvin:
  description: "When set to `true`, `command_topic` will publish color mode updates in Kelvin, and process `state_topic` will process state updates in Kelvin. By default, the `color_temp` values are converted to and from mireds."
  required: false
  type: boolean
  default: false
command_topic:
  description: The MQTT topic to publish commands to change the light’s state.
  required: true
  type: string
device:
  description: 'Information about the device this light is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works when [`unique_id`](#unique_id) is set. At least one of identifiers or connections must be present to identify the device.'
  required: false
  type: map
  keys:
    configuration_url:
      description: 'A link to the webpage that can manage the configuration of this device. Can be either an `http://`, `https://` or an internal `homeassistant://` URL.'
      required: false
      type: string
    connections:
      description: 'A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `"connections": [["mac", "02:5b:26:a8:dc:12"]]`.'
      required: false
      type: list
    identifiers:
      description: 'A list of IDs that uniquely identify the device. For example a serial number.'
      required: false
      type: [string, list]
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
    serial_number:
      description: "The serial number of the device."
      required: false
      type: string
    sw_version:
      description: 'The firmware version of the device.'
      required: false
      type: string
enabled_by_default:
  description: Flag which defines if the entity should be enabled when first added.
  required: false
  type: boolean
  default: true
encoding:
  description: The encoding of the payloads received and published messages. Set to `""` to disable decoding of incoming payload.
  required: false
  type: string
  default: "utf-8"
entity_category:
  description: The [category](https://developers.home-assistant.io/docs/core/entity#generic-properties) of the entity.
  required: false
  type: string
effect:
  description: Flag that defines if the light supports effects.
  required: false
  type: boolean
  default: false
effect_list:
  description: The list of effects the light supports.
  required: false
  type: [string, list]
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
icon:
  description: "[Icon](/docs/configuration/customizing-devices/#icon) for the entity."
  required: false
  type: icon
json_attributes_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract the JSON dictionary from messages received on the `json_attributes_topic`. Usage example can be found in [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-template-configuration) documentation."
  required: false
  type: template
json_attributes_topic:
  description: The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes. Usage example can be found in [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-topic-configuration) documentation.
  required: false
  type: string
max_kelvin:
  description: The maximum color temperature in Kelvin.
  required: false
  type: integer
  default: 6535
max_mireds:
  description: The maximum color temperature in mireds.
  required: false
  type: integer
min_kelvin:
  description: The minimum color temperature in Kelvin.
  required: false
  type: integer
  default: 2000
min_mireds:
  description: The minimum color temperature in mireds.
  required: false
  type: integer
name:
  description: The name of the light.
  required: false
  type: string
  default: MQTT JSON Light
object_id:
  description: Used instead of `name` for automatic generation of `entity_id`
  required: false
  type: string
optimistic:
  description: Flag that defines if the light works in optimistic mode.
  required: false
  type: boolean
  default: "`true` if no state topic defined, else `false`."
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
platform:
  description: Must be `light`. Only allowed and required in [MQTT auto discovery device messages](/integrations/mqtt/#device-discovery-payload).
  required: true
  type: string
qos:
  description: The maximum QoS level to be used when receiving and publishing messages.
  required: false
  type: integer
  default: 0
retain:
  description: If the published message should have the retain flag on or not.
  required: false
  type: boolean
  default: false
schema:
  description: The schema to use. Must be `json` to select the JSON schema.
  required: false
  type: string
  default: default
state_topic:
  description: 'The MQTT topic subscribed to receive state updates in a JSON-format. The JSON payload may contain the elements: `"state"`: `"ON"` the light is on, `"OFF"` the light is off, `null` the state is `unknown`; `"color_mode"`: one of the `supported_color_modes`; `"color"`: A dict with the color attributes*; `"brightness"`: The brightness; `"color_temp"`: The color temperature; `"effect"`: The effect of the light.'
  required: false
  type: string
supported_color_modes:
  description: A list of color modes supported by the list. Possible color modes are `onoff`, `brightness`, `color_temp`, `hs`, `xy`, `rgb`, `rgbw`, `rgbww`, `white`. Note that if `onoff` **or** `brightness` are used, that must be the _only_ value in the list.
  required: false
  type: list
unique_id:
   description: An ID that uniquely identifies this light. If two lights have the same unique ID, Home Assistant will raise an exception. Required when used with device-based discovery.
   required: false
   type: string
white_scale:
  description: "Defines the maximum white level (i.e., 100%) of the MQTT device. This is used when setting the light to white mode."
  required: false
  type: integer
  default: 255
{% endconfiguration %}

*The `color` attribute dict in the JSON state payload should contain the following keys based on the `color_mode`:

- `hs`:
  - `h`: The hue value
  - `s`: The saturation value
- `xy`:
  - `x`: X color value
  - `y`: Y color value
- `rgb`:
  - `r`: Red color value
  - `g`: Green color value
  - `b`: Blue color value
- `rgbw`:
  - `r`: Red color value
  - `g`: Green color value
  - `b`: Blue color value
  - `w`: White value
- `rgbww`:
  - `r`: Red color value
  - `g`: Green color value
  - `b`: Blue color value
  - `c`: Cool white value
  - `w`: Warm white value

More details about the different colors, color modes and range values [can be found here](https://www.home-assistant.io/integrations/light/).

{% important %}
Make sure that your topics match exact. `some-topic/` and `some-topic` are different topics.
{% endimportant %}

{% note %}
RGB, XY and HSV can not be used at the same time in `state_topic` messages. Make sure that only one of the color models is in the "color" section of the state MQTT payload.
{% endnote %}

## JSON schema - Examples

In this section you find some real-life examples of how to use this sensor.

### Brightness and RGB support

To enable a light with brightness and RGB support in your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
mqtt:
  - light:
      schema: json
      name: mqtt_json_light_1
      state_topic: "home/rgb1"
      command_topic: "home/rgb1/set"
      brightness: true
      supported_color_modes: ["rgb"]
```

### Brightness and no RGB support

To enable a light with brightness (but no color support) in your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
mqtt:
  - light:
      schema: json
      name: mqtt_json_light_1
      state_topic: "home/rgb1"
      command_topic: "home/rgb1/set"
      brightness: true
      supported_color_modes: ["brightness"]
```

### Brightness scaled

To enable a light using a brightness scale other than 8bit the `brightness_scale` option may be added to denote the "fully on" value:

```yaml
# Example configuration.yaml entry
mqtt:
  - light:
      schema: json
      name: mqtt_json_light_1
      state_topic: "home/light"
      command_topic: "home/light/set"
      brightness: true
      brightness_scale: 4095
      supported_color_modes: ["brightness"]
```

Home Assistant will then convert its 8bit value in the message to and from the device:

```json
{
  "brightness": 4095,
  "state": "ON"
}
```

### HS color

To use a light with hue+saturation as the color model, set `supported_color_modes` to `["hs"]` in the platform configuration:

```yaml
mqtt:
  - light:
      schema: json
      name: mqtt_json_hs_light
      state_topic: "home/light"
      command_topic: "home/light/set"
      supported_color_modes: ["hs"]
```

Home Assistant expects the hue values to be in the range 0 to 360 and the saturation values to be scaled from 0 to 100. For example, the following is a blue color shade:

```json
{
  "state": "ON",
  "color_mode": "hs",
  "color": {
    "h": 24.0,
    "s": 100.0
  }
}
```

### Brightness and RGBW support

To enable a light with brightness, RGB support and a separate white channel (RGBW) in your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
mqtt:
  - light:
      schema: json
      name: mqtt_json_light_1
      state_topic: "home/rgbw1"
      command_topic: "home/rgbw1/set"
      brightness: true
      supported_color_modes: ["rgbw"]
```

## Implementations

- A full example of custom lighting using this platform and an ESP8266 microcontroller can be found [here](https://github.com/corbanmailloux/esp-mqtt-rgb-led). It supports on/off, brightness, transitions, RGB colors, and flashing.

- There is also another implementation forked from the above repository, it supports all the same features but is made for addressable LED strips using FastLED on a NodeMCU V3 it can be found [here](https://github.com/JammyDodger231/nodemcu-mqtt-rgb-led).

- [McLighting](https://github.com/toblum/McLighting) is another ESP8266 firmware for WS2812 addressable LEDs.

- [MQTT JSON Light](https://github.com/mertenats/Open-Home-Automation/tree/master/ha_mqtt_rgbw_light_with_discovery) is another implementation for ESP8266 including [MQTT discovery](/integrations/mqtt/#mqtt-discovery).

- [ESPHome](https://esphome.io) implements the JSON schema for MQTT based installs and supports [MQTT discovery](/integrations/mqtt/#mqtt-discovery).

- [AiLight](https://github.com/stelgenhof/AiLight) is a custom firmware for the Ai-Thinker (and equivalent) RGBW WiFi light bulbs that has an ESP8266 onboard and controlled by the MY9291 LED driver. It implements the [MQTT JSON light](/integrations/light.mqtt) platform and supports ON/OFF, RGBW colours, brightness, color temperature, flashing and transitions. Also it includes [MQTT Auto Discovery](/integrations/mqtt/#mqtt-discovery)) and the MQTT Last Will and Testament is enabled as well.

- [h801-mqtt-json](https://github.com/starkillerOG/h801-mqtt-json) is a custom firmware for the H801 LED dimmer, a 5 channel (RGBWWCW)  WiFi LED strip controller for 12V LED strips. The firmware is meant to control the 5 channels of the H801 to simultaneously control an RGB and a Warm-white/Cold-white LED strip such as a 5050 RGB LED strip and a 5025 Dual White strip. It implements the [MQTT JSON light](/integrations/light.mqtt) platform and supports ON/OFF, RGBW colours (RGB strip), brightness, color temperature (CW/WW strip) and transitions.

## Template schema

The `mqtt` light platform with template schema lets you control a MQTT-enabled light that receive commands on a command topic and optionally sends status update on a state topic.
It is format-agnostic so you can use any data format you want (i.e., string, JSON), just configure it with templating.

This schema supports on/off, brightness, RGB colors, XY colors, HS Color, color temperature, transitions, short/long flashing and effects.

## Template schema - Configuration

In an ideal scenario, the MQTT device will have a state topic to publish state changes. If these messages are published with the RETAIN flag, the MQTT light will receive an instant state update after subscription and will start with the correct state. Otherwise, the initial state of the light will be off.

When a state topic is not available, the light will work in optimistic mode. In this mode, the light will immediately change state after every command. Otherwise, the light will wait for state confirmation from the device (message from `state_topic`).

Optimistic mode can be forced, even if state topic is available. Try enabling it if the light is operating incorrectly.

```yaml
# Example configuration.yaml entry
mqtt:
  - light:
      schema: template
      command_topic: "home/rgb1/set"
      command_on_template: "on"
      command_off_template: "off"
```

{% configuration %}
availability:
  description: A list of MQTT topics subscribed to receive availability (online/offline) updates. Must not be used together with `availability_topic`.
  required: false
  type: list
  keys:
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
    topic:
      description: An MQTT topic subscribed to receive availability (online/offline) updates.
      required: true
      type: string
    value_template:
      description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract device's availability from the `topic`. To determine the devices's availability result of this template will be compared to `payload_available` and `payload_not_available`."
      required: false
      type: template
availability_mode:
  description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
  required: false
  type: string
  default: latest
availability_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract device's availability from the `availability_topic`. To determine the devices's availability result of this template will be compared to `payload_available` and `payload_not_available`."
  required: false
  type: template
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates. Must not be used together with `availability`.
  required: false
  type: string
blue_template:
  description: "[Template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract blue color from the state payload value. Expected result of the template is an integer from 0-255 range."
  required: false
  type: template
brightness_template:
  description: "[Template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract brightness from the state payload value. Expected result of the template is an integer from 0-255 range."
  required: false
  type: template
color_temp_kelvin:
  description: "When set to `true`, `command_topic` will publish color mode updates in Kelvin and process `state_topic` will process state updates in Kelvin. When not set the `color_temp` values are converted to mireds."
  required: false
  type: boolean
  default: false
color_temp_template:
  description: "[Template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract color temperature from the state payload value. Expected result of the template is an integer. If `color_temp_kelvin` is `true` the expected value is in Kelvin else mireds are expected."
  required: false
  type: template
command_off_template:
  description: "The [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) for *off* state changes. Available variables: `state` and `transition`."
  required: true
  type: template
command_on_template:
  description: "The [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) for *on* state changes. Available variables: `state`, `brightness`, `color_temp`, `red`, `green`, `blue`, `hue`, `sat`, `flash`, `transition` and `effect`. Values `red`, `green`, `blue`, `brightness` are provided as integers from range 0-255. Value of `hue` is provided as float from range 0-360. Value of `sat` is provided as float from range 0-100. Value of `color_temp` is provided as integer representing mired or Kelvin units if `color_temp_kelvin` is `true`."
  required: true
  type: template
command_topic:
  description: The MQTT topic to publish commands to change the light’s state.
  required: true
  type: string
device:
  description: 'Information about the device this light is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works when [`unique_id`](#unique_id) is set. At least one of identifiers or connections must be present to identify the device.'
  required: false
  type: map
  keys:
    configuration_url:
      description: 'A link to the webpage that can manage the configuration of this device. Can be either an `http://`, `https://` or an internal `homeassistant://` URL.'
      required: false
      type: string
    connections:
      description: 'A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `"connections": [["mac", "02:5b:26:a8:dc:12"]]`.'
      required: false
      type: list
    identifiers:
      description: 'A list of IDs that uniquely identify the device. For example a serial number.'
      required: false
      type: [string, list]
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
    serial_number:
      description: "The serial number of the device."
      required: false
      type: string
    sw_version:
      description: 'The firmware version of the device.'
      required: false
      type: string
enabled_by_default:
  description: Flag which defines if the entity should be enabled when first added.
  required: false
  type: boolean
  default: true
encoding:
  description: The encoding of the payloads received and published messages. Set to `""` to disable decoding of incoming payload.
  required: false
  type: string
  default: "utf-8"
entity_category:
  description: The [category](https://developers.home-assistant.io/docs/core/entity#generic-properties) of the entity.
  required: false
  type: string
effect_list:
  description: List of possible effects.
  required: false
  type: [string, list]
effect_template:
  description: "[Template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract effect from the state payload value."
  required: false
  type: template
green_template:
  description: "[Template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract green color from the state payload value. Expected result of the template is an integer from 0-255 range."
  required: false
  type: template
icon:
  description: "[Icon](/docs/configuration/customizing-devices/#icon) for the entity."
  required: false
  type: icon
json_attributes_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract the JSON dictionary from messages received on the `json_attributes_topic`. Usage example can be found in [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-template-configuration) documentation."
  required: false
  type: template
json_attributes_topic:
  description: The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes. Usage example can be found in [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-topic-configuration) documentation.
  required: false
  type: string
max_kelvin:
  description: The maximum color temperature in Kelvin.
  required: false
  type: integer
  default: 6535
max_mireds:
  description: The maximum color temperature in mireds.
  required: false
  type: integer
min_kelvin:
  description: The minimum color temperature in Kelvin.
  required: false
  type: integer
  default: 2000
min_mireds:
  description: The minimum color temperature in mireds.
  required: false
  type: integer
name:
  description: The name of the light.
  required: false
  type: string
  default: MQTT Template Light
object_id:
  description: Used instead of `name` for automatic generation of `entity_id`
  required: false
  type: string
optimistic:
  description: Flag that defines if the light works in optimistic mode.
  required: false
  type: boolean
  default: "`true` if no state topic or state template is defined, else `false`."
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
platform:
  description: Must be `light`. Only allowed and required in [MQTT auto discovery device messages](/integrations/mqtt/#device-discovery-payload).
  required: true
  type: string
qos:
  description: The maximum QoS level to be used when receiving and publishing messages.
  required: false
  type: integer
  default: 0
red_template:
  description: "[Template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract red color from the state payload value. Expected result of the template is an integer from 0-255 range."
  required: false
  type: template
schema:
  description: The schema to use. Must be `template` to select the template schema.
  required: false
  type: string
  default: default
state_template:
  description: "[Template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract state from the state payload value."
  required: false
  type: template
state_topic:
  description: The MQTT topic subscribed to receive state updates. A "None" payload resets to an `unknown` state. An empty payload is ignored.
  required: false
  type: string
unique_id:
   description: An ID that uniquely identifies this light. If two lights have the same unique ID, Home Assistant will raise an exception. Required when used with device-based discovery.
   required: false
   type: string
{% endconfiguration %}

{% important %}
Make sure that your topics match exact. `some-topic/` and `some-topic` are different topics.
{% endimportant %}

## Template schema - Examples

In this section you find some real-life examples of how to use this light.

### Simple string payload

For a simple string payload with the format `state,brightness,r-g-b,h-s` (e.g., `on,255,255-255-255,360-100`), add the following to your {% term "`configuration.yaml`" %} file:

{% raw %}

```yaml
# Example configuration.yaml entry
mqtt:
  - light:
      schema: template
      command_topic: "home/rgb1/set"
      state_topic: "home/rgb1/status"
      command_on_template: "on,{{ brightness|d }},{{ red|d }}-{{ green|d }}-{{ blue|d }},{{ hue|d }}-{{ sat|d }}"
      command_off_template: "off"
      state_template: "{{ value.split(',')[0] }}"  # must return `on` or `off`
      brightness_template: "{{ value.split(',')[1] }}"
      red_template: "{{ value.split(',')[2].split('-')[0] }}"
      green_template: "{{ value.split(',')[2].split('-')[1] }}"
      blue_template: "{{ value.split(',')[2].split('-')[2] }}"
```

{% endraw %}

### JSON payload

For a JSON payload with the format `{"state": "on", "brightness": 255, "color": [255, 255, 255], "effect": "rainbow"}`, add the following to your {% term "`configuration.yaml`" %} file:

{% raw %}

```yaml
# Example configuration.yaml entry
mqtt:
  - light:
      schema: template
      effect_list:
        - rainbow
        - colorloop
      command_topic: "home/rgb1/set"
      state_topic: "home/rgb1/status"
      command_on_template: >
        {"state": "on"
        {%- if brightness is defined -%}
        , "brightness": {{ brightness }}
        {%- endif -%}
        {%- if red is defined and green is defined and blue is defined -%}
        , "color": [{{ red }}, {{ green }}, {{ blue }}]
        {%- endif -%}
        {%- if hue is defined and sat is defined -%}
        , "huesat": [{{ hue }}, {{ sat }}]
        {%- endif -%}
        {%- if effect is defined -%}
        , "effect": "{{ effect }}"
        {%- endif -%}
        }
      command_off_template: '{"state": "off"}'
      state_template: '{{ value_json.state }}'
      brightness_template: '{{ value_json.brightness }}'
      red_template: '{{ value_json.color[0] }}'
      green_template: '{{ value_json.color[1] }}'
      blue_template: '{{ value_json.color[2] }}'
      effect_template: '{{ value_json.effect }}'
```

{% endraw %}

### CCT light (brightnes and temperature)

This example comes from a configuration of Shelly RGBW Bulb working in White mode.
`max_mireds` and `min_mireds` set color temperature boundaries to 3000K - 6500K. Notice the same limits are applied in `command_on_template`, but in kelvin units this time. It's due to conversion from mired to kelvin which causes exceeding boundary values accepted by the device.
The code also ensures bi-directional conversion of brightness scale between 0-100 (required by the device) and 0-255 (required by Home Assistant).
Add the following to your {% term "`configuration.yaml`" %} file:

{% raw %}

```yaml
# Example configuration.yaml entry
mqtt:
  - light:
      schema: template
      name: "Bulb-white"
      command_topic: "shellies/bulb/color/0/set"
      state_topic: "shellies/bulb/color/0/status"
      availability_topic: "shellies/bulb/online"
      command_on_template: >
        {"turn": "on", "mode": "white"
        {%- if brightness is defined -%}
        , "brightness": {{brightness | float | multiply(0.39215686) | round(0)}}
        {%- endif -%}
        {%- if color_temp is defined -%}
        , "temp": {{ [[(1000000 / color_temp | float) | round(0), 3000] | max, 6500] | min }}
        {%- endif -%}
        }
      command_off_template: '{"turn":"off", "mode": "white"}'
      state_template: "{% if value_json.ison and value_json.mode == 'white' %}on{% else %}off{% endif %}"
      brightness_template: "{{ value_json.brightness | float | multiply(2.55) | round(0) }}"
      color_temp_template: "{{ (1000000 / value_json.temp | float) | round(0) }}"
      payload_available: "true"
      payload_not_available: "false"
      max_mireds: 334
      min_mireds: 153
      qos: 1
      retain: false
      optimistic: false  
```

{% endraw %}

### Template schema - No brightness or color support

If you don't want brightness, color or effect support, just omit the corresponding configuration sections.
