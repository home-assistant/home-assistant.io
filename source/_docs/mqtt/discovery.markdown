---
layout: page
title: "MQTT Discovery"
description: "Instructions on how to setup MQTT Discovery within Home Assistant."
date: 2015-08-07 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
---

The discovery of MQTT devices will enable one to use MQTT devices with only minimal configuration effort on the side of Home Assistant. The configuration is done on the device itself and the topic used by the device. Similar to the [HTTP binary sensor](/components/binary_sensor.http/) and the [HTTP sensor](/components/sensor.http/). The basic idea is that the device itself adds its configuration into your `configuration.yaml` automatically. To prevent multiple identical entries if a device reconnects a unique identifier is necessary. Two parts are required on the device side: The configuration topic which contains the necessary device type and unique identifier and the remaining device configuration without the device type.

Supported by MQTT discovery:

- [Alarm control panels](/components/alarm_control_panel.mqtt/)
- [Binary sensors](/components/binary_sensor.mqtt/)
- [Cameras](/components/camera.mqtt/)
- [Covers](/components/cover.mqtt/)
- [Fans](/components/fan.mqtt/)
- [HVACs](/components/climate.mqtt/)
- [Lights](/components/light.mqtt/)
- [Locks](/components/lock.mqtt/)
- [Sensors](/components/sensor.mqtt/)
- [Switches](/components/switch.mqtt/)

To enable MQTT discovery, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
mqtt:
  discovery: true
  discovery_prefix: homeassistant
