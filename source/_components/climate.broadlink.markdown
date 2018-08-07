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
ha_release: 0.76
ha_iot_class: "Local Polling"
---

The `broadlink_thermostat` climate platform is a thermostat implemented in Home Assistant. 
It work with numbers of Wifi thermostat (solds by Beok, Floureon, Beca Energy, Seesii...) like:
like [Floureon Smart Wi-Fi Thermostat](https://www.gearbest.com/other-home-improvement/pp_1256743.html?vip=14730042&gclid=CjwKCAjwkMbaBRBAEiwAlH5v_q28mX8aECqdvMQ0W_iRBClCwOTH0tnfOy86fpD_BOaueecLEf6wzRoCmAgQAvD_BwE), [Beok Smart Wifi Thermostat](https://www.aliexpress.com/store/product/Beok-TGT70WIFI-EP-Smart-Wifi-Thermostat-Energy-Saving-7-Day-Programmable-Touchscreen-Temperature-Controller-For-Electric/2901182_32828475792.html?spm=2114.search0104.3.1.387146b2xKCPWd&ws_ab_test=searchweb0_0,searchweb201602_2_10152_10151_10065_10068_10344_10342_10343_10340_10341_10696_10084_10083_10618_10304_10307_10820_10821_10302_10843_10059_100031_10103_10624_10623_10622_10621_10620,searchweb201603_44,ppcSwitch_5&algo_expid=a5a6cf3d-56a5-4007-b254-1cd3c4d8c983-0&algo_pvid=a5a6cf3d-56a5-4007-b254-1cd3c4d8c983&transAbTest=ae803_2&priceBeautifyAB=0) and [SeeSii Thermostat WiFi](https://www.aliexpress.com/store/product/SeeSii-Programmable-Thermostat-Heating-WiFi-16A-110V-230V-App-LCD-Touch-Screen-Temp-Air-Condition-Temperature/2186069_32828046944.html?spm=2114.search0104.3.1.6a3743c1DmfS72&ws_ab_test=searchweb0_0,searchweb201602_2_10152_10151_10065_10068_10344_10342_10343_10340_10341_10696_10084_10083_10618_10304_10307_10820_10821_10302_10843_10059_100031_10103_10624_10623_10622_10621_10620,searchweb201603_44,ppcSwitch_5&algo_expid=87ea8f60-1bfa-42c4-bf5f-ea8b2af67cf8-0&algo_pvid=87ea8f60-1bfa-42c4-bf5f-ea8b2af67cf8&transAbTest=ae803_2&priceBeautifyAB=0)


{% raw %}
# Example configuration.yaml entry
climate:
  - platform: broadlink
    name: xxx
    mac: xxxx
    host: xxxx
{% endraw %}

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
  type: string
schedule_week_day:
  description:Set the schedule for weekday
  required: false
  type: string
schedule_week_end:
  description:Set the schedule for weekend
  required: false
  type: string
{% endconfiguration  %}

A full configuration example looks like the one below. 

{% raw %}
# Full example configuration.yaml entry
climate:
  - platform: broadlink
    name: Thermostat
    mac: "xx:xx:xx:xx:xx"
    host: "xxx.xxx.xxx.xxx"
    advanced_config: '{"loop_mode": 0, "sen": 2, "osv": 42, "dif": 2, "svh": 35, "svl": 5, "adj": 0.5, "fre": 01, "pon": 0}'
    schedule_week_day: '[{"start_hour":6, "start_minute":30, "temp":20}, {"start_hour":9, "start_minute":0, "temp":17}, {"start_hour":12, "start_minute":0, "temp":20 }, {"start_hour":14, "start_minute":0, "temp":17}, {"start_hour":18, "start_minute":0, "temp":20 }, {"start_hour":22, "start_minute":30, "temp":17}]'
    schedule_week_end: '[{"start_hour":8, "start_minute":30, "temp":20}, {"start_hour":23, "start_minute":0, "temp":17}]'
{% endraw %}

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
