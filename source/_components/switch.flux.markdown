---
layout: page
title: "Flux Switch"
description: "Instructions how to have switches call command line commands."
date: 2016-06-01 17:41
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Switch
ha_release: 0.21
---

The Flux switch platform will change the temperature of your lights similar to
the way flux works on your computer, using circadian rhythm.  They will be bright
during the day, and gradually fade to a red/orange at night.

The component will update your lights based on the the time of day.  It will only
affect lights that are turned on and listed in the flux configuration.

During the day (in between `start time` and `sunset time`), it will fade the lights from
the `start_colortemp` to the `sunset_colortemp`.  After sunset (between `sunset_time`
and `stop_time`), the lights will fade from the the `sunset_colortemp` to the
`stop_colortemp`.  If the lights are still on after the `stop_time` it will continue
to change the light to the `stop_colortemp` until the light is turned off.  The fade
effect is created by updating the lights every 30 seconds with a 30 second transition time.

If you don't wish to have flux update on 30 second intervals, you can leave the
switch turned off and use automation rules that call the service `switch.flux_update`
whenever you want the lights updated.

```yaml
# Example configuration.yaml entry
switch:
  platform: flux
  lights:
    - light.desk
    - light.lamp
  name: Fluxer            # optional, default Flux
  start_time: 7:00        # optional, default sunrise
  stop_time: 23:00        # optional, default 22:00
  start_colortemp: 4000   # optional, default 4000
  sunset_colortemp: 3000  # optional, default 3000
  stop_colortemp: 1900    # optional, default 1900
  brightness: 200         # optional, default calculated by RGB_to_xy
```

