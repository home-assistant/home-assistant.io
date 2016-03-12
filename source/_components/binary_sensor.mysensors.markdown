---
layout: page
title: "MySensors Binary Sensor"
description: "Instructions how to integrate MySensors binary sensors into Home Assistant."
<<<<<<< HEAD
date: 2016-02-27 20:13 +0100
=======
date: 2016-02-28 01:20 +0100
>>>>>>> master
sidebar: true
comments: false
sharing: true
footer: true
logo: mysensors.png
ha_category: Binary Sensor
featured: false
---

Integrates MySensors binary sensors into Home Assistant. See the [main component] for configuration instructions.

The following sensor types are supported:

##### MySensors version 1.4 and higher

S_TYPE             | V_TYPE
-------------------|---------------------------------------
S_DOOR             | V_TRIPPED
S_MOTION           | V_TRIPPED
S_SMOKE            | V_TRIPPED

##### MySensors version 1.5 and higher

S_TYPE         | V_TYPE
---------------|----------------------------------
S_SPRINKLER    | V_TRIPPED
S_WATER_LEAK   | V_TRIPPED
S_SOUND        | V_TRIPPED
S_VIBRATION    | V_TRIPPED
S_MOISTURE     | V_TRIPPED

For more information, visit the [serial api] of MySensors.

[main component]: /components/mysensors/
[serial api]: https://www.mysensors.org/download/serial_api_15