```

{% configuration %}
discovery:
  description: If the MQTT discovery should be enabled or not.
  required: false
  default: false
  type: boolean
discovery_prefix:
  description: The prefix for the discovery topic.
  required: false
  default: homeassistant
  type: string
{% endconfiguration %}

<p class='note'>
The [embedded MQTT broker](/docs/mqtt/broker#embedded-broker) does not save any messages between restarts. If you use the embedded MQTT broker you have to send the MQTT discovery messages after every Home Assistant restart for the devices to show up.
</p>

The discovery topic need to follow a specific format:

```text
<discovery_prefix>/<component>/[<node_id>/]<object_id>/<>
```

- `<component>`: One of the supported components, eg. `binary_sensor`.
- `<node_id>` (*Optional*):  ID of the node providing the topic.
- `<object_id>`: The ID of the device. This is only to allow for separate topics for each device and is not used for the `entity_id`.
- `<>`: The topic `config` or `state` which defines the current action.

The payload will be checked like an entry in your `configuration.yaml` file if a new device is added. This means that missing variables will be filled with the platform's default values. All configuration variables which are *required* must be present in the initial payload send to `/config`.

An empty payload will cause a previously discovered device to be deleted.

The `<node_id>` level can be used by clients to only subscribe to their own (command) topics by using one wildcard topic like `<discovery_prefix>/+/<node_id>/+/set`.

A base topic `~` may be defined in the payload to conserve memory when the same topic base is used multiple times.
In the value of configuration variables ending with `_topic`, `~` will be replaced with the base topic, if the `~` occurs at the beginning or end of the value.

Configuration variable names in the discovery payload may be abbreviated to conserve memory when sending a discovery message from memory constrained devices.

Supported abbreviations:
```
    'aux_cmd_t':           'aux_command_topic',
    'aux_stat_tpl':        'aux_state_template',
    'aux_stat_t':          'aux_state_topic',
    'avty_t':              'availability_topic',
    'away_mode_cmd_t':     'away_mode_command_topic',
    'away_mode_stat_tpl':  'away_mode_state_template',
    'away_mode_stat_t':    'away_mode_state_topic',
    'bri_cmd_t':           'brightness_command_topic',
    'bri_scl':             'brightness_scale',
    'bri_stat_t':          'brightness_state_topic',
    'bri_val_tpl':         'brightness_value_template',
    'clr_temp_cmd_t':      'color_temp_command_topic',
    'clr_temp_stat_t':     'color_temp_state_topic',
    'clr_temp_val_tpl':    'color_temp_value_template',
    'cmd_t':               'command_topic',
    'curr_temp_t':         'current_temperature_topic',
    'dev_cla':             'device_class',
    'fx_cmd_t':            'effect_command_topic',
    'fx_list':             'effect_list',
    'fx_stat_t':           'effect_state_topic',
    'fx_val_tpl':          'effect_value_template',
    'exp_aft':             'expire_after',
    'fan_mode_cmd_t':      'fan_mode_command_topic',
    'fan_mode_stat_tpl':   'fan_mode_state_template',
    'fan_mode_stat_t':     'fan_mode_state_topic',
    'frc_upd':             'force_update',
    'hold_cmd_t':          'hold_command_topic',
    'hold_stat_tpl':       'hold_state_template',
    'hold_stat_t':         'hold_state_topic',
    'ic':                  'icon',
    'init':                'initial',
    'json_attr':           'json_attributes',
    'max_temp':            'max_temp',
    'min_temp':            'min_temp',
    'mode_cmd_t':          'mode_command_topic',
    'mode_stat_tpl':       'mode_state_template',
    'mode_stat_t':         'mode_state_topic',
    'name':                'name',
    'on_cmd_type':         'on_command_type',
    'opt':                 'optimistic',
    'osc_cmd_t':           'oscillation_command_topic',
    'osc_stat_t':          'oscillation_state_topic',
    'osc_val_tpl':         'oscillation_value_template',
    'pl_arm_away':         'payload_arm_away',
    'pl_arm_home':         'payload_arm_home',
    'pl_avail':            'payload_available',
    'pl_cls':              'payload_close',
    'pl_disarm':           'payload_disarm',
    'pl_hi_spd':           'payload_high_speed',
    'pl_lock':             'payload_lock',
    'pl_lo_spd':           'payload_low_speed',
    'pl_med_spd':          'payload_medium_speed',
    'pl_not_avail':        'payload_not_available',
    'pl_off':              'payload_off',
    'pl_on':               'payload_on',
    'pl_open':             'payload_open',
    'pl_osc_off':          'payload_oscillation_off',
    'pl_osc_on':           'payload_oscillation_on',
    'pl_stop':             'payload_stop',
    'pl_unlk':             'payload_unlock',
    'pow_cmd_t':           'power_command_topic',
    'ret':                 'retain',
    'rgb_cmd_tpl':         'rgb_command_template',
    'rgb_cmd_t':           'rgb_command_topic',
    'rgb_stat_t':          'rgb_state_topic',
    'rgb_val_tpl':         'rgb_value_template',
    'send_if_off':         'send_if_off',
    'set_pos_tpl':         'set_position_template',
    'set_pos_t':           'set_position_topic',
    'spd_cmd_t':           'speed_command_topic',
    'spd_stat_t':          'speed_state_topic',
    'spd_val_tpl':         'speed_value_template',
    'spds':                'speeds',
    'stat_clsd':           'state_closed',
    'stat_off':            'state_off',
    'stat_on':             'state_on',
    'stat_open':           'state_open',
    'stat_t':              'state_topic',
    'stat_val_tpl':        'state_value_template',
    'swing_mode_cmd_t':    'swing_mode_command_topic',
    'swing_mode_stat_tpl': 'swing_mode_state_template',
    'swing_mode_stat_t':   'swing_mode_state_topic',
    'temp_cmd_t':          'temperature_command_topic',
    'temp_stat_tpl':       'temperature_state_template',
    'temp_stat_t':         'temperature_state_topic',
    'tilt_clsd_val':       'tilt_closed_value',
    'tilt_cmd_t':          'tilt_command_topic',
    'tilt_inv_stat':       'tilt_invert_state',
    'tilt_max':            'tilt_max',
    'tilt_min':            'tilt_min',
    'tilt_opnd_val':       'tilt_opened_value',
    'tilt_status_opt':     'tilt_status_optimistic',
    'tilt_status_t':       'tilt_status_topic',
    't':                   'topic',
    'uniq_id':             'unique_id',
    'unit_of_meas':        'unit_of_measurement',
    'val_tpl':             'value_template',
    'whit_val_cmd_t':      'white_value_command_topic',
    'whit_val_stat_t':     'white_value_state_topic',
    'whit_val_tpl':        'white_value_template',
    'xy_cmd_t':            'xy_command_topic',
    'xy_stat_t':           'xy_state_topic',
    'xy_val_tpl':          'xy_value_template',
