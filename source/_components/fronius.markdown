---
layout: page
title: "Fronius"
description: "Instructions on how to connect your Fronius Inverter to Home Assistant."
date: 2018-01-05 11:43:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category:
  - Energy
  - Sensor
logo: fronius.png
ha_iot_class: Local Polling
ha_release: 0.93
---

The `fronius` sensor will poll a [Fronius](http://www.fronius.com/) solar inverter, battery system or smart meter and present the values as sensors (or attributes of sensors) in Home Assistant.
To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
sensor:
  - platform: fronius
    resource: FRONIUS_URL_HERE
    monitored_conditions:
    - sensor_type: inverter
```

### {% linkable_title Configuration variables %}

{% configuration %}
resource:
  description: The (IP) address of the Fronius device
  required: true
  type: string
monitored_conditions:
  description: Conditions to display in the frontend
  required: true
  type: list
  keys:
    type:
      description: The kind of device, can be one of `inverter`, `storage`, `meter`, or `power_flow`
      required: true
      type: string
    scope:
      description: The used for device type for storage and inverter, can be either `device` or `system`
      required: false
      type: string
      default: `device`
    device:
      description: The id of the device to poll, set by default to 
      required: false
      default: `1` for inverters and `0` for storages according to Fronius Specs
{% endconfiguration %}

### {% linkable_title More complete example %}

```yaml
sensor:
  - platform: fronius
    resource: FRONIUS_URL_HERE
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

### {% linkable_title Sensors configuration %}

The sensors depend on the state of the Fronius device, that's why it is recommended to use template sensors as an interface:

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
