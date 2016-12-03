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

This component allows you to track and control various light bulbs.

It has [4 built-in light profiles](https://github.com/home-assistant/home-assistant/blob/master/homeassistant/components/light/light_profiles.csv) which you're able to extend by putting a `light_profiles.csv` file in your config dir.

Preferred way to setup the Philips Hue platform is through the [the discovery component]({{site_root}}/components/discovery/). For the Wink light platform enable [the wink component]({{site_root}}/components/wink/).

If you want to enable the light component directly, add the following lines to your `configuration.yaml`:

```yaml
light:
  platform: hue
```

<p class='note'>
The light component supports multiple entries in <code>configuration.yaml</code> by appending a sequential number to the section: <code>light 2:</code>, <code>light 3:</code> etc.
</p>

### {% linkable_title Service `light.turn_on` %}

Turns one light on or multiple lights on using [groups]({{site_root}}/components/group/).

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`s of lights. Else targets all.
| `transition` | yes | Integer that represents the time the light should take to transition to the new state in seconds. *not supported by Wink
| `profile` | yes | String with the name of one of the built-in profiles (relax, energize, concentrate, reading) or one of the custom profiles defined in `light_profiles.csv` in the current working directory.  Light profiles define a xy color and a brightness. If a profile is given and a brightness or xy color then the profile values will be overwritten.
| `xy_color` | yes | A list containing two floats representing the xy color you want the light to be. Two comma separated floats that represent the color in XY.
| `rgb_color` | yes | A list containing three integers representing the rgb color you want the light to be. Three comma separated integers that represent the color in RGB.  You can find a great chart here: [Hue Color Chart](http://www.developers.meethue.com/documentation/hue-xy-values)
| `color_temp` | yes | An INT in mireds representing the color temperature you want the light to be.
| `color_name` | yes | A human readable string of a color name, such as `blue` or `goldenrod` or [`chucknorris`](http://stackoverflow.com/questions/8318911/why-does-html-think-chucknorris-is-a-color). If your browser can display it, so can Home Assistant.
| `brightness` | yes | Integer between 0 and 255 for how bright the color should be.
| `flash` | yes | Tell light to flash, can be either value `short` or `long`. *not supported by Wink
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

### {% linkable_title Service `light.hue_activate_scene` %}

If you have hue lights, there is a service call to directly activate
scenes that are stored in your hue hub. This will have all the bulbs
transitioned at once, instead of one at a time using standard scenes
in Home Assistant.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `group_name` | no | The group/room name of the lights. Find this in the Hue official app.
| `scene_name` | no | The name of the Scene. Find this in the Hue official app.

*Note*: `group_name` is not linked to Home Assistant group name.
