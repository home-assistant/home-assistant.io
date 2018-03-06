---
layout: page
title: "Spot Crime"
description: "Instructions on how to integrate spotcrime.com into Home Assistant."
date: 2018-02-16 9:30
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Sensor
ha_release: 0.65
ha_iot_class: "Cloud Polling"
---

The `spotcrime` sensor allows one to track reported incidents occurring in a given area. Incidents include anything reported to [Spot Crime](http://spotcrime.com). Your regional emergency services may or may not report data. The sensor defaults to counting incidents within one day, but can be customized via configuration.yaml.

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml`. Your `radius` should be of sufficient size to capture incidents in your area. 0.01 = 1 mile.

You will need to request an API key from [Spotcrime](mailto:pyrrhus@spotcrime.com).

```yaml
sensor:
  - platform: spotcrime
    name: <any name>
    radius: <your radius>
    api_key: <"your_api_key_here">
```

{% configuration %}
name:
  description: Name the sensor what you'd like.
  required: true
  type: string
radius:
  description: Radius you'd like to search within. 0.01 = 1 mile.
  required: true
  type: float
api_key:
  description: The API key to access the service.
  required: true
  type: string
days:
  description: Number of days you'd like see to crime statistics for.
  required: false
  type: int
include:
  description: Event types you want statistics for.
  required: false
  type: list
exclude:
  description: Event types to ignore statistics for.
  required: false
  type: list
{% endconfiguration %}


## Notes

### Incident Types

You can explicitly include or exclude incident types. Specifying `include`s restricts the incidents to those types. Specifying `exclude`s will return all incident types except those specified.

These incident types are available:

- Arrest
- Arson
- Assault
- Burglary
- Robbery
- Shooting
- Theft
- Vandalism
- Other

### Events

The `crimealerts` sensor fires a `crimealerts_incident` event when a new incident is detected, including the type, time, and location of the incident.
