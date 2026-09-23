---
title: Radarr
description: Instructions on how to integrate Radarr sensors with Home Assistant
ha_category:
  - Downloading
ha_release: 0.47
ha_config_flow: true
ha_iot_class: Local Polling
ha_domain: radarr
ha_platforms:
  - binary_sensor
  - calendar
  - sensor
ha_codeowners:
  - '@tkdrob'
ha_integration_type: service
---

The **Radarr** {% term integration %} pulls data from a given [Radarr](https://radarr.video/) instance.
Your API key can be found in Settings > General in the Radarr Web UI.

{% include integrations/config_flow.md %}

## Integration entities

### Binary sensor

- **Health**: Shows if the Radarr instance is healthy. This is determined to have a problem if Radarr cannot communicate with any enabled download clients or no indexers are available for RSS feeds or searches.

### Calendar

A {% term calendar %} entity will also be created indicating the day of release and the type of release, such as Cinemas, Digital, or Physical.

A calendar entity will be created indicating the day of release and the type of release, such as Cinemas, Digital, or Physical.

### Sensors

- **Disk space**: Shows the disk space available to Radarr in gigabytes. A separate sensor is created for each storage path configured in Radarr (for example: `sensor.radarr_disk_space_movies`).
- **Movies**: Shows the number of movies in the Radarr database. (disabled by default)
- **Queue**: The number of movies in the download queue. (disabled by default)
- **Start time**: The time when Radarr was last restarted. (disabled by default)

{% include integrations/actions.md %}
