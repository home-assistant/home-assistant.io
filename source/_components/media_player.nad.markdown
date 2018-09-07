---
layout: page
title: "NAD"
description: "Instructions on how to integrate NAD receivers into Home Assistant."
date: 2016-01-05 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: nad.png
ha_category: Media Player
ha_release: 0.36
ha_iot_class: "Local Polling"
---


The `nad` platform allows you to control a [NAD receiver](http://nadelectronics.com) through RS232 from Home Assistant.

To add an NAD receiver to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: nad
    serial_port: /dev/ttyUSB0
```

Configuration variables:

- **serial_port** (*Required*): The serial port . Default is `/dev/ttyUSB0`
- **name** (*Optional*): Name of the device. Default is NAD Receiver.
- **min_volume** (*optional*): Minimum volume in dB to use with the slider. Default is `-92`
- **max_volume** (*optional*): Maximum volume in dB to use with the slider. Default is `-20`
- **sources** (*Optional*): A list of mappings from source to source name. Valid sources are `1 to 10`.

The min_volume and max_volume are there to protect you against misclicks on the slider so you will not blow up your speakers when you go from -92dB to +20dB. You can still force it to go higher or lower than the values set with the plus and minus buttons.

<p class='note warning'>
On linux the user running home-assistant needs `dialout` permissions to access the serial port.
This can be added to the user by doing `sudo usermod -a -G dialout <username>`.
Be aware that the user might need to logout and logon again to activate these permissions.
</p>

A full configuration example could look like this:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: nad
    serial_port: /dev/ttyUSB0
    name: NAD Receiver
    min_volume: -60
    max_volume: -20
    sources:
      1: 'Kodi'
      2: 'TV'
```
