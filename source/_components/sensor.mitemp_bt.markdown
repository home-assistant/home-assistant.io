---
layout: page
title: "Xiaomi Mijia BLE Temperature and Humidity sensor with LCD"
description: "Instructions on how to integrate MiTemp BLE temperature and humidity sensor with Home Assistant."
date: 2018-04-22 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mitemp.png
ha_category: DIY
ha_release: 0.??
ha_iot_class: "Local Polling"
---

The `mitemp_bt` sensor platform allows one to monitor room temperature and humidity. The [Xiaomi Mijia BLE Temperature and Humidity sensor with LCD](https://www.amazon.com/Temperature-Humidity-Xiaomi-Bluetooth-Screen-Remote/dp/B079L6N6PC) is a small Bluetooth Low Energy device that monitors the room temperature and humidity. As only a single BLE device can be polled at the same time, the library employs locking to make sure this is the case.

# Installation
Depending on the operating system you're running, you have to configure the proper Bluetooth backend on your system:

- On [Hass.io](/hassio/installation/): Not yet supported.
- On other Linux systems:
    - Preferred solution: Install the `bluepy` and `btlewrap` library (via pip). When using a virtual environment, make sure to use install the library in the right one.
    - Fallback solution: Install `btlewrap` library (via pip) and `gatttool` via your package manager. Depending on the distribution, the package name might be: `bluez`, `bluetooth`, `bluez-deprecated`
- Windows and MacOS are currently not supported by the btlewrap library.

# Configuration
Start a scan to determine the MAC addresses of the sensor:

```bash
$ sudo hcitool lescan
LE Scan ...
4C:65:A8:D2:31:7F MJ_HT_V1
[...]
```

Or if your distribution is using bluetoothctl:

```bash
$ bluetoothctl
[bluetooth]# scan on
Discovery started
[CHG] Controller XX:XX:XX:XX:XX:XX Discovering: yes
[NEW] Device 4C:65:A8:D2:31:7F MJ_HT_V1

```


Check for `MJ_HT_V1` or similar entries, those are your sensor.

To use your Mi Temperature and Humidity sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: mitemp_bt
    mac: 'xx:xx:xx:xx:xx:xx'
    monitored_conditions:
      - temperature
```

- **mac** (*Required*): The MAC address of your sensor.
- **monitored_conditions** array (*Optional*): The parameters that should be monitored (defaults to monitoring all parameters).
  - **temperature**: Temperature at the sensor's location.
  - **humidity**: Moisture in the soil.
  - **battery**: Battery details.
- **name** (*Optional*): The name displayed in the frontend.
- **force_update** (*Optional*): Sends update events even if the value hasn't changed.
- **median** (*Optional*): Sometimes the sensor measurements show spikes. Using this parameter, the poller will report the median of the last 3 (you can also use larger values) measurements. This filters out single spikes. Median: 5 will also filter double spikes. If you never have problems with spikes, `median: 1` will work fine.
- **timeout** (*Optional*): Define the timeout value in seconds when polling (defaults to 10 if not defined)
- **retries** (*Optional*): Define the number of retries when polling (defaults to 2 if not defined)
- **cache_value** (*Optional*): Define cache expiration value in seconds (defaults to 1200 if not defined)
- **adapter** (*Optional*): Define the Bluetooth adapter to use (defaults to hci0). Run `hciconfig` to get a list of available adapters.

Note that by default the sensor is only polled once every 5 minutes. This means with the `median: 3` setting will take as least 15 minutes before the sensor will report a value after a Home Assistant restart. Even though the hardware is able to provide new values every second, room temperaturs don't change that quickly.
Reducing polling intervals will have a negative effect on the battery life.

A full configuration example could look like the one below:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: mitemp_bt
    mac: 'xx:xx:xx:xx:xx:xx'
    name: Kids Room Temp
    force_update: false
    median: 3
    monitored_conditions:
      - temperature
      - humidity
      - battery
```

