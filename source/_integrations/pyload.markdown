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
  - button
  - diagnostics
  - sensor
  - switch
ha_integration_type: service
ha_config_flow: true
---

The [**pyLoad**](https://pyload.net/) {% term integration %} enables monitoring your downloads directly in Home Assistant. This integration provides various sensors to keep track of your download activities and allows creating automations based on the sensor information, alongside button and switch controls for performing specific tasks such as aborting downloads and managing file restarts.

{% include integrations/config_flow.md %}

## Sensors

- **Speed:** Monitors the current download speed.
- **Active downloads:** Indicates the number of files pyLoad is actively downloading
- **Downloads in queue:** Shows the number of downloads currently in the queue.
- **Finished downloads:** Indicates the number of completed downloads.
- **Free space:** Shows the available disk space in the download directory.

## Buttons

- **Abort all running downloads:** Aborts all currently running downloads.
- **Delete finished files/packages:** Deletes all finished files and packages.
- **Restart all failed files/packages:** Restarts all failed downloads.
- **Restart pyLoad core**: Restarts the pyLoad core.

## Switches

- **Pause/Resume Queue:** Pauses or resumes the download queue. When paused, active downloads will continue, but new downloads in the queue will not start.
- **Auto-reconnect:** If configured, enables pyLoad to automatically reconnect the internet connection.
