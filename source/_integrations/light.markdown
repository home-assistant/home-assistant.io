---
title: Light
description: Instructions on how to setup your lights with Home Assistant.
ha_category:
  - Light
ha_release: pre 0.7
ha_quality_scale: internal
ha_domain: light
ha_iot_class:
---

This integration allows you to track and control various light bulbs. Read the integration documentation for your particular light hardware to learn how to enable it.

### Default turn-on values

To set the default color, brightness and transition values when the light is turned on, create a custom `light_profiles.csv`, normally located in the default configuration folder where you find `configuration.yaml`. 

The `light_profiles.csv` has to have a header. The format of the header is:

```txt
profile,color_x,color_y,brightness,transition
```

The field transition is optional and can be omitted.

The `.default` suffix should be added to the entity identifier of each light to define a default value, e.g., for `light.ceiling_2` the `profile` field is `light.ceiling_2.default`. To define a default for all lights, the identifier `group.all_lights.default` can be used. Individual settings always supercede the `all_lights` default setting.

### Service `light.turn_on`

Turns one light on or multiple lights on using [groups](/integrations/group/).

Most lights do not support all attributes. You can check the integration documentation of your particular light for hints, but in general, you will have to try things out and see what works.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`s of lights. To target all the lights use `all` as `entity_id`.
| `transition` | yes | Number that represents the time (in seconds) the light should take to transition to the new state.
| `profile` | yes | String with the name of one of the [built-in profiles](https://github.com/home-assistant/home-assistant/blob/master/homeassistant/components/light/light_profiles.csv) (relax, energize, concentrate, reading) or one of the custom profiles defined in `light_profiles.csv` in the current working directory. Light profiles define an xy color, brightness and a transition value (if no transition is desired, set to 0 or leave out the column entirely). If a profile is given, and a brightness is set, then the profile brightness will be overwritten.
| `hs_color` | yes | A list containing two floats representing the hue and saturation of the color you want the light to be. Hue is scaled 0-360, and saturation is scaled 0-100.
| `xy_color` | yes | A list containing two floats representing the xy color you want the light to be. Two comma-separated floats that represent the color in XY. You can find a great chart here: [Hue Color Chart](https://developers.meethue.com/documentation/core-concepts#color_gets_more_complicated).
| `rgb_color` | yes | A list containing three integers between 0 and 255 representing the RGB color you want the light to be. Three comma-separated integers that represent the color in RGB, within square brackets.
| `rgbw_color` | yes | A list containing four integers between 0 and 255 representing the RGBW color you want the light to be. Four comma-separated integers that represent the color in RGBW (red, green, blue, white), within square brackets. This attribute will be ignored by lights which do not support RGBW colors.
| `rgbww_color` | yes | A list containing five integers between 0 and 255 representing the RGBWW color you want the light to be. Five comma-separated integers that represent the color in RGBWW (red, green, blue, cold white, warm white), within square brackets. This attribute will be ignored by lights which do not support RGBWW colors.
| `color_temp` | yes | An integer in mireds representing the color temperature you want the light to be.
| `kelvin` | yes | Alternatively, you can specify the color temperature in Kelvin.
| `color_name` | yes | A human-readable string of a color name, such as `blue` or `goldenrod`. All [CSS3 color names](https://www.w3.org/TR/css-color-3/#svg-color) are supported.
| `brightness` | yes | Integer between 0 and 255 for how bright the light should be, where 0 means the light is off, 1 is the minimum brightness and 255 is the maximum brightness supported by the light.
| `brightness_pct`| yes | Alternatively, you can specify brightness in percent (a number between 0 and 100), where 0 means the light is off, 1 is the minimum brightness and 100 is the maximum brightness supported by the light.
| `brightness_step` | yes | Change brightness by an amount. Should be between -255..255.
| `brightness_step_pct` | yes | Change brightness by a percentage. Should be between -100..100.
| `flash` | yes | Tell light to flash, can be either value `short` or `long`.
| `effect`| yes | Applies an effect such as `colorloop` or `random`.

<div class='note'>

In order to apply attributes to an entity, you will need to add `data:` to the configuration. See example below

</div>

```yaml
# Example configuration.yaml entry
automation:
- id: one
  alias: "Turn on light when motion is detected"
  trigger:
    - platform: state
      entity_id: binary_sensor.motion_1
      to: "on"
  action:
    - service: light.turn_on
      target:
        entity_id: light.living_room
      data:
        brightness: 255
        kelvin: 2700
```
```yaml
# Ledlist morning on, red
- id: llmor
  alias: "Stair morning on"
  trigger:
  - at: '05:00'
    platform: time
  action:
    - service: light.turn_on
      target:
        entity_id: light.ledliststair
      data:
        brightness: 130
        rgb_color: [255,0,0]
```

### Service `light.turn_off`

Turns one or multiple lights off.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`s of lights. To target all the lights use all as `entity_id`.
| `transition` | yes | Integer that represents the time the light should take to transition to the new state in seconds.

### Service `light.toggle`

Toggles the state of one or multiple lights. Takes the same arguments as [`turn_on`](#service-lightturn_on) service.

*Note*: If `light.toggle` is used for a group of lights, it will toggle the individual state of each light. If you want the lights to be treated as a single light, use [Light Groups](/integrations/light.group/) instead.
