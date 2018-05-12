---
layout: page
title: "EnOcean"
description: "Connect EnOcean devices to Home Assistant"
date: 2016-05-25 23:39
sidebar: true
comments: false
sharing: true
footer: true
logo: enocean.png
ha_category: Hub
ha_release: 0.21
ha_iot_class: "Local Push"
---

The [EnOcean](https://en.wikipedia.org/wiki/EnOcean) standard is supported by many different vendors. There are switches and sensors of many different kinds, and typically they employ energy harvesting to get power such that no batteries are necessary.

The `enocean` component adds support for some of these devices. You will need a controller like the [USB300](https://www.enocean.com/en/enocean_modules/usb-300-oem/) in order for it to work.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](/components/binary_sensor.enocean/) (wall switches)
- [Sensor](/components/sensor.enocean/) (power meters)
- [Light](/components/light.enocean/) (dimmers)
- [Switch](/components/switch.enocean/)

However, only a few devices have been confirmed to work. These are:

- Eltako FUD61 dimmer
- Eltako FSR61 switch
- Eltako FT55 battery-less wall switch
- Jung ENOA590WW battery-less wall switch
- Permundo PSC234 (switch and power monitor)

Other devices will most likely need some changes in the Home Assistant code in order to work. Support for teaching of devices is also missing at this time.

To integrate an EnOcean controller with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
enocean:
  device: /dev/ttyUSB0
```

Configuration variables:

- **device** (*Required*): The port where your device is connected to your Home Assistant host.
