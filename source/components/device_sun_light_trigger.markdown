---
layout: page
title: "Automating your lights"
description: "Instructions how to automate your lights with Home Assistant."
date: 2015-01-20 22:36
sidebar: false
comments: false
sharing: true
footer: true
---

Home Assistant has a built-in component called `device_sun_light_trigger` to help you automate your lights. The component will:

 * Fade in the lights when the sun is setting and there are people home
 * Turn on the lights when people get home after the sun has set
 * Turn off the lights when all people leave the house

This component requires the components [sun]({{site_root/components/sun.html}}), [device_tracker]({{site_root}}/components/device_tracker.html) and [light]({{site_root}}/components/light.html) to be enabled.

To enable this component, add the following lines to your `home-assistant.conf`:

```
[device_sun_light_trigger]
# Specify a specific light/group of lights that has to be turned on
light_group=group.living_room
# Specify which light profile to use when turning lights on
light_profile=relax
# Disable lights being turned off when everybody leaves the house
disable_turn_off=1
```

The options `light_group`, `light_profile` and `disable_turn_off` are optional.
