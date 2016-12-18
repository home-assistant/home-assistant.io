---
layout: page
title: "Raspberry Pi Cover"
description: "Instructions how to setup the Raspberry Pi covers within Home Assistant."
date: 2016-08-24 14:28
sidebar: true
comments: false
sharing: true
footer: true
logo: raspberry-pi.png
ha_category: Cover
ha_release: 0.23
---

The `rpi_gpio` cover platform allows you to use a Raspberry Pi to control your cover such as Garage doors.

It uses two pins on the Raspberry Pi.

- The `state_pin` will detect if the cover is closed, and
- the `relay_pin` will trigger the cover to open or close.

Although you do not need Andrews Hilliday's software controller when you run Home Assistant, he has written clear instructions on how to hook your garage door and sensors up to your Raspberry Pi, which can be found [here](https://github.com/andrewshilliday/garage-door-controller#hardware-setup).

To enable Raspberry Pi Covers in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
cover:
  - platform: rpi_gpio
    covers:
      - relay_pin: 10
        state_pin: 11
```

Configuration variables:

- **relay_time** (*Optional*): The time that the relay will be on for in seconds. Default is .2 seconds.
- **state_pull_mode** (*Optional*): The direction the State pin is pulling. It can be UP or DOWN. Default is UP.
- **covers** array (*Required*): List of your doors.
  - **relay_pin** (*Required*): The pin of your Raspberry Pi where the relay is connected.
  - **state_pin** (*Required*): The pin of your Raspberry Pi to retrieve the state.
  - **name** (*Optional*): Name to use in the frontend.

Full example:

```yaml
# Example configuration.yaml entry
cover:
  - platform: rpi_gpio
    relay_time: 0.2
    state_pull_mode: 'UP'
    covers:
      - relay_pin: 10
        state_pin: 11
      - relay_pin: 12
        state_pin: 13
        name: 'Right door'
```

