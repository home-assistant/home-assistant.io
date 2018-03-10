---
layout: page
title: "Lights"
description: "Instructions how to setup your lights with Home Assistant."
date: 2015-01-24 14:39
sidebar: true
comments: false
sharing: true
footer: true
---

This component allows you to track and control various light bulbs. Read the platform documentation for your particular light hardware to learn how to enable it.

<p class='note'>
The light component supports multiple entries in <code>configuration.yaml</code> by appending a sequential number to the section: <code>light 2:</code>, <code>light 3:</code> etc.
</p>

### {% linkable_title Service `light.turn_on` %}

Turns one light on or multiple lights on using [groups]({{site_root}}/components/group/).

Most lights do not support all attributes. You can check the platform documentation of your particular light for hints but in general you will have to try things out and see what works.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`s of lights. Else targets all.
| `transition` | yes | Number that represents the time (in seconds) the light should take to transition to the new state.
| `profile` | yes | String with the name of one of the [built-in profiles](https://github.com/home-assistant/home-assistant/blob/master/homeassistant/components/light/light_profiles.csv) (relax, energize, concentrate, reading) or one of the custom profiles defined in `light_profiles.csv` in the current working directory.  Light profiles define a xy color and a brightness. If a profile is given and a brightness then the profile brightness will be overwritten.
| `hs_color` | yes | A list containing two floats representing the hue and saturation of the color you want the light to be. Hue is scaled 0-360, and saturation is scaled 0-100.
| `xy_color` | yes | A list containing two floats representing the xy color you want the light to be. Two comma separated floats that represent the color in XY. You can find a great chart here: [Hue Color Chart](https://developers.meethue.com/documentation/core-concepts#color_gets_more_complicated).
| `rgb_color` | yes | A list containing three integers bewteen 0 and 255 representing the rgb color you want the light to be. Three comma separated integers that represent the color in RGB. Note that the specified RGB value will not change the light brightness, only the color.
| `white_value` | yes | Integer between 0 and 255 for how bright a dedicated white LED should be.
| `color_temp` | yes | An integer in mireds representing the color temperature you want the light to be.
| `kelvin` | yes | Alternatively, you can specify the color temperature in Kelvin.
| `color_name` | yes | A human readable string of a color name, such as `blue` or `goldenrod`. All [CSS3 color names](https://www.w3.org/TR/2010/PR-css3-color-20101028/#svg-color) are supported.
| `brightness` | yes | Integer between 0 and 255 for how bright the color should be.
| `brightness_pct`| yes | Alternatively, you can specify brightness in percent (a number between 0 and 100).
| `flash` | yes | Tell light to flash, can be either value `short` or `long`.
| `effect`| yes | Applies an effect such as `colorloop` or `random`.

<p class='note'>
In order to apply attributes to an entity you will need to add `data:` to the configuration. See example below
</p>

```yaml
# Example configuration.yaml entry
automation:
- id: one
  alias: Turn on light when motion is detected
  trigger:
    - platform: state
      entity_id: binary_sensor.motion_1
      to: 'on'
  action:
    - service: light.turn_on
      data:
        entity_id: light.living_room
        brightness: 255
        kelvin: 2700
```

### {% linkable_title Service `light.turn_off` %}

Turns one or multiple lights off.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`s of lights. Else targets all.
| `transition` | yes | Integer that represents the time the light should take to transition to the new state in seconds.

### {% linkable_title Service `light.toggle` %}

Toggles the state of one or multiple lights using [groups]({{site_root}}/components/group/).

*Note*: If `light.toggle` is used for a group of lights, it will toggle the individual state of each light.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`s of lights. Else targets all.
| `transition` | yes | Integer that represents the time the light should take to transition to the new state in seconds.
