---
layout: page
title: "Raspihats Switch"
description: "Instructions how to integrate Raspihats add-on boards for Raspberry PI into Home Assistant as a switch."
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

For more details about the Raspihats add-on boards for Raspberry PI, visit [raspihats.com](http://www.raspihats.com/).
