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

### {% linkable_title Raspberry Pi Camera %}

The Raspberry Pi Camera is a specific camera for the Raspberry Pi boards. For more information about the camera I suggest reading the [documentation](https://www.raspberrypi.org/documentation/usage/camera/) from the Raspberry Pi foundation.

To use the camera it needs to be enabled with the `raspi-config` utility.

```bash
$ sudo raspi-config
```

Select `Enable camera` choose `<Yes>` and hit `Enter`, then go to `Finish` and you'll be prompted to reboot.

After this follow the [Raspberry Pi Camera component](/components/camera.rpi_camera/) page.

### {% linkable_title One wire Sensor %}

The One wire sensor requires that support for it is enabled on the Raspberry Pi and that the One Wire device is connected to GPIO pin 4.
To enable One Wire support add the following line to the end of `/boot/config.txt`
```yaml
dtoverlay=w1-gpio
```
After this follow the [One Wire Sensor component](/components/sensor.onewire/) page.
