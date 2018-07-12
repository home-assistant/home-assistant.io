---
layout: page
title: "BME280 Sensor"
description: "Instructions on how to integrate a BME280 sensor into Home Assistant."
date: 2017-06-10 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: raspberry-pi.png
ha_category: Sensor
ha_release: 0.48
ha_iot_class: "Local Push"
---


The `bme280` sensor platform allows you to read temperature, humidity and pressure values of a [Bosch BME280 Environmental sensor](https://cdn-shop.adafruit.com/datasheets/BST-BME280_DS001-10.pdf) connected via [I2c](https://en.wikipedia.org/wiki/I²C) bus (SDA, SCL pins). It allows you to use all the operation modes of the sensor described in its datasheet.

Tested devices:

- [Raspberry Pi](https://www.raspberrypi.org/)

To use your BME280 sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: bme280
```

Configuration variables:

- **name** (*Optional*): The name of the sensor
- **i2c_address** (*Optional*): I2c address of the sensor. It is 0x76 or 0x77.
- **i2c_bus** (*Optional*): I2c bus where the sensor is. Defaults to 1, for Raspberry Pi 2 and 3.
- **operation_mode** (*Optional*): Power mode for the sensor. Use 2 for forced mode or 3 for normal mode. Defaults to normal mode.
- **time_standby** (*Optional*): Standby time in ms for normal mode of operation as described in the sensor datasheet. Defaults to 5 ms.
- **oversampling_temperature** (*Optional*): Oversampling multiplier as described in the sensor datasheet. Can be 0 (no sampling), 1, 2, 4, 8, or 16. Default is 1.
- **oversampling_pressure** (*Optional*): Oversampling multiplier as described in the sensor datasheet. Can be 0 (no sampling), 1, 2, 4, 8, or 16. Default is 1.
- **oversampling_humidity** (*Optional*): Oversampling multiplier as described in the sensor datasheet. Can be 0 (no sampling), 1, 2, 4, 8, or 16. Default is 1.
- **filter_mode** (*Optional*): IIR filter coeficient as described in the sensor datasheet. Default is 0, for filter off.
- **delta_temperature** (*Optional*): Absolute delta for temperature correction.
- **monitored_conditions** array  (*Optional*): Conditions to monitor. Available conditions are *temperature*, *humidity* and *pressure*. By default all three are displayed.

## {% linkable_title Full Examples %}

If you want to specify the working mode of the digital sensor or need to change the default I2c address (which is 0x76), add more details to the `configuration.yaml` file:

```yaml
# Example of customized configuration.yaml entry
sensor:
  - platform: bme280
    name: Ambient
    i2c_address: 0x77
    operation_mode: 2  # forced mode
    time_standby: 5
    oversampling_temperature: 4
    oversampling_pressure: 4
    oversampling_humidity: 4
    delta_temperature: -0.5
    monitored_conditions:
      - temperature
      - humidity
      - pressure
    scan_interval: 40
```

This sensor is somehow famous for generating relatively high temperature measurements compared to other sensors (it looks like self-heating does not feel good for some encapsulations). If you experience this problem, you can define an absolute delta of temperature correction using a negative number.

## {% linkable_title Customizing the sensor data %}

Give the values friendly names and icons, add the following to your `customize:` section.

```yaml
# Example configuration.yaml entry
customize:
  sensor.ambient_temperature:
    icon: mdi:thermometer
    friendly_name: "Temperature"
  sensor.ambient_humidity:
    icon: mdi:weather-rainy
    friendly_name: "Humidity"
  sensor.ambient_pressure:
    icon: mdi:gauge
    friendly_name: "Pressure"
```

To create a group, add the following to your `groups` section.

```yaml
# Example configuration.yaml entry
group:
  ambient_sensor:
    name: BME280 Environment sensor
    entities:
      - sensor.ambient_temperature
      - sensor.ambient_humidity
      - sensor.ambient_pressure
```

## {% linkable_title Directions for installing smbus support on Raspberry Pi %}

Enable I2c interface with the Raspberry Pi configuration utility:

```bash
# pi user environment: Enable i2c interface
$ sudo raspi-config
```

Select `Interfacing options->I2C` choose `<Yes>` and hit `Enter`, then go to `Finish` and you'll be prompted to reboot.

Install dependencies for use the `smbus-cffi` module and enable your _homeassistant_ user to join the _i2c_ group:

```bash
# pi user environment: Install i2c dependencies and utilities
$ sudo apt-get install build-essential libi2c-dev i2c-tools python-dev libffi-dev

# pi user environment: Add homeassistant user to the i2c group
$ sudo addgroup homeassistant i2c

# pi user environment: Reboot Raspberry Pi to apply changes
$ sudo reboot
```

### {% linkable_title Check the i2c address of the sensor %}

After installing `i2c-tools`, a new utility is available to scan the addresses of the connected sensors:

```bash
$ /usr/sbin/i2cdetect -y 1
```

It will output a table like this:
```text
     0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f
00:          -- -- -- -- -- -- -- -- -- -- -- -- --
10: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
20: -- -- -- 23 -- -- -- -- -- -- -- -- -- -- -- --
30: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
40: 40 -- -- -- -- -- UU -- -- -- -- -- -- -- -- --
50: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
60: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
70: -- -- -- -- -- -- -- 77
```

So you can see the sensor address what you are looking for is **0x77** (there are more i2c sensors in that Raspberry Pi).
