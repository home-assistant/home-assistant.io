---
layout: page
title: "Z-Wave"
description: "Installation of the Z-Wave component."
date: 2017-09-21 10:00
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /getting-started/z-wave-installation/
---

As of version 0.45, Home Assistant automatically installs python-openzwave from PyPI as needed. This also introduced the integrated Z-Wave control panel, removing the need for the OpenZWave control panel.

There is one dependency you will need to have installed ahead of time (included in `systemd-devel` on Fedora/RHEL systems):

```bash
$ sudo apt-get install libudev-dev
```

<p class='note'>
The installation of python-openzwave can take half an hour or more on a Raspbery Pi.
</p>

## {% linkable_title Configuration %}

```yaml
# Example configuration.yaml entry
zwave:
  usb_path: /dev/ttyUSB0
```

Configuration variables:

- **usb_path** (*Optional*): The port where your device is connected to your Home Assistant host.
- **network_key** (*Optional*): The 16-byte network key in the form `"0x01, 0x02..."` used in order to connect securely to compatible devices.
- **config_path** (*Optional*): The path to the Python OpenZWave configuration files. Defaults to the 'config' that is installed by python-openzwave
- **autoheal** (*Optional*): Allows disabling auto Z-Wave heal at midnight. Defaults to True.
- **polling_interval** (*Optional*): The time period in milliseconds between polls of a nodes value. Be careful about using polling values below 30000 (30 seconds) as polling can flood the zwave network and cause problems.
- **device_config** (*Optional*): This attribute contains node-specific override values. (For releases prior to 0.39 this variable is called **customize**) See [Customizing devices and services](/docs/configuration/customizing-devices/) for format:
  - **polling_intensity** (*Optional*): Enables polling of a value and sets the frequency of polling (0=none, 1=every time through the list, 2=every other time, etc). If not specified then your device will not be polled.
  - **ignored** (*Optional*): Ignore this entity completely. It won't be shown in the Web Interface and no events are generated for it.
  - **refresh_value** (*Optional*): Enable refreshing of the node value. Only the light component uses this. Defaults to False.
  - **delay** (*Optional*): Specify the delay for refreshing of node value. Only the light component uses this. Defaults to 2 seconds.
  - **invert_openclose_buttons** (*Optional*): Inverts function of the open and close buttons for the cover domain. Defaults to `False`.
- **debug** (*Optional*): Print verbose z-wave info to log. Defaults to `False`.
- **new_entity_ids** (*Optional*): Switch to new entity_id generation. Defaults to `True`.

### {% linkable_title Finding the controller path on Linux %}

To find the path of your Z-Wave USB stick or module, connect it to your system and run:

```bash
$ ls -ltr /dev/tty*|tail -n 1
```

That will give you a line that looks something like this:

```bash
crw-rw---- 1 root dialout 204, 64 Sep 21 10:25 /dev/ttyUSB0
```

Where the date and time displayed is approximately the time you connected the USB stick or module.

Or, if there is no result, try to find detailed USB connection info with:

```bash
$ dmesg | grep USB
```

If Home Assistant (`hass`) runs with another user (e.g. *homeassistant* on Hassbian) give access to the stick with:

```bash
$ sudo usermod -a -G dialout homeassistant
```

#### {% linkable_title Creating a Persistent Device Path }

Depending on what's plugged into your USB ports, the name found above may change. You can lock in a name, such as `/dev/zwave`, by following [these instructions](http://hintshop.ludvig.co.nz/show/persistent-names-usb-serial-devices/).

### {% linkable_title Finding the controller path on macOS %}

On macOS you can find the USB stick with:

```bash
$ ls /dev/cu.usbmodem*
```

### {% linkable_title Network Key %}

Security Z-Wave devices require a network key before being added to the network using the Add Secure Node button in the Z-Wave Network Management card. You must set the *network_key* configuration variable to use a network key before adding these devices.

An easy script to generate a random key:
```bash
cat /dev/urandom | tr -dc '0-9A-F' | fold -w 32 | head -n 1 | sed -e 's/\(..\)/0x\1, /g' -e 's/, $//'
```

Ensure you keep a backup of this key. If you have to rebuild your system and don't have a backup of this key, you won't be able to reconnect to any security devices. This may mean you have to do a factory reset on those devices, and your controller, before rebuilding your Z-Wave network.

## {% linkable_title First Run %}

Upon first run, the `zwave` component will take time to initialize entities and entities may appear with incomplete names. Running a network heal may speed up this process.
