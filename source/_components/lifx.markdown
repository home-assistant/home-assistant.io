---
layout: page
title: "LIFX"
description: "Instructions on how to integrate LIFX into Home Assistant."
date: 2018-10-08 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lifx.png
ha_category: Light
ha_iot_class: "Local Polling"
ha_release: 0.81
redirect_from: /components/light.lifx/
---

The `lifx` component allows you to integrate your [LIFX](https://www.lifx.com) into Home Assistant.

_Please note, the `lifx` component does not support Windows. The `lifx_legacy` light platform (supporting basic functionality) can be used instead._

You can configure the LIFX component by going to the integrations page inside the config panel.

## {% linkable_title Set state %}

The LIFX bulbs allow a change of color and brightness even when they are turned off. This way you can control the light during the day so its settings are correct when events for turning on are received, for example from motion detectors or external buttons.

The normal `light.turn_on` call cannot be used for this because it always turns the power on. Thus, LIFX has its own service call that allows color changes without affecting the current power state.

### {% linkable_title Service `light.lifx_set_state` %}

Change the light to a new state.

| Service data attribute | Description |
| ---------------------- | ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of lights. Else targets all.
| `transition` | Duration (in seconds) for the light to fade to the new state.
| `zones` | List of integers for the zone numbers to affect (each LIFX Z strip has 8 zones, starting at 0).
| `infrared` | Automatic infrared level (0..255) when light brightness is low (for compatible bulbs).
| `power` | Turn the light on (`True`) or off (`False`). Leave out to keep the power as it is.
| `...` | Use `color_name`, `brightness` etc. from [`light.turn_on`]({{site_root}}/components/light/#service-lightturn_on) to specify the new state.

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
          effect: lifx_effect_pulse
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

### {% linkable_title Service `light.lifx_effect_pulse` %}

Run a flash effect by changing to a color and then back.

| Service data attribute | Description |
| ---------------------- | ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of lights. Else targets all.
| `color_name` | A color name such as `red` or `green`.
| `rgb_color` | A list containing three integers representing the RGB color you want the light to be.
| `brightness` | Integer between 0 and 255 for how bright the color should be.
| `period` | The duration of a single pulse (in seconds).
| `cycles` | The total number of pulses.
| `mode` | The way to change between colors. Valid modes: `blink` (default - direct transition to new color for 'period' time with original color between cycles), `breathe` (color fade transition to new color and back to original), `ping` (short pulse of new color), `strobe` (light turns off between color changes), `solid`(light does not return to original color between cycles).
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


## {% linkable_title Advanced configuration %}

There are some manual configuration options available. These should only be needed if you have more than one network interface and automatic configuration does not find your LIFX devices.

```yaml
# Example configuration.yaml entry
lifx:
  light:
    server: IP_ADDRESS
    broadcast: IP_ADDRESS
```

{% configuration %}
server:
  description: Your server address. Will listen on all interfaces if omitted.
  required: false
  type: string
broadcast:
  description: The broadcast address for discovering lights.
  required: false
  type: string
{% endconfiguration %}
