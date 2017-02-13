---
layout: page
title: "Raspberry Pi integrations"
description: "Home Assistant integrations specific to the Raspberry Pi."
date: 2016-09-26 21:00
sidebar: true
comments: false
sharing: true
footer: true
---

Some components that are specific for the Raspberry Pi can require some further configuration outside of Home Assistant. All commands below are assumed to be executed with the `pi` account. For full documentation of these components refer to the [components](/components) page.

### {% linkable_title Bluetooth Tracker %}

The Bluetooth tracker will work on a Raspberry Pi 3 with the built-in Bluetooth module or with a USB Bluetooth device on any of the other Raspberry Pi's.

Install the following external dependencies.
```bash
$ sudo apt-get install bluetooth libbluetooth-dev
```
After this follow the [Bluetooth Tracker component](/components/device_tracker.bluetooth_tracker/) and [Device Tracker page](/components/device_tracker/) pages.

### {% linkable_title Raspberry Pi Camera %}

The Raspberry Pi Camera is a specific camera for the Raspberry Pi boards. For more information about the camera I suggest reading the [documentation](https://www.raspberrypi.org/documentation/usage/camera/) from the Raspberry Pi foundation.

To use the camera it needs to be enabled with the `raspi-config` utility.

```bash
$ sudo raspi-config
```

Select `Enable camera` choose `<Yes>` and hit `Enter`, then go to `Finish` and you'll be prompted to reboot.

After reboot add your `homeassistant` account to the `video` group.

```bash
$ sudo adduser homeassistant video
```

After this follow the [Raspberry Pi Camera component](/components/camera.rpi_camera/) page.

### {% linkable_title Raspberry Pi GPIO %}

Each of the following devices are connected to the GPIO pins on the Raspberry Pi.
For more details about the GPIO layout, visit the [documentation](https://www.raspberrypi.org/documentation/usage/gpio/) from the Raspberry Pi foundation.

Since these are not normally used some extra permission will need to be added.
In general the permission that is needed is granted by adding the `homeassistant` account to the `gpio` group.

### {% linkable_title Raspberry Pi Cover %}

Add your `homeassistant` account to the `gpio` group
```bash
$ sudo adduser homeassistant gpio
```
After this follow the [Raspberry Pi Cover component](/components/cover.rpi_gpio/) page.

### {% linkable_title DHT Sensor %}

Add your `homeassistant` account to the `gpio` group
```bash
$ sudo adduser homeassistant gpio
```
After this follow the [DHT Sensor component](/components/sensor.dht/) page.


### {% linkable_title Raspberry PI GPIO Binary Sensor %}

Add your `homeassistant` account to the `gpio` group
```bash
$ sudo adduser homeassistant gpio
```
After this follow the [Raspberry PI GPIO Binary Sensor component](/components/binary_sensor.rpi_gpio/) page.

### {% linkable_title Raspberry PI GPIO Switch %}

Add your `homeassistant` account to the `gpio` group.
```bash
$ sudo adduser homeassistant gpio
```
After this follow the [Raspberry PI GPIO Switch component](/components/switch.rpi_gpio/) page.

### {% linkable_title Raspberry Pi RF Switch %}

Add your `homeassistant` account to the `gpio` group
```bash
$ sudo adduser homeassistant gpio
```
After this follow the [Raspberry Pi RF Switch component](/components/switch.rpi_rf/) page.

### {% linkable_title One wire Sensor %}

The One wire sensor requires that support for it is enabled on the Raspberry Pi and that the One Wire device is connected to GPIO pin 4.
To enable One Wire support add the following line to the end of `/boot/config.txt`
```yaml
dtoverlay=w1-gpio
```
After this follow the [One Wire Sensor component](/components/sensor.onewire/) page.
