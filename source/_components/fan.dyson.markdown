---
layout: page
title: "Dyson Purifier Fan"
description: "Instructions on how to setup the Dyson Purifier fans within Home Assistant."
date: 2017-05-27 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: dyson.png
ha_category: Fan
ha_iot_class: "Cloud Polling"
ha_release: 0.47
---


The `dyson` fan platform allows you to control your Dyson Purifier fans.

You first have to setup the [Dyson component](/components/dyson/)

### {% linkable_title Supported fan devices %}

- Pure Cool link (desk and tower)
- Pure Hot+cool link (see [climate](/components/climate.dyson/) for thermal control)
- Pure Cool 2018 (DP04 and TP04)

### {% linkable_title Attributes %}

There are several attributes which can be used for automations and templates.

| Attribute | Description |
| --------- | ----------- |
| `night_mode` | A boolean that indicates if the night mode of the fan device is on.|
| `auto_mode` | A boolean that indicates if the auto mode of the fan device is on.|
| `angle_low` | Int (between 5 and 355) that indicates the low angle of oscillation (only for DP04 and TP04).|
| `angle_high` | Int (between 5 and 355) that indicates the high angle of oscillation (only for DP04 and TP04).|
| `flow_direction_front` | Boolean that indicates if the frontal flow direction is enabled (only for DP04 and TP04).|
| `timer` | Attribute that indicates the status of the auto power off timer, can be either 'OFF' or an integer representing the time remaining until shutdown in minutes (only for DP04 and TP04).|

### {% linkable_title Platform Services %}

#### {% linkable_title Service `fan.set_speed` %}

Set the fan speed.

| Service data attribute    | Optional | Description                                                         |
|---------------------------|----------|---------------------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific fan. Else targets all.              |
| `speed`                   |       no | Fan speed. Valid values are 'auto' and the integers between 1 and 10 |


#### {% linkable_title Service `fan.dyson_set_night_mode` %}

Controls the night mode function.

| Service data attribute    | Optional | Description                                                         |
|---------------------------|----------|---------------------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific fan. Else targets all.              |
| `night_mode`              |       no | Set to `true` to enable and to `false` to disable night mode |

#### {% linkable_title Service `fan.dyson_set_angle` %}

Sets the oscillation angle of the fan (Only available for TP04 and DP04). The low and high angle should either be equal to disable the osicalltion and only set the direction of the fan or difference between them should be at least 30.

| Service data attribute    | Optional | Description                                                         |
|---------------------------|----------|---------------------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific fan. Else targets all.              |
| `angle_low`               |       no | Integer specifying the low angle of oscillation (between 5 and 355) |
| `angle_high`              |       no | Integer specifying the high angle of oscillation (between 5 and 355) |\

#### {% linkable_title Service `fan.dyson_flow_direction_front` %}

Controls the airflow direction of the fan (Only available for TP04 and DP04).

| Service data attribute    | Optional | Description                                                         |
|---------------------------|----------|---------------------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific fan. Else targets all.              |
| `flow_direction_front`    |       no | Set to `true` to set the flow direction to front and to `false` to set it to back |

#### {% linkable_title Service `fan.dyson_flow_direction_front` %}

Controls the sleep timer (Only available for TP04 and DP04).

| Service data attribute    | Optional | Description                                                         |
|---------------------------|----------|---------------------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific fan. Else targets all.              |
| `TIMER`    |       no | Set to `OFF` to disable the timer or an integer between `1` and `580` (minutes) to set the sleep timer |

