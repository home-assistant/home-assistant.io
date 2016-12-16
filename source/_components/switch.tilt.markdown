---
layout: page
title: "Tilt Switch"
description: "Instructions how to integrate a Tilt switch in Home Assistant."
date: 2016-12-14 23:00
sidebar: true
comments: false
sharing: true
footer: true
logo: 
ha_category: Switch
---

#Tilt switch.

Jerry Workman <jerry.workman@gmail.com>
License: MIT
5 Nov 2016
Last Revised: 15 Dec 2016

Combines a tilt sensor and a relay switch to control a garage door opener or
motorized gate. When this switch is turned on it will toggle the relay to
activate the garage door if it is not already open. The reverse will happen
when it is turned off.

The status is not reported while the door is opening or closing based on the
run_time parameter.

###My Hardware:
Ecolink Intelligent Technology Z-Wave Garage Door Tilt Sensor:
    http://amzn.to/2ebYPgU
GoControl Z-Wave Isolated Contact Fixture Module - FS20Z-1:
    http://amzn.to/2ec29bK

Add the following to your configuration.yaml:

```yaml
switch tilt:
  platform: tilt
  switches:
    front_garage_door:
      tilt_sensor:   binary_sensor.my_tilt_switch
      switch:        switch.my_relay_switch
      #optional on time for switch to simulate button press. default 1 second
      contact_delay: 1
      #optional run time for the opener. default: 10 seconds
      run_time:      10
```
