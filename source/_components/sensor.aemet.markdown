---
layout: page
title: "AEMET Sensor"
description: "Get AEMET's stations weather data."
date: 2018-12-21 8:00
sidebar: true
comments: false
sharing: true
footer: true
logo: aemet.png
ha_category: Sensor
ha_release: 0.84
ha_iot_class: "Cloud Polling"
---

The `AEMET` platform uses the [AEMET - Agencia Estatal de Meteorología de España](http://www.aemet.es) API service as a source for meteorological data for your location. `AEMET` has several weather stations across Spain so you can get information from any of them by using the `station_id`.

## {% linkable_title Configuration %}

To add `AEMET` platform to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: aemet
    name: Retiro station
    api_key: YOUR_API_KEY
    station_id: 3195
    monitored_conditions:
      - temperature
      - humidity
      - pressure
      - precipitation
      - snow
      - visibility
```

{% configuration %}
  name:
    description: Name to use in the frontend.
    required: false
    default: AEMET
    type: string
  api_key:
    description: API key token.
    required: true
    type: string
  station_id:
    description: ID of the station.
    required: true
    type: string
  monitored_conditions:
    description: The conditions types to monitor.
    required: false
    default: All the available conditions
    type: list
    keys:
      temperature:
        description: The current temperature.
      humidity:
        description: The current humidity.
      pressure:
        description: The current pressure.
      precipitation:
        description: The current precipitation.
      snow:
        description: The current snow.
      visibility    :
        description: The current visibility.
{% endconfiguration %}

All the data will be fetch from https://opendata.aemet.es/

To request your API key, go to [AEMET API website](https://opendata.aemet.es/centrodedescargas/inicio), at the bottom you will find "Obtención de API Key".

To know the nearest `station_id` to your location, go to [AEMET API - Acceso general](https://opendata.aemet.es/centrodedescargas/productosAEMET?) and drill down to "Observación convencional > Datos de observación. Último elaborado" and choose your state to know the available stations for the state. You will see the `station_id` near the name of the station. For example: in "3195 - Madrid, Retiro" the `station_id` is just 3195
