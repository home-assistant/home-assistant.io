---
layout: page
title: Dominion Energy Sensor
description: "Instructions on how to set up Dominion Energy within Home Assistant."
date: 2018-03-21 08:00
sidebar: false
comments: false
sharing: true
footer: true
logo: dominionenergy.jpg
ha_category: Sensor
ha_release: 0.55.7
ha_iot_class: "Cloud Polling"
---

The `dominionenergy` sensor component allows you to monitor the cost of Washington Dominion Energy

## Example for `configuration.yaml` :

```yaml
sensor:
  - platform: dominionenergy
    username: yourusername
    password: yourpassword
    name: optionalName

{% configuration %}

name:
  description: Name of device in Home Assistant.
  required: false
  default: dominion_energy
  type: string
username:
  description: Username used to sign into the Dominion Energy web client
  required: true
  type: string
password:
  description: Password used to sign into the Dominion Energy web client.
  required: true
  type: string
  
{% endconfiguration %}



if you don't have username you can register at [Dominion Energy](http://dominionenergy.com)  using you account number
