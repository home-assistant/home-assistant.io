---
title: DHT Sensor
description: Instructions on how to integrate DHTxx sensors within Home Assistant.
ha_category:
  - DIY
ha_release: 0.7
logo: dht.png
ha_iot_class: Local Polling
ha_domain: dht
ha_platforms:
  - sensor
ha_codeowners:
  - '@thegardenmonkey'
---

The `dht` sensor platform allows you to get the current temperature and humidity from a DHT11, DHT22 or AM2302 device.

## Setup

To use your DHTxx sensor in your installation, you must first install the `libgpiod2` library.

```shell
sudo apt install libgpiod2
```

## Configuration

Add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: dht
  sensor: DHT22
  pin: 23
  monitored_conditions:
    - temperature
    - humidity
```

{% configuration %}
sensor:
  description: The sensor type, supported devices are DHT11, DHT22 and AM2302.
  required: true
  type: string
pin:
  description: The pin the sensor is connected to.
  required: true
  type: integer
name:
  description: The name of the sensor.
  required: false
  default: DHT Sensor
  type: string
monitored_conditions:
  description: Conditions to monitor. Available conditions are only *temperature* and *humidity*.
  required: true
  type: list
  keys:
    temperature:
      description: Temperature at the sensor's location.
    humidity:
      description: Humidity level at the sensor's location.
temperature_offset:
  description: Add or subtract a value from the temperature.
  required: false
  default: 0
  type: [integer, float]
humidity_offset:
  description: Add or subtract a value from the humidity.
  required: false
  default: 0
  type: [integer, float]
{% endconfiguration %}

The name of the pin to which the sensor is connected has different names on different platforms. 'P8_11' for Beaglebone, '23' for Raspberry Pi.

### Example

An example for a Raspberry Pi 3 with a DHT22 sensor connected to GPIO4 (pin 7):

```yaml
sensor:
  - platform: dht
    sensor: DHT22
    pin: 4
    temperature_offset: 2.1
    humidity_offset: -3.2
    monitored_conditions:
      - temperature
      - humidity
```
