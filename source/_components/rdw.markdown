---
layout: page
title: "RDW Sensor"
description: "Instructions on how to set up RDW sensors within Home Assistant."
date: 2019-05-04
sidebar: true
comments: false
sharing: true
footer: true
logo: rdw.png
ha_category:
  - Car
  - Sensor
ha_release: 0.93
ha_iot_class: Cloud Polling
---

The `rdw` platform allows you to integrate data from the [RDW](https://www.rdw.nl) (Netherlands Vehicle Authority). It will track the APK expiration date, the insurance state and notifications if the manufacturer of the car has issued a recall because of a serious safety problem. It is possible to add multiple cars with Dutch license plates to your Home Assistant configuration.

## {% linkable_title Configuration %}

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
sensor:
  - platform: rdw
    name: "Toyota Auris"
    plate: 16RSL9
    dateformat: '%d %b %Y'
    sensors:
      - expdate
      - insured
      - recall
```

{% configuration %}
name:
  description: Friendly name for the car
  default: "RDW"
  required: false
  type: string
plate:
  description: License plate ID
  required: true
  type: string
dateformat:
  description: Date format string
  required: false
  default: "%d-%m-%Y"
  type: string
sensors:
  description: One or more sensors to be monitored
  required: false
  type: list
  keys:
    expdate:
      description: Expiration date for the car.
      required: false
      type: string
    insured:
      description: Insurance state for the car.
      required: true
      type: string
    recall:
      description: Number of outstanding security recalls for the car.
      required: true
      type: integer
{% endconfiguration %}

## {% linkable_title Full example %}

{% raw %}
```yaml
sensor:
  - platform: rdw
    name: "Toyota Auris"
    plate: 16RSL9
    dateformat: '%d %b %Y'
    sensors:
      - expdate
      - insured
      - recall

automation:
    # ------------------------------------------------------- #
    # Notify 21 days before the APK date expires              #
    # ------------------------------------------------------- #
  - alias: APK date expiration notification
    trigger:
      - platform: template
        value_template: "{{ ((as_timestamp(strptime(states('sensor.toyota_auris_expdate'), '%d %b %Y')) / 86400) | int) == ((as_timestamp(strptime(states('sensor.date'), '%Y-%m-%d')) / 86400) | int) + 21 }} }}"
    action:
      - service: notify.owner
        data_template:
          title: '*Auto*'
          message: De APK keuring verloopt over 21 dagen op {{ states.sensor.bmw_expdate.state }}. Plan een APK keuring bij de garage.
```
{% endraw %}
