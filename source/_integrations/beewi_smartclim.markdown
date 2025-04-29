---
title: BeeWi SmartClim BLE sensor
description: Instructions on how to integrate MBeeWi SmartClim BLE sensor with Home Assistant.
ha_category:
  - Sensor
ha_release: 0.99
ha_iot_class: Local Polling
ha_codeowners:
  - '@alemuro'
ha_domain: beewi_smartclim
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `beewi_smartclim` sensor platform allows one to monitor room or external temperature and humidity. The BeeWi SmartClim BLE is a Bluetooth Low Energy sensor device that monitors temperature from a room or a garden from your smartphone by using an APP. Use this integration to track these metrics from any location thanks to Home Assistant, as well as to create some automation scripts based on your room's temperature.

## Installation

Depending on the operating system you're running, you have to configure the proper Bluetooth backend on your system:

- `beewi_smartclim` will work out of the box as long as the host supports Bluetooth (like the Raspberry Pi does).
- Using [Home Assistant Container installation](/docs/installation/docker/): Works out of the box with `--net=host` and properly configured Bluetooth on the host.
- On other Home Assistant Core systems:
  - Preferred solution: Install the `bluepy` and `btlewrap` library (via pip). When using a virtual environment, make sure to use install the library in the right one.
  - Fallback solution: Install `btlewrap` library (via pip) and `gatttool` via your package manager. Depending on the distribution, the package name might be: `bluez`, `bluetooth` or    `bluez-deprecated`.

## Configuration

Start a scan to determine the MAC addresses of the sensor:

```bash
$ sudo hcitool lescan
LE Scan ...
D0:5F:B8:51:9B:36 BeeWi SmartClim
[...]
```

Or if your distribution is using bluetoothctl:

```bash
$ bluetoothctl
[bluetooth]# scan on
Discovery started
[CHG] Controller XX:XX:XX:XX:XX:XX Discovering: yes
[NEW] Device D0:5F:B8:51:9B:36 BeeWi SmartClim
```

Check for `BeeWi SmartClim` or similar entries, those are your sensor.

To use your Mi Temperature and Humidity sensor in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: beewi_smartclim
    mac: "xx:xx:xx:xx:xx:xx"
```

{% configuration %}
mac:
  description: The MAC address of your sensor.
  required: true
  type: string
name:
  description: The name displayed in the frontend.
  required: false
  type: string
{% endconfiguration %}

## Full example

A full configuration example could look like the one below:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: beewi_smartclim
    mac: "xx:xx:xx:xx:xx:xx"
    name: Garden
```
