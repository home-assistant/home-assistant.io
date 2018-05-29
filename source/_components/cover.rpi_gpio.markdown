---
layout: page
title: "Raspberry Pi GPIO Cover"
description: "Instructions on how to setup the Raspberry Pi GPIO covers within Home Assistant."
date: 2016-08-24 14:28
sidebar: true
comments: false
sharing: true
footer: true
logo: raspberry-pi.png
ha_category: Cover
ha_release: 0.23
ha_iot_class: "Local Push"
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

- **relay_time** (*Optional*): The time that the relay will be on for in seconds. Default is 0.2 seconds.
- **invert_relay** (*Optional*): Invert the relay pin output so that it is active-high.  Default is False (active-low).
- **state_pull_mode** (*Optional*): The direction the State pin is pulling. It can be UP or DOWN. Default is UP.
- **invert_state** (*Optional*): Invert the value of the State pin so that 0 means closed. Default is False.
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
    invert_relay: False
    state_pull_mode: 'UP'
    invert_state: True
    covers:
      - relay_pin: 10
        state_pin: 11
      - relay_pin: 12
        state_pin: 13
        name: 'Right door'
```

## {% linkable_title Remote Raspberry Pi Cover %}

If you don't have Home Assistant running on your Raspberry Pi and you want to use it as a remote cover instead, there is a project called [GarageQTPi](https://github.com/Jerrkawz/GarageQTPi) that will work remotely with the [MQTT Cover Component](/components/cover.mqtt/). Follow the Github instructions to install and configure GarageQTPi and once configured follow the Home Assistant instructions to configure the MQTT Cover.

