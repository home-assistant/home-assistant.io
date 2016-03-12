---
layout: page
title: "MySensors Switch"
description: "Instructions how to integrate MySensors switches into Home Assistant."
date: 2016-03-02 18:20 +0100
sidebar: true
comments: false
sharing: true
footer: true
logo: mysensors.png
ha_category: Switch
featured: false
---

Integrates MySensors switches into Home Assistant. See the [main component] for configuration instructions.

The following actuator types are supported:

##### MySensors version 1.4 and higher

S_TYPE   | V_TYPE
---------|--------------
S_DOOR   | V_ARMED
S_MOTION | V_ARMED
S_SMOKE  | V_ARMED
S_LIGHT  | V_LIGHT
S_LOCK   | V_LOCK_STATUS

##### MySensors version 1.5 and higher

S_TYPE       | V_TYPE
-------------|------------------
S_LIGHT      | V_STATUS
S_BINARY     | [V_STATUS or V_LIGHT]
S_SPRINKLER  | V_STATUS
S_WATER_LEAK | V_ARMED
S_SOUND      | V_ARMED
S_VIBRATION  | V_ARMED
S_MOISTURE   | V_ARMED

For more information, visit the [serial api] of MySensors.

[main component]: /components/mysensors/
[serial api]: https://www.mysensors.org/download/serial_api_15
