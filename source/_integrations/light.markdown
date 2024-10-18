---
title: Light
description: Instructions on how to setup your lights with Home Assistant.
ha_category:
  - Light
ha_release: pre 0.7
ha_quality_scale: internal
ha_domain: light
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

This integration allows you to track and control various light bulbs. Read the integration documentation for your particular light hardware to learn how to enable it.

{% include integrations/building_block_integration.md %}

## State and attributes of a light entity

Light {% term entities %} can have the following {% term states %}: `on` or `off`. The list of available attributes depends on the {% term device %}. Refer to the integration documentation of your light.

<p class='img'>
  <img src='/images/integrations/light/state_light.png' alt='Screenshot showing three lights with differents states: `on`, `off`, or `unavailable`'>
  Three lights with differents states: `on`, `off`, or `unavailable`.
</p>

## Default turn-on values

To set the default color, brightness and transition values when the light is turned on, create a custom `light_profiles.csv`, normally located in the default configuration folder where you find {% term "`configuration.yaml`" %}.

The `light_profiles.csv` has to have a header. The format of the header is:

```txt
id,x,y,brightness,transition
```

The field transition is optional and can be omitted.

The `.default` suffix should be added to the entity identifier of each light to define a default value, e.g., for `light.ceiling_2` the `profile` field is `light.ceiling_2.default`. To define a default for all lights, the identifier `group.all_lights.default` can be used. Individual settings always supersede the `all_lights` default setting.

{% note %}
If a light entity is in the `on` state, the default profile brightness will only be applied if it is called in the action data attribute `profile`, like any other named profile. The transition attribute will be applied for all `light.turn_on`, `light.toggle`, and `light.turn_off` actions, unless specified otherwise in the action data.
{% endnote %}

## Action `light.turn_on`

Turns one light on or multiple lights on using [groups](/integrations/group/).

Most lights do not support all attributes. You can check the integration documentation of your particular light for hints, but in general, you will have to try things out and see what works.

| Data attribute | Optional | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | no       | String or list of strings that point at `entity_id`s of lights. To target all lights, set `entity_id` to `all`.                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `transition`           | yes      | Number that represents the time (in seconds) the light should take to transition to the new state.                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `profile`              | yes      | String with the name of one of the [built-in profiles](https://github.com/home-assistant/core/blob/master/homeassistant/components/light/light_profiles.csv) (relax, energize, concentrate, reading) or one of the custom profiles defined in `light_profiles.csv` in the current working directory. Light profiles define an xy color, brightness and a transition value (if no transition is desired, set to 0 or leave out the column entirely). If a profile is given, and a brightness is set, then the profile brightness will be overwritten. |
| `hs_color`             | yes      | A list containing two floats representing the hue and saturation of the color you want the light to be. Hue is scaled 0-360, and saturation is scaled 0-100.                                                                                                                                                                                                                                                                                                                                                                                         |
| `xy_color`             | yes      | A list containing two floats representing the xy color you want the light to be. Two comma-separated floats that represent the color in XY.                                                                                                                                                                                                                                                                                                                                                                                                          |
| `rgb_color`            | yes      | A list containing three integers between 0 and 255 representing the RGB color you want the light to be. Three comma-separated integers that represent the color in RGB, within square brackets.                                                                                                                                                                                                                                                                                                                                                      |
| `rgbw_color`           | yes      | A list containing four integers between 0 and 255 representing the RGBW color you want the light to be. Four comma-separated integers that represent the color in RGBW (red, green, blue, white), within square brackets. This attribute will be ignored by lights which do not support RGBW colors.                                                                                                                                                                                                                                                 |
| `rgbww_color`          | yes      | A list containing five integers between 0 and 255 representing the RGBWW color you want the light to be. Five comma-separated integers that represent the color in RGBWW (red, green, blue, cold white, warm white), within square brackets. This attribute will be ignored by lights which do not support RGBWW colors.                                                                                                                                                                                                                             |
| `color_temp_kelvin`    | yes      | An integer in Kelvin representing the color temperature you want the light to be.                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `kelvin`               | yes      | (Deprecated) Use `color_temp_kelvin` instead.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `color_temp`           | yes      | (Deprecated) Alternatively, you can specify the color temperature in Mireds.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `color_name`           | yes      | A human-readable string of a color name, such as `blue` or `goldenrod`. All [CSS3 color names](https://www.w3.org/TR/css-color-3/#svg-color) are supported.                                                                                                                                                                                                                                                                                                                                                                                          |
| `brightness`           | yes      | Integer between 0 and 255 for how bright the light should be, where 0 means the light is off, 1 is the minimum brightness and 255 is the maximum brightness supported by the light.                                                                                                                                                                                                                                                                                                                                                                  |
| `brightness_pct`       | yes      | Alternatively, you can specify brightness in percent (a number between 0 and 100), where 0 means the light is off, 1 is the minimum brightness and 100 is the maximum brightness supported by the light.                                                                                                                                                                                                                                                                                                                                             |
| `brightness_step`      | yes      | Change brightness by an amount. Should be between -255..255.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `brightness_step_pct`  | yes      | Change brightness by a percentage. Should be between -100..100.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `white`                | yes      | Set the light to white mode by setting this to `True`. Note that `white` does not have a corresponding state attribute, so the `color_mode` state attribute will be set to `white`.                                                                                                                                                                                                                                                                                                                                                                  |
| `flash`                | yes      | Tell light to flash, can be either value `short` or `long`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `effect`               | yes      | Applies an effect such as `colorloop` or `random`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

{% note %}
In order to apply attributes to an entity, you will need to add `data:` to the configuration. See example below
{% endnote %}

```yaml
# Example configuration.yaml entry
automation:
- alias: "Turn on light when motion is detected"
  triggers:
    - trigger: state
      entity_id: binary_sensor.motion_1
      to: "on"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.living_room
      data:
        brightness: 255
        kelvin: 2700
```
```yaml
# Ledlist morning on, red
- alias: "Stair morning on"
  triggers:
    - trigger: time
      at: '05:00'
  actions:
    - action: light.turn_on
      target:
        entity_id: light.ledliststair
      data:
        brightness: 130
        rgb_color: [255,0,0]
```
{% note %}
If no data is sent, and a default profile exists, the default profile will be applied.
{% endnote %}

## Action `light.turn_off`

Turns one or multiple lights off.

| Data attribute | Optional | Description                                                                                                     |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | no       | String or list of strings that point at `entity_id`s of lights. To target all lights, set `entity_id` to `all`. |
| `transition`           | yes      | Integer that represents the time the light should take to transition to the new state in seconds.               |
| `flash`                | yes      | Tell light to flash, can be either value `short` or `long`.                                                     |

## Action `light.toggle`

Toggles the state of one or multiple lights. Takes the same arguments as the [`light.turn_on`](#action-lightturn_on) action.

*Note*: If `light.toggle` is used for a group of lights, it will toggle the individual state of each light. If you want the lights to be treated as a single light, use [Light Groups](/integrations/group#binary-sensor-light-and-switch-groups) instead.
