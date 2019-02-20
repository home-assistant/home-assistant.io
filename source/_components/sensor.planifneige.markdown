---
layout: page
title: "PlanifNeige Montreal"
description: "Instructions on how to integrate street snow clearing information within Home Assistant."
date: 2019-02-20 14:52
sidebar: true
comments: false
sharing: true
footer: true
ha_category:
  - Environment
  - Sensor
ha_iot_class: "Cloud Polling"
ha_release: 0.89
---

The `planifneige` sensor will poll the City of Montreal's snow removal planification APIs for street-by-street update on removal planification.

In order to use the API, you will need to request an API from the [City of Montrea's Open Data team](http://donnees.ville.montreal.qc.ca/dataset/deneigement).

You will also need to obtain the street side identification codes of the streets you want to monitor. The [street database](http://donnees.ville.montreal.qc.ca/dataset/geobase-double) contains the city's street details, including the `COTE_RUE_ID` which is the street side id required for your configuration.


Then add the data to your `configuration.yaml` file as shown in the example:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: planifneige
    api_key: YOUR_API_KEY
    database_path: ./planifneige.db
    streets:
      - name: 2-22 Sainte-Cahterine (Right)
        streetid: 13812091
      - name: 1030-1116 Saint-Laurent (Left)
        streetid: 13811012```

{% configuration %}
api_key:
  description: Your API key.
  required: true
  type: string
streets:
  description: The streets you want to track.
  required: true
  type: list
keys:
  name:
    description: The name of the sensor.
    required: true
    type: string
  streetid:
    description: The street side id to monitor
    required:true
    type: integer
{% endconfiguration %}

