---
layout: page
title: "Danfoss Air Sensor"
description: "Instructions for how to setup Danfoss Air sensors within Home Assistant."
date: 2019-01-21 20:59
sidebar: true
comments: false
sharing: true
footer: true
logo: danfoss_air.png
ha_category: Sensor
ha_release: "0.87"
ha_iot_class: "Local Polling"
---

<p class='note'>
To get your Danfoss Air sensors working with Home Assistant, follow the instructions for the general [Danfoss Air component](/components/danfoss_air/).
</p>


The following sensors are supported.
* **Outdoor temperature:** Outdoor air temperature.
* **Supply temperature:** Air temperature of the air supplied to the house.
* **Extract temperature:** Air temperature of the air extracted from the house.
* **Exhaust temperature:** Exhausted air temperature.
* **Remaining filter lifetime:** Reamining filter lifetime measured in percent.
* **Fan step:** Fan step in percent.
* **Exhaust fan speed:** Exhaust fan speed RPM.
* **Supply fan speed:** Supply fan speed RPM.
* **Battery:** Danfoss Air Dial remaning battery. If your system is without an Air Dial control panel the sensor will show 0%.
