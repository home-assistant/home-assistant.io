---
layout: page
title: "Flux Light Adjustment"
description: "Instructions on how to have switches call command line commands."
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

The component will update your lights based on the time of day. It will only affect lights that are turned on and listed in the flux configuration.

During the day (in between `start time` and `sunset time`), it will fade the lights from the `start_colortemp` to the `sunset_colortemp`.  After sunset (between `sunset_time` and `stop_time`), the lights will fade from the `sunset_colortemp` to the `stop_colortemp`. If the lights are still on after the `stop_time` it will continue to change the light to the `stop_colortemp` until the light is turned off. The fade effect is created by updating the lights periodically.

The color temperature is specified kelvin, and accepted values are between 1000 and 40000 kelvin. Lower values will seem more red, while higher will look more white.

If you want to update at variable intervals, you can leave the switch turned off and use automation rules that call the service `switch.<name>_update` whenever you want the lights updated, where `<name>` equals the `name:` property in the switch configuration.

To use the Flux switch in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: flux
    lights:
      - light.desk
      - light.lamp
```

Configuration variables:

- **lights** (*Required*) array: List of light entities.
- **name** (*Optional*): The name to use when displaying this switch.
- **start_time** (*Optional*): The start time. Default to sunrise.
- **stop_time** (*Optional*): The stop time. Defaults to dusk.
- **start_colortemp** (*Optional*): The color temperature at the start. Defaults to `4000`.
- **sunset_colortemp** (*Optional*): The sun set color temperature. Defaults to `3000`.
- **stop_colortemp** (*Optional*): The color temperature at the end. Defaults to `1900`.
- **brightness** (*Optional*): The brightness of the lights. Calculated with `RGB_to_xy` by default.
- **disable_brightness_adjust** (*Optional*): If true, brightness will not be adjusted besides color temperature. Defaults to False.
- **mode** (*Optional*): Select how color temperature is passed to lights. Valid values are `xy`, `mired` and `rgb`. Defaults to `xy`.
- **transition** (*Optional*): Transition time for the light changes (high values may not be supported by all light models). Defaults to 30.
- **interval** (*Optional*): Frequency at which the lights should be updated. Defaults to 30.

Full example:

```yaml
# Example configuration.yaml entry
switch:
  - platform: flux
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
    disable_brightness_adjust: True
    mode: xy
    transition: 30
    interval: 60
```

