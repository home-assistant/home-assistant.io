---
layout: page
title: "Sonarr Sensor"
description: "Instructions on how to integrate Sonarr sensors with Home Assistant"
date: 2016-11-19 13:35
sidebar: true
comments: false
sharing: true
footer: true
logo: sonarr.png
ha_category: Downloading
ha_release: 0.34
ha_iot_class: "Local Polling"
---


This `sonarr` sensor platform pulls data from a given [Sonarr](https://sonarr.tv/) instance.

## {% linkable_title Configuration %}

To use your Sonarr sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: sonarr
    api_key: YOUR_API_KEY
```

Configuration variables:

- **api_key** (*Required*): Your Sonarr API key, found in Settings > General in the Sonarr Web UI.
- **host** (*Optional*): The host Sonarr is running on. Defaults to `localhost`.
- **port** (*Optional*): The port Sonarr is running on. Defaults to 8989.
- **monitored_conditions** array (*Optional*): Conditions to display on the frontend. Defaults to `upcoming`.
  - **series**: The number of series in Sonarr.
  - **upcoming**: The number of upcoming episodes.
  - **wanted**: The number of episodes still 'wanted'.
  - **queue**: The number of episodes in the queue.
  - **commands**: The number of commands being run.
  - **diskspace**: Available disk space.

- **urlbase** (*Optional*): The base URL Sonarr is running under. Defaults to `/`.
- **days** (*Optional*): How many days to look ahead for the upcoming sensor, 1 means today only.  Defaults to 1.
- **include_paths** (*Optional*): Array of file paths to include when calculating diskspace. Leave blank to include all.
- **unit**: (*Optional*): The unit to display disk space in. Defaults to GB.
- **ssl**:  boolean (*Optional*): Whether or not to use SSL for Sonarr.

## {% linkable_title Examples %}

In this section you find some real life examples of how to use this sensor.

### {% linkable_title Get Episodes airing in next 2 days %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: sonarr
    api_key: YOUR_API_KEY
    host: 192.168.1.8
    monitored_conditions:
      - upcoming
    days: 2
```

### {% linkable_title Enable SSL %}

SSL may run on a different port than the default (8989). The SSL port can be bound to any port in Sonarr, so it should be set in the config here (unless it is changed to 8989). See the [Sonarr site](https://github.com/Sonarr/Sonarr/wiki/SSL) for details on SSL in Sonarr.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: sonarr
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
  - platform: sonarr
    api_key: YOUR_API_KEY
    host: 192.168.1.8
    monitored_conditions:
      - diskspace
```

### {% linkable_title Get disk space for listed storage locations %}

The storage locations Sonarr returns are in the system page and in some cases this can list duplicates if sub paths are mounted separately. By listing paths to include, you can choose what data is reported by the sensor.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: sonarr
    api_key: YOUR_API_KEY
    host: 192.168.1.8
    monitored_conditions:
      - diskspace
    include_paths:
      - /tank/plex
```

### {% linkable_title Get disk space in different unit %}

The Sonarr API returns available space in bytes, but this sensor will default to reporting it in GB to make the number more manageable. This can be overridden if your storage needs require a different unit. All units from bytes (B) to yottabytes (YB) are supported.

*This calculation is done using base 2 math, and may differ from systems calculating using base 10 math.*

```yaml
# Example configuration.yaml entry
sensor:
  - platform: sonarr
    api_key: YOUR_API_KEY
    host: 192.168.1.8
    monitored_conditions:
      - diskspace
    unit: TB
```
