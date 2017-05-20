---
layout: page
title: "Raspihats Binary Sensor"
description: "Instructions how to integrate Raspihats add-on boards for Raspberry PI into Home Assistant as a binary_sensor."
date: 2017-05-01 04:09
sidebar: true
comments: false
sharing: true
footer: true
logo: raspihats.png
ha_category: Binary Sensor
ha_release: 0.44
ha_iot_class: "Local Push"
---

The `raspihats` binary sensor platform allows you to read sensor values ​​using the digital inputs of the [raspihats](http://www.raspihats.com/) boards.

To use your `raspihats` boards in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: raspihats
    i2c_hats:
      - board: DI6acDQ6rly
        address: 0x60
        channels:
          - index: 0
            name: PIR Office
            invert_logic: true
            device_class: motion
          - index: 1
            name: PIR Bedroom
```

Configuration variables:

- **i2c_hats** (*Optional*): Array of used I2C-HATs.
  - **board** (*Required*): The board name [Di16, Di6Rly6, DI16ac, DI6acDQ6rly].
  - **address** (*Required*): The board I2C address, hex value.
    - **channels** (*Required*): Array of used digital input channels.
      - **index** (*Required*): Digital input channel index.
      - **name** (*Required*): Friendly name to use for the frontend.
      - **invert_logic** (*Optional*): Inverts the input logic, default is `false`.
      - **device_class** (*Optional*): See device classes in [binary_sensor component](/components/binary_sensor/), default is `None`

For more details about the `raspihats` add-on boards for Raspberry PI, visit [raspihats.com](http://www.raspihats.com/).
