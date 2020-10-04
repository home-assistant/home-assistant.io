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
  default: false
  type: boolean
disable_entity:
  description: An entity to toggle disabling adaptive lighting.
  required: false
  type: boolean
disable_state:
  description: The state of the entity to disable adaptive lighting.
  required: false
  type: [list, string]
initial_transition:
  description: How long the first transition is.
  required: false
  default: 1
  type: time
transition:
  description: How long the transition is when the lights change, in seconds.
  required: false
  default: 60
  type: integer
max_brightness:
  description: The maximum percent of brightness to set the lights to.
  required: false
  default: 100
  type: integer
max_color_temp:
  description: The warmest color temperature to set the lights to.
  required: false
  default: 5500
  type: integer
min_brightness:
  description: The minimum percent of brightness to set the lights to.
  required: false
  default: 1
  type: integer
min_color_temp:
  description: The coldest color temperature to set the lights to.
  required: false
  default: 2500
  type: integer
only_once:
  description: Whether to keep adjusting the lights, or to only adjust the lights as soon as they're turned on.
  required: false
  default: false
  type: boolean
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

### Services

`adaptive_lighting.apply` applies adaptive lighting settings to lights on demand.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |       no | The entity ID of the switch with the settings to apply.                 |
| `lights`                  |       no | A list of lights to apply the settings to.                              |
| `transition`              |      yes | The number of seconds for the transition.                               |
| `adapt_brightness`        |      yes | Whether to change the brightness of the light or not.                   |
| `adapt_color_temp`        |      yes | Whether to adapt the color temperature on supporting lights.            |
| `adapt_rgb_color`         |      yes | Whether to adapt the color temperature with RGB.                        |
| `turn_on_lights`          |      yes | Whether turn on lights that are currently off.                          |
