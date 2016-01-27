---
layout: component
title: "One wire sensor"
description: "Instructions how to integrate One wire (1-wire) sensors into Home Assistant."
date: 2016-01-17 07:15
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Sensor
---

The `onewire` platform supports sensors which are using the One wire (1-wire) bus for communication.

Supported devices:

- [DS18B20}(https://datasheets.maximintegrated.com/en/ds/DS18B20.pdf)

To enable One wire sensors in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: onewire
```
