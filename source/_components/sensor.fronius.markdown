---
layout: page
title: "Fronius "
description: "Instructions on how to connect your Fronius Inverter to Home Assistant."
date: 2018-01-05 11:43:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Energy
logo: fronius.png
ha_iot_class: "Local Polling"
ha_release: 0.60
---


The `fronius` sensor will poll a [Fronius](http://www.fronius.com/) solar inverter, battery system or smart meter and present the values as sensors (or attributes of sensors) in Home Assistant.

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: fronius
    host: 192.168.42.47
    device: 1
    type: inverter

  - platform: fronius
    host: 192.168.42.47
    device: 2
    type: inverter

  - platform: fronius
    host: 192.168.42.47
    type: inverter
    scope: system

  - platform: fronius
    host: 192.168.42.49
    type: storage

  - platform: fronius
    host: 192.168.42.49
    type: meter

  - platform: fronius
    host: 192.168.42.49
    type: power_flow

```

Configuration variables:

- **host** (*Required*): The IP address of the Fronius device.
- **type** (*Required*): The kind of device, can be one of `inverter`, `storage`, `meter`, or `power_flow`
- **scope** (*Optional*): The used for device type storage and inverter, can be either `device` (the default) or `system`.
- **device** (*Optional*): The id of the device to poll, set by default to `1` for inverters and `0` for storages according to Fronius Specs.

Sensors configuration:

The sensors depend on the state of the Fronius device, that's why it is recommended to use template sensors as an interface:

```yaml
- platform: template
  sensors:
    electricity_inverter1_power_netto:
      unit_of_measurement: 'W'
      value_template: >-
        {% if states.sensor.fronius_inverter_1921684247_1.attributes.power_ac is defined %}
          {{ states.sensor.fronius_inverter_1921684247_1.attributes.power_ac | float | round(2) }}
        {% else %}
          0
        {% endif %}
    electricity_autonomy:  
      unit_of_measurement: '%'
      value_template: >-
        {% if states.sensor.fronius_power_flow_1921684249.attributes.relative_autonomy is defined %}
          {{ states.sensor.fronius_power_flow_1921684249.attributes.relative_autonomy | float | round(2) }}
        {% else %}
          0
        {% endif %}
```

The component is based on  [pyfronius library](https://github.com/nielstron/pyfronius) by Niels Mündler and Gerrit Beine.
