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

The first time you enable the Z-Wave component it will install the Z-Wave drivers (python-openzwave). This can take up to half an hour on slow machines like Raspberry Pi.

Installing the drivers might require some extra packages to be installed. Check your platform below.

## {% linkable_title Platform specific installation instructions %}

### {% linkable_title Linux (except Hass.io) %}

On Linux platforms (other than Hass.io) there is one dependency you will need to have installed ahead of time (included in `systemd-devel` on Fedora/RHEL systems):

```bash
$ sudo apt-get install libudev-dev
```

On Python 3.6 you may also have to install libpython3.6-dev, and possibly python3.6-dev.

### {% linkable_title macOS %}

When installing on macOS you may have to also run the command below ahead of time, replace "x.x" with the version of Python (`$ python3 --version`) you have installed.

```bash
$ sudo /Applications/Python\ x.x/Install\ Certificates.command
```

### {% linkable_title Raspberry Pi %}

On Raspberry Pi you will need to enable the serial interface in the `raspi-config` tool before you can add Z-Wave to Home Assistant.

## {% linkable_title Configuration %}

```yaml
# Example configuration.yaml entry
zwave:
  usb_path: /dev/ttyACM0
  device_config: !include zwave_device_config.yaml
```

{% configuration zwave %}
usb_path:
  description: The port where your device is connected to your Home Assistant host.
  required: false
  type: string
  default: /zwaveusbstick
network_key:
  description: The 16-byte network key in the form `"0x01, 0x02..."` used in order to connect securely to compatible devices. It is recommended that a network key is configured as security enabled devices may not function correctly if they are not added securely.
  required: false
  type: string
  default: None
config_path:
  description: "The path to the Python OpenZWave configuration files. NOTE: there is also the [update_config service](https://www.home-assistant.io/docs/z-wave/services/) to perform updating the config within python-openzwave automatically."
  required: false
  type: string
  default: the 'config' that is installed by python-openzwave
autoheal:
  description: Allows disabling auto Z-Wave heal at midnight.
  required: false
  type: boolean
  default: True
polling_interval:
  description: The time period in milliseconds between polls of a nodes value. Be careful about using polling values below 30000 (30 seconds) as polling can flood the zwave network and cause problems.
  required: false
  type: integer
  default: 60000
debug:
  description: Print verbose z-wave info to log.
  required: false
  type: boolean
  default: False
device_config / device_config_domain / device_config_glob:
  description: "This attribute contains node-specific override values. NOTE: This needs to be specified if you are going to use any of the following options. See [Customizing devices and services](/docs/configuration/customizing-devices/) for the format."
  required: false
  type: string, list
  keys:
    ignored:
      description: Ignore this entity completely. It won't be shown in the Web Interface and no events are generated for it.
      required: false
      type: boolean
      default: False
    polling_intensity:
      description: Enables polling of a value and sets the frequency of polling (0=none, 1=every time through the list, 2=every other time, etc). If not specified then your device will not be polled.
      required: false
      type: integer
      default: 0
    refresh_value:
      description: Enable refreshing of the node value. Only the light component uses this.
      required: false
      type: boolean
      default: False
    delay:
      description: Specify the delay for refreshing of node value. Only the light component uses this.
      required: false
      type: integer
      default: 2
    invert_openclose_buttons:
      description: Inverts function of the open and close buttons for the cover domain. This will not invert the positon and state reporting.
      required: false
      type: boolean
      default: False
{% endconfiguration %}

### {% linkable_title Finding the controller path on Linux %}

<p class='note'>
If you're using Hass.io please follow [these setup instructions](/hassio/zwave/) for finding the controller path.
</p>

To find the path of your Z-Wave USB stick or module, connect it to your system and run:

```bash
$ ls -ltr /dev/tty*|tail -n 1
```

That will give you a line that looks something like this:

```bash
crw-rw---- 1 root dialout 204, 64 Sep 21 10:25 /dev/ttyUSB0
```

Where the date and time displayed is approximately the time you connected the USB stick or module (it may also be something like  `/dev/ttyAMA0` or `/dev/ttyACM0`). The number will be zero for the first device connected, and higher numbers for later devices.

Or, if there is no result, try to find detailed USB connection info with:

```bash
$ dmesg | grep USB
```

If Home Assistant (`hass`) runs with another user (e.g., *homeassistant* on Hassbian) give access to the stick with:

```bash
$ sudo usermod -a -G dialout homeassistant
```

