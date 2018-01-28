---
layout: page
title: "Raspberry Pi integrations"
description: "Home Assistant integrations specific to the Raspberry Pi."
date: 2016-09-26 21:00
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /docs/hassbian/integrations/
---

Some components that are specific for the Raspberry Pi can require some further configuration outside of Home Assistant. All commands below are assumed to be executed with the `pi` account. For full documentation of these components refer to the [components](/components) page.

### {% linkable_title Bluetooth Tracker %}

The Bluetooth tracker will work on a Raspberry Pi 3 with the built-in Bluetooth module or with a USB Bluetooth device on any of the other Raspberry Pi's.

Software needed for the tracker is pre-installed so just follow the [Bluetooth Tracker component](/components/device_tracker.bluetooth_tracker/) and [Device Tracker page](/components/device_tracker/) pages.

### {% linkable_title Raspberry Pi GPIO %}

Each of the following devices are connected to the GPIO pins on the Raspberry Pi.
For more details about the GPIO layout, visit the [documentation](https://www.raspberrypi.org/documentation/usage/gpio/) from the Raspberry Pi foundation.

Permission have been given to the `homeassistant` user to use the GPIO pins and all of the following components should require no underlying changes to work.
Just follow the component pages for each on how to add them to your Home Assistant installation.

 - [DHT Sensor](/components/sensor.dht/).
 - [Raspberry Pi Cover](/components/cover.rpi_gpio/).
 - [Raspberry Pi GPIO Binary Sensor](/components/binary_sensor.rpi_gpio/).
 - [Raspberry Pi GPIO Switch](/components/switch.rpi_gpio/).
 - [Raspberry Pi RF Switch](/components/switch.rpi_rf/).

### {% linkable_title Raspberry Pi Camera %}

The Raspberry Pi Camera is a specific camera for the Raspberry Pi boards. For more information about the camera I suggest reading the [documentation](https://www.raspberrypi.org/documentation/usage/camera/) from the Raspberry Pi foundation.

To use the camera it needs to be enabled with the `raspi-config` utility.

```bash
$ sudo raspi-config
```

Go to `Interfacing Options`, select `Enable camera` choose `<Yes>` and hit `Enter`, then go to `Finish` and you'll be prompted to reboot.

After this follow the [Raspberry Pi Camera component](/components/camera.rpi_camera/) page.

### {% linkable_title One wire Sensor %}

The One wire sensor requires that support for it is enabled on the Raspberry Pi and that the One Wire device is connected to GPIO pin 4.
To enable One Wire support add the following line to the end of `/boot/config.txt`
```yaml
dtoverlay=w1-gpio
```
After this follow the [One Wire Sensor component](/components/sensor.onewire/) page.
