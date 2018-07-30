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

<p class='note warning'>
We have received <a href='https://github.com/home-assistant/home-assistant/issues/4442'>numerous reports</a> that this integration will have a big impact on the performance of the server.
</p>

This tracker discovers new devices on boot and in regular intervals and tracks Bluetooth low-energy devices periodically based on interval_seconds value. It is not required to pair the devices with each other.

Devices discovered are stored with 'BLE_' as the prefix for device mac addresses in `known_devices.yaml`.

This platform requires pybluez to be installed. On Debian based installs, run

```bash
$ sudo apt install bluetooth libbluetooth-dev pkg-config libboost-python-dev libboost-thread-dev libglib2.0-dev python-dev
```

Before you get started with this platform, please note that:

 - This platform is incompatible with Windows
 - This platform requires access to the bluetooth stack, see [Rootless Setup section](#rootless-setup) for further information

To use the Bluetooth tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: bluetooth_le_tracker
```

Configuration variables:

- **device_id** (*Optional*): The device ID for the Bluetooth device to be used for tracking. Defaults to `hci0`.
- **track_new_devices** (*Optional*): If new discovered devices are tracked by default. Defaults to `true`.
- **scan_duration** (*Optional*): How long should the scanner be looking for BLE devices. Defaults to `10` seconds.
- **interval_seconds** (*Optional*): Seconds between each scan for new devices. Defaults to `12` seconds.

As some BT LE devices change their MAC address regularly, a new device is only discovered when it has been seen 5 times.
Some BTLE devices (e.g., fitness trackers) are only visible to the devices that they are paired with. In this case, the BTLE tracker won't see this device.

## {% linkable_title Rootless Setup %}

Normally accessing the Bluetooth stack is reserved for root, but running programs that are networked as root is a bad security wise. To allow non-root access to the Bluetooth stack we can give Python 3 the missing capabilities to access the Bluetooth stack. Quite like setting the setuid bit (see [Stack Exchange](http://unix.stackexchange.com/questions/96106/bluetooth-le-scan-as-non-root) for more information).

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
