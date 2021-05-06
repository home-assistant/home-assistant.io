---
title: Sensirion SHT31
description: Instructions on how to integrate SHT31 sensors within Home Assistant.
ha_category:
  - DIY
ha_release: 0.68
ha_iot_class: Local Polling
ha_domain: sht31
ha_platforms:
  - sensor
---

The `sht31` sensor platform allows you to get the current temperature and humidity from a Sensirion SHT31 device.

## Configuration

To use your SHT31 sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: sht31
    name: Bedroom
    i2c_address: 0x44
    monitored_conditions:
      - temperature
      - humidity
```

{% configuration %}
  name:
    description: The name of the sensor. Temperature and Humidity will be added to the name for the sensor name.
    required: false
    default: SHT31
    type: string
  i2c_address:
    description: I2C address of the sensor.
    required: false
    default: "`0x44`"
    type: integer
  monitored_conditions:
    description: Conditions to monitor.
    required: false
    default: All conditions
    type: list
    keys:
      temperature:
        description: The current temperature of the SHT31.
      humidity:
        description: The current humidity of the SHT31.
{% endconfiguration %}
