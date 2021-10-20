---
title: Time of Flight
description: Instructions on how to integrate a VL53L1X ToF sensor into Home Assistant.
ha_category:
  - DIY
  - Sensor
ha_release: '0.90'
ha_iot_class: Local Polling
ha_domain: tof
ha_platforms:
  - sensor
---

The Time of Flight sensor uses an invisible laser to measure distance with millimeter resolution.

Tested devices:

- [Raspberry Pi](https://www.raspberrypi.org/)
- [VL53L1X](https://www.st.com/en/imaging-and-photonics-solutions/vl53l1x.html)
- [Schematic](https://cdn.sparkfun.com/assets/3/5/c/e/2/Qwiic_Distance_Sensor_-_VL53L1X.pdf)

## Configuration

To use the VL53L1X sensor in your installation, add to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: tof
```

{% configuration %}
name:
  description: Name of the sensor.
  required: false
  default: VL53L1X
  type: string
i2c_bus:
  description: I2c bus used.
  required: false
  default: 1, for Raspberry Pi 2 and 3.
  type: integer
i2c_address:
  description: I2c address of the sensor.
  required: false
  default: "0x29"
  type: string
xshut:
  description: GPIO port used to reset device.
  required: false
  default: 16
  type: integer
{% endconfiguration %}

## Example

The distance is measured in millimeters, according to the VL53L1X specifications.

```yaml
# Example of customized configuration.yaml entry
sensor:
  - platform: tof
    name: ToF sensor
    i2c_address: 0x29
    xshut: 16
```

Several devices may be attached and a GPIO port from Raspberry Pi is used for reset. XSHUT signal is generated pulsing LOW at initialization and after that, it is kept HIGH all time. This version uses VL53L1X long-range mode that may reach up to 4 meters.

## Directions for installing i2c on Raspberry Pi

Enable the I2c interface with the Raspberry Pi configuration utility:

```bash
# pi user environment: Enable i2c interface
sudo raspi-config
```

Select `Interfacing options->I2C` choose `<Yes>` and hit `Enter`, then go to `Finish` and you'll be prompted to reboot.

Install dependencies for use the `smbus-cffi` module and enable your `homeassistant` user to join the _i2c_ group:

```bash
# pi user environment: Install i2c dependencies and utilities
sudo apt-get install build-essential libi2c-dev i2c-tools python-dev libffi-dev

# pi user environment: Add homeassistant user to the i2c group
sudo addgroup homeassistant i2c

# pi user environment: Reboot Raspberry Pi to apply changes
sudo reboot
```

### Check the i2c address of the sensor

After installing `i2c-tools`, a new utility is available to scan the addresses of the connected sensors:

```bash
/usr/sbin/i2cdetect -y 1
```

It will output a table like this:

```text
     0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f
00:          -- -- -- -- -- -- -- -- -- -- -- -- --
10: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
20: -- -- -- 23 -- -- -- -- -- 29 -- -- -- -- -- --
30: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
40: 40 -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
50: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
60: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
70: -- -- -- -- -- -- -- --
```

So you can see the sensor address what you are looking for is **0x29** (there are more i2c sensors in this Raspberry Pi).
