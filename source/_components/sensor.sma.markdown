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
sensor sma:
  - platform: sma
    host: IP_ADDRESS_OF_DEVICE
    password: YOUR_SMA_PASSWORD
    sensors:
      current_consumption: [total_consumption]
      current_power: 
      total_yield: 
```

Configuration variables:

- **host** (*Required*): The IP address of the SMA WebConnect module.
- **password** (*Required*): The password of the SMA WebConnect module.
- **group** (*Optional*): The user group, which can be either `user` (the default) or `installer`.
- **sensors** (*Required*): A dictionary of sensors that will be added. The value of the dictionary can include sensor names that will be shown as attributes.
- **custom** (*Optional*): A dictionary of custom sensor key values and units

Sensors configuration:

The sensors can be any one of the following:
- current_power
- current_consumption
- total_power
- total_consumption

You can create composite sensors, where the sub-sensors will be attributes of the main sensor, e.g.

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
