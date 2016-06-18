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
ha_release: 0.21
---

The [EnOcean](https://en.wikipedia.org/wiki/EnOcean) standard is supported by many different vendors. There are switches and sensors of many different kinds, and typically they employ energy harvesting to get power such that no batteries are unnecessary.

The `enocean` component adds support for some of these devices. You will need a controller like the [USB300](https://www.enocean.com/en/enocean_modules/usb-300-oem/) in order for it to work.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](../binary_sensor.enocean) (wall switches)
- [Sensor](../sensor.enocean) (power meters)
- [Light](../light.enocean) (dimmers)
- [Switch](../switch.enocean)

However, only a few devices have been confirmed to work. These are:

- Eltako FUD61 dimmer
- Eltako FT55 battery-less wall switch
- Permundo PSC234 (switch and power monitor)

Other devices will most likely need some changes in the Home-Assistant code in order to work. Support for teaching of devices is also missing at this time.

# Configuration

```yaml
# Example configuration.yaml entry
enocean:
  device: /dev/ttyUSB0
```

If no device is specified, the default will be **/dev/ttyUSB0**

