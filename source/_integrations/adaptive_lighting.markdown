---
title: Adaptive Lighting
description: Instructions for setting up Adaptive Lighting with Home Assistant
ha_category:
  - Automation
ha_release: 0.116
ha_quality_scale: internal
ha_domain: adaptive_lighting
ha_config_flow: true
---

The `adaptive_lighting` platform syncs the color and brightness of your lights to your circadian rhythm. You can set it up using the UI.

The integration will update your lights based on the time of day. It will only affect lights that are turned on and listed in the flux configuration.

During the day (in between `start time` and `sunset time`), it will fade the lights from the `start_colortemp` to the `sunset_colortemp`.  After sunset (between `sunset_time` and `stop_time`), the lights will fade from the `sunset_colortemp` to the `stop_colortemp`. If the lights are still on after the `stop_time` it will continue to change the light to the `stop_colortemp` until the light is turned off. The fade effect is created by updating the lights periodically.

The color temperature is specified kelvin, and accepted values are between 1000 and 40000 kelvin. Lower values will seem more red, while higher will look more white.

If you want to update at variable intervals, you can leave the switch turned off and use automation rules that call the service `switch.<name>_update` whenever you want the lights updated, where `<name>` equals the `name:` property in the switch configuration.

## Configuration

The integration is configurable through the frontend. (**Configuration** -> **Integrations** -> **Adaptive Lighting**, **Adaptive Lighting** -> **Options**)

You can configure more advanced options with `configuration.yaml`.

```yaml
# Example configuration.yaml entry
adaptive_lighting:
  lights:
    - light.living_room_lights
```

{% configuration %}
lights:
  description: List of light entities.
  required: true
  type: list
name:
  description: The name to use when displaying this switch.
  required: false
  default: default
  type: string
disable_brightness_adjust:
  description: Whether to disable adjusting brightness of lights.
  required: false
  type: boolean
disable_entity:
  description: An entity to disable adaptive lighting.
  required: false
  type: time
start_colortemp:
  description: The color temperature at the start.
  required: false
  default: 4000
  type: integer
sunset_colortemp:
  description: The sun set color temperature.
  required: false
  default: 3000
  type: integer
stop_colortemp:
  description: The color temperature at the end.
  required: false
  default: 1900
  type: integer
brightness:
  description: The brightness of the lights.
  required: false
  type: integer
disable_brightness_adjust:
  description: If true, brightness will not be adjusted besides color temperature.
  required: false
  type: boolean
  default: false
mode:
  description: Select how color temperature is passed to lights. Valid values are `xy`, `mired` and `rgb`.
  required: false
  default: xy
  type: string
transition:
  description: Transition time in seconds for the light changes (high values may not be supported by all light models).
  required: false
  default: 30
  type: integer
interval:
  description: Frequency in seconds at which the lights should be updated.
  required: false
  default: 30
  type: integer
{% endconfiguration %}

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
    disable_brightness_adjust: true
    mode: xy
    transition: 30
    interval: 60
```
