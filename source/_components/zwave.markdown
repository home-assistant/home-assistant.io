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

<p class='note warning'>
Z-Wave support is currently broken as we're unable to compile
<a href='https://github.com/OpenZWave/python-openzwave/tree/python3'>Python Open Z-Wave</a>.
</p>



[Z-Wave](http://www.z-wave.com/) support for Home Assistant is very new. We have started now by integrating only the sensors.

Support for Z-Wave can be added by plugging a Z-Wave USB stick into your computer.

To allow Home Assistant to talk to your Z-Wave USB stick you will have to compile `Python Open Z-Wave` yourself. We have made it easy and added a script that will do just that for you: `script/build_python_openzwave`.

Please make sure you have the correct dependencies installed:

```
apt-get install cython3 libudev-dev python-sphinx python3-setuptools
pip3 install cython
```

As an alternative, the Home Assistant docker image has support for Z-Wave built-in.

```yaml
# Example configuration.yaml entry
zwave:
  usb_path: /dev/ttyUSB0
```

Configuration variables:

- **usb_path** (*Required*): The port where your device is connected to your Home Assistant host.

```bash
ls /dev/ttyUSB*
```
