---
title: Adaptive Lighting
description: How to set up Adaptive Lighting with Home Assistant
ha_category:
  - Automation
ha_release: 0.116
ha_quality_scale: internal
ha_domain: adaptive_lighting
ha_config_flow: true
---

The `adaptive_lighting` platform syncs the color and brightness of your lights to natural lighting brightness and color temperature. This helps maintain your circadian rhythm, which can help you have better sleep and feel better. You can see [the README](https://github.com/claytonjn/hass-circadian_lighting/blame/db7d0574dd7e4fdad5bd9b9c08db24f85bdddedb/README.md#L2-L20) of the project that this component was based off of for more details.

## Configuration

This integration is configurable through the frontend. (**Configuration** -> **Integrations** -> **Adaptive Lighting**, **Adaptive Lighting** -> **Options**)

You can configure more advanced options with `configuration.yaml`.

```yaml
# Example configuration.yaml entry
adaptive_lighting:
  lights:
    - light.living_room_lights
```

{% configuration %}
lights:
  description: List of light entities for Adaptive Lighting to control.
  required: true
  type: list
  default: []
name:
  description: The name to use when displaying this switch.
  required: false
  default: default
  type: string
adapt_brightness:
  description: Whether Adaptive Lighting should adjust brightness of lights.
  required: false
  default: true
  type: boolean
adapt_color_temp:
  description: Whether Adaptive Lighting should adjust color temperature of lights.
  required: false
  default: true
  type: boolean
adapt_rgb_color:
  description: Whether Adaptive Lighting should adjust RGB color of lights.
  required: false
  default: true
  type: boolean
initial_transition:
  description: How long the first transition is when the lights go from `off` to `on`.
  required: false
  default: 1
  type: time
interval:
  description: How often to adjust the lights.
  required: false
  default: 90
  type: integer
max_brightness:
  description: The maximum percent of brightness to set the lights to.
  required: false
  default: 100
  type: integer
max_color_temp:
  description: The warmest color temperature to set the lights to, in Kelvin.
  required: false
  default: 5500
  type: integer
min_brightness:
  description: The minimum percent of brightness to set the lights to.
  required: false
  default: 1
  type: integer
min_color_temp:
  description: The coldest color temperature to set the lights to, in Kelvin.
  required: false
  default: 2000
  type: integer
only_once:
  description: Whether to keep adjusting the lights, or to only adjust the lights as soon as they're turned on.
  required: false
  default: false
  type: boolean
prefer_rgb_color:
  description: Whether to use RGB color adjustment instead of native light color temperature.
  required: false
  default: false
  type: boolean
sunrise_offset:
  description: Change the sunrise time with a positive or negative offset.
  required: false
  default: 0
  type: time
sunrise_time:
  description: Override the sunrise time with a fixed time.
  required: false
  type: time
sunset_offset:
  description: Change the sunset time with a positive or negative offset.
  required: false
  default: 0
  type: time
sunrise_time:
  description: Override the sunset time with a fixed time.
  required: false
  type: time
sleep_brightness:
  description: Brightness of lights while the sleep mode is enabled.
  required: false
  default: 1
  type: integer
sleep_color_temp:
  description: Color temperature of lights while the sleep mode is enabled.
  required: false
  default: 1000
  type: integer
take_over_control:
  description: If another source calls `light.turn_on` while the lights are on and being adjusted, disable Adaptive Lighting.
  required: false
  default: true
  type: boolean
detect_non_ha_changes:
  description: Whether to detect changes and stop adjusting lights, even not from `light.turn_on`. Needs `take_over_control` to be enabled.
  required: inclusive
  default: false
  type: boolean
transition:
  description: How long the transition is when the lights change, in seconds.
  required: false
  default: 45
  type: integer
{% endconfiguration %}

Full example:

```yaml
# Example configuration.yaml entry
adaptive_lighting:
  - name: All settings
    lights: light.living_room_lights
    disable_brightness_adjust: false
    disable_entity: input_select.sleep_mode
    disable_state:
      - 'off'
      - 'half'
    initial_transition:
      seconds: 10
    interval: "00:00:30"
    max_brightness: 90
    max_color_temp: 5500
    min_brightness: 1
    min_color_temp: 2500
    only_once: false
    sleep_brightness: 1
    sleep_color_temp: 1000
    sleep_entity: input_boolean.sleep_mode
    sleep_state: "total"
    sunrise_offset: 1800
    sunrise_time: "08:00:00"
    sunset_offset: 0
    sunset_time: null
    transition: 10
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
