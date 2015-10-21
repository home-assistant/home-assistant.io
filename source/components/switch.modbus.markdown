---
layout: page
title: "Modbus switch support"
description: "Instructions how to integrate Modbus switches into Home Assistant."
date: 2015-08-30 23:38
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/modbus.png' class='brand pull-right' />
The modbus switch platform allows you to control [Modbus](http://www.modbus.org/) switches.

To use your Modbus switches in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yml entry
switch:
  platform: modbus
  slave: 1
  registers:
    24:
      bits:
        0:
          name: My switch
        2:
          name: My other switch
  coils:
    0:
      name: My coil switch
```

Configuration variables:

- **slave** (*Required*): The number of the slave (ignored and can be omitted if not serial Modbus).
- **registers** array (*Required*): The array contains a list of relevant registers to read from.
  - **number of register** (*Required*): Listing relevant bits. It must contain a `bits` section.
    - **bits** array (*Required*): Listing relevant bits. It must contain a `bits` section.
      - **name** (*Required*): Name of the switch.
- **coils** (*Optional*): A list of relevant coils to read from/write to
  - **number of coil** array (*Required*): 
    - **name** (*Required*): Name of the coil.

<p class='note warning'>
Each named bit will create a switch.
</p>

