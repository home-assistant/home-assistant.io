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

This Radarr integration pulls data from a given [Radarr](https://radarr.video/) instance.
Your API key can be found in Settings > General in the Radarr Web UI.

{% include integrations/config_flow.md %}

## Integration entities

Each added configuration entry will create the following binary sensor:

- **Health**: Shows if the Radarr instance is healthy. This is determined to have a problem if Radarr cannot communicate with any enabled download clients or no indexers are available for RSS feeds or searches.

A calendar entity will also be created indicating the day of release and the type of release, such as Cinemas, Digital, or Physical.

Each added configuration entry will create the following sensors:

- **Disk Space**: Shows the disk space available to Radarr.
- **Movies**: Shows the number of movies in the Radarr database. (disabled by default)
- **Start Time**: The time when Radarr was last restarted.
