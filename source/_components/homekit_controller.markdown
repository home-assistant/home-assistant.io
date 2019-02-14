---
layout: page
title: "HomeKit controller support"
description: "Instructions how to integrate your HomeKit devices within Home Assistant."
date: 2018-03-19 21:04
sidebar: true
comments: false
sharing: true
footer: true
logo: apple-homekit.png
ha_category:
  - Hub
  - Alarm
  - Climate
  - Cover
  - Light
  - Lock
  - Switch
  - Binary Sensor
ha_release: 0.68
ha_iot_class: "Local Polling"
redirect_from:
  - /components/alarm_control_panel.homekit_controller/
  - /components/climate.homekit_controller/
  - /components/cover.homekit_controller/
  - /components/light.homekit_controller/
  - /components/lock.homekit_controller/
  - /components/switch.homekit_controller/
---

[HomeKit](https://developer.apple.com/homekit/) controller integration for Home Assistant allows you to connect HomeKit accessories to Home Assistant. This component should not be confused with the [HomeKit](/components/homekit/) component, which allows you to control Home Assistant devices via HomeKit.

There is currently support for the following device types within Home Assistant:

- Alarm Control Panel (HomeKit security system)
- Climate (HomeKit thermostats and air conditioners)
- Cover (HomeKit garage door openers, windows, or window coverings)
- Light (HomeKit lights)
- Lock (HomeKit lock)
- Switch (HomeKit switches)
- Binary Sensor (HomeKit motion sensors)

The component will be automatically configured if the [`discovery:`](/components/discovery/) component is enabled and an enable entry added for HomeKit:

```yaml
discovery:
  enable:
    - homekit
```

For each detected HomeKit accessory, a configuration prompt will appear in the web front end. Use this to provide the HomeKit PIN. Note that HomeKit accessories can only be paired to one device at once. If your device is currently paired with Siri, you will need to reset it in order to pair it with Home Assistant. Once Home Assistant is configured to work with the device, you can export it back to Siri with the [`HomeKit`](/components/homekit/) component.
