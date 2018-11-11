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
ha_release: 0.83
---

The `nilu_air_quality` platform shows measurements of current air quality from NILU (Norsk Institutt for luftforskning/Norwegian Institute for Air Research) sensor stations within Norway. Makes data from the open api at luftkvalitet.info and nilu.no available in Home Assistant.

The sensor platform can give a number of measurements from the sensor stations, see `monitored_conditions` for officially supported conditions, and additionally a health risk index calculated for the station by NILU. Every stations does not measure all the conditions, and thus all stations cannot deliver on every conditions, however all stations have health risk index calculated (`index`), and most stations monitors and can deliver `NO2`, `PM10` and `PM2.5` measurements. 

```yaml
# Example configuration.yaml entry
sensor:
  - platform: nilu_air_quality
    monitored_conditions:
      - index
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
  name:
    description: Name of the sensor to use in the frontend.
    required: false
    default: NILU
    type: string
  monitored_conditions:
    description: A list of conditions you want to monitor.
    required: true
    type: list
    keys:
      index:
        description: Show the health risk considered with the measured pollution. 
      PM1:
        description: Show the particle sensors (particles 1 microns and below).
      PM2.5:
        description: Show the particle sensors (particles 2.5 microns and below).
      PM10:
        description: Show the particle sensors (particles 10 microns and below).
      NO:
        description: Show the consentration of Nitric oxide (NO) measured.
      NO2:
        description: Show the consentration of Nitrogen dioxide (NO2) measured. 
      NOx:
        description: Show the measured consentration of NOx (combination of Nitric oxide and Nitrogen dioxide) present at the sensor station.
      O3:
        description: Show the consentraion of Ozone (O3) measured.
      CO:
        description: Show the consentraion of Carbon monoxide (CO) measured.
      SO:
        description: Show the consentration of Sulfur monoxide (SO) measured.
  area:
    description: Name of an area to get sensor stations from. See available areas below.
    required: exclusive
    type: string
  station: 
    description: Name of a specific station to get measurements from.
    required: exclusive
    type: string
  show_on_map:
    description: Option to show the position of the sensor station on the map.
    required: optional
    default: false
    type: boolean
{% endconfiguration %}


## {% linkable_title Health risk index explainations %}
Explainations for the `state`'s which can be showed for the monitored condition `index`. 

### {% linkable_title Low  %}
Low or no health risk linked to measured air pollution. Outdoor activites are recommended. 

### {% linkable_title Moderate %}
Health effects may occur in some asthmatics and people with other respiratory diseases, as well as serious cardiovascular diseases. Outdoor activity can be recommended for the vast majority, but some should consider their activity in areas with high traffic or high emissions.

### {% linkable_title High %}
Health effects may occur in asthmatics and people with other respiratory diseases, as well as serious cardiovascular disease. Children with respiratory distress (asthma, bronchitis) and adults with severe cardiac or respiratory distress should reduce outdoor activity and not stay in the most polluted areas.

### {% linkable_title Extreamly high %}
Sensitive groups in the population can have health effects. Respiratory irritation and discomfort may occur in healthy subjects. People with heart or respiratory distress should reduce outdoor activity and not stay in the most polluted areas. 

## {% linkable_title Available areas %}
The `area` configuration is restricted to the areas NILU has defined. Here is the list of available areas:
- `Bergen`
- `Birkenes`
- `Bodø`
- `Brumunddal`
- `Bærum`
- `Drammen`
- `Elverum`
- `Fredrikstad`
- `Gjøvik`
- `Grenland`
- `Halden`
- `Hamar`
- `Harstad`
- `Hurdal`
- `Karasjok`
- `Kristiansand`
- `Kårvatn`
- `Lillehammer`
- `Lillesand`
- `Lillestrøm`
- `Lørenskog`
- `Mo i Rana`
- `Moss`
- `Narvik`
- `Oslo`
- `Prestebakke`
- `Sandve`
- `Sarpsborg`
- `Stavanger`
- `Sør-Varanger`
- `Tromsø`
- `Trondheim`
- `Tustervatn`
- `Zeppelinfjellet`
- `Ålesund`

## {% linkable_title Configuration examples %}

Example of adding health risk monitoring from sensor stations around home assistant location.

```yaml
# Example configuration.yaml entry
# Adds all sensor stations within 20km.
# Monitors health risk index
- platform: nilu_air_quality
  monitored_conditions:
    - index
```

Example where the sensors are also added to the map.

```yaml
# Example configuration.yaml entry
# Adds all sensor stations within 20km.
# Monitors health risk index
# Additionally adds the sensors to the map.
- platform: nilu_air_quality
  show_on_map: True
  monitored_conditions:
    - index
```

Exapmle of specific station.

```yaml
# Example configuration.yaml entry
# Monitors stations 'Alnabru'
- platform: nilu_air_quality
  station: Alnabru
  monitored_conditions:
    - index
```

Example of specific monitored condition on a specific station.

```yaml
# Example configuration.yaml entry
# Monitors the specific station 'Zeppelinfjellet' on Svalbard.
# Monitors Ozone levels.
- platform: nilu_air_quality
  station: Zeppelinfjellet
  monitored_conditions:
    - O3
```

Example of getting stations from a specified area, giving the sensors a custom name and have different monitored conditions.

```yaml
# Example configuration.yaml entry
# Stations from specific area, 'Bergen'
# Custom name for the sensors. 
# Monitors health risk index and NO2.
- platform: nilu_air_quality
  area: Bergen
  name: Forurensing Bergen
  monitored_conditions:
    - index
    - NO2
```