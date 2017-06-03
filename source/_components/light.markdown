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
| `transition` | yes | Integer that represents the time the light should take to transition to the new state in seconds.
| `profile` | yes | String with the name of one of the [built-in profiles](https://github.com/home-assistant/home-assistant/blob/master/homeassistant/components/light/light_profiles.csv) (relax, energize, concentrate, reading) or one of the custom profiles defined in `light_profiles.csv` in the current working directory.  Light profiles define a xy color and a brightness. If a profile is given and a brightness or xy color then the profile values will be overwritten.
| `xy_color` | yes | A list containing two floats representing the xy color you want the light to be. Two comma separated floats that represent the color in XY.
| `rgb_color` | yes | A list containing three integers representing the rgb color you want the light to be. Three comma separated integers that represent the color in RGB.  You can find a great chart here: [Hue Color Chart](http://www.developers.meethue.com/documentation/hue-xy-values)
| `color_temp` | yes | An INT in mireds representing the color temperature you want the light to be.
| `kelvin` | yes | Alternatively, you can specify the color temperature in Kelvin.
| `color_name` | yes | A human readable string of a color name, such as `blue` or `goldenrod`. All [CSS3 color names](https://www.w3.org/TR/2010/PR-css3-color-20101028/#svg-color) are supported.
| `brightness` | yes | Integer between 0 and 255 for how bright the color should be.
| `brightness_pct`| yes | Alternatively, you can specify brightness in percent (a number between 0 and 100).
| `flash` | yes | Tell light to flash, can be either value `short` or `long`.
| `effect`| yes | Applies an effect such as `colorloop` or `random`.

### {% linkable_title Service `light.turn_off` %}

Turns one or multiple lights off.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`s of lights. Else targets all.
| `transition` | yes | Integer that represents the time the light should take to transition to the new state in seconds.

### {% linkable_title Service `light.toggle` %}

Toggles the state of one or multiple lights using [groups]({{site_root}}/components/group/).

*Note*: If `light.toggle` is used for a group of lights, it will toggle the individual state of each light.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`s of lights. Else targets all.
| `transition` | yes | Integer that represents the time the light should take to transition to the new state in seconds.
