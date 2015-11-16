---
layout: component
title: "Z-Wave"
description: "Instructions how to integrate your existing Z-Wave within Home Assistant."
date: 2015-03-23 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: z-wave.png
ha_category: Hub
---

[Z-Wave](http://www.z-wave.com/) integration for Home Assistant allows you to observe and control connected Z-Wave devices. Z-Wave support requires a Z-Wave USB stick to be plugged into the host.

There is currently support for switches, lights and sensors. All will be picked up automatically after configuring this platform.

### Installation

To allow Home Assistant to talk to your Z-Wave USB stick you will have to compile Python Open Z-Wave. This can be done using [this script](https://github.com/balloob/home-assistant/blob/dev/script/build_python_openzwave). _(The Home Assistant docker image has support for Z-Wave built-in)_

Make sure you have the correct dependencies installed before running the script:

```bash
$ apt-get install cython3 libudev-dev python-sphinx python3-setuptools
$ pip3 install "cython<0.23"
```

### Configuration

```yaml
# Example configuration.yaml entry
zwave:
  usb_path: /dev/ttyUSB0
```

Configuration variables:

- **usb_path** (*Required*): The port where your device is connected to your Home Assistant host.

To find the path of your Z-Wave stick, run:

```bash
$ ls /dev/ttyUSB*
```
