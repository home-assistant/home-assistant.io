---
layout: page
title: "EnOcean"
description: "Connect EnOcean devices to home-assistant"
date: 2016-05-25 23:39
sidebar: true
comments: false
sharing: true
footer: true
logo: enocean.png
ha_category: Hub
---

The [EnOcean](https://en.wikipedia.org/wiki/EnOcean) standard is supported by many different vendors. There are switches and sensors of many different kinds, and typically they employ energy harvesting to get power such that no batteries are unnecessary.

The `enocean` component adds support for these devices. You will need a controller like the [USB300](https://www.enocean.com/en/enocean_modules/usb-300-oem/) in order for it to work.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](../binary_sensor.enocean) (wall switches)
- [Sensor](../sensor.enocean) (power meters)
- [Light](../light.enocean) (dimmers)
- [Switch](../switch.enocean)

# Configuration

```yaml
# Example configuration.yaml entry
enocean:
  device: /dev/ttyUSB0
```

If no device is specified, the default will be **/dev/ttyUSB0**

