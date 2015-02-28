---
layout: page
title: "Lights"
description: "Instructions how to setup your lights with Home Assistant."
date: 2015-01-24 14:39
sidebar: false
comments: false
sharing: true
footer: true
---

This component allows you to track and control various light bulbs.

It has [4 built-in light profiles](https://github.com/balloob/home-assistant/blob/master/homeassistant/components/light/light_profiles.csv) which you're able to extend by putting a `light_profiles.csv` file in your config dir.

It supports the following platforms:

 * `hue` for Philips Hue
 * `wink` for Wink

Preferred way to setup the Philips Hue platform is through the [the discovery component]({{site_root}}/components/discovery.html). For the Wink light platform enable [the wink component]({{site_root}}/components/wink.html).

If you want to enable the light component directly, add the following lines to your `configuration.yaml`:

```
light:
  platform: hue
```

<p class='note'>
The light component supports multiple entries in <code>configuration.yaml</code> by appending a sequential number to the section: <code>light 2:</code>, <code>light 3:</code> etc.
</p>

### Service `light.turn_on`

Turns one or multiple lights on.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Only act on specified lights. Else targets all.
| `transition_seconds` | no | Seconds to take to switch to new state.
| `profile` | no | Which light profile to use.
| `xy_color` | no | Two comma seperated floats that represent the color in XY
| `rgb_color` | no | Three comma seperated integers that represent the color in RGB
| `brightness` | no | Integer between 0 and 255 for how bright the color should be
| `flash` | no | Tell light to flash, can be either value `short` or `long`

### Service `light.turn_off`

Turns one or multiple lights off.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Only act on specified lights. Else targets all.
