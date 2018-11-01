---
layout: page
title: "NILU Air Quality"
description: "Instructions on how to integrate air pollution data from NILU within Home Assistant."
date: 2019-11-01 18:45
sidebar: true
comments: false
sharing: true
footer: true
logo: nilu_logo.png
ha_category: Health
ha_iot_class: "Cloud Polling"
ha_release: 0.82
---

The `nilu_air_quality` platform will show the current air quality data from NILU (Norsk Institutt for luftforskning/Norwegian Institute for Air Research) stations within Norway. The sensor will show the current pollution index as a state, and also contains all measured components from the station within the attributes, as the reason for current pollution index. 

By default the platform finds all nilu stations within 20 km from Home Assistant location. If you have no sensors within 20 km from you Home Assistant location, you can add a custom location or add one of the defined areas in the `areas` configuration. 


```yaml
# Example configuration.yaml entry
sensor:
  - platform: nilu_air_quality
```

{% configuration %}
latitude:
  description: Manually specify latitude. By default the value will be taken from the Home Assistant configuration.
  required: false
  type: number
  default: Provided by Home Assistant configuration
longitude:
  description: Manually specify longitude. By default the value will be taken from the Home Assistant configuration.
  required: false
  type: number
  default: Provided by Home Assistant configuration
areas:
  description: Name of an area to get sensor stations from.
  required: false
  type: list
  keys:
    'Bergen'
    'Birkenes'
    'Bodø'
    'Brumunddal'
    'Bærum'
    'Drammen'
    'Elverum'
    'Fredrikstad'
    'Gjøvik'
    'Grenland'
    'Halden'
    'Hamar'
    'Harstad'
    'Hurdal'
    'Karasjok'
    'Kristiansand'
    'Kårvatn'
    'Lillehammer'
    'Lillesand'
    'Lillestrøm'
    'Lørenskog'
    'Mo i Rana'
    'Moss'
    'Narvik'
    'Oslo'
    'Prestebakke'
    'Sandve'
    'Sarpsborg'
    'Stavanger'
    'Sør-Varanger'
    'Tromsø'
    'Trondheim'
    'Tustervatn'
    'Zeppelinfjellet'
    'Ålesund'
{% endconfiguration %}


```yaml
# Example configuration.yaml entry with extra areas
sensor:
  - platform: nilu_air_quality
    areas:
      - "Bergen"
      - "Narvik"
```
