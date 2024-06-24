---
title: pyLoad
description: Instructions on how to integrate pyLoad download sensor within Home Assistant.
ha_category:
  - Downloading
ha_release: 0.58
ha_iot_class: Local Polling
ha_domain: pyload
ha_codeowners:
  - '@tr4nt0r'
ha_platforms:
  - sensor
ha_integration_type: integration
---

The [**pyLoad**](https://pyload.net/) {% term integration %} allows you to monitor your downloads from within Home Assistant. This integration provides various sensors to keep track of your download activities and allows creating automations based on the sensor information.

{% include integrations/config_flow.md %}

## Sensors

- **Speed:** Monitors the current download speed.
- **Active downloads:** Indicate the number of files pyLoad is actively downloading
- **Downloads in queue:** Shows the number of downloads currently in the queue.
- **Total downloads:** Indicates the number of completed downloads.
- **Free space:** Shows the available disk space in the download directory.
