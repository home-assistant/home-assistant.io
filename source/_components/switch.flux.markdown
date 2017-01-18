---
layout: page
title: "Flux Light Adjustment"
description: "Instructions how to have switches call command line commands."
date: 2016-06-01 17:41
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Automation
ha_release: 0.21
logo: home-assistant.png
---

The `flux` switch platform will change the temperature of your lights similar to the way flux works on your computer, using circadian rhythm. They will be bright during the day, and gradually fade to a red/orange at night.

The component will update your lights based on the the time of day. It will only affect lights that are turned on and listed in the flux configuration.

During the day (in between `start time` and `sunset time`), it will fade the lights from the `start_colortemp` to the `sunset_colortemp`.  After sunset (between `sunset_time` and `stop_time`), the lights will fade from the the `sunset_colortemp` to the `stop_colortemp`. If the lights are still on after the `stop_time` it will continue to change the light to the `stop_colortemp` until the light is turned off. The fade effect is created by updating the lights every 30 seconds with a 30 second transition time.

If you don't wish to have flux update on 30 second intervals, you can leave the switch turned off and use automation rules that call the service `switch.flux_update` whenever you want the lights updated.

To use the Flux switch in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  platform: flux
  lights:
    - light.desk
    - light.lamp
  name: Fluxer
  start_time: '7:00'
  stop_time: '23:00'
  start_colortemp: 4000
  sunset_colortemp: 3000
  stop_colortemp: 1900
  brightness: 200
  mode: xy
```

Configuration variables:

- **lights** (*Required*) array: List of light entities.
- **name** (*Optional*): The name to use when displaying this switch.
- **start_time** (*Optional*): The start time. Default to sunrise.
- **stop_time** (*Optional*): The stop time. Defaults to 22:00.
- **start_colortemp** (*Optional*): The color temperature at the start. Defaults to `4000`.
- **sunset_colortemp** (*Optional*): The sun set color temperature. Defaults to `3000`.
- **stop_colortemp** (*Optional*): The color temperature at the end. Defaults to `1900`.
- **brightness** (*Optional*): The brightness of the lights. Calculated with `RGB_to_xy` by default. Setting to -1 disables brightness updates.
- **mode** (*Optional*): Select how color temperature is passed to lights. Valid values are `xy` and `mired`. Defaults to `xy`.

