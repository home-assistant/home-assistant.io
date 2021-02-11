---
title: "MQTT Discovery"
description: "Instructions on how to setup MQTT Discovery within Home Assistant."
logo: mqtt.png
---

The discovery of MQTT devices will enable one to use MQTT devices with only minimal configuration effort on the side of Home Assistant. The configuration is done on the device itself and the topic used by the device. Similar to the [HTTP binary sensor](/integrations/http/#binary-sensor) and the [HTTP sensor](/integrations/http/#sensor). To prevent multiple identical entries if a device reconnects a unique identifier is necessary. Two parts are required on the device side: The configuration topic which contains the necessary device type and unique identifier and the remaining device configuration without the device type.

Supported by MQTT discovery:

- [Alarm control panels](/integrations/alarm_control_panel.mqtt/)
- [Binary sensors](/integrations/binary_sensor.mqtt/)
- [Cameras](/integrations/camera.mqtt/)
- [Covers](/integrations/cover.mqtt/)
- [Device Trackers](/integrations/device_tracker.mqtt/)
- [Device Triggers](/integrations/device_trigger.mqtt/)
- [Fans](/integrations/fan.mqtt/)
- [HVACs](/integrations/climate.mqtt/)
- [Lights](/integrations/light.mqtt/)
- [Locks](/integrations/lock.mqtt/)
- [Scenes](/integrations/scene.mqtt/)
- [Sensors](/integrations/sensor.mqtt/)
- [Switches](/integrations/switch.mqtt/)
- [Tag Scanners](/integrations/tag.mqtt/)
- [Vacuums](/integrations/vacuum.mqtt/)

MQTT discovery is enabled by default. To disable MQTT discovery, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
mqtt:
  discovery: false
```

{% configuration %}
discovery:
  description: If the MQTT discovery should be enabled or not.
  required: false
  default: true
  type: boolean
discovery_prefix:
  description: The prefix for the discovery topic.
  required: false
  default: homeassistant
  type: string
{% endconfiguration %}

The discovery topic need to follow a specific format:

```text
<discovery_prefix>/<component>/[<node_id>/]<object_id>/config
```

- `<component>`: One of the supported MQTT components, eg. `binary_sensor`.
- `<node_id>` (*Optional*):  ID of the node providing the topic, this is not used by Home Assistant but may be used to structure the MQTT topic. The ID of the node must only consist of characters from the character class `[a-zA-Z0-9_-]` (alphanumerics, underscore and hyphen).
- `<object_id>`: The ID of the device. This is only to allow for separate topics for each device and is not used for the `entity_id`. The ID of the device must only consist of characters from the character class `[a-zA-Z0-9_-]` (alphanumerics, underscore and hyphen).

The payload must be a JSON dictionary and will be checked like an entry in your `configuration.yaml` file if a new device is added. This means that missing variables will be filled with the platform's default values. All configuration variables which are *required* must be present in the initial payload send to `/config`.

An empty payload will cause a previously discovered device to be deleted.

The `<node_id>` level can be used by clients to only subscribe to their own (command) topics by using one wildcard topic like `<discovery_prefix>/+/<node_id>/+/set`.

A base topic `~` may be defined in the payload to conserve memory when the same topic base is used multiple times.
In the value of configuration variables ending with `_topic`, `~` will be replaced with the base topic, if the `~` occurs at the beginning or end of the value.

Configuration variable names in the discovery payload may be abbreviated to conserve memory when sending a discovery message from memory constrained devices.

Supported abbreviations:

```txt
    'act_t':               'action_topic',
    'act_tpl':             'action_template',
    'atype':               'automation_type',
    'aux_cmd_t':           'aux_command_topic',
    'aux_stat_tpl':        'aux_state_template',
    'aux_stat_t':          'aux_state_topic',
    'avty'                 'availability',
    'avty_mode':           'availability_mode',
    'avty_t':              'availability_topic',
    'away_mode_cmd_t':     'away_mode_command_topic',
    'away_mode_stat_tpl':  'away_mode_state_template',
    'away_mode_stat_t':    'away_mode_state_topic',
    'b_tpl':               'blue_template',
    'bri_cmd_t':           'brightness_command_topic',
    'bri_scl':             'brightness_scale',
    'bri_stat_t':          'brightness_state_topic',
    'bri_tpl':             'brightness_template',
    'bri_val_tpl':         'brightness_value_template',
    'clr_temp_cmd_tpl':    'color_temp_command_template',
    'bat_lev_t':           'battery_level_topic',
    'bat_lev_tpl':         'battery_level_template',
    'chrg_t':              'charging_topic',
    'chrg_tpl':            'charging_template',
    'clr_temp_cmd_t':      'color_temp_command_topic',
    'clr_temp_stat_t':     'color_temp_state_topic',
    'clr_temp_tpl':        'color_temp_template',
    'clr_temp_val_tpl':    'color_temp_value_template',
    'cln_t':               'cleaning_topic',
    'cln_tpl':             'cleaning_template',
    'cmd_off_tpl':         'command_off_template',
    'cmd_on_tpl':          'command_on_template',
    'cmd_t':               'command_topic',
    'cmd_tpl':             'command_template',
    'cod_arm_req':         'code_arm_required',
    'cod_dis_req':         'code_disarm_required',
    'curr_temp_t':         'current_temperature_topic',
    'curr_temp_tpl':       'current_temperature_template',
    'dev':                 'device',
    'dev_cla':             'device_class',
    'dock_t':              'docked_topic',
    'dock_tpl':            'docked_template',
    'err_t':               'error_topic',
    'err_tpl':             'error_template',
    'fanspd_t':            'fan_speed_topic',
    'fanspd_tpl':          'fan_speed_template',
    'fanspd_lst':          'fan_speed_list',
    'flsh_tlng':           'flash_time_long',
    'flsh_tsht':           'flash_time_short',
    'fx_cmd_t':            'effect_command_topic',
    'fx_list':             'effect_list',
    'fx_stat_t':           'effect_state_topic',
    'fx_tpl':              'effect_template',
    'fx_val_tpl':          'effect_value_template',
    'exp_aft':             'expire_after',
    'fan_mode_cmd_tpl':    'fan_mode_command_template',
    'fan_mode_cmd_t':      'fan_mode_command_topic',
    'fan_mode_stat_tpl':   'fan_mode_state_template',
    'fan_mode_stat_t':     'fan_mode_state_topic',
    'frc_upd':             'force_update',
    'g_tpl':               'green_template',
    'hold_cmd_tpl':        'hold_command_template',
    'hold_cmd_t':          'hold_command_topic',
    'hold_stat_tpl':       'hold_state_template',
    'hold_stat_t':         'hold_state_topic',
    'hs_cmd_t':            'hs_command_topic',
    'hs_stat_t':           'hs_state_topic',
    'hs_val_tpl':          'hs_value_template',
    'ic':                  'icon',
    'init':                'initial',
    'json_attr':           'json_attributes',
    'json_attr_t':         'json_attributes_topic',
    'json_attr_tpl':       'json_attributes_template',
    'max_mirs':            'max_mireds',
    'min_mirs':            'min_mireds',
    'max_temp':            'max_temp',
    'min_temp':            'min_temp',
    'mode_cmd_tpl':        'mode_command_template',
    'mode_cmd_t':          'mode_command_topic',
    'mode_stat_tpl':       'mode_state_template',
    'mode_stat_t':         'mode_state_topic',
    'name':                'name',
    'off_dly':             'off_delay',
    'on_cmd_type':         'on_command_type',
    'opt':                 'optimistic',
    'osc_cmd_t':           'oscillation_command_topic',
    'osc_stat_t':          'oscillation_state_topic',
    'osc_val_tpl':         'oscillation_value_template',
    'pl':                  'payload',
    'pl_arm_away':         'payload_arm_away',
    'pl_arm_home':         'payload_arm_home',
    'pl_arm_custom_b':     'payload_arm_custom_bypass',
    'pl_arm_nite':         'payload_arm_night',
    'pl_avail':            'payload_available',
    'pl_cln_sp':           'payload_clean_spot',
    'pl_cls':              'payload_close',
    'pl_disarm':           'payload_disarm',
    'pl_hi_spd':           'payload_high_speed',
    'pl_home':             'payload_home',
    'pl_lock':             'payload_lock',
    'pl_loc':              'payload_locate',
    'pl_lo_spd':           'payload_low_speed',
    'pl_med_spd':          'payload_medium_speed',
    'pl_not_avail':        'payload_not_available',
    'pl_not_home':         'payload_not_home',
    'pl_off':              'payload_off',
    'pl_off_spd':          'payload_off_speed',
    'pl_on':               'payload_on',
    'pl_open':             'payload_open',
    'pl_osc_off':          'payload_oscillation_off',
    'pl_osc_on':           'payload_oscillation_on',
    'pl_paus':             'payload_pause',
    'pl_stop':             'payload_stop',
    'pl_strt':             'payload_start',
    'pl_stpa':             'payload_start_pause',
    'pl_ret':              'payload_return_to_base',
    'pl_toff':             'payload_turn_off',
    'pl_ton':              'payload_turn_on',
    'pl_unlk':             'payload_unlock',
    'pos_clsd':            'position_closed',
    'pos_open':            'position_open',
    'pow_cmd_t':           'power_command_topic',
    'pow_stat_t':          'power_state_topic',
    'pow_stat_tpl':        'power_state_template',
    'r_tpl':               'red_template',
    'ret':                 'retain',
    'rgb_cmd_tpl':         'rgb_command_template',
    'rgb_cmd_t':           'rgb_command_topic',
    'rgb_stat_t':          'rgb_state_topic',
    'rgb_val_tpl':         'rgb_value_template',
    'send_cmd_t':          'send_command_topic',
    'send_if_off':         'send_if_off',
    'set_fan_spd_t':       'set_fan_speed_topic',
    'set_pos_tpl':         'set_position_template',
    'set_pos_t':           'set_position_topic',
    'pos_t':               'position_topic',
    'pos_tpl':             'position_template',
    'spd_cmd_t':           'speed_command_topic',
    'spd_stat_t':          'speed_state_topic',
    'spd_val_tpl':         'speed_value_template',
    'spds':                'speeds',
    'src_type':            'source_type',
    'stat_clsd':           'state_closed',
    'stat_closing':        'state_closing',
    'stat_off':            'state_off',
    'stat_on':             'state_on',
    'stat_open':           'state_open',
    'stat_opening':        'state_opening',
    'stat_stopped':        'state_stopped',
    'stat_locked':         'state_locked',
    'stat_unlocked':       'state_unlocked',
    'stat_t':              'state_topic',
    'stat_tpl':            'state_template',
    'stat_val_tpl':        'state_value_template',
    'stype':               'subtype',
    'sup_feat':            'supported_features',
    'swing_mode_cmd_tpl':  'swing_mode_command_template',
    'swing_mode_cmd_t':    'swing_mode_command_topic',
    'swing_mode_stat_tpl': 'swing_mode_state_template',
    'swing_mode_stat_t':   'swing_mode_state_topic',
    'temp_cmd_tpl':        'temperature_command_template',
    'temp_cmd_t':          'temperature_command_topic',
    'temp_hi_cmd_tpl':     'temperature_high_command_template',
    'temp_hi_cmd_t':       'temperature_high_command_topic',
    'temp_hi_stat_tpl':    'temperature_high_state_template',
    'temp_hi_stat_t':      'temperature_high_state_topic',
    'temp_lo_cmd_tpl':     'temperature_low_command_template',
    'temp_lo_cmd_t':       'temperature_low_command_topic',
    'temp_lo_stat_tpl':    'temperature_low_state_template',
    'temp_lo_stat_t':      'temperature_low_state_topic',
    'temp_stat_tpl':       'temperature_state_template',
    'temp_stat_t':         'temperature_state_topic',
    'temp_unit':           'temperature_unit',
    'tilt_clsd_val':       'tilt_closed_value',
    'tilt_cmd_t':          'tilt_command_topic',
    'tilt_cmd_tpl':        'tilt_command_template',
    'tilt_inv_stat':       'tilt_invert_state',
    'tilt_max':            'tilt_max',
    'tilt_min':            'tilt_min',
    'tilt_opnd_val':       'tilt_opened_value',
    'tilt_opt':            'tilt_optimistic',
    'tilt_status_t':       'tilt_status_topic',
    'tilt_status_tpl':     'tilt_status_template',
    't':                   'topic',
    'uniq_id':             'unique_id',
    'unit_of_meas':        'unit_of_measurement',
    'val_tpl':             'value_template',
    'whit_val_cmd_t':      'white_value_command_topic',
    'whit_val_scl':        'white_value_scale',
    'whit_val_stat_t':     'white_value_state_topic',
    'whit_val_tpl':        'white_value_template',
    'xy_cmd_t':            'xy_command_topic',
    'xy_stat_t':           'xy_state_topic',
    'xy_val_tpl':          'xy_value_template',
```

Supported abbreviations for device registry configuration:

```txt
    'cns':                 'connections',
    'ids':                 'identifiers',
    'name':                'name',
    'mf':                  'manufacturer',
    'mdl':                 'model',
    'sw':                  'sw_version',
```

## Support by third-party tools

The following software has built-in support for MQTT discovery:

- [Arilux AL-LC0X LED controllers](https://github.com/mertenats/Arilux_AL-LC0X)
- [ESPHome](https://esphome.io)
- [ESPurna](https://github.com/xoseperez/espurna)
- [IOTLink](https://iotlink.gitlab.io) (starting with 2.0.0)
- [MiFlora MQTT Daemon](https://github.com/ThomDietrich/miflora-mqtt-daemon)
- [OpenMQTTGateway](https://github.com/1technophile/OpenMQTTGateway)
- [room-assistant](https://github.com/mKeRix/room-assistant) (starting with 1.1.0)
- [SmartHome](https://github.com/roncoa/SmartHome)
- [Tasmota](https://github.com/arendst/Tasmota) (starting with 5.11.1e, development halted)
- [WyzeSense2MQTT](https://github.com/raetha/wyzesense2mqtt)
- [Xiaomi DaFang Hacks](https://github.com/EliasKotlyar/Xiaomi-Dafang-Hacks)
- [Zigbee2mqtt](https://github.com/koenkk/zigbee2mqtt)
- [Zwave2Mqtt](https://github.com/OpenZWave/Zwave2Mqtt) (starting with 2.0.1)

## Examples

### Motion detection (binary sensor)

A motion detection device which can be represented by a [binary sensor](/integrations/binary_sensor.mqtt/) for your garden would send its configuration as JSON payload to the Configuration topic. After the first message to `config`, then the MQTT messages sent to the state topic will update the state in Home Assistant.

- Configuration topic: `homeassistant/binary_sensor/garden/config`
- State topic: `homeassistant/binary_sensor/garden/state`
- Payload:  `{"name": "garden", "device_class": "motion", "state_topic": "homeassistant/binary_sensor/garden/state"}`

To create a new sensor manually. For more details please refer to the [MQTT testing section](/docs/mqtt/testing/).

```bash
mosquitto_pub -h 127.0.0.1 -p 1883 -t "homeassistant/binary_sensor/garden/config" -m '{"name": "garden", "device_class": "motion", "state_topic": "homeassistant/binary_sensor/garden/state"}'
```

Update the state.

```bash
mosquitto_pub -h 127.0.0.1 -p 1883 -t "homeassistant/binary_sensor/garden/state" -m ON
```

Delete the sensor by sending an empty message.

 ```bash
mosquitto_pub -h 127.0.0.1 -p 1883 -t "homeassistant/binary_sensor/garden/config" -m ''
```

### Sensors with multiple values

Setting up a sensor with multiple measurement values requires multiple consecutive configuration topic submissions.

- Configuration topic no1: `homeassistant/sensor/sensorBedroomT/config`
- Configuration payload no1: `{"device_class": "temperature", "name": "Temperature", "state_topic": "homeassistant/sensor/sensorBedroom/state", "unit_of_measurement": "°C", "value_template": "{% raw %}{{ value_json.temperature}}{% endraw %}" }`
- Configuration topic no2: `homeassistant/sensor/sensorBedroomH/config`
- Configuration payload no2: `{"device_class": "humidity", "name": "Humidity", "state_topic": "homeassistant/sensor/sensorBedroom/state", "unit_of_measurement": "%", "value_template": "{% raw %}{{ value_json.humidity}}{% endraw %}" }`
- Common state payload: `{ "temperature": 23.20, "humidity": 43.70 }`

### Switches

Setting up a switch is similar but requires a `command_topic` as mentioned in the [MQTT switch documentation](/integrations/switch.mqtt/).

- Configuration topic: `homeassistant/switch/irrigation/config`
- State topic: `homeassistant/switch/irrigation/state`
- Command topic: `homeassistant/switch/irrigation/set`
- Payload:  `{"name": "garden", "command_topic": "homeassistant/switch/irrigation/set", "state_topic": "homeassistant/switch/irrigation/state"}`

```bash
mosquitto_pub -h 127.0.0.1 -p 1883 -t "homeassistant/switch/irrigation/config" \
  -m '{"name": "garden", "command_topic": "homeassistant/switch/irrigation/set", "state_topic": "homeassistant/switch/irrigation/state"}'
```

Set the state.

```bash
mosquitto_pub -h 127.0.0.1 -p 1883 -t "homeassistant/switch/irrigation/set" -m ON
```

### Abbreviating topic names

Setting up a switch using topic prefix and abbreviated configuration variable names to reduce payload length.

- Configuration topic: `homeassistant/switch/irrigation/config`
- Command topic: `homeassistant/switch/irrigation/set`
- State topic: `homeassistant/switch/irrigation/state`
- Configuration payload: `{"~": "homeassistant/switch/irrigation", "name": "garden", "cmd_t": "~/set", "stat_t": "~/state"}`

### Lighting

Setting up a [light that takes JSON payloads](/integrations/light.mqtt/#json-schema), with abbreviated configuration variable names:

- Configuration topic: `homeassistant/light/kitchen/config`
- Command topic: `homeassistant/light/kitchen/set`
- State topic: `homeassistant/light/kitchen/state`
- Example state payload: `{"state": "ON", "brightness": 255}`
- Configuration payload:

  ```json
  {
    "~": "homeassistant/light/kitchen",
    "name": "Kitchen",
    "unique_id": "kitchen_light",
    "cmd_t": "~/set",
    "stat_t": "~/state",
    "schema": "json",
    "brightness": true
  }
  ```

### Climate control

Setting up a climate integration (heat only):

- Configuration topic: `homeassistant/climate/livingroom/config`
- Configuration payload:

```json
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
  "curr_temp_tpl":"{{value_json.current_temp}}",
  "min_temp":"15",
  "max_temp":"25",
  "temp_step":"0.5",
  "modes":["off", "heat"]
}
```

- State topic: `homeassistant/climate/livingroom/state`
- State payload:

```json
{
  "mode":"off",
  "target_temp":"21.50",
  "current_temp":"23.60",
}
```

### Presence detection (device tracker)

Setting up a device tracker:

- Configuration topic: `homeassistant/device_tracker/paulus/config`
- Example configuration payload:

```json
{
  "name":"Paulus",
  "state_topic": "homeassistant/device_tracker/paulus/state",
  "payload_home": "home",
  "payload_not_home": "not_home",
  "source_type": "bluetooth"
 }
```

- State topic: `homeassistant/device_tracker/paulus/state`
- Example state payload: `home` or `not_home` or `location name`

If the device supports gps co-ordinates then they can be sent to Home Assistant by specifying an attributes topic (i.e. "json_attributes_topic") in the configuration payload:

- Attributes topic: `homeassistant/device_tracker/paulus/attributes`
- Example attributes payload:

```json
{
  "latitude": 32.87336,
  "longitude": -117.22743,
  "gps_accuracy": 1.2
 }
```
