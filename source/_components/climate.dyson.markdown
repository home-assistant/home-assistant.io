---
layout: page
title: "Dyson Climate Control"
description: "Instructions on how to integrate your Dyson Climate device within Home Assistant."
date: 2018-05-23 22:30
sidebar: true
comments: false
sharing: true
footer: true
logo: dyson.png
ha_category: Climate
ha_iot_class: "Cloud Polling"
ha_release: 0.81
---

The `dyson` climate platform allows you to control your Dyson Pure Hot+Cool Fan thermal control. For controlling the fan functionality, see the [Dyson fan](/components/fan.dyson/) platform.

You have first to set up the [Dyson component](/components/dyson/).

### {% linkable_title Component services %}

This component supports the following services (see [Climate](/components/climate/)):
* [`turn_on`](/components/climate/#service-climateturn_on)
* [`turn_off`](/components/climate/#service-climateturn_off)
* [`set_temperature`](/components/climate/#service-climateset_temperature)
* [`set_fan_mode`](/components/climate/#service-climateset_fan_mode)
* [`set_operation_mode`](/components/climate/#service-climateset_operation_mode)
