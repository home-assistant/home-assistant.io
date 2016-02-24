---
layout: page
title: "Demo platforms"
description: "Instructions how to use the Platform demos with Home Assistant."
date: 2016-02-24 07:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Other
---


The `demo` platform allows you use component which are providing a demo of their implementation. The demo entities are dummies but show you how the acutal platform looks like. This way you can run own demonstration instance like the online [Home Assistant demo](https://home-assistant.io/demo/).

Available demo platforms:

- Alarm control panel (`alarm_control_panel`)
- Binary sensor (`binary_sensor`)
- Camera (`camera`)
- Garage door (`garage_door`)
- Light (`light`)
- Lock (`lock`)
- Notification (`notify`)
- Roller shutter (`rollershutter`)
- Sensor (`sensor`)
- Switch (`switch`)
- Thermostat (`thermostat`)

To integrate a demo platform in Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
[component]:
  - platform: demo
```

Configuration variables:

- **[component]** (*Required*): The name of the component as stated in the listing above the configuration example.
