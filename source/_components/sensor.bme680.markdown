---
layout: page
title: "BME680 Sensor"
description: "Instructions how to integrate a BME680 sensor into Home Assistant."
date: 2018-01-16 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: raspberry-pi.png
ha_category: Sensor
ha_release: 0.62
ha_iot_class: "Local Push"
---


The `bme680` sensor platform allows you to read temperature, humidity, pressure and gas resistance values of a [Bosch BME680 Environmental sensor](https://cdn-shop.adafruit.com/product-files/3660/BME680.pdf) connected via [I2c](https://en.wikipedia.org/wiki/I²C) bus (SDA, SCL pins). It allows you to use all the operation modes of the sensor described in its datasheet.  In addition, it includes a basic air quality calculation that uses gas resistance and humidity measurements to calculate a percentage based air quality measurement.

Tested devices:

- [Raspberry Pi](https://www.raspberrypi.org/)

To use your BME680 sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: bme680
```

Configuration variables:

- **name** (*Optional*): The name of the sensor
- **i2c_bus** (*Optional*): I2c bus where the sensor is. Defaults to 1, for Raspberry Pi 2, 3 Zero and Zero-W.
- **i2c_address** (*Optional*): I2c address of the sensor. It is 0x76 or 0x77. Default 0x77.
- **monitored_conditions** array  (*Optional*): Conditions to monitor. Available conditions are *temperature*, *humidity*, *pressure*, *gas* and *airquality*. By default *temperature*, *humidity*, *pressure* and *airquality* are enabled.
- **oversampling_temperature** (*Optional*): Oversampling multiplier as described in the sensor datasheet. Can be 0 (no sampling), 1, 2, 4, 8, or 16. Default is 8.
- **oversampling_pressure** (*Optional*): Oversampling multiplier as described in the sensor datasheet. Can be 0 (no sampling), 1, 2, 4, 8, or 16. Default is 2.
- **oversampling_humidity** (*Optional*): Oversampling multiplier as described in the sensor datasheet. Can be 0 (no sampling), 1, 2, 4, 8, or 16. Default is 4.
- **filter_size** (*Optional*): IIR filter size as described in the sensor datasheet. Can be 0 (off), 1, 3, 7, 15, 31, 63 or 127. Default is 3.
- **gas_heater_temperature** (*Optional*): The temperature to heat the hotplate to for gas resistance measurements as descibed in the sensor datasheet.  Can be between 200-400&deg;C. Default is 320&deg;C.
- **gas_heater_duration** (*Optional*): The duration to heat the hotplate in milliseconds for gas resistance measurements as descibed in the sensor datasheet.  Can be between 1-4032 ms. In reality you will likely need between 80-100ms to reach a stable temperature.  Using a duration greater than 1000ms is unadvisable as it will essentially result in the heater being continually on due to the 1 second update interval. Default is 150 ms.
- **aq_burn_in_time** (*Optional*): The duration to perform gas resistance measurements to establish a stable baseline measurements for Air Quality calculations in seconds. The burn in time is only performed when the sensor component is first initalized. Default is 300 seconds (5 minutes).
- **aq_humidity_baseline** (*Optional*): The baseline *ideal* humidity for the air quality calculations. Default is 40 percent relative humidity.
- **aq_humidity_bias** (*Optional*): The bias for humidity to the gas resistence measurement in the air quality calculations. Default is 25 percent of the result is based on humidity (75% is based on gas).

## {% linkable_title Full Examples %}

If you want to specify the working mode of the digital sensor or need to change the default I2c address (which is 0x77), add more details to the `configuration.yaml` file:

```yaml
# Example of customized configuration.yaml entry
sensor:
  - platform: bme680
    name: BME680 Sensor
    i2c_bus: 1
    i2c_address: 0x77
    monitored_conditions:
      - temperature
      - humidity
      - pressure
      - gas
      - airquality
    oversampling_temperature: 8
    oversampling_humidity: 2
    oversampling_pressure: 4
    filter_size: 3
    gas_heater_temperature: 320
    gas_heater_duration: 150
    aq_burn_in_time: 300
    aq_humidity_baseline: 40
    aq_humidity_bias: 25
```

## {% linkable_title Customizing the sensor data %}

Give the values friendly names and icons, add the following to your `customize:` section.

```yaml
# Example configuration.yaml entry
customize:
  sensor.bme680_sensor_temperature:
    icon: mdi:thermometer
    friendly_name: Temperature
  sensor.bme680_sensor_humidity:
    icon: mdi:water
    friendly_name: Humidity
  sensor.bme680_sensor_pressure:
    icon: mdi:gauge
    friendly_name: Pressure
  sensor.bme680_sensor_air_quality:
    icon: mdi:blur
    friendly_name: Air Quality
```

To create a group, add the following to your `group` section.

```yaml
# Example configuration.yaml entry
group:
  climate:
    name: Climate
    entities:
      - sensor.bme680_sensor_temperature
      - sensor.bme680_sensor_humidity
      - sensor.bme680_sensor_pressure
      - sensor.bme680_sensor_air_quality
```

## {% linkable_title Directions for installing smbus support on Raspberry Pi %}

Enable I2c interface with the Raspberry Pi configuration utility:

```bash
# pi user environment: Enable i2c interface
$ sudo raspi-config
```

Select `Interfacing options->I2C` choose `<Yes>` and hit `Enter`, then go to `Finish` and you'll be prompted to reboot.

Install dependencies to use the `smbus-cffi` module and add your _homeassistant_ user to the _i2c_ group:

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
20: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
30: -- -- -- -- -- -- -- -- -- -- -- -- 3c -- -- --
40: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
50: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
60: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
70: -- -- -- -- -- -- -- 76
```

So you can see the sensor address that you are looking for is **0x76** (there is another i2c device on that Raspberry Pi).
