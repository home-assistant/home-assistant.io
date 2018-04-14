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
ha_category: Hub
ha_release: 0.68
ha_iot_class: "Local Polling"
---

[HomeKit](https://developer.apple.com/homekit/) controller integration for Home Assistant allows you to connect HomeKit accessories to Home Assistant. This component should not be confused with the [HomeKit](homekit) component, which allows you to control Home Assistant devices via HomeKit.

There is currently support for the following device types within Home Assistant:

- [Light](../light.homekit_controller)
- [Switch](../switch.homekit_controller)

The component will be automatically configured if the [`discovery:`](components/discovery/) component is enabled and an enable entry added for homekit:

```yaml
discovery:
  enable:
    - homekit
```

For each detected HomeKit accessory, a configuration prompt will appear in the web front end. Use this to provide the HomeKit PIN.
