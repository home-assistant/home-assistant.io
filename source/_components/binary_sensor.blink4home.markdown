---
layout: page
title: "Blink4Home Sensor"
description: "Instructions on how configure the Blink4Home camera binary sensor within Home Assistant."
date: 2016-12-20 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: blink4home.png
ha_category: Binary Sensor
ha_release: 0.36
---


The [Blink4Home](https://blinkforhome.com/) indicates if the blink camera network (configured with the [Blink4Home camera platform](/components/camera.blink4home/) is armed or not.

To enable the Blink4Home sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
   - platform: blink4home
```

**Note:** *The binary sensor depends on the configuration of the Blink4Home camera platform, so you also need to add the camera plaform to your installation.*
