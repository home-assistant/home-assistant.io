---
layout: page
title: "Acer Projector Switch"
description: "Instructions on how to integrate Acer Projector switches into Home Assistant."
date: 2016-05-07 07:00
sidebar: true
comments: false
sharing: true
footer: true
logo: acer.png
ha_category: Switch
ha_iot_class: "Local Polling"
ha_release: 0.19
---


The `acer_projector` switch platform allows you to control the state of RS232 connected projectors from [Acer](http://www.acer.com).

To use your Acer Projector in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: acer_projector
    filename: /dev/ttyUSB0
```

Configuration variables:

- **filename** (*Required*): The pipe where the projector is connected to.
- **name** (*Optional*): The name to use when displaying this switch.
- **timeout** (*Optional*): Timeout for the connection in seconds.
- **write_timeout** (*Optional*): Write timeout in seconds.

