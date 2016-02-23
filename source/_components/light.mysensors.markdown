---
layout: page
title: "MySensors Light"
description: "Instructions how to integrate MySensors lights into Home Assistant."
date: 2016-02-15 17:37 +0100
sidebar: true
comments: false
sharing: true
footer: true
logo: mysensors.png
ha_category: Light
featured: false
---

Integrates MySensors lights into Home Assistant. See the [main component] for configuration instructions.

The following actuator types are supported:

##### MySensors version 1.4 and higher

S_TYPE   | V_TYPE
---------|--------------
S_LIGHT  | V_LIGHT
S_DIMMER | V_DIMMER

##### MySensors version 1.5 and higher

S_TYPE      | V_TYPE
------------|-------------
S_LIGHT     | V_STATUS
S_DIMMER    | V_PERCENTAGE
S_RGB_LIGHT | V_RGB

For more information, visit the [serial api] of MySensors.

[main component]: /components/mysensors/
[serial api]: https://www.mysensors.org/download/serial_api_15
