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
  - sensor
ha_codeowners:
  - '@tkdrob'
ha_integration_type: integration
---

This Radarr integration pulls data from a given [Radarr](https://radarr.video/) instance.
Your API key can be found in Settings > General in the Radarr Web UI.

{% include integrations/config_flow.md %}

## Integration Entities

Each added configuration entry will create the following sensors:

- **Disk Space**: Shows the disk space available to Radarr.
- **Upcoming**: Shows the number of upcoming movie releases from the Radarr calendar.
- **Movies**: Shows the number of movies in the Radarr database. (disabled by default)
- **Commands**: Shows the number of recently ran and pending tasks.
- **Status**: Shows the status of the Radarr application. Several attributes are also available.
