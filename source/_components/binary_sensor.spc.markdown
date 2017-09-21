---
layout: page
title: "SPC Binary Sensor"
description: "Instructions how to integrate Vanderbilt SPC binary sensors into Home Assistant."
date: 2017-05-18 22:05
sidebar: true
comments: false
sharing: true
footer: true
logo: vanderbilt_spc.png
ha_release: 0.47
ha_category: Binary Sensor
ha_iot_class: "Local Push"
---

The `spc` platform allows you to get data from your [Vanderbilt SPC](http://www.spc-intruder-detection.com/ssp-spc/) binary sensors from within Home Assistant. 

Check the [type/class](/components/binary_sensor/) list for a possible visualization of your zone. Currently motion, smoke and door sensors are supported.
  
The requirement is that you have setup your [SPC hub](/components/spc/).
