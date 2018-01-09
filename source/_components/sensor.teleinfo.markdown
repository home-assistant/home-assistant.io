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
ha_release: "0.61"
---

The `teleinfo` sensor will read data stream from french electric meters. (Description in french
[here](http://www.enedis.fr/sites/default/files/Enedis-NOI-CPT_02E.pdf). 

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry

- platform: teleinfo
  name: "edf"
  device: "/dev/ttyUSB0"

- platform: template
  sensors:
    teleinfo_hchc:
      value_template: '{{ states.sensor.edf.attributes["HCHC"] }}'
      unit_of_measurement: 'Wh'

- platform: template
  sensors:
    teleinfo_hchp:
      value_template: '{{ states.sensor.edf.attributes["HCHP"] }}'
      unit_of_measurement: 'Wh'

- platform: template
  sensors:
    teleinfo_hhphc:
      value_template: '{{ states.sensor.edf.attributes["HHPHC"] }}'
      unit_of_measurement: ''

- platform: template
  sensors:
    teleinfo_iinst:
      value_template: '{{ states.sensor.edf.attributes["IINST"] }}'
      unit_of_measurement: 'A'

- platform: template
  sensors:
    teleinfo_imax:
      value_template: '{{ states.sensor.edf.attributes["IMAX"] }}'
      unit_of_measurement: 'A'

- platform: template
  sensors:
    teleinfo_papp:
      value_template: '{{ states.sensor.edf.attributes["PAPP"] }}'
      unit_of_measurement: 'vA'

- platform: template
  sensors:
    teleinfo_ptec:
      value_template: '{{ states.sensor.edf.attributes["PTEC"] }}'
      unit_of_measurement: ''

- platform: template
  sensors:
    teleinfo_isousc:
      value_template: '{{ states.sensor.edf.attributes["ISOUSC"] }}'
      unit_of_measurement: 'A'
```

Configuration variables:

- **device** (*Required*): The port where your device is connected to your Home Assistant host.
- **name** (*Optional*): Name of your device

