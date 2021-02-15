---
title: Spot Crime
description: Instructions on how to integrate spotcrime.com into Home Assistant.
ha_release: 0.65
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_domain: spotcrime
ha_platforms:
  - sensor
---

<div class='note warning'>
SpotCrime is no longer handing out API keys to integrate their services.
</div>

The `spotcrime` sensor allows one to track reported incidents occurring in a given area. Incidents include anything reported to [Spot Crime](https://www.spotcrime.info). Your regional emergency services may or may not report data. The sensor defaults to counting incidents within one day, but can be customized via `configuration.yaml`.

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml`. Your `radius` should be of sufficient size to capture incidents in your area. 0.01 = 1 mile.

```yaml
sensor:
  - platform: spotcrime
    name: NAME
    radius: SEARCH_RADIUS
    api_key: YOUR_API_KEY
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
  type: integer
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
