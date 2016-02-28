---
layout: page
title: "MySensors Sensor"
description: "Instructions how to integrate MySensors sensors into Home Assistant."
date: 2016-02-28 01:20 +0100
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
S_SOUND        | V_LEVEL
S_VIBRATION    | V_LEVEL
S_MOISTURE     | V_LEVEL
S_LIGHT_LEVEL  | V_LEVEL
S_AIR_QUALITY  | V_LEVEL (replaces V_DUST_LEVEL)
S_DUST         | V_LEVEL (replaces V_DUST_LEVEL)

### {% linkable_title Custom unit of measurement %}

Some sensor value types are not specific for a certain sensor type. These do not have a default unit of measurement in Home Assistant. For example, the V_LEVEL type can be used for different sensor types, dust, sound, vibration etc.

By using V_UNIT_PREFIX, it's possible to set a custom unit for any sensor. The string value that is sent for V_UNIT_PREFIX will be used in preference to any other unit of measurement, for the defined sensors. V_UNIT_PREFIX can't be used as a standalone sensor value type. Sending a supported value type and value from the tables above is also required. V_UNIT_PREFIX is available with MySensors version 1.5 and later.

For more information, visit the [serial api] of MySensors.

[main component]: /components/mysensors/
[serial api]: https://www.mysensors.org/download/serial_api_15
