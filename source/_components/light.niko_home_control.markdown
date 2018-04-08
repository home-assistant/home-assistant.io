---
layout: page
title: "Niko Home Control"
description: "Instructions on how to integrate Niko Home Control into Home Assistant."
date: 2018-04-08 08:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Light
ha_iot_class: "Local Polling"
ha_release: 0.36
---

The `niko_home_control` platform allows you to integrate your [Niko Home Control](https://www.niko.eu/enus/products/niko-home-control) into Home Assistant.

```yaml
# Example configuration.yaml entry
light:
  - platform: niko_home_control
    host: 192.168.1.123
```

Configuration variables:

 - **host** (*Required*): The ip address your Niko Home is on,
