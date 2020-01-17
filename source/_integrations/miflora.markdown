---
title: Mi Flora
description: Instructions on how to integrate MiFlora BLE plant sensor with Home Assistant.
logo: miflora.png
ha_category:
  - Environment
ha_release: 0.29
ha_iot_class: Local Polling
ha_codeowners:
  - '@danielhiversen'
  - '@ChristianKuehnel'
---

The `miflora` sensor platform allows one to monitor plant soil and air conditions. The [Mi Flora plant sensor](https://gadget-freakz.com/product/xiaomi-mi-flora-plant-sensor/) is a small Bluetooth Low Energy device that monitors the moisture and conductivity of the soil as well as ambient light and temperature. Since only one BLE device can be polled at a time, the library implements locking to prevent polling more than one device at a time.

There are "Chinese" and "International" versions available and there is a [report](https://community.home-assistant.io/t/miflora-showing-data-unknown/19550/8) that only the "International" works.

## Install a Bluetooth Backend

Before configuring Home Assistant you need a Bluetooth backend and the MAC address of your sensor. Depending on your operating system, you may have to configure the proper Bluetooth backend for your system:

- On [Hass.io](/hassio/installation/): Miflora will work out of the box.
- On a [generic Docker installation](/docs/installation/docker/): Works out of the box with `--net=host` and properly configured Bluetooth on the host.
- On other Linux systems:
  - Preferred solution: Install the `bluepy` library (via pip). When using a virtual environment, make sure to install the library in the right one.
  - Fallback solution: Install `gatttool` via your package manager. Depending on the distribution, the package name might be: `bluez`, `bluetooth`, `bluez-deprecated`
- On Windows and MacOS there is currently no support for the [miflora library](https://github.com/open-homeautomation/miflora/).

## Scan for devices

Start a scan to determine the MAC addresses of the sensor (you can identify your sensor by looking for `Flower care` or `Flower mate` entries) using this command:

```bash
$ sudo hcitool lescan
LE Scan ...
F8:04:33:AF:AB:A2 [TV] UE48JU6580
C4:D3:8C:12:4C:57 Flower mate
[...]
```

Or, if your distribution is using bluetoothctl use the following commands:

```bash
$ bluetoothctl
[bluetooth]# scan on
[NEW] Controller <your Bluetooth adapter> [default]
[NEW] F8:04:33:AF:AB:A2 [TV] UE48JU6580
[NEW] C4:D3:8C:12:4C:57 Flower mate
```

If you can't use `hcitool` or `bluetoothctl` but have access to an Android phone you can try `BLE Scanner` or similar scanner applications from the Play Store to easily find your sensor MAC address. If you are using Windows 10, try the `Microsoft Bluetooth LE Explorer` app from the Windows Store.

## Configuration

To use your Mi Flora plant sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: miflora
    mac: 'xx:xx:xx:xx:xx:xx'
    monitored_conditions:
      - moisture
```

{% configuration %}
mac:
  description: The MAC address of your sensor.
  required: true
  type: string
monitored_conditions:
  description: The parameters that should be monitored.
  required: false
  default: [moisture, light, temperature, conductivity, battery]
  type: list
  keys:
    moisture:
      description: Moisture in the soil.
    light:
      description: Brightness at the sensor's location.
    temperature:
      description: Temperature at the sensor's location.
    conductivity:
      description: Conductivity in the soil.
    battery:
      description: Battery details. Cached and only updated once a day.
name:
  description: The name displayed in the frontend.
  required: false
  type: string
force_update:
  description: Sends update events even if the value hasn't changed.
  required: false
  type: boolean
  default: false
median:
  description: "Sometimes the sensor measurements show spikes. Using this parameter, the poller will report the median of the last 3 (you can also use larger values) measurements. This filters out single spikes. Median: 5 will also filter double spikes. If you never have problems with spikes, `median: 1` will work fine."
  required: false
  type: integer
adapter:
  description: "Define the Bluetooth adapter to use. Run `hciconfig` to get a list of available adapters."
  required: false
  default: hci0
  type: string
{% endconfiguration %}

<div class='note warning'>

By default the sensor is only polled once every 20 minutes (`scan_interval` is 1200 seconds by default). On a Home Assistant restart sensor will report initial value. If you set `median: 3`, it will take _at least_ 40 minutes before the sensor will report an average value. Keep in mind though that reducing polling intervals will have a negative effect on the battery life.

</div>

## Full example

A full configuration example could look like the one below:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: miflora
    mac: 'xx:xx:xx:xx:xx:xx'
    name: Flower 1
    force_update: true    
    median: 3
    monitored_conditions:
      - moisture
      - light
      - temperature
      - conductivity
      - battery
```
