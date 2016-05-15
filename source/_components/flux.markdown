---
layout: page
title: "Flux"
description: "Instructions for how to use the Flux component within Home Assistant."
date: 2016-05-15 17:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Automation 
featured: false
---


The Flux platform will help automatically set the temperature of your lights throughout the day according to circadian rhythm.

The primary functions in this component were taken from: https://github.com/KpaBap/hue-flux/blob/master/hue-flux.py

This component will change the temperature of your lights similar to
the way flux works on your computer.  

You must give a list of light entities to control in the
`configuration.yaml`.  You can optionally provide a `bedtime` which is the last
time of day the lights will be changed.  You can use the `turn_off` param
to tell flux whether or not to turn off the lights at night.

The `auto` param will make this component turn on the lights in the morning,
and change them accordingly every 10 seconds throughout the day.

If you don't wish to run the auto program, you can create your own
automation rules that call the service flux.update whenever you want
the lights updated.

The component will update your 
lights based on the the time of day.  During the day it will fade the lights from
the `day_colortemp` to the `sunset_colortemp`.  After sunset, the lights will 
fade from the the `sunset_colortemp` to the `bedtime_colortemp`. 

Example `configuration.yaml`:
```yaml
flux:
  lights:
    - light.desk
    - light.lamp
  bedtime: "22:00"          # optional, default 22:00
  turn_off: True            # optional, default False
  auto: True                # optional, default False
  day_colortemp: 4000       # optional, default 4000
  sunset_colortemp: 3000    # optional, default 3000
  bedtime_colortemp: 1900   # optional, default 1900
```

