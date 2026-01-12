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

A calendar entity will be created indicating the day of release and the type of release, such as Cinemas, Digital, or Physical.

### Sensors

- **Disk Space**: Shows the disk space available to Radarr in gigabytes. A separate sensor is created for each storage path configured in Radarr (e.g., `sensor.radarr_disk_space_movies`).
- **Movies**: Shows the number of movies in the Radarr database. (disabled by default)
- **Queue**: The number of movies in the download queue. Attributes include movie title and download progress percentage for each queued item (e.g., `The Matrix Reloaded: "45.32%"`). (disabled by default)
- **Start Time**: The time when Radarr was last restarted. (disabled by default)
