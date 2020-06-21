---
title: Crime Reports
description: Instructions on how to integrate CrimeReports.com into Home Assistant.
ha_category:
  - Social
logo: crimereports.png
ha_release: 0.42
ha_iot_class: Cloud Polling
ha_domain: crimereports
---

The `crimereports` sensor allows one to track reported incidents occurring in a given area. Incidents include anything reported to [Crime Reports](https://www.crimereports.com). Your regional emergency services may or may not report data. The sensor only counts incidents from the current day.

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml`. Your `radius` should be of sufficient size to capture incidents in your area.

```yaml
sensor:
  - platform: crimereports
    name: NAME_FOR_SENSOR
    radius: RADIUS
```

{% configuration %}
name:
  description: Custom name for the sensor.
  required: true
  type: string
radius:
  description: Radius in meters
  required: true
  type: float
latitude:
  description: Latitude for sensor.
  required: false
  type: float
  default: Your home zone latitude defined in your configuration.
longitude:
  description: Longitude for sensor.
  required: false
  type: float
  default: Your home zone longitude defined in your configuration.
include:
  description: List of incident types to include. See below for a list of valid incidents.
  required: false
  type: list
exclude:
  description: List of incident types to exclude. See below for a list of valid incidents.
  required: false
  type: list
{% endconfiguration %}


## Notes

### Area

Crime Reports captures all incidents in a region defined by a square shape. Home Assistant zones are circular. Therefore, the region defined by a Home Assistant zone in a Crime Reports context is a square that is big enough to fit the zone circle. Practically, this means some incidents may be captured that are outside your zone.

### Incident Types

You can explicitly include or exclude incident types. Specifying `include`s restricts the incidents to those types. Specifying `exclude`s will return all incident types except those specified.

These incident types are available:

- Alarm
- Arson
- Assault
- Assault with Deadly Weapon
- Breaking & Entering
- Community Policing
- Death
- Disorder
- Drugs
- Emergency
- Family Offense
- Fire
- Homicide
- Kidnapping
- Liquor
- Missing Person
- Other
- Other Sexual Offense
- Pedestrian Stop
- Proactive Policing
- Property Crime
- Property Crime Commercial
- Property Crime Residential
- Quality of Life
- Robbery
- Sexual Assault
- Sexual Offense
- Theft
- Theft from Vehicle
- Theft of Vehicle
- Traffic
- Vehicle Recovery
- Vehicle Stop
- Weapons Offense

### Events

The `crimereports` sensor fires a `crimereports_incident` event when a new incident is detected, including the type, description, time, location, and coordinates of the incident.
