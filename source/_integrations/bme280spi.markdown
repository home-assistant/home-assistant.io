---
title: Bosch BME280 SPI
description: Instructions on how to integrate a BME280 sensor into Home Assistant with SPI.
ha_category:
  - DIY
ha_release: 0.48
ha_iot_class: Local Push
ha_domain: bme280spi
ha_platforms:
  - sensor
---

The `bme280spi` sensor platform allows you to read temperature, humidity and pressure values of a [Bosch BME280 Environmental sensor](https://www.bosch-sensortec.com/media/boschsensortec/downloads/datasheets/bst-bme280-ds002.pdf) connected via [SPI](https://ru.wikipedia.org/wiki/Serial_Peripheral_Interface) bus (SDA, SDO, SCL, CSB pins). It allows you to use all the operation modes of the sensor described in its datasheet.

Tested devices:

- [Raspberry Pi](https://www.raspberrypi.org/)

## Configuration

To use your BME280 sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: bme280spi
```

{% configuration %}
name:
  description: The name of the sensor.
  required: false
  default: BME280 Sensor
  type: string
spi_bus:
  description: sensor SPI bus number.
  required: false
  default: 0
  type: integer
spi_dev:
  description: sensor SPI device number.
  required: false
  default: 0
  type: integer
time_standby:
  description: Standby time in ms for normal mode of operation as described in the sensor datasheet.
  required: false
  default: 5
  type: integer
oversampling_temperature:
  description: Oversampling multiplier as described in the sensor datasheet. Can be 0 (no sampling), 1, 2, 4, 8, or 16.
  required: false
  default: 1
  type: integer
oversampling_pressure:
  description: Oversampling multiplier as described in the sensor datasheet. Can be 0 (no sampling), 1, 2, 4, 8, or 16.
  required: false
  default: 1
  type: integer
oversampling_humidity:
  description: Oversampling multiplier as described in the sensor datasheet. Can be 0 (no sampling), 1, 2, 4, 8, or 16.
  required: false
  default: 1
  type: integer
filter_mode:
  description: IIR filter coeficient as described in the sensor datasheet.
  required: false
  default: 0
  type: integer
monitored_conditions:
  description: Conditions to monitor. Available conditions are *temperature*, *humidity* and *pressure*.
  required: false
  default: All three conditions
  type: list
{% endconfiguration %}

## Full Examples

If you want to specify the working mode of the digital sensor or need to change the default SPI bus and device, add more details to the `configuration.yaml` file:

```yaml
# Example of customized configuration.yaml entry
sensor:
  - platform: bme280spi
    name: Bedroom
    spi_bus: 1
    spi_dev: 2
    time_standby: 5
    oversampling_temperature: 4
    oversampling_pressure: 4
    oversampling_humidity: 4
    monitored_conditions:
      - temperature
      - humidity
      - pressure
    scan_interval: 40
```

## Customizing the sensor data

Give the values friendly names and icons, add the following to your `customize:` section.

```yaml
# Example configuration.yaml entry
customize:
  sensor.bedroom_temperature:
    icon: mdi:thermometer
    friendly_name: "Temperature"
  sensor.bedroom_humidity:
    icon: mdi:weather-rainy
    friendly_name: "Humidity"
  sensor.bedroom_pressure:
    icon: mdi:gauge
    friendly_name: "Pressure"
```

To create a group, add the following to your `groups` section.

```yaml
# Example configuration.yaml entry
group:
  bedroom_sensor:
    name: BME280 Environment sensor
    entities:
      - sensor.bedroom_temperature
      - sensor.bedroom_humidity
      - sensor.bedroom_pressure
```

## Directions for installing SPI support on Raspberry Pi

Enable SPI interface with the Raspberry Pi:

```bash
sudo groupadd spi
# Add homeassistant user to the spi group
sudo usermod -a -G spi user
# Add udev rules
sudo echo 'SUBSYSTEM=="spidev", GROUP="spi", MODE="0660"' > /etc/udev/rules.d/77-spi.rules
# apply changes without logout
newgrp spi
sudo udevadm control --reload-rules && udevadm trigger
```

```bash
sudo echo 'dtparam=spi=on' >> /boot/firmware/config.txt
sudo echo 'dtoverlay=spi1-3cs' >> /boot/firmware/config.txt
sudo reboot
```

### Check the spi devices

```bash
ls /dev/spidev*
/dev/spidev0.0  /dev/spidev0.1  /dev/spidev1.0  /dev/spidev1.1  /dev/spidev1.2
```

## Connect sensors

### SPI0 (available on J8/P1 headers on all RPi versions)

|SPI Function|Header Pin|Broadcom Pin Name|Broadcom Pin Function|
|------------|----------|-----------------|---------------------|
|MOSI        |19        |GPIO10           |SPI0_MOSI
|MISO        |21        |GPIO09           |SPI0_MISO
|SCLK        |23        |GPIO11           |SPI0_SCLK
|CE0         |24        |GPIO08           |SPI0_CE0_N
|CE1         |26        |GPIO07           |SPI0_CE1_N

### SPI1 (available only on 40-pin J8 header)

|SPI Function|Header Pin|Broadcom Pin Name|Broadcom Pin Function|
|------------|----------|-----------------|---------------------|
|MOSI        |38        |GPIO20           |SPI1_MOSI
|MISO        |35        |GPIO19           |SPI1_MISO
|SCLK        |40        |GPIO21           |SPI1_SCLK
|CE0         |12        |GPIO18           |SPI1_CE0_N
|CE1         |11        |GPIO17           |SPI1_CE1_N
|CE2         |36        |GPIO16           |SPI1_CE2_N
