---
layout: page
title: "Envisalink Binary Sensor"
description: "Instructions how to integrate Envisalink binary sensors into Home Assistant."
date: 2016-07-01 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: eyezon.png
ha_release: 0.23
ha_category: Binary Sensor
ha_iot_class: "Local Push"
---

The `envisalink` platform allows you to get data from your [Envisalink](http://www.eyezon.com/) binary sensors from within Home Assistant.

The requirement is that you have setup your [Envisalink hub](/components/envisalink/).

#### Sensor Types

See the [binary_sensor source](https://github.com/home-assistant/home-assistant/blob/master/homeassistant/components/binary_sensor/__init__.py#L20-L37) for the most up-to-date list of sensor types

* `none`         => generic on/off
* `cold`         => on means cold (or too cold)
* `connectivity` => On means connection present, Off = no connection
* `gas`          => CO, CO2, etc.
* `heat`         => On means hot (or too hot)
* `light`        => Lightness threshold
* `moisture`     => Specifically a wetness sensor
* `motion`       => Motion sensor
* `moving`       => On means moving, Off means stopped
* `occupancy`    => On means occupied, Off means not occupied
* `opening`      => Door, window, etc.
* `power`        => Power, over-current, etc
* `safety`       => Generic on=unsafe, off=safe
* `smoke`        => Smoke detector
* `sound`        => On means sound detected, Off means no sound
* `vibration`    => On means vibration detected, Off means no vibration
