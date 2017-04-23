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
- [DS18S20](https://www.maximintegrated.com/en/products/analog/sensors-and-sensor-interface/DS18S20.html)
- [DS1822](https://datasheets.maximintegrated.com/en/ds/DS1822.pdf)
- [DS1825](https://datasheets.maximintegrated.com/en/ds/DS1825.pdf)
- [DS28EA00](https://datasheets.maximintegrated.com/en/ds/DS28EA00.pdf) temperature sensors

The 1-Wire bus can be connected directly to the IO pins of Raspberry Pi or using dedicated interface adapter (e.g [DS9490R](https://datasheets.maximintegrated.com/en/ds/DS9490-DS9490R.pdf)). When an interface adapter is used, sensors can be accessed on Linux hosts via [owfs 1-Wire file system](http://owfs.org/). When using an interface adapter and the owfs, the 'mount_dir' option must be configured to correspond a directory, where owfs device tree has been mounted. If you are using Raspberry Pi and IO pin connected bus setup, don't use the 'mount_dir' option.

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

