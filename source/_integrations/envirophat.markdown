---
title: Enviro pHAT
description: Instructions on how to integrate the Enviro pHAT within Home Assistant.
ha_category:
  - DIY
ha_iot_class: Local Polling
ha_release: 0.44
ha_domain: envirophat
ha_platforms:
  - sensor
---

The `envirophat` sensor platform allows you to display information collected by an [Enviro pHAT](https://shop.pimoroni.com/products/enviro-phat) add-on board for the Raspberry Pi. The board features a wide range of sensors, such as:

- BMP280 temperature/pressure sensor
- TCS3472 light and RGB color sensor with two LEDs for illumination
- LSM303D accelerometer/magnetometer sensor
- ADS1015 4-channel 3.3v, analog to digital sensor (ADC)

To add this platform to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry,
# which is equivalent to the default setup
sensor:
  - platform: envirophat
    use_led: false
    display_options:
      - temperature
      - pressure
      - light
      - light_red
      - light_green
      - light_blue
      - accelerometer_x
      - accelerometer_y
      - accelerometer_z
      - magnetometer_x
      - magnetometer_y
      - magnetometer_z
      - voltage_0
      - voltage_1
      - voltage_2
      - voltage_3
```

{% configuration %}
display_options:
  description: List of readings to monitor.
  required: false
  default: All the conditions
  type: list
  keys:
    temperature:
      description: Ambient temperature in Celsius. Since the sensor is close to the Raspberry Pi, that might affect the accuracy of the reading (ie. the Pi might heat up the sensor)
    pressure:
      description: Atmospheric pressure in hPa.
    light:
      description: Ambient light, as an integer in the 0-65535 range.
    light_red:
      description: Red color reading scaled to the ambient light, as an integer in the 0-255 range.
    light_green:
      description: Green color reading scaled to the ambient light, as an integer in the 0-255 range.
    light_blue:
      description: Blue color reading scaled to the ambient light, as an integer in the 0-255 range.
    accelerometer_x:
      description: Accelerometer reading in units of G, along the X axis.
    accelerometer_y:
      description: Accelerometer reading in units of G, along the Y axis.
    accelerometer_z:
      description: Accelerometer reading in units of G, along the Z axis.
    magnetometer_x:
      description: Magnetometer reading, the X component of the raw vector.
    magnetometer_y:
      description: Magnetometer reading, the y component of the raw vector.
    magnetometer_z:
      description: Magnetometer reading, the z component of the raw vector.
    voltage_0:
      description: Voltage reading on Analog In 0 in units of V.
    voltage_1:
      description: Voltage reading on Analog In 1 in units of V.
    voltage_2:
      description: Voltage reading on Analog In 2 in units of V.
    voltage_3:
      description: Voltage reading on Analog In 3 in units of V.
use_led:
  description: Declaring that the on-board LEDs are *not* used for the color measurements thus these readings are based on the ambient light. If the value is set to True, the on-board LEDs will blink whenever a reading is taken.
  required: false
  default: false
  type: boolean
{% endconfiguration %}

### Notes

#### X, Y, Z axes

- X is parallel with the long edge of the board
- Y is parallel with the short edge of the board
- Z is perpendicular to the board

#### Voltages

- voltage readings are done in the 0-3.3V range, please do not connect higher voltages than that! See the [Enviro pHAT's getting started guide](https://learn.pimoroni.com/tutorial/sandyj/getting-started-with-enviro-phat) regarding how to make a voltage divider

### Give the values friendly names & icons

Add something like the following to your [customize section](/docs/configuration/customizing-devices/):

```yaml
# Example configuration.yaml entry
  customize:
    sensor.accelerometer_z:
      icon: mdi:airplane-landing
      friendly_name: "Acc Z"
    sensor.magnetometer_x:
      icon: mdi:arrow-up-bold-hexagon-outline
      friendly_name: "Magnetic X"
    sensor.pressure:
      icon: mdi:weight
      friendly_name: "Pressure"
```

### Create groups

```yaml
# Example configuration.yaml entry
group:
  enviro_phat_voltages:
    name: Enviro pHAT Voltages`
    entities:
      - sensor.voltage_0
      - sensor.voltage_1
      - sensor.voltage_2
      - sensor.voltage_3
```

### Enabling the required `i2c-1` device

Since the Enviro pHAT communicates over I2C, you might also need to make sure that the I2C devices are enabled, by adding or uncommenting the following line in `/boot/config.txt` (see the [DT Parameters section](https://www.raspberrypi.org/documentation/configuration/device-tree.md) in the Raspberry Pi documentation):

```txt
dtparam=i2c_arm=on
```
