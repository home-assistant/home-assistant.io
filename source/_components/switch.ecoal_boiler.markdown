---
layout: page
title: "eCoal water boiler pumps"
description: "Instructions on how to integrate eSterownik.pl eCoal.pl controller connected pumps into Home Assistant as switches."
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

The `ecoal_boiler` switch platform allows you to control the pumps of [esterownik.pl eCoal boiler controller](https://esterownik.pl/nasze-produkty/ecoal).

## {% linkable_title Configuration %}


```yaml
# Example configuration.yaml entry
switch:
  - platform: ecoal_boiler
    enable:
      central_heating_pump: Wall radiators
      central_heating_pump2: Floor radiators
      # domestic_hot_water_pump: Domestic hot water pump
```

{% configuration %}
enable:
  type: map
  keys:
    central_heating_pump:
      description:  First central heating pump name.
      required: false
      type: string
    central_heating_pump2:
      description:  Second central heating pump name.
      required: false
      type: string
    domestic_hot_water_pump:
      description:  Domestic hot water pump name.
      required: false
      type: string
{% endconfiguration %}



