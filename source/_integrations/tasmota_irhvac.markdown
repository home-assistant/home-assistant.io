---
title: Tasmota Irhvac
description: Control Your Air Conditioner via Home Assistant and Tasmota IR Transceiver
logo: home-assistant.png
ha_category:
  - Climate
ha_release: pre 0.105.0
ha_iot_class: Local Polling
---

The `tasmota_irhvac` climate is a platform for controlling IR Air Conditioners via Home Assistant, using Tasmota IRHVAC command and compatible hardware. It can control hundreds of Air Conditioners, out of the box, via Tasmota IR transceivers. What makes it unique is that if You use the original IR remote of Your AC, it will update the new state in Home Assistant. This way you can always have the ral current state of the AC. `tasmota_irhvac` is based on the functionality of the latest “tasmota-ircustom.bin” v8.1 and its IRHVAC command.

*Information about how to DIY make Tasmota IR Transceiver, if you don't have one, You can find [HERE](https://github.com/hristo-atanasov/Tasmota-IRHVAC)*

[Information about all supported Air Conditioner brands and their IR remote models](https://github.com/crankyoldgit/IRremoteESP8266/blob/924822216c49aec584e8e5b30200028a140e2aa9/SupportedProtocols.md)

First You need to test if Your AC's remote is supported.
To test that, open Your Tasmota IR Transceiver console, point Your AC remote to the IR receiver and press the button for turning the AC on. You should see a line like this (example with Fujitsu Air Conditioner):

```json
{'IrReceived': {'Protocol': 'FUJITSU_AC', 'Bits': 128, 'Data': '0x0x1463001010FE09304013003008002025', 'Repeat': 0, 'IRHVAC': {'Vendor': 'FUJITSU_AC', 'Model': 1, 'Power': 'On', 'Mode': 'fan_only', 'Celsius': 'On', 'Temp': 20, 'FanSpeed': 'Auto', 'SwingV': 'Off', 'SwingH': 'Off', 'Quiet': 'Off', 'Turbo': 'Off', 'Econo': 'Off', 'Light': 'Off', 'Filter': 'Off', 'Clean': 'Off', 'Beep': 'Off', 'Sleep': -1}}}
```

If 'Protocol:' key is not ‘Unknown’ and you see the ‘IRHVAC’ key, containing information, most probably it will work for you.
Add the ***Full configuration example*** in your "configuration.yaml" file, but don’t save it yet, because you’ll need to replace most of the values with your specific AC values. Using your remote and the IR Transceiver do the following steps to find your AC values, that you have to fill in. You can find these values by looking in the Tasmota console for them. They will appear in the ‘IrReceived’ JSON line, mentioned earlier.

The following steps and changes are needed to configure Your AC:
Cycle trough all of your AC modes and write them in 'supported_modes'. Some possible values are left commented in the example.
Cycle trough your fan speeds and and write them down in 'supported_fan_speeds'
If your AC doesn't support horizontal swinging remove -"horizontal" and -"both" from supported_swing_list
Enter your 'hvac_model'
Change the “min_temp” and “max_temp” values according to your AC min and max temperature support.
'target_temp' is the initial target temperature. 26 is default value and if you don’t want to change it, you can remove the line.
'away_temp' is the temperature that will be set in "away mode". If you don’t want to change it, or you don’t need it, you can remove that line.
Change the 'name' with the desired name.

You can remove all lines, that doesn’t need to be changed and are marked with “optional”.

After you finish with the config, save it and restart Home Assistant. Once restarted you can add in LovelaceUI a new thermostat card and select the newly integrated AC.

## Minimal Configuration
```yaml
# Example configuration.yaml entry
climate:
  - platform: tasmota_irhvac
    name: Fujitsu IRHvac
    command_topic: "cmnd/kitchenMultisensor/irhvac"
    state_topic: "tele/kitchenMultisensor/RESULT"
    temperature_sensor: sensor.kitchen_temperature
    protocol: "FUJITSU_AC"
    hvac_model: "1"
```

{% configuration %}
name:
  description: Name of thermostat.
  required: true
  default: IR AirConditioner
  type: string
command_topic:
  description: Tasmota IR Transceiver topic to send commands to.
  required: true
  type: string
state_topic:
  description: Tasmota IR Transceiver topic to read the state from.
  required: true
  type: string
temperature_sensor:
  description: "`entity_id` for a temperature sensor, target_sensor.state must be temperature."
  required: true
  type: string
protocol:
  description: The value of "Vendor:" key in "IRHVAC"
  required: true
  default: ELECTRA_AC
  type: string
min_temp:
  description: The minimum temperature supported by Your AC
  required: false
  default: 16
  type: float
max_temp:
  description: The maximum temperature supported by Your AC
  required: false
  default: 32
  type: float
target_temp:
  description: Set initial target temperature. Failure to set this variable will result in target temperature being set to null on startup.
  required: false
  default: 26
  type: float
hvac_model:
  description: Set your AC model. The value of "model:" key in "IRHVAC". The value should be quoted.
  required: false
  default: "-1"
  type: string
initial_operation_mode:
  description: The initial operation mode. Used if no retained current operation mode set in HA on starting up, or when turning the AC on trough voice commands via Google Home or Alexa. Valid values are "heat", "cool", "dry", "fan_only", "auto" or "off". Value has to be double quoted.
  required: false
  default: Off
  type: string
away_temp:
  description: "Set the temperature used by `preset_mode: away`.
  required: false
  default: 24
  type: float
precision:
  description: "The desired precision for this device. Can be used to match your actual thermostat's precision. Supported values are `0.1`, `0.5` and `1.0`."
  required: false
  default: 1
  type: float
supported_modes:
  description: List of the supported by Your AC operation modes. Valid values can be obtained by cycling trough all modes on Your AC's remote and are then found in "mode" key in "IRHVAC". Values have to be double quoted, on new line and prefixed with dash ("-"). Default values might not work for you.
  required: false
  type: list
  default:
      - "heat"
      - "cool"
      - "dry"
      - "fan_only"
      - "auto"
      - "off"
supported_fan_speeds:
  description: List of the supported by Your AC fan speeds. Valid values can be obtained by cycling trough all fan speed on Your AC's remote and are then found in "FanSpeed" key in "IRHVAC". Values have to be double quoted, on new line and prefixed with dash ("-"). Default values might not work for you.
  required: false
  type: list
  default:
      - "max"
      - "high"
      - "medium"
      - "min"
supported_swing_list:
  description: List of the supported by Your AC swing directions. Valid values in the list are "off", "both", "vertical" and "horizontal". If your AC doesn't support horizontal swinging remove -"horizontal" and -"both" from the list
  required: false
  type: list
celsius_mode:
  description: If the AC temperature is in Celsius of Fahrenheit. Set to "On" for Celsius or "Off" for Fahrenheit. Valid values are "On" and "Off". Values should be quoted. This option cannot be changed trough HA UI.
  required: false
  default: On
  type: string
default_quiet_mode:
  description: If your AC supports quiet mode, and you always want to use it, set it to "On". This option cannot be changed trough HA UI. Recommended value "Off".
  required: false
  default: Off
  type: string
default_turbo_mode:
  description: If your AC supports turbo mode, and you always want to use it, set it to "On". This option cannot be changed trough HA UI. Recommended value "Off".
  required: false
  default: Off
  type: string
default_econo_mode:
  description: If your AC supports eco mode, and you always want to use it, set it to "On". This option cannot be changed trough HA UI. Recommended value "Off".
  required: false
  default: Off
  type: string
default_light_mode:
  description: If your AC supports turning On or Off its own lights, and you always want to use it, set it to "On". This option cannot be changed trough HA UI. Recommended value "Off".
  required: false
  default: Off
  type: string
default_filter_mode:
  description: If your AC supports filter mode, and you always want to use it, set it to "On". This option cannot be changed trough HA UI. Recommended value "Off".
  required: false
  default: Off
  type: string
default_clean_mode:
  description: If your AC supports clean mode, and you always want to use it, set it to "On". This option cannot be changed trough HA UI. Recommended value "Off".
  required: false
  default: Off
  type: string
default_beep_mode:
  description: If your AC supports turning On or Off its own sounds, and you always want to use it, set it to "On". This option cannot be changed trough HA UI. Recommended value "Off".
  required: false
  default: Off
  type: string
default_sleep_mode: "-1" #optional - default "-1" string value
  description: If your AC supports sleep mode, and you always want to use it, set it to the value of the "Sleep:" key in "HVAC". This option cannot be changed trough HA UI. Recommended value "-1" or the value of "Sleep:" key in "HVAC" when sleep mode is turned ff.
  required: false
  default: "-1"
  type: string
{% endconfiguration %}

Please, note that when changing the preset mode to away, you will force a target temperature change as well that will get restored once the preset mode is set to none again.

## Full configuration example

```yaml
climate:
  - platform: tasmota_irhvac
    name: "Daewoo IRHvac"
    command_topic: "cmnd/kitchenMultisensor/irhvac"
    state_topic: "tele/kitchenMultisensor/RESULT"
    temperature_sensor: sensor.kitchen_temperature
    protocol: "ELECTRA_AC"
    min_temp: 16
    max_temp: 32
    hvac_model: "-1"
    target_temp: 26
    initial_operation_mode: "off"
    away_temp: 24
    precision: 1
    supported_modes:
      - "heat"
      - "cool"
      - "dry"
      - "fan_only"
      - "auto"
      - "off"
    supported_fan_speeds:
      - "max"
      - "high"
      - "medium"
      - "min"
    supported_swing_list:
      - "off"
      - "vertical"
      - "horizontal"
      - "both"
    celsius_mode: "On"
    default_quiet_mode: "Off"
    default_turbo_mode: "Off"
    default_econo_mode: "Off"
    default_light_mode: "Off"
    default_filter_mode: "Off"
    default_clean_mode: "Off"
    default_beep_mode: "Off"
    default_sleep_mode: "-1"
```
