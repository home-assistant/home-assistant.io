---
layout: page
title: "X10"
description: "Instructions how to setup X10 devices within Home Assistant."
date: 2016-07-27
sidebar: true
comments: false
sharing: true
footer: true
logo: x10.gif
ha_category: Light
ha_iot_class: "Local Polling"
featured: true
---

X10 support is integrated into Home Assistant as a light platform.

Requires heyu x10 interface
http://www.heyu.org

To enable x10 lights, add something like this to your `configuration.yaml` file:

```yaml
    # Example configuration.yaml entry
    light:
    - platform: x10
        lights:
        - name: Living Room Lamp
            id: a2
        - name: Bedroom Lamp
            id: a3
```

Configuration variables:

- **id** (*Required*): Device identifier. Composed of house code + unit id.
- **name** (*Optional*): A friendly name for the device. By default *id* from the device is used.
