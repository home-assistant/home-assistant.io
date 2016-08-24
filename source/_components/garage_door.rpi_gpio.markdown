---
layout: page
title: "Raspberry Pi Garage door"
description: "Instructions how to setup the Raspberry Pi garage doors within Home Assistant."
date: 2016-02-12 07:00
sidebar: true
comments: false
sharing: true
footer: true
logo: raspberry-pi.png
ha_category: Garage Door
ha_release: 0.23
---

The `rpi_gpio` garage door platform allows you to use a Raspberry Pi to control your Garage door.

It uses two pins on the Raspberry Pi. 
- The `state_pin` will detect if the door is closed, and
- the `relay_pin` will trigger the door to open or close.

Although you do not need Andrews Hilliday's software controller when you run Home Assistant, he has written clear instructions on how to hook your garage door & sensors up to your Raspberry Pi, which can be found [here](https://github.com/andrewshilliday/garage-door-controller#hardware-setup).

To enable Raspberry Pi Garage doors in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
garage_door:
  platform: rpi_gpio
  state_pull_mode: DOWN
  relay_time: 1
  doors:
    - relay_pin: 10
      state_pin: 11
      name: 'Left door'
    - relay_pin: 12
      state_pin: 13
      name: 'Right door'
```

Configuration variables:

- **doors** array (*Required*): List of your doors.
  - **name** (*Optional*): Name to use in the Frontend.
  - **relay_pin** (*Required*): The pin of your Raspberry Pi where the relay is connected.
  - **state_pin** (*Required*): The pin of your Raspberry Pi to retrieve the state.
  - **state_pull_mode** (*Optional*): The direction the State pin is pulling. It can be UP or DOWN. Default is UP.
  - **relay_time** (*Optional*): The time that the relay will be on for in seconds. Default is .2 seconds.

