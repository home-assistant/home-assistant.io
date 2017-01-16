---
layout: page
title: "Bluetooth LE Tracker"
description: "Instructions for integrating bluetooth low-energy tracking within Home Assistant."
date: 2016-08-24 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: bluetooth.png
ha_category: Presence Detection
ha_iot_class: "Local Poll"
ha_release: 0.27
---

This tracker discovers new devices on boot and in regular intervals and tracks bluetooth low-energy devices periodically based on interval_seconds value. It is not required to pair the devices with each other! 
Devices discovered are stored with 'BLE_' as the prefix for device mac addresses in `known_devices.yaml`.

<p class='note'>
Requires PyBluez. If you are on Raspbian, run the following command to install the needed dependencies. `sudo apt install bluetooth libbluetooth-dev pkg-config libboost-python-dev libboost-thread-dev libglib2.0-dev python-dev`
</p>

<p class='note warning'>
Requires gattlib, which is not compatible with Windows. This tracker won't work on Windows!
</p>

To use the Bluetooth tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: bluetooth_le_tracker
```

Configuration variables:

- **device_id** (*Optional*): The device ID for the bluetooth device to be used for tracking. Defaults to `hci0`.

As some BT LE devices change their MAC address regularly, a new device is only discovered when it has been seen 5 times.
Some BTLE devices (e.g. fitness trackers) are only visible to the devices that they are paired with. In this case, the BTLE tracker won't see this device.

<p class='note warning'>
BT LE tracking requires root privileges.
</p>

For running Home Assistant as non root user we can give python3 the missing capabilities to access the bluetooth stack. Quite like setting the setuid bit (see [Stack Exchange](http://unix.stackexchange.com/questions/96106/bluetooth-le-scan-as-non-root) for more information).

```bash
$ sudo apt-get install libcap2-bin
$ sudo setcap 'cap_net_raw,cap_net_admin+eip' `readlink -f \`which python3\``
```

If you have installed Home Assistant with [AIO](/getting-started/installation-raspberry-pi-all-in-one/), you need to do the following command, this will grant access to Home Assistant to run the required command.

```bash
$ sudo setcap cap_net_raw,cap_net_admin+eip /srv/homeassistant/homeassistant_venv/bin/python3
```

A restart of Home Assistant is required.

For additional configuration variables check the [Device tracker page](/components/device_tracker/).
