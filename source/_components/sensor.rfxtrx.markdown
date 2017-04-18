---
layout: component
title: "RFXtrx sensor"
description: "Instructions how to integrate RFXtrx sensors into Home Assistant."
date: 2015-08-06 17:15
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Sensor
---

The rfxtrx platform support sensors that communicate in the frequency range of 433.92 MHz.

To enable RFXtrx sensors in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: rfxtrx
```