```

### {% linkable_title Support by third-party tools %}

The following software has built-in support for MQTT discovery:

- [Sonoff-Tasmota](https://github.com/arendst/Sonoff-Tasmota) (starting with 5.11.1e)
- [esphomeyaml](https://esphomelib.com/esphomeyaml/index.html)
- [ESPurna](https://github.com/xoseperez/espurna)
- [Arilux AL-LC0X LED controllers](https://github.com/mertenats/Arilux_AL-LC0X)
- [room-assistant](https://github.com/mKeRix/room-assistant) (starting with 1.1.0)
- [Zigbee2mqtt](https://github.com/koenkk/zigbee2mqtt)

### {% linkable_title Examples %}

A motion detection device which can be represented by a [binary sensor](/components/binary_sensor.mqtt/) for your garden would sent its configuration as JSON payload to the Configuration topic. After the first message to `config`, then the MQTT messages sent to the state topic will update the state in Home Assistant.

- Configuration topic: `homeassistant/binary_sensor/garden/config`
- State topic: `homeassistant/binary_sensor/garden/state`
- Payload:  `{"name": "garden", "device_class": "motion"}`

To create a new sensor manually. For more details please refer to the [MQTT testing section](/docs/mqtt/testing/).

```bash
$ mosquitto_pub -h 127.0.0.1 -p 1883 -t "homeassistant/binary_sensor/garden/config" -m '{"name": "garden", "device_class": "motion"}'
```
Update the state.

```bash
$ mosquitto_pub -h 127.0.0.1 -p 1883 -t "homeassistant/binary_sensor/garden/state" -m ON
```

Delete the sensor by sending an empty message.

 ```bash
$ mosquitto_pub -h 127.0.0.1 -p 1883 -t "homeassistant/binary_sensor/garden/state" -m ''
```

Setting up a switch is similar but requires a `command_topic` as mentioned in the [MQTT switch documentation](/components/switch.mqtt/).

- Configuration topic: `homeassistant/switch/irrigation/config`
- State topic: `homeassistant/switch/irrigation/state`
- Payload:  `{"name": "garden", "command_topic": "homeassistant/switch/irrigation/set"}`

```bash
$ mosquitto_pub -h 127.0.0.1 -p 1883 -t "homeassistant/switch/irrigation/config" \
  -m '{"name": "garden", "command_topic": "homeassistant/switch/irrigation/set"}'
```
Set the state.

```bash
$ mosquitto_pub -h 127.0.0.1 -p 1883 -t "homeassistant/switch/irrigation/set" -m ON
```

Setting up a sensor with multiple measurement values requires multiple consecutive configuration topic submissions.

- Configuration topic no1: `homeassistant/sensor/sensorBedroomT/config`
- Configuration payload no1: `{"device_class": "sensor", "name": "Temperature", "state_topic": "homeassistant/sensor/sensorBedroom/state", "unit_of_measurement": "°C", "value_template": "{% raw %}{{ value_json.temperature}}{% endraw %}" }`
- Configuration topic no2: `homeassistant/sensor/sensorBedroomH/config`
- Configuration payload no2: `{"device_class": "sensor", "name": "Humidity", "state_topic": "homeassistant/sensor/sensorBedroom/state", "unit_of_measurement": "%", "value_template": "{% raw %}{{ value_json.humidity}}{% endraw %}" }`
- Common state payload: `{ "temperature": 23.20, "humidity": 43.70 }`

Setting up a switch using topic prefix and abbreviated configuration variable names to reduce payload length.

- Configuration topic: `homeassistant/switch/irrigation/config`
- Command topic: `homeassistant/switch/irrigation/set`
- State topic: `homeassistant/switch/irrigation/state`
- Payload:  `{"~": "homeassistant/switch/irrigation", "name": "garden", "cmd_t": "~/set", , "stat_t": "~/state"}`

Setting up a climate component (heat only) with abbreviated configuration variable names to reduce payload length.

- Configuration topic: `homeassistant/climate/livingroom/config`
- Configuration payload:

```yaml
{
  "name":"Livingroom",
  "mode_cmd_t":"homeassistant/climate/livingroom/thermostatModeCmd",
  "mode_stat_t":"homeassistant/climate/livingroom/state",
  "mode_stat_tpl":"{{value_json.mode}}",
  "avty_t":"homeassistant/climate/livingroom/available",
  "pl_avail":"online",
  "pl_not_avail":"offline",
  "temp_cmd_t":"homeassistant/climate/livingroom/targetTempCmd",
  "temp_stat_t":"homeassistant/climate/livingroom/state",
  "temp_stat_tpl":"{{value_json.target_temp}}",
  "curr_temp_t":"homeassistant/climate/livingroom/state",
  "current_temperature_template":"{{value_json.current_temp}}",
  "min_temp":"15",
  "max_temp":"25",
  "temp_step":"0.5",
  "modes":["off", "heat"]
}
```

- State topic: `homeassistant/climate/livingroom/state`
- State payload:

```yaml
{
  "mode":"off",
  "target_temp":"21.50",
  "current_temp":"23.60",
}
```
