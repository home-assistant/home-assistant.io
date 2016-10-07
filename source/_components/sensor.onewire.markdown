---
layout: page
title: "One wire Sensor"
description: "Instructions how to integrate One wire (1-wire) sensors into Home Assistant."
date: 2016-01-17 07:15
sidebar: true
comments: false
sharing: true
footer: true
logo: onewire.png
ha_category: Sensor
ha_release: 0.12
---

The `onewire` platform supports sensors which are using the One wire (1-wire) bus for communication.

Supported devices:

- [DS18B20](https://datasheets.maximintegrated.com/en/ds/DS18B20.pdf)
- DS18S20
- DS1822
- DS1825
- DS28EA00 temperature sensors

There is also support for bus masters which use fuse to mount device tree.

To enable One wire sensors in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: onewire
    names:
      some_id: your name
```

Configuration variables:

- **names** array (*Optional*): ID and friendly name of your sensors.
- **mount_dir** (*Optional*): Location of device tree if owfs driver used.

