---
layout: component
title: "Modbus Sensor"
description: "Instructions how to integrate Modbus sensors into Home Assistant."
date: 2015-08-30 23:38
sidebar: true
comments: false
sharing: true
footer: true
logo: modbus.png
ha_category: Sensor
---


The `modbus` sensor platform allows you to gather data from your [Modbus](http://www.modbus.org/) sensors.

To use your Modbus sensors in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yml entry
sensor:
  platform: modbus
  slave: 1
  registers:
    16:
      name: My integer sensor
      unit: C
    24:
      bits:
        0:
          name: My boolean sensor
        2:
          name: My other boolean sensor
  coils:
    0:
      name: My coil switch
```

Configuration variables:

- **slave** (*Required*): The number of the slave (ignored and can be omitted if not serial Modbus).
- **registers** array (*Required*): The array contains a list of relevant registers to read from.
  - **number of register** (*Required*): Listing relevant bits. It must contain a `bits` section.
    - **bits** array (*Required*): Listing relevant bits. It must contain a `bits` section.
      - **name** (*Required*): Name of the sensor.
      - **unit** (*Required*): Unit to attach to value (optional, ignored for boolean sensors).
- **coils** (*Optional*): A list of relevant coils to read from/write to
  - **number of coil** array (*Required*): 
    - **name** (*Required*): Name of the coil.

<p class='note warning'>
Each named register will create an integer sensor and each named bit will create a boolean sensor.
</p>

