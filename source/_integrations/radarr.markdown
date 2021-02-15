---
title: Radarr
description: Instructions on how to integrate Radarr sensors with Home Assistant
ha_category:
  - Downloading
ha_release: 0.47
ha_iot_class: Local Polling
ha_domain: radarr
ha_platforms:
  - sensor
---

This `radarr` sensor platform pulls data from a given [Radarr](https://radarr.video/) instance.

## Configuration

To use your Radarr sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: radarr
    api_key: YOUR_API_KEY
```

{% configuration %}
api_key:
  required: true
  type: string
  description: Your Radarr API key, found in Settings > General in the Radarr Web UI.
host:
  required: false
  type: string
  description: The host Radarr is running on.
  default: "`localhost`"
port:
  required: false
  type: integer
  description: The port Radarr is running on.
  default: 7878
urlbase:
  required: false
  type: string
  description: The base URL Radarr is running under. Defaults to `/`.
monitored_conditions:
  required: false
  type: list
  description: Conditions to display on the frontend.
  default: "`movies`"
  keys:
    movies:
      description: The number of movies in Radarr.
    upcoming:
      description: The number of upcoming movie releases (physical and in cinemas).
    commands:
      description: The number of commands being run.
    diskspace:
      description: The available disk space.
    status:
      description: The current system status information.
days:
  required: false
  type: integer
  description: How many days to look ahead for the upcoming sensor, 1 means today only.
  default: 1
include_paths:
  required: false
  type: list
  description: Array of file paths to include when calculating diskspace. Leave blank to include all.
unit:
  required: false
  type: string
  description: The unit to display disk space in.
  default: GB
ssl:
  required: false
  type: boolean
  description: Whether or not to use SSL for Radarr.
  default: false
{% endconfiguration %}

## Examples

In this section you find some real-life examples of how to use this sensor.

### Show upcoming movie releases in the next 2 days

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

### Enable SSL

SSL may run on a different port than the default (7878). The SSL port can be bound to any port in Radarr, so it should be set in the configuration here (unless it is changed to 7878).

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

### Get disk space for all storage locations

```yaml
# Example configuration.yaml entry
sensor:
  - platform: radarr
    api_key: YOUR_API_KEY
    host: 192.168.1.8
    monitored_conditions:
      - diskspace
```

### Get disk space for listed storage locations

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

### Get disk space in different unit

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
