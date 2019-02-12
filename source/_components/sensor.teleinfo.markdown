---
layout: page
title: "EDF Teleinfo"
description: "Instructions on how to integrate an EDF teleinfo sensor into Home Assistant."
date: 2017-11-15 19:08
sidebar: true
comments: false
sharing: true
footer: true
logo: edf.png
ha_category: Sensor
ha_iot_class: "Energy"
ha_release: "0.80"
---

The `teleinfo` sensor will read data stream from french electric meters. (Description in french
[here](http://www.enedis.fr/sites/default/files/Enedis-NOI-CPT_02E.pdf).

To enable this sensor, add the following lines to your `configuration.yaml` file:

{% raw %}
```yaml
# Example configuration.yaml entry

- platform: teleinfo
  name: "edf"
  device: "/dev/ttyUSB0"
```
{% endraw %}


Configuration variables:

{% configuration %}
device:
  description: The port where your device is connected to your Home Assistant host
  required: true
  type: string
  default: /dev/ttyUSB0
name:
  description: Name of your device
  required: false
  type: string
  default: teleinfo
{% endconfiguration %}

## {% linkable_title Examples %}

In this section you find some real life examples of how to use this sensor.

{% raw %}
```yaml
- platform: teleinfo
  name: "edf"
  device: "/dev/ttyUSB0"

- platform: template
  sensors:
    teleinfo_hchc:
      value_template: {{ state_attr('sensor.edf','HCHC') }}
      unit_of_measurement: 'Wh'

- platform: template
  sensors:
    teleinfo_hchp:
      value_template: {{ state_attr('sensor.edf','HCHC') }}
      unit_of_measurement: 'Wh'

- platform: template
  sensors:
    teleinfo_hhphc:
      value_template: {{ state_attr('sensor.edf','HHPHC') }}

- platform: template
  sensors:
    teleinfo_iinst:
      value_template: {{ state_attr('sensor.edf','IINST') }}
      unit_of_measurement: 'A'

- platform: template
  sensors:
    teleinfo_imax:
      value_template: {{ state_attr('sensor.edf','IMAX') }}
      unit_of_measurement: 'A'

- platform: template
  sensors:
    teleinfo_papp:
      value_template: {{ state_attr('sensor.edf','PAPP') }}
      unit_of_measurement: 'vA'

- platform: template
  sensors:
    teleinfo_ptec:
      value_template: {{ state_attr('sensor.edf','PTEC') }}

- platform: template
  sensors:
    teleinfo_isousc:
      value_template: {{ state_attr('sensor.edf','ISOUSC') }}
      unit_of_measurement: 'A'
```
{% endraw %}
