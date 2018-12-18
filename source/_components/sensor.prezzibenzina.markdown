---
layout: page
title: "PrezziBenzina Sensor"
description: "Instructions on how to integrate PrezziBenzina sensors within Home Assistant."
date: 2018-12-14 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: prezzibenzina.png
ha_category: Energy
ha_release: 0.85
ha_iot_class: "Cloud Polling"
---

The `prezzibenzina` platform allows you to monitor the fuel prices with [PrezziBenzina.it](https://www.prezzibenzina.it/) from within Home Assistant and setup automations based on the information.

## {% linkable_title Setup %}

To use this sensor you need the station ID. To get this information go to [PrezziBenzina.it](https://www.prezzibenzina.it/) with your browser and find your station. Then copy the ID from the URL bar.

```text
https://www.prezzibenzina.it/distributori/STATION_ID/
```

## {% linkable_title Configuration %}

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: prezzibenzina
    station: STATION_ID 
```

{% configuration %}
station:
  description: The ID of the station you want to use.
  required: true
  type: string
fuel_types:
  description: "The types of fuels you want to track. Allowed values are `Benzina`, `Benzina speciale`, `Diesel`, `Diesel speciale`, `GPL` or `Metano`."
  required: false
  type: list
name:
  description: The name of the station.
  required: false
  type: string
{% endconfiguration %}

## {% linkable_title Full example %}

This is a full example of the sensor:

```yaml
sensor:
  - platform: prezzibenzina
    station: <id>
    fuel_types: 
      - "Benzina"
      - "GPL"
    name: "Station"
```
