---
title: General Transit Feed Specification (GTFS)
description: Instructions on how to use public transit open data in Home Assistant.
ha_category:
  - Transport
ha_iot_class: Local Polling
ha_release: 0.17
ha_domain: gtfs
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `gtfs` {% term integration %} will give you the next departure time and associated data from your public transit station/stop. The data comes from your chosen public transit authority and is formatted as [General Transit Feed Specification](https://developers.google.com/transit/gtfs/) data, commonly known as GTFS.

You need to find a valid GTFS data set, which you can usually find just by searching the internet. Most public transit authorities have GTFS available somewhere, as Google requires public transit authorities to provide the data if they wish to appear on Google Maps. You may also be able to find data at [Mobility Database](https://mobilitydatabase.org/).

Here are some examples:

- [Bay Area Rapid Transit (BART)](https://www.bart.gov/schedules/developers/gtfs) - The rapid transit system for the San Francisco Bay Area.
- [Metropolitan Transit Authority of New York City (MTA)](http://web.mta.info/developers/) - Provides separate data feeds for subway, bus, LIRR and Metro-North of the greater New York City metropolitan region.
- [Official Timetable Switzerland](https://opentransportdata.swiss/en/dataset/timetable-2019-gtfs) - The official timetable data for Switzerland in 2019.

You need to download a GTFS ZIP file and put it into a folder named `gtfs` in your configuration directory. For ease of use, it is suggested that you rename the file to just the agency/data source name (i.e., `bart.zip` instead of `google_transit_20160328_v1.zip`). You can also unzip and place a folder in the `gtfs` folder.

The data will be converted into a queryable format and saved as a SQLite3 database alongside the source data. The sensor will check for the existence of this SQLite3 data at every startup and will re-import the ZIP/Folder if none is found.

To update the data, delete the SQLite3 file and restart Home Assistant.

To find your stop ID, open the `stops.txt` file inside the ZIP file/unzipped folder. The format of the ID is different for every transit agency but will be the first "column" (meaning the string before the first comma) in a row.

The sensor attributes will contain all related information for the specific trip, such as agency information, origin and destination stop information, origin and destination stop time and the route information.

Your mileage may vary depending on the transit agency used. Most agencies respect the GTFS format but some will do weird things like adding extra columns or using different data formatting. If you have any data specific issues, please report them to the [PyGTFS](https://github.com/jarondl/pygtfs) project, which is what the GTFS sensor uses to parse data.

**Please note**: This is a _static_ data source. Currently, there is no GTFS Realtime support in this sensor due to issues surrounding parsing the protocol buffer format in Python 3. Once those issues have been fixed Realtime support will be added. Once added, the sensor will check for any delays and advisories and report them in the sensor as needed.

To enable the GTFS {% term integration %}, you need to add it to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: gtfs
    origin: STOP_ID
    destination: STOP_ID
    data: DATA_SOURCE
```

{% configuration %}
origin:
  description: The stop ID of your origin station.
  required: true
  type: string
destination:
  description: The stop ID of your destination station.
  required: true
  type: string
data:
  description: The name of the ZIP file or folder containing the GTFS data. It must be located inside the `gtfs` folder of your configuration directory.
  required: true
  type: string
name:
  description: Name to use in the frontend.
  required: false
  default: GTFS Sensor
  type: string
offset:
  description: "A minimum delay to look for. If a departure is in less time than `offset`, it will be ignored. Set the value either in seconds (`integer`), or using one of these `time` formats: `offset: 'HH:MM:SS'`, `offset: 'HH:MM'`. "
  required: false
  default: 0
  type: [integer, time]
include_tomorrow:
  description: Also search through tomorrow's schedule if no more departures are set for today.
  required: false
  default: false
  type: boolean
{% endconfiguration %}
