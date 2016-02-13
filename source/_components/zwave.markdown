---
layout: page
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

[Z-Wave](http://www.z-wave.com/) integration for Home Assistant allows you to observe and control connected Z-Wave devices. Z-Wave support requires a [supported Z-Wave USB stick](https://github.com/OpenZWave/open-zwave/wiki/Controller-Compatibility-List) to be plugged into the host.

There is currently support for switches, lights and sensors. All will be picked up automatically after configuring this platform.

### {% linkable_title Installation %}

To allow Home Assistant to talk to your Z-Wave USB stick you will have to compile Python Open Z-Wave. This can be done using [this script](https://github.com/balloob/home-assistant/blob/dev/script/build_python_openzwave). _(The Home Assistant docker image has support for Z-Wave built-in)_

Make sure you have the correct dependencies installed before running the script:

```bash
$ apt-get install cython3 libudev-dev python-sphinx python3-setuptools
$ pip3 install "cython<0.23"
```

### {% linkable_title Configuration %}

```yaml
# Example configuration.yaml entry
zwave:
  usb_path: /dev/ttyUSB0
  config_path: /usr/local/share/python-openzwave/config
  polling_interval: 10000
  customize:
    sensor.greenwave_powernode_6_port_energy_10:
        polling_intensity: 1
```

Configuration variables:

- **usb_path** (*Required*): The port where your device is connected to your Home Assistant host.
- **config_path** (*Optional*): The path to the Python Open Z-Wave configuration files.
- **polling_interval** (*Optional*): The time period in milliseconds between polls of a nodes value.
- **customize** (*Optional*): This attribute contains node-specific override values:
  - **polling_intensity** (*Optional*): Enables polling of a value and sets the frequency of polling (0=none, 1=every time through the list, 2-every other time, etc)

To find the path of your Z-Wave stick, run:

```bash
$ ls /dev/ttyUSB*
```

#### {% linkable_title Events %}

Some devices can also trigger scene activation events, which can be used in automation scripts (for example the press of a button on a wall switch):

```yaml
# Example configuration.yaml automation entry
automation:
  - alias: Turn on Desk light
    trigger:
      platform: event
      event_type: zwave.scene_activated
      event_data: 
        entity_id: zwaveme_zme_wallcs_secure_wall_controller_8
        scene_id: 11
```

The *entity_id* and *scene_id* of all triggered events can be seen in the console output.
