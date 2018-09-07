---
layout: page
title: "Presence based lights"
description: "Instructions on how to automate your lights with Home Assistant."
date: 2015-01-20 22:36
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Automation
---

Home Assistant has a built-in component called `device_sun_light_trigger` to help you automate your lights. The component will:

 * Fade in the lights when the sun is setting and there are people home
 * Turn on the lights when people get home after the sun has set
 * Turn off the lights when all people leave the house

This component requires the components [sun](/components/sun/), [device_tracker](/components/device_tracker/) and [light](/components/light/) to be enabled.

To enable this component, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_sun_light_trigger:
```

Configuration variables:

- **light_group** (*Optional*): Specify a specific light/group of lights that has to be turned on.
- **light_profile** (*Optional*): Specify which light profile to use when turning lights on.
- **device_group** (*Optional*): Specify which group of devices to track.
- **disable_turn_off** (*Optional*): Disable lights being turned off when everybody leaves the house.

A full configuration example could look like this:

```yaml
# Example configuration.yaml entry
device_sun_light_trigger:
  light_group: group.living_room
  light_profile: relax
  device_group: group.my_devices
  disable_turn_off: 1
``` 
