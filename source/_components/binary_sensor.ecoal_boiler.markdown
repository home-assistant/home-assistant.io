---
layout: page
title: "eCoal water boiler sensors"
description: "Instructions on how to integrate eSterownik.pl eCoal.pl controller connected sensors into Home Assistant."
date: 2015-08-07 14:00
sidebar: true
comments: false
sharing: true
footer: true
# logo: raspberry-pi.png
ha_category: Water heater
ha_release: not yet
ha_iot_class: "Local Push"
---

The `ecoal_boiler` binary sensor platform allows you to read sensor values of [esterownik.pl eCoal boiler controller](https://esterownik.pl/nasze-produkty/ecoal).

## {% linkable_title Configuration %}

To use your eCoal controller in your installation, provide access data in `ecoal_boiler` and pick names of sensors to be enabled 
in your `configuration.yaml` file:

```yaml
sensor:
  - platform: ecoal_boiler
    enable:
      outdoor_temp: Outdoor
      indoor_temp: Szimel room
      indoor2_temp: Szajn room
      domestic_hot_water_temp: Domestic hot water
      feedwater_out_temp: Feedwater
```

{% configuration %}
enable:
  type: map
  keys:
    outdoor_temp:
      description: Enabled outdoor temperature sensor name.
      required: false
      type: string
    indoor_temp:
      description: Enabled indoor temperature sensor name.
      required: false
      type: string
    indoor2_temp:
      description: Enabled second indoor temperature sensor name.
      required: false
      type: string
    domestic_hot_water_temp:
      description: Enabled domestic host water temperature sensor name.
      required: false
      type: string
    target_domestic_hot_water_temp:
      description: Target domestic host water temperature setting name.
      required: false
      type: string
    feedwater_in_temp:
      description: Enabled feedwater input temperature sensor name.
      required: false
      type: string
    feedwater_out_temp:
      description: Enabled feedwater output temperature sensor name.
      required: false
      type: string
    target_feedwater_temp:
      description: Target feedwater output temperature setting name.
      required: false
      type: string
    coal_feeder_temp:
      description: Enabled coal/wood feeder temperature sensor name.
      required: false
      type: string
    exhaust_temp:
      description: Enabled exhaust temperature sensor name.
      required: false
      type: string
{% endconfiguration %}
