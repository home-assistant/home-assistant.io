---
layout: page
title: "LIFX"
description: "Instructions how to integrate LIFX into Home Assistant."
date: 2016-01-27 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lifx.png
ha_category: Light
ha_iot_class: "Local Polling"
ha_release: 0.12
---

The `lifx` platform allows you to integrate your [LIFX](http://www.lifx.com) into Home Assistant.

_Please note, the `lifx` platform does not support Windows. The `lifx_legacy` platform (supporting basic functionality) can be used instead._

```yaml
# Example configuration.yaml entry
light:
  - platform: lifx
    server: 192.168.1.10
```
Configuration variables:

- **server** (*Optional*): Your server address. Only needed if using more than one network interface. Omit if you are unsure.


## {% linkable_title Light effects %}

The LIFX platform supports several light effects. You can start these effects with default options by using the `effect` attribute of the normal [`light.turn_on`]({{site_root}}/components/light/#service-lightturn_on) service, for example like this:
```yaml
automation:
  - alias: ...
    trigger:
      # ...
    action:
      - service: light.turn_on
        data:
          entity_id: light.office, light.kitchen
          effect: lifx_effect_breathe
```

However, if you want to fully control a light effect, you have to use its dedicated service call, like this:
```yaml
script:
  colorloop_start:
    alias: 'Start colorloop'
    sequence:
      - service: light.lifx_effect_colorloop
        data:
          entity_id: group.livingroom
          brightness: 255
          period: 10
          spread: 30
          change: 35
```

The available light effects and their options are listed below.

### {% linkable_title Service `light.lifx_effect_breathe` %}

Run a breathe effect by fading to a color and back.

| Service data attribute | Description |
| ---------------------- | ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of lights. Else targets all.
| `color_name` | A color name such as `red` or `green`.
| `rgb_color` | A list containing three integers representing the RGB color you want the light to be.
| `brightness` | Integer between 0 and 255 for how bright the color should be.
| `period` | The duration of a single breathe.
| `cycles` | The total number of breathes.
| `power_on` | Set this to False to skip the effect on lights that are turned off (defaults to True).

### {% linkable_title Service `light.lifx_effect_pulse` %}

Run a flash effect by quickly changing to a color and then back.

| Service data attribute | Description |
| ---------------------- | ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of lights. Else targets all.
| `color_name` | A color name such as `red` or `green`.
| `rgb_color` | A list containing three integers representing the RGB color you want the light to be.
| `brightness` | Integer between 0 and 255 for how bright the color should be.
| `period` | The duration of a single pulse.
| `cycles` | The total number of pulses.
| `power_on` | Set this to False to skip the effect on lights that are turned off (defaults to True).

### {% linkable_title Service `light.lifx_effect_colorloop` %}

Run an effect with colors looping around the color wheel. All participating lights will coordinate to keep similar (but not identical) colors.

| Service data attribute | Description |
| ---------------------- | ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of lights. Else targets all.
| `brightness` | Number between 0 and 255 indicating brightness of the effect. Leave this out to maintain the current brightness of each participating light.
| `period` | Duration (in seconds) between starting a new color change.
| `transition` | Duration (in seconds) where lights are actively changing color.
| `change` | Hue movement per period, in degrees on a color wheel (ranges from 0 to 359).
| `spread` | Maximum color difference between participating lights, in degrees on a color wheel (ranges from 0 to 359).
| `power_on` | Set this to False to skip the effect on lights that are turned off (defaults to True).

### {% linkable_title Service `light.lifx_effect_stop` %}

Run an effect that does nothing, thereby stopping any other effect that might be running.

| Service data attribute | Description |
| ---------------------- | ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of lights. Else targets all.
