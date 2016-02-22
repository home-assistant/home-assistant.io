---
layout: page
title: TCP Binary Sensor
description: "Instructions on how to set up TCP binary sensors within Home Assistant."
date: 2016-02-22 11:05
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Binary Sensor
---
The TCP Binary Sensor is a type of [TCP Sensor](/components/sensor.tcp/) which is either `OFF` or `ON`. In order the use this sensor type, in addition to the configuration for the TCP Sensor, you must supply a `value_on` value to represent what is returned when the device is turned `ON`.

- **value_on** (*Required*): The value returned when the device is `ON`.
