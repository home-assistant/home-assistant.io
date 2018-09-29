---
layout: page
title: "Radarr Sensor"
description: "Instructions on how to integrate Radarr sensors with Home Assistant"
date: 2017-05-04 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: radarr.png
ha_category: Downloading
ha_release: 0.47
---


This `radarr` sensor platform pulls data from a given [Radarr](https://radarr.video/) instance.

## {% linkable_title Configuration %}

To use your Radarr sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: radarr
    api_key: YOUR_API_KEY
```

Configuration variables:

- **api_key** (*Required*): Your Radarr API key, found in Settings > General in the Radarr Web UI.
- **host** (*Optional*): The host Radarr is running on. Defaults to `localhost`.
- **port** (*Optional*): The port Radarr is running on. Defaults to 7878.
- **urlbase** (*Optional*): The base URL Radarr is running under. Defaults to `/`.
- **monitored_conditions** array (*Optional*): Conditions to display on the frontend. Defaults to `movies`.
  - **movies**: The number of movies in Radarr.
  - **upcoming**: The number of upcoming movie releases (physical and in cinemas).
  - **commands**: The number of commands being run.
  - **diskspace**: The available disk space.
  - **status**: The current system status information.
- **days** (*Optional*): How many days to look ahead for the upcoming sensor, 1 means today only.  Defaults to 1.
- **include_paths** (*Optional*): Array of file paths to include when calculating diskspace. Leave blank to include all.
- **unit**: (*Optional*): The unit to display disk space in. Defaults to GB.
- **ssl**:  boolean (*Optional*): Whether or not to use SSL for Radarr.

## {% linkable_title Examples %}

In this section you find some real life examples of how to use this sensor.

### {% linkable_title Get Episodes airing in next 2 days %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: radarr
    api_key: YOUR_API_KEY
    host: 192.168.1.8
    monitored_conditions:
      - upcoming
    days: 2
```

### {% linkable_title Enable SSL %}

SSL may run on a different port than the default (7878). The SSL port can be bound to any port in Radarr, so it should be set in the config here (unless it is changed to 7878).

```yaml
# Example configuration.yaml entry
sensor:
  - platform: radarr
    api_key: YOUR_API_KEY
    host: 192.168.1.8
    port: 9898
    monitored_conditions:
      - upcoming
    days: 2
    ssl: true
```

### {% linkable_title Get disk space for all storage locations %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: radarr
    api_key: YOUR_API_KEY
    host: 192.168.1.8
    monitored_conditions:
      - diskspace
```

### {% linkable_title Get disk space for listed storage locations %}

The storage locations Radarr returns are in the system page and in some cases this can list duplicates if sub paths are mounted separately. By listing paths to include, you can choose what data is reported by the sensor.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: radarr
    api_key: YOUR_API_KEY
    host: 192.168.1.8
    monitored_conditions:
      - diskspace
    include_paths:
      - /tank/plex
```

### {% linkable_title Get disk space in different unit %}

The Radarr API returns available space in bytes, but this sensor will default to reporting it in GB to make the number more manageable. This can be overridden if your storage needs require a different unit. All units from bytes (B) to yottabytes (YB) are supported.

*This calculation is done using base 2 math, and may differ from systems calculating using base 10 math.*

```yaml
# Example configuration.yaml entry
sensor:
  - platform: radarr
    api_key: YOUR_API_KEY
    host: 192.168.1.8
    monitored_conditions:
      - diskspace
    unit: TB
```
