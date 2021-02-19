---
title: Xiaomi Mijia BLE Temperature and Humidity Sensor
description: Instructions on how to integrate MiTemp BLE temperature and humidity sensor with Home Assistant.
ha_category:
  - DIY
ha_release: 0.69
ha_iot_class: Local Polling
ha_domain: mitemp_bt
ha_platforms:
  - sensor
---

The `mitemp_bt` sensor platform allows one to monitor room temperature and humidity. The [Xiaomi Mijia BLE Temperature and Humidity sensor with LCD](https://www.banggood.com/Xiaomi-Mijia-Bluetooth-Thermometer-Hygrometer-with-LCD-Screen-Magnetic-Suction-Wall-Stickers-p-1232396.html) is a small Bluetooth Low Energy device that monitors the room temperature and humidity. As only a single BLE device can be polled at the same time, the library employs locking to make sure this is the case.

## Installation

Depending on the operating system you're running, you have to configure the proper Bluetooth backend on your system:

- On [Home Assistant](/hassio/installation/): `mitemp_bt` will work out of the box as long as the host supports Bluetooth (like the Raspberry Pi does).
- On a [Home Assistant Container](/docs/installation/docker/): Works out of the box with `--net=host` and properly configured Bluetooth on the host.
- On other Linux systems:
  - Preferred solution: Install the `bluepy` and `btlewrap` library (via pip). When using a virtual environment, make sure to use install the library in the right one.
  - Fallback solution: Install `btlewrap` library (via pip) and `gatttool` via your package manager. Depending on the distribution, the package name might be: `bluez`, `bluetooth` or    `bluez-deprecated`.

## Configuration

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
    mac: "xx:xx:xx:xx:xx:xx"
    monitored_conditions:
      - temperature
```

{% configuration %}
mac:
  description: The MAC address of your sensor.
  required: true
  type: string
monitored_conditions:
  description: The parameters that should be monitored.
  required: false
  default: [temperature, humidity, battery]
  type: list
  keys:
    temperature:
      description: Temperature in C at the sensor's location.
    humidity:
      description: Humidity level in % at the sensor's location.
    battery:
      description: Battery details (in %).
name:
  description: The name displayed in the frontend.
  required: false
  type: string
force_update:
  description: Sends update events even if the value hasn't changed.
  required: false
  default: false
  type: boolean
median:
  description: "Sometimes the sensor measurements show spikes. Using this parameter, the poller will report the median of the last 3 (you can also use larger values) measurements. This filters out single spikes. Median: 5 will also filter double spikes. If you never have problems with spikes, `median: 1` will work fine."
  required: false
  default: 3
  type: integer
timeout:
  description: Define the timeout value in seconds when polling.
  required: false
  default: 10
  type: integer
retries:
  description: Define the number of retries when polling.
  required: false
  default: 2
  type: integer
cache_value:
  description: Define cache expiration value in seconds.
  required: false
  default: 300
  type: integer
adapter:
  description: "Define the Bluetooth adapter to use. Run `hciconfig` to get a list of available adapters."
  required: false
  default: hci0
  type: string
{% endconfiguration %}

Note that by default the sensor is only polled once every 5 minutes. This means with the `median: 3` setting will take as least 15 minutes before the sensor will report a value after a Home Assistant restart. Even though the hardware is able to provide new values every second, room temperatures don't change that quickly.
Reducing polling intervals will have a negative effect on the battery life.

## Full example

A full configuration example could look like the one below:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: mitemp_bt
    mac: "xx:xx:xx:xx:xx:xx"
    name: Kids Room Temp
    force_update: true
    median: 1
    monitored_conditions:
      - temperature
      - humidity
      - battery
```
