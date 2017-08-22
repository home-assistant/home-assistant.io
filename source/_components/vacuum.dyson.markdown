---
layout: page
title: "Dyson 360 Eye"
description: "Instructions how to integrate your Dyson Eye 360 vacuum robot within Home Assistant."
date: 2017-08-06 10:30
sidebar: true
comments: false
sharing: true
footer: true
logo: dyson.png
ha_category: Vacuum
ha_iot_class: "Cloud Polling"
ha_release: 0.51
---

The `dyson` vacuum platform allows you to control your Dyson 360 Eye robot vacuum.

You have first to setup the [Dyson component](/components/dyson/)

### {% linkable_title Component services %}

This component support the following services (see [Vacuum Cleaner Robots](/components/vacuum/)):
* [`turn_on`](/components/vacuum/#service-vacuumturn_on)
* [`turn_off`](/components/vacuum/#service-vacuumturn_off)
* [`start_pause`](/components/vacuum/#service-vacuumstart_pause)
* [`stop`](/components/vacuum/#service-vacuumstop)
* [`return_to_home`](/components/vacuum/#service-vacuumreturn_to_home)
* [`set_fan_speed`](/components/vacuum/#service-vacuumset_fanspeed). Fan speed values:
  * `Quiet`
  * `Max`
