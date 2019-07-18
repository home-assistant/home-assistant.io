---
title: "Broadlink Thermostat"
description: "Instructions on how to integrate Broadlink heater into Home Assistant."
logo: broadlink.png
ha_category:
  - Climate
ha_release: 0.96
ha_iot_class: Local Polling
---

The `broadlink thermostat` climate platform is a thermostat implemented in Home Assistant. It works with numbers of Wifi thermostat (sold by Beok, Floureon, Beca Energy, Seesii...) like `Floureon Smart Wi-Fi Thermostat`, `Beok TGT70WIFI-EP Smart Wifi Thermostat`, `SeeSii Thermostat WiFi`...

## Configuration

```yaml
  # Example configuration.yaml entry
  climate:
    - platform: broadlink
      friendly_name: xxx
      mac: xxxx
      host: xxxx
```

{% configuration %}
friendly_name:
  description: Name of thermostat.
  required: true
  type: string
mac:
  description: Mac address of the thermostat.
  required: true
  type: string
host:
  description: IP address of the thermostat.
  required: true
  type: string
external_temp:
  description: Use external temperature sensor instead of internal one to display current temperature.
  required: false
  type: boolean
  default: False
away_temp:
  description: Set the default temperature on away_mode.
  required: false
  type: float
  default: 12
{% endconfiguration  %}

A full configuration example looks like the one below. 

## Example

```yaml
# Full example configuration.yaml entry
climate:
  - platform: broadlink
    friendly_name: Thermostat
    mac: "xx:xx:xx:xx:xx"
    host: "xxx.xxx.xxx.xxx"
    external_temp: False
    away_temp: 12.0
```

## Component services

This platform supports a service to set the internal thermostat schedule scheme:

`climate.broadlink_set_schedule`

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `week_start_1` | no | First starting period (week).
| `week_stop_1` | no | First ending period (week).
| `week_start_2` | no | Second starting period (week).
| `week_stop_2` | no | Second ending period (week).
| `week_start_3` | no | Third starting period (week).
| `week_stop_3` | no | Third ending period (week).
| `weekend_start` | no | Starting period (weekend).
| `weekend_stop` | no | Ending period (weekend).
| `away_temp` | no | Away temperature.
| `home_temp` | no | Home temperature.

This platform supports a service to set the internal thermostat configuration:

`climate.broadlink_set_advanced_conf`

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `loop_mode` | no | 0 means Saturday and Sunday follow the "weekend" schedule, 1 means only Sunday follow the "weekend" schedule, 2 means every day follows the "weekday" schedule.
| `osv` | no | Set temperature range for external sensor. 5 to 99.. Factory default = 42.
| `dif` | no | Deadzone for floor temprature. 1 to 9. Factory default = 2
| `svh` | no | Upper temperature limit for internal sensor. 5 to 99. Factory default = 35.
| `svl` | no | Lower temperature limit for internal sensor. 5 to 99. Factory default = 5.
| `freeze` | no | Anti-freezing function 0 for anti-freezing function shut down, 1 for anti-freezing function open. Factory default = 0
| `adj` | no | Actual temperature calibration. Prescision 0.1.
| `pon` | no | Power on memory. 0 for power on memory off, 1 for power on memory on. Factory default = 0.
| `sen` | no | Sensor mode. 0 for internal sensor, 1 for external sensor, 2 for internal control temperature, external limit temperature. Factory default = 0.
