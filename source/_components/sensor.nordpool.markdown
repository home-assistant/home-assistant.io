---
layout: page
title: "Nordpool Sensor"
description: "Instructions on how to integrate Nordpool within Home Assistant."
date: 2019-03-06
sidebar: true
comments: false
sharing: true
footer: true
logo: nordpool.png
ha_category: Energy
ha_release: 0.88
ha_iot_class: "Cloud Polling"
---

The `Nordpool` sensor provides the current electricity price for Scandinavian countries.

## {% linkable_title Configuration %}

```yaml
sensor:
  - platform: nordpool
    name: El pris
    currency: DKK
    region: DK1
```

{% configuration %} repetier:
  type: list
  required: true
  keys:
    name:
      description: Name of the sensor.
      required: true
      type: string
    currency:
      description: Your preferred currency. Valid currencies are: DKK, NOK, SEK, EUR (case-sensitive)
      required: true
      type: string
    region:
      description: The region for which you want to fetch the price. See below for valid regions.
      required: true
      type: string
{% endconfiguration %}

## {% linkable_title Valid regions %}

The valid regions for the Nordpool sensors are:

* DK1 
* DK2
* EE
* FI
* LT
* LV
* Oslo
* Kr.sand
* Bergen
* Molde
* Tr.heim
* Tromsø
* SE1
* SE2
* SE3
* SE4
* SYS

Region names are case-sensitive
