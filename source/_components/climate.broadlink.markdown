---
layout: page
title: "Broadlink Thermostat"
description: "Turn Home Assistant into a Broadlink thermostat"
date: 2018-07-08 15:00
sidebar: true
comments: false
sharing: true
footer: true
logo: broadlink.png
ha_category: Climate
ha_release: 0.75
ha_iot_class: "Local Polling"
---


The `broadlink_thermostat` climate platform is a thermostat implemented in Home Assistant. 
It work with numbers of Wifi thermostat (solds by Beok, Floureon, Beca Energy, Seesii...)

```yaml
# Example configuration.yaml entry
climate:
  - platform: broadlink
    name: xxx
    mac: xxxx
    host: xxxx
```

{% configuration %}
name:
  description: Name of thermostat
  required: true
  type: string
mac:
  description: Mac address of the thermostat
  required: true
  type: string
host:
  description: Ip address of the thermostat
  required: true
  type: string
max_temp:
  description:Set maximum set point available
  required: false
  default: 35
  type: int
min_temp:
  description:Set minimum set point available
  required: false
  default: 5
  type: int
advanced_config:
  description:Set the advanced configuration for braodlink thermostat.
  required: false
  default: '{"loop_mode": 0, "sen": 2, "osv": 42, "dif": 2, "svh": 35, "svl": 5, "adj": 0.5, "fre": 1, "pon": 0}'
  type: string
schedule_week_day:
  description:Set the schedule for weekday
  required: false
  default: '[{"start_hour":6, "start_minute":30, "temp":20}, {"start_hour":9, "start_minute":0, "temp":17}, {"start_hour":12, "start_minute":0, "temp":20 }, {"start_hour":14, "start_minute":0, "temp":17}, {"start_hour":18, "start_minute":0, "temp":20 }, {"start_hour":22, "start_minute":30, "temp":17}]'
  type: string
schedule_week_end:
  description:Set the schedule for weekend
  required: false
  default: '[{"start_hour":8, "start_minute":30, "temp":20}, {"start_hour":23, "start_minute":0, "temp":17}]'
  type: string
{% endconfiguration  %}

A full configuration example looks like the one below. 

```yaml
# Full example configuration.yaml entry
climate:
  - platform: broadlink
    name: Thermostat
    mac: "xx:xx:xx:xx:xx"
    host: "xxx.xxx.xxx.xxx"
    advanced_config: '{"loop_mode": 0, "sen": 2, "osv": 42, "dif": 2, "svh": 35, "svl": 5, "adj": 0.5, "fre": 01, "pon": 0}'
    schedule_week_day: '[{"start_hour":6, "start_minute":30, "temp":20}, {"start_hour":9, "start_minute":0, "temp":17}, {"start_hour":12, "start_minute":0, "temp":20 }, {"start_hour":14, "start_minute":0, "temp":17}, {"start_hour":18, "start_minute":0, "temp":20 }, {"start_hour":22, "start_minute":30, "temp":17}]'
    schedule_week_end: '[{"start_hour":8, "start_minute":30, "temp":20}, {"start_hour":23, "start_minute":0, "temp":17}]'
```

advanced_config description:

- **SEN** | Sensor control option | 0:internal sensor 1:external sensor 2:internal control temperature, external limit temperature | 0:internal sensor
- **OSV** | Limit temperature value of external sensor | 5-99C | 42C
- **dIF** | Return difference of limit temperature value of external sensor | 1-9C | 2C
- **SVH** | Set upper limit temperature value | 5-99C | 35C
- **SVL** | Set lower limit temperature value | 5-99C | 5C
- **AdJ** | Measure temperature | Measure temperature,check and calibration | 0.1C precision Calibration (actual temperature)
- **FrE** | Anti-freezing function | 00:anti-freezing function shut down 01:anti-freezing function open | 00:anti-freezing function shut down
- **POn** | Power on memory | 00:Power on no need memory 01:Power on need memory | 00:Power on no need memory
- **loop_mode** refers to index in [ "12345,67", "123456,7", "1234567" ]
  - E.g. loop_mode = 0 ("12345,67") means Saturday and Sunday follow the "weekend" schedule
  - loop = 2 ("1234567") means every day (including Saturday and Sunday) follows the "weekday" schedule
