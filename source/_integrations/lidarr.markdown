---
description: Instructions on how to integrate Lidarr with Home Assistant
ha_release: '2022.10'
ha_domain: lidarr
---

The **Lidarr** {% term integration %} pulls data from a specified [Lidarr](https://lidarr.audio/) instance.

{% include integrations/config_flow.md %}

To retrieve your API key, open your Lidarr web interface and navigate to Settings, then General tab. Your Lidarr API Key will be listed on this page under the Security section.

## Sensors

The Lidarr integration will add the following sensors:

- Available disk space for each root folder.
- The number of tracks in the queue.
- The number of albums still wanted.
