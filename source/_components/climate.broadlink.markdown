---
layout: page
title: "Broadlink Thermostat"
description: "Turn Home Assistant into a Broadlink thermostat"
date: 2018-07-08 15:00
sidebar: true
comments: false
sharing: true
footer: true
logo: heat-control.png
ha_category: Climate
ha_release: 0.73
ha_iot_class: "Local Polling"
---


The `broadlink_thermostat` climate platform is a thermostat implemented in Home Assistant. It uses a sensor and a switch connected to a heater or air conditioning under the hood. When in heater mode, if the measured temperature is cooler then the target temperature, the heater will be turned on and turned off when the required temperature is reached. When in air conditioning mode, if the measured temperature is hotter then the target temperature, the air conditioning will be turned on and turned off when required temperature is reached.

```yaml
# Example configuration.yaml entry
climate:
  - platform: broadlink
    name: xxx
    mac: xxxx
    host: xxxx
```

Configuration variables:

- **name** (*Required*): Name of thermostat
- **mac** (*Required*): Mac address of the thermostat
- **host** (*Required*): address of the thermostat
- **max_temp** (*Optional*): Set maximum set point available (default: 35)
- **min_temp** (*Optional*): Set minimum set point available (default: 5)
- **advanced_config** (*Optional*): Set the advanced configuration for braodlink thermostat.
- **schedule_week_day** (*Optional*): Set the schedule for weekday
- **schedule_week_end** (*Optional*): Set the schedule for weekend


A full configuration example looks like the one below. 

```yaml
# Full example configuration.yaml entry
climate:
  - platform: broadlink
    name: Thermostat
    mac: "xx:xx:xx:xx:xx"
    host: "xxx.xxx.xxx.xxx"
    advanced_config: '{"loop_mode": "0", "sen": "2", "osv": "42", "dif": "2", "svh": "35", "svl": "5", "adj": "0.5", "fre": "01", "pon": "00"}'
    schedule_week_day: '[{"start_hour":"06", "start_minute":"30", "temp":"20"}, {"start_hour":"09", "start_minute":"00", "temp":"17"}, {"start_hour":"12", "start_minute":"00", "temp":"20" }, {"start_hour":"14", "start_minute":"00", "temp":"17"}, {"start_hour":"18", "start_minute":"00", "temp":"20" }, {"start_hour":22, "start_minute":30, "temp":17}]'
    schedule_week_end: '[{"start_hour":"08", "start_minute":"30", "temp":"20"}, {"start_hour":"23", "start_minute":"00", "temp":"17"}]'
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