<p class='Note'>
The output from `ls -ltr` above contains the following information
The device type is `c` (character special) and permissions are `rw-rw----`, meaning only the owner and group can read and write to it, there is only `1` link to the file, it is owned by `root` and can be accessed by the group `dialout`, it has a major device number of `204`, and a minor device number of `64`, the device was connected at `10:25` on `21 September`, and the device is `/dev/ttyUSB0`.
</p>

#### {% linkable_title Creating a Persistent Device Path %}

Depending on what's plugged into your USB ports, the name found above may change. You can lock in a name, such as `/dev/zwave`, by following [these instructions](http://hintshop.ludvig.co.nz/show/persistent-names-usb-serial-devices/).

### {% linkable_title Finding the controller path on macOS %}

On macOS you can find the USB stick with:

```bash
$ ls /dev/cu.usbmodem*
```

### {% linkable_title Hass.io %}

To enable Z-Wave, plug your Z-Wave USB stick into your Raspberry Pi 3 and add the following to your `configuration.yaml`:

```yaml
zwave:
  usb_path: /dev/ttyACM0
```

Depending on your Z-Wave device it may instead be `/dev/ttyAMA0` (eg Razberry board) or `/dev/ttyUSB0` (eg HUBUZB-1).

### {% linkable_title RancherOS %}

If you're using RancherOS for containers, you'll need to ensure you enable the kernel-extras service so that the `USB_ACM` module (also known as `cdc_acm`) is loaded:

```bash
$ sudo ros service enable kernel-extras
$ sudo ros service up kernel-extras
```

### {% linkable_title Network Key %}

Security Z-Wave devices require a network key before being added to the network using the Add Secure Node button in the Z-Wave Network Management card. You must set the *network_key* configuration variable to use a network key before adding these devices.

An easy script to generate a random key:
```bash
$ cat /dev/urandom | tr -dc '0-9A-F' | fold -w 32 | head -n 1 | sed -e 's/\(..\)/0x\1, /g' -e 's/, $//'
```

```yaml
# Example configuration.yaml entry for network_key
zwave:
  network_key: "0x2e, 0xcc, 0xab, 0x1c, 0xa3, 0x7f, 0x0e, 0xb5, 0x70, 0x71, 0x2d, 0x98, 0x25, 0x43, 0xee, 0x0c"
```

Ensure you keep a backup of this key. If you have to rebuild your system and don't have a backup of this key, you won't be able to reconnect to any security devices. This may mean you have to do a factory reset on those devices, and your controller, before rebuilding your Z-Wave network.

## {% linkable_title First Run %}

The (compilation and) installation of python-openzwave happens when you first enable the Z-Wave component, and can take half an hour or more on a Raspberry Pi. When you upgrade Home Assistant and python-openzwave is also upgraded, this will also result in a delay while the new version is compiled and installed.

The first run after adding a device is when the `zwave` component will take time to initialize the entities, some entities may appear with incomplete names. Running a network heal may speed up this process.

## {% linkable_title Troubleshooting %}

### {% linkable_title Component could not be set up %}

Sometimes the device may not be accessible and you'll get an error message upon startup about not being able to set up Z-Wave. Run the following command for your device path (here we're using `/dev/ttyAMA0` for our Razberry board):

```bash
$ ls -l /dev/ttyAMA0
```

You should then see something like this:

```
crw-rw---- 1 root dialout 204, 64 Apr  1 12:34 /dev/ttyAMA0
```

The important pieces are the first piece `crw-rw----` and the group `dialout`. If those are different then, for your device path, run:

```bash
$ sudo chgrp dialout /dev/ttyAMA0
$ sudo chmod g+rw /dev/ttyAMA0
```

Check too that the account you're running Home Assistant as is in the `dialout` group. For instance, if you're using `homeassistant`:

```bash
$ groups homeassistant
```

That should include `dialout`, if it doesn't then:

```bash
$ sudo usermod -G dialout homeassistant
```

### {% linkable_title Device path changes %}

If your device path changes when you restart, see [this guide](http://hintshop.ludvig.co.nz/show/persistent-names-usb-serial-devices/) on fixing it.

### {% linkable_title Unable to install Python Openzwave %}

If you're getting errors like:

    openzwave-embed/open-zwave-master/libopenzwave.a: No such file or directory

Then the problem is that you're missing `libudev-dev`, please [install it](/docs/z-wave/installation/#linux-except-hassio).
