---
layout: page
title: "KNX Sensor"
description: "Instructions on how to use the KNX Sensor with Home Assistant."
date: 2016-08-20 22:24
sidebar: true
comments: false
sharing: true
footer: true
logo: knx.png
ha_category: Sensor
ha_release: 0.29
ha_iot_class: "Local Push"
---

The `knx` sensor platform allows you to monitor [KNX](http://www.knx.org) sensors.

The `knx` component must be configured correctly, see [KNX Component](/components/knx).

## {% linkable_title Configuration %}

To use your KNX sensor in your installation, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: knx
    name: Heating.Valve1
    address: '2/0/0'
```


{% configuration %}
address:
  description: KNX group address of the sensor.
  required: true
  type: string
name:
  description: A name for this device used within Home Assistant.
  required: false
  type: string
type:
  description: A type from the following table can be defined. The DPT of the group address should match the expected KNX DPT to be parsed correctly.
  required: false
  type: string
{% endconfiguration %}


| type               | unit | expected KNX DPT |
|--------------------|------|------------------|
| percent            | %    | 5.001            |
| pulse              |      | 5.010            |
| temperature        | °C   | 9.001            |
| humidity           | %    | 9.007            |
| illuminance        | lx   | 9.004            |
| brightness         | lx   | 7.013            |
| speed_ms           | m/s  | 9.005            |
| current            | mA   | 7.012            |
| voltage            | mV   | 9.020            |
| power              | W    | 14.056           |
| electric_current   | A    | 14.019           |
| electric_potential | V    | 14.027           |
| energy             | J    | 14.031           |
| frequency          | Hz   | 14.033           |
| heatflowrate       | W    | 14.036           |
| phaseanglerad      | rad  | 14.054           |
| phaseangledeg      | °    | 14.055           |
| powerfactor        |      | 14.057           |
| speed              | m/s  | 14.065           |
| enthalpy           | H    | 9.*              |
| ppm                | ppm  | 9.008            |
| DPT-7              |      | 7.*              |
| 2byte_unsigned     |      | 7.*              |
| DPT-9              |      | 9.*              |
| DPT-12             |      | 12.*             |
| 4byte_unsigned     |      | 12.*             |
| DPT-13             |      | 13.*             |
| 4byte_signed       |      | 13.*             |
| DPT-14             |      | 14.*             |
| 4byte_float        |      | 14.*             |



## {% linkable_title Full example %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: knx
    name: Heating.Valve1
    address: '2/0/0'
    type: 'percent'
  - platform: knx
    name: Kitchen.Temperature
    address: '6/2/1'
    type: 'temperature'
```
