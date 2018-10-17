---
layout: page
title: "Raspihats Binary Sensor"
description: "Instructions on how to integrate Raspihats add-on boards for Raspberry Pi into Home Assistant as a binary_sensor."
date: 2017-05-01 04:09
sidebar: true
comments: false
sharing: true
footer: true
logo: raspihats.png
ha_category: DIY
ha_release: 0.44
ha_iot_class: "Local Push"
---

The `raspihats` binary sensor platform allows you to read sensor values ​​using the digital inputs of the [raspihats](http://www.raspihats.com/) boards.

## {% linkable_title Configuration %}

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

{% configuration %}
i2c_hats:
  description: An array of used I2C-HATs.
  required: false
  type: list
  keys:
    board:
      description: The board name either Di16, Di6Rly6, DI16ac or DI6acDQ6rly.
      required: true
      type: string
    address:
      description: The board I2C address as HEX value.
      required: true
      type: string
    channels:
      description: Array of used digital input channels.
      required: true
      type: list
      keys:
        index:
          description: Digital input channel index.
          required: true
          type: integer
        name:
          description: Friendly name to use for the frontend.
          required: true
          type: string
        invert_logic:
          description: Inverts the input logic.
          required: false
          default: false
          type: boolean
        device_class:
          description: See device classes in [binary_sensor component](/components/binary_sensor/).
          required: false
          default: "None"
          type: string
{% endconfiguration %}

## {% linkable_title Directions for installing smbus support on Raspberry Pi %}

Enable I2c interface with the Raspberry Pi configuration utility:

```bash
# pi user environment: Enable i2c interface
$ sudo raspi-config
```

Select `Interfacing options->I2C` choose `<Yes>` and hit `Enter`, then go to `Finish`.

Install dependencies for use the `smbus-cffi` module and enable your _homeassistant_ user to join the _i2c_ group:

```bash
# pi user environment: Install i2c dependencies and utilities
$ sudo apt-get install build-essential libi2c-dev i2c-tools python-dev libffi-dev

# pi user environment: Add homeassistant user to the i2c group
$ sudo usermod -a -G i2c homeassistant
```

### {% linkable_title Check the i2c address of the sensor %}

After installing `i2c-tools`, a new utility is available to scan the addresses of the connected sensors, so you can see the sensor address:

```bash
$ /usr/sbin/i2cdetect -y 1
```

It will output a table like this:

```text
     0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f
00:          -- -- -- -- -- -- -- -- -- -- -- -- --
10: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
20: -- -- -- 23 -- -- -- -- -- -- -- -- -- -- -- --
30: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
40: 40 -- -- -- -- -- UU -- -- -- -- -- -- -- -- --
50: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
60: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
70: -- -- -- -- -- -- -- 77
```

For more details about the `raspihats` add-on boards for Raspberry Pi, visit [raspihats.com](http://www.raspihats.com/).
