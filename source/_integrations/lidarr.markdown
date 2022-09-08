---
title: Lidarr
description: Instructions on how to integrate Lidarr with Home Assistant
ha_category:
  - Downloading
ha_release: 2022.4
ha_iot_class: Local Polling
ha_domain: lidarr
ha_config_flow: true
ha_codeowners:
  - '@tkdrob'
ha_quality_scale: silver
ha_platforms:
  - sensor
---

The Lidarr integration pulls data from a given [Lidarr](https://lidarr.audio/) instance.

{% include integrations/config_flow.md %}

To retrieve your API key, open your Lidarr web interface and navigate to Settings, then General tab. Your Lidarr API Key will be listed on this page under the Security section.

## Sensors

The Lidarr integration will add the following sensors:

- Available disk space for each root folder.
- The number of episodes in the queue.
- The number of albums still wanted.
