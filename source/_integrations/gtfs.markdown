---
title: General Transit Feed Specification (GTFS)
description: Instructions on how to use public transit open data in Home Assistant.
ha_categories:
  - vehicles_transport.public_transport
ha_iot_class: Local Polling
ha_release: 0.17
ha_codeowners:
  - '@raman325'
ha_domain: gtfs
ha_platforms:
  - sensor
ha_integration_type: service
ha_config_flow: true
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The **GTFS** {% term integration %} gives you the next departure time and associated data between two stops of your public transit network. The data comes from your public transit authority, published in the [General Transit Feed Specification](https://gtfs.org/) format, commonly known as GTFS.

## Prerequisites

You need the URL of a static GTFS feed: a ZIP file published by your transit agency. Most agencies publish one, often on a developer or open data page. The [Mobility Database](https://mobilitydatabase.org/) catalogs feeds from around the world.

Here are some examples:

- [Bay Area Rapid Transit (BART)](https://www.bart.gov/schedules/developers/gtfs) - The rapid transit system for the San Francisco Bay Area.
- [Metropolitan Transit Authority of New York City (MTA)](http://web.mta.info/developers/) - Provides separate data feeds for subway, bus, LIRR and Metro-North of the greater New York City metropolitan region.

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: "Direct link to the agency's static GTFS ZIP file. The feed is downloaded and imported when you add it, which can take several minutes for large feeds."
{% endconfiguration_basic %}

The feed must contain `agency.txt`, `routes.txt`, `stop_times.txt`, `stops.txt`, `trips.txt`, and `calendar.txt` or `calendar_dates.txt`.

### Adding routes

Each route tracks departures from one stop to another. To add a route:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the **GTFS** integration.
2. Next to the feed, select **Add route**.
3. Choose the origin and destination stops from the lists of stops in the feed.

The route is named after its stops, for example **First Street to Third Street**. To use a different name, rename its device.

Each route creates a device with a departure sensor. The sensor's state is the time of the next departure, looking ahead to tomorrow once today's last departure has passed, and its attributes contain information about the trip, such as agency, origin and destination stop, stop times, and route.

## Data updates

The sensor calculates the next departure from the imported timetable, so it does not contact the agency once the feed is imported. The feed is not updated automatically yet. To load a new timetable, remove the feed and add it again.

## Known limitations

- This is a _static_ data source. GTFS Realtime delays and advisories are not supported.
- For feeds with many stops, such as national networks, the stop lists are long.
- Most agencies follow the GTFS format closely, but some feeds contain data that cannot be imported. The [pygtfs](https://github.com/jarondl/pygtfs) library parses the feed.

## Removing the integration

This integration follows standard integration removal. Removing a feed deletes its imported data.

{% include integrations/remove_device_service.md %}

## YAML configuration

For a YAML sensor, download a GTFS ZIP file and put it into a folder named `gtfs` in your configuration directory. For ease of use, rename the file to the agency or data source name (for example, `bart.zip` instead of `google_transit_20160328_v1.zip`). You can also unzip it and place the folder in the `gtfs` folder.

The data is converted into a SQLite database saved alongside the source data. The sensor checks for this database at every startup and imports the ZIP file or folder again if none is found. To update the data, delete the SQLite file and restart Home Assistant.

To find your stop ID, open the `stops.txt` file inside the ZIP file or unzipped folder. The ID is the first column of each row.

You can also set up a sensor for a feed stored in your configuration directory by adding it to your {% term "`configuration.yaml`" %} file.
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
