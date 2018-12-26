---
layout: page
title: "EZcontrol XS1 Climate"
description: "Instructions on how to setup XS1 climate devices within Home Assistant."
date: 2018-12-27 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: xs1.jpg
ha_category: Climate
ha_iot_class: "Local Polling"
ha_release: 0.85
---

Home Assistant can combine temperature sensors and climate actuators into a single device. The XS1 gateway does not allow this but a sensor and actuator can be configured separately. To make Home Assistant register them in the same climate device just prefix the **sensor** name with the actuator name on the XS1 gateway configuration, f.ex:

```text
Actuator device name: "Bedroom_Temp"
Sensor device name: "Bedroom_Temp_Sensor"
```
