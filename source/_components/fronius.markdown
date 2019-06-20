---
layout: page
title: "Fronius"
description: "Instructions on how to connect your Fronius Inverter to Home Assistant."
date: 2019-06-20 00:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category:
  - Energy
  - Sensor
logo: fronius.png
ha_iot_class: Local Polling
ha_release: 0.96
---

The `fronius` sensor will poll a [Fronius](http://www.fronius.com/) solar inverter, battery system or smart meter and present the values as sensors (or attributes of sensors) in Home Assistant.

## {% linkable_title Configuration %}

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
sensor:
  - platform: fronius
    resource: FRONIUS_IP_ADRESS
    monitored_conditions:
    - sensor_type: inverter
```

{% configuration %}
resource:
  description: "The IP address of the Fronius device"
  required: true
  type: string
monitored_conditions:
  description: "Conditions to display in the frontend"
  required: true
  type: list
  keys:
    type:
      description: "The kind of device, can be one of \"inverter\", \"storage\", \"meter\", or \"power_flow\""
      required: true
      type: string
    scope:
      description: "The device type for storage and inverter, can be either \"device\" or \"system\""
      required: false
      type: string
      default: "device"
    device:
      description: "The id of the device to poll"
      required: false
      default: "\"1\" for inverters and \"0\" for other devices such as storages in compliance with Fronius Specs"
{% endconfiguration %}

## {% linkable_title Examples %}

When including more of the components that one Fronius device offers, 
a list of sensors that are to be integrated can be given like below.

```yaml
sensor:
  - platform: fronius
    resource: FRONIUS_IP_ADDRESS
    monitored_conditions:
    - sensor_type: inverter
      device: 1
    - sensor_type: meter
      scope: system
    - sensor_type: meter
      device: 3
    - sensor_type: storage
      device: 0
    - sensor_type: power_flow
```

## {% linkable_title Sensors configuration %}

To extract more detailed values from the state of each integrated sensor and to circumvent undefined values,
it is recommended to use template sensors as an interface:

{% raw %}
```yaml
- platform: template
  sensors:
    electricity_inverter1_power_netto:
      unit_of_measurement: 'W'
      value_template: >-
        {% if states.sensor.fronius_1921684247_inverter_1.attributes.power_ac is defined -%}
          {{ states.sensor.fronius_1921684247_inverter_1.attributes.power_ac | float | round(2) }}
        {%- else -%}
          0
        {%- endif %}
    electricity_autonomy:  
      unit_of_measurement: '%'
      value_template: >-
        {% if states.sensor.fronius_1921684247_power_flow.attributes.relative_autonomy is defined -%}
          {{ states.sensor.fronius_1921684247_power_flow.attributes.relative_autonomy | float | round(2) }}
        {%- else -%}
          0
        {%- endif %}
```
{% endraw %}
