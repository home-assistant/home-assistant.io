---
layout: page
title: "Raspihats Switch"
description: "Instructions on how to integrate Raspihats add-on boards for Raspberry Pi into Home Assistant as a switch."
date: 2017-05-15 04:20
sidebar: true
comments: false
sharing: true
footer: true
logo: raspihats.png
ha_category: Switch
ha_release: 0.45
ha_iot_class: "Local Push"
---


The `raspihats` switch platform allows you to control the digital outputs of your [raspihats](http://www.raspihats.com/) boards.

To use your raspihats boards in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: raspihats
    i2c_hats:
      - board: DI6acDQ6rly
        address: 0x60
        channels:
          - index: 0
            name: Fan Office
            invert_logic: true
            initial_state: true
          - index: 1
            name: Light Office
```

Configuration variables:

- **i2c_hats** (*Optional*): Array of used I2C-HATs.
  - **board** (*Required*): The board name.
  - **address** (*Required*): The board I2C address, hex value.
    - **channels** (*Required*): Array of used digital output channels.
      - **index** (*Required*): Digital output channel index.
      - **name** (*Required*): Friendly name to use for the frontend.
      - **invert_logic** (*Optional*): Inverts the output logic, default is `False`.
      - **initial_state** (*Optional*): Initial state, default is `None`, can also be `True` or `False`. `None` means no state is forced on the corresponding digital output when this switch is instantiated.


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

For more details about the Raspihats add-on boards for Raspberry Pi, visit [raspihats.com](http://www.raspihats.com/).
