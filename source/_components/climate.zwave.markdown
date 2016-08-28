---
layout: page
title: "Z-Wave Thermostat"
description: "Instructions how to setup the Z-Wave thermostat within Home Assistant."
date: 2016-04-03 9:52
sidebar: true
comments: false
sharing: true
footer: true
logo: z-wave.png
ha_category: Climate
ha_release: 0.17
---


To get your Z-Wave thermostat or HVAC unit working with Home Assistant, follow the instructions for the general [Z-Wave component](/components/zwave/).

<p class='note'>
Thermostats with support for fan modes or different operating modes, will be handled like a HVAC device and will also be detected as one. 

If the thermostat support different operationg modes, you will get one thermostat entity for each mode. These can be hidden with settings using the customize setting in the `configuration.yaml` file.
</p>
