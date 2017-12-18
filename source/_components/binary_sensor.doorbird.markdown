---
layout: page
title: "DoorBird Binary Sensor"
description: "Instructions how to integrate DoorBird video doorbell state into Home Assistant."
date: 2017-08-06 11:30
sidebar: true
comments: false
sharing: true
footer: true
logo: doorbird.png
ha_category: Binary Sensor
ha_release: "0.54"
ha_iot_class: "Local Push"
---

The `doorbird` binary sensor platform allows Home Assistant to monitor when your [DoorBird](http://www.doorbird.com/) doorbell rings.

<p class='note'>
  You must have the [DoorBird component](/components/doorbird/) configured to use this binary sensor.
</p>

To enable the binary sensor, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: doorbird
```
