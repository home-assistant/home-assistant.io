---
layout: page
title: "Crime Reports"
description: "Instructions on how to integrate CrimeReports.com into Home Assistant."
date: 2017-02-16 11:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Sensor
featured: false
ha_release: 0.39
ha_iot_class: "Local Polling"
---

The `crimereports` sensor allows one to track reported incidents occurring in a Home Assistant zone. Incidents include anything reported to [Crime Reports](http://crimereports.com). Your regional emergency services may or may not report data. The sensor only counts incidents from the current day.

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml`. Your `zone` should be of sufficient size to capture incidents in your area. Your `home` zone is probably too small.

```yaml
zone:
  - name: neighborhood
    latitude: <your latitude>
    longitude: <your longitude>
    radius: <your neighborhood radius>

sensor:
  - platform: crimereports
    zone: neighborhood
```

Configuration options for the Crime Reports Sensor:

- **zone** (*Required*): The zone to monitor.
- **include** (*Optional*): List of incident types to include.
- **exclude** (*Optional*): List of incident types to exclude.
- **update_inverval** (*Optional*): Minimum time interval between updates. Default is 30 minutes. Supported formats:
  - `update_interval: 'HH:MM:SS'`
  - `update_interval: 'HH:MM'`
  - Time period dictionary, e.g.:
    <pre>update_interval:
        # At least one of these must be specified:
        days: 0
        hours: 0
        minutes: 3
        seconds: 30
        milliseconds: 0
    </pre>

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

The `crimealerts` sensor fires a `crimealerts_incident` event when a new incident is detected, including the type, description, time, location, and coordinates of the incident.
