---
layout: page
title: "MySensors Light"
description: "Instructions how to integrate MySensors lights into Home Assistant."
date: 2016-03-02 18:20 +0100
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

##### MySensors version 1.4

S_TYPE   | V_TYPE
---------|--------------
S_DIMMER | V_DIMMER\*, V_LIGHT\*

##### MySensors version 1.5 and higher

S_TYPE      | V_TYPE
------------|-------------
S_DIMMER    | [V_DIMMER\* or V_PERCENTAGE\*], [V_LIGHT\* or V_STATUS\*]
S_RGB_LIGHT | V_RGB*, [V_LIGHT\* or V_STATUS\*], [V_DIMMER or V_PERCENTAGE]

V_TYPES with a star (\*) denotes required V_TYPES. Use either V_LIGHT or V_STATUS and either V_DIMMER or V_PERCENTAGE for an applicable actuator.

For more information, visit the [serial api] of MySensors.

[main component]: /components/mysensors/
[serial api]: https://www.mysensors.org/download/serial_api_15
