---
layout: page
title: "X10"
description: "Instructions how to setup X10 switch devices within Home Assistant."
date: 2016-10-13
sidebar: true
comments: false
sharing: true
footer: true
logo: x10.gif
ha_category: Switch
ha_iot_class: "Local Polling"
ha_release: 0.31
---

The `x10` switch platform allows you to control your X10 based switches with Home Assistant.

Requires [Heyu x10 interface](http://www.heyu.org).

To enable those switches, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: x10
    devices:
      - id: a2
      - id: a3
        name: Fan Switch
```

Configuration variables:

- **id** (*Required*): Device identifier. Composed of house code und unit id.
- **name** (*Optional*): A friendly name for the device. By default *id* from the device is used.
