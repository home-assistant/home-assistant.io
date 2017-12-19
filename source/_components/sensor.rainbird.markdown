---
layout: page
title: "Rain Bird Sensor"
description: "Instructions on how to integrate your Rain Bird LNK WiFi Module rain sensor within Home Assistant."
date: 2017-08-25 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: rainbird.png
ha_category: Hub
ha_release: 0.61
ha_iot_class: "Local Polling"
---

This `rainbird` sensor allows interacting with [LNK WiFi](http://www.rainbird.com/landscape/products/controllers/LNK-WiFi.htm) module of the Rain Bird Irrigation system in Home Assistant.

Once you have enabled the [Rain Bird component](/components/rainburd), add the following to your `configuration.yaml` file to enable the rain sensor:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rainbird
    monitored_conditions:
      - rainsensor
```

Configuration variables:

- **monitored_conditions**: Currently only rainsensor is supported. Returns the sensor level.

Please note that due to the implementation of the API within the LNK Module, there is a concurrency issue. For example, the Rain Bird app will give connection issues (like already a connection active).
