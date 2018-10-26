---
layout: page
title: "SMA Solar WebConnect"
description: "Instructions on how to connect your SMA Solar Inverter to Home Assistant."
date: 2015-12-28 21:45
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Energy
logo: sma.png
ha_iot_class: "Local Polling"
ha_release: 0.36
---

The `sma` sensor will poll a [SMA](http://www.sma-solar.com/) [(US)](http://www.sma-america.com/) solar inverter and present the values as sensors (or attributes of sensors) in Home Assistant.

## {% linkable_title Configuration %}

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: sma
    host: IP_ADDRESS_OF_DEVICE
    password: YOUR_SMA_PASSWORD
    sensors:
      current_consumption: [total_consumption]
      current_power:
      total_yield:
```

{% configuration %}
host:
  description: The IP address of the SMA WebConnect module.
  required: true
  type: string
ssl:
  description:
  required: false
  default: false
  type: boolean
password:
  description: The password of the SMA WebConnect module.
  required: true
  type: string
group:
  description: The user group, which can be either `user` or `installer`.
  required: false
  default: user
  type: string
sensors:
  description: A dictionary of sensors that will be added. The value of the dictionary can include sensor names that will be shown as attributes.
  required: true
  type: list
  keys:
    current_power:
      description: Current power.
    current_consumption:
      description: Current consumption.
    total_power:
      description: Total power.
    total_consumption:
      description: Total consumption.
custom:
  description: A dictionary of custom sensor key values and units.
  required: false
  type: list
  keys:
    key:
      description: The SMA sensor key.
      required: true
      type: string
    unit:
      description: Unit.
      required: true
      type: string
    factor:
      description: Factor.
      required: false
      default: 1
      type: float
{% endconfiguration %}

You can create composite sensors, where the sub-sensors will be attributes of the main sensor. E.g.,

```yaml
    sensors:
      - current_power: [total_power, total_consumption]
```

The SMA WebConnect module supports a wide variety of sensors, and not all these have been mapped to standard sensors. Custom sensors can be defined by using the `custom` section of the configuration. You will need: A sensor name (no spaces), the SMA sensor key and the unit

Example:

```yaml
   custom:
      yesterday_consumption:
         key: 6400_00543A01
         unit: kWh
         factor: 1000
```

Over time more sensors will be added as standard sensors to the [pysma library](https://github.com/kellerza/pysma/blob/master/pysma/__init__.py#L18). Feel free to submit additional sensors on that repository.
