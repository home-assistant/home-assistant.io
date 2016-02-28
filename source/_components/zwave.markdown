---
layout: page
title: "Z-Wave"
description: "Instructions how to integrate your existing Z-Wave within Home Assistant."
date: 2016-02-27 19:59
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

To allow Home Assistant to talk to your Z-Wave USB stick you will have to compile the OpenZWave library and install the related [python-OpenZWave package](https://github.com/OpenZWave/python-openzwave). This can be done as follows. _(Note: The Home Assistant docker image has support for Z-Wave built-in)_

Make sure you have the correct dependencies installed before running the script:

```bash
$ apt-get install cython3 libudev-dev python-sphinx python3-setuptools
```

Then get the OpenZWave files and switch to the `python3` branch:

```bash
$ git clone https://github.com/OpenZWave/python-openzwave.git
$ cd python-openzwave
$ git checkout python3
$ $PYTHON_EXEC=`which python3` make build
$ sudo $PYTHON_EXEC=`which python3` make install
```
<p class='note'>
Instead of `make install`, you can alternatively build your own python-openzwave package which can be easily uninstalled:

`$ sudo PYTHON_EXEC=`which python3` checkinstall --pkgname python-openzwave --pkgversion 1.0 --provides python-openzwave`

</p>

With this installation, your `config_path` needed below will resemble:

```bash
/usr/local/lib/python3.4/dist-packages/libopenzwave-0.3.0b8-py3.4-linux-x86_64.egg/config
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

Or, on some other systems (such as Raspberry Pi), use:

```bash
$ ls /dev/ttyACM*
```

<p class='note'>
Depending on what's plugged into your USB ports, the name found above may change. You an lock in a name, such as `/dev/zwave`, by following [these instructions](http://hintshop.ludvig.co.nz/show/persistent-names-usb-serial-devices/). 
</p>

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
