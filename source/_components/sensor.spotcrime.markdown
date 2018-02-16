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
logo: spotcrime.png
ha_release: 0.63
ha_iot_class: "Cloud Polling"
---

The `spotcrime` sensor allows one to track reported incidents occurring in a given area. Incidents include anything reported to [Spot Crime](http://spotcrime.com). Your regional emergency services may or may not report data. The sensor defaults to counting incidents within one day, but can be customized via configuration.yaml.

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml`. Your `radius` should be of sufficient size to capture incidents in your area. 0.01 = 1 mile.

```yaml
sensor:
  - platform: spotcrime
    name: <any name>
    radius: <your radius>
    days: <your days>
```

Configuration options for the Crime Reports Sensor:

- **name** (*Required*): Name the sensor whatever you want.
- **radius** (*Required*): Radius in meters.
- **days** (*Optional*): Defaults to 1 day.
- **latitude** (*Optional*): Defaults to your home zone latitude.
- **longitude** (*Optional*): Defaults to your home zone longitude.
- **include** (*Optional*): List of incident types to include.
- **exclude** (*Optional*): List of incident types to exclude.


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
