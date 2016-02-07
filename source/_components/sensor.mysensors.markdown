---
layout: page
title: "MySensors Sensor"
description: "Instructions how to integrate MySensors sensors into Home Assistant."
date: 2016-01-17 15:49
sidebar: true
comments: false
sharing: true
footer: true
logo: mysensors.png
ha_category: Sensor
featured: false
---

Integrates MySensors sensors into Home Assistant. See the [main component] for configuration instructions.

The following sensor types are supported:

##### MySensors version 1.4 and higher

S_TYPE             | V_TYPE
-------------------|---------------------------------------
S_DOOR             | V_TRIPPED
S_MOTION           | V_TRIPPED
S_SMOKE            | V_TRIPPED
S_TEMP             | V_TEMP
S_HUM              | V_HUM
S_BARO             | V_PRESSURE, V_FORECAST
S_WIND             | V_WIND, V_GUST
S_RAIN             | V_RAIN, V_RAINRATE
S_UV               | V_UV
S_WEIGHT           | V_WEIGHT, V_IMPEDANCE
S_POWER            | V_WATT, V_KWH
S_DISTANCE         | V_DISTANCE
S_LIGHT_LEVEL      | V_LIGHT_LEVEL
S_IR               | V_IR_SEND, V_IR_RECEIVE
S_WATER            | V_FLOW, V_VOLUME
S_AIR_QUALITY      | V_DUST_LEVEL
S_CUSTOM           | V_VAR1, V_VAR2, V_VAR3, V_VAR4, V_VAR5
S_DUST             | V_DUST_LEVEL
S_SCENE_CONTROLLER | V_SCENE_ON, V_SCENE_OFF

##### MySensors version 1.5 and higher

S_TYPE         | V_TYPE
---------------|----------------------------------
S_COLOR_SENSOR | V_RGB
S_MULTIMETER   | V_VOLTAGE, V_CURRENT, V_IMPEDANCE
S_SPRINKLER    | V_TRIPPED
S_WATER_LEAK   | V_TRIPPED
S_SOUND        | V_TRIPPED, V_LEVEL
S_VIBRATION    | V_TRIPPED, V_LEVEL
S_MOISTURE     | V_TRIPPED, V_LEVEL
S_LIGHT_LEVEL  | V_LEVEL
S_AIR_QUALITY  | V_LEVEL (replaces V_DUST_LEVEL)
S_DUST         | V_LEVEL (replaces V_DUST_LEVEL)

For more information, visit the [serial api] of MySensors.

[main component]: /components/mysensors/
[serial api]: https://www.mysensors.org/download/serial_api_15
