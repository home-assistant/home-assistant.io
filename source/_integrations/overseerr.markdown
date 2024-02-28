---
title: Overseerr
description: Instructions on how to integrate Overseerr sensors with Home Assistant
ha_category:
  - Downloading
ha_release: 2024.4
ha_config_flow: true
ha_iot_class: Local Polling
ha_domain: overseerr
ha_platforms:
  - sensor
ha_codeowners:
  - '@vehjelmtvedt'
  - '@l-holter'
ha_integration_type: service
---

This Overseerr integration pulls data from a given [Overseerr](https://overseerr.dev/) instance.
Your API key can be found in Settings > General > API Key in the Overseerr Web UI.
Make sure to add /api/v1 to your URL in the configuration.

{% include integrations/config_flow.md %}

## Integration entities

Each added configuration entry will create the following sensors:

- **Approved Requests**: Shows the number of requests that are approved.
- **Available Requests**: Shows the number of requests that are available.
- **Movie Requests**: Shows the number of movie requests.
- **Pending Requests**: Shows the number of pending requests.
- **Total Requests**: Shows the number of total requests.
- **TV Show Requests**: Shows the number of TV show requests.
