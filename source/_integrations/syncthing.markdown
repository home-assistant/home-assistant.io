---
title: Syncthing
description: Instructions on how to integrate Syncthing within Home Assistant.
ha_category:
  - Downloading
  - Sensor
ha_release: 2021.06
ha_iot_class: Local Polling
ha_quality_scale: silver
ha_config_flow: true
ha_codeowners:
  - '@zhulik'
ha_domain: syncthing
---

[Syncthing](https://syncthing.net/) is a continuous file synchronization program. It synchronizes files between two or more computers 
in real-time, safely protected from prying eyes.

The Syncthing integration allows you to monitor states of your synced folders from within Home Assistant and setup automation based on the information.

## Setup

To set up the monitoring you need to get an **API key**. Open the Syncthing web 
interface(e.g., `http://127.0.0.1:8384`) in the browser and go to **Actions** -> **Settings**. You will find
the key on the right of the settings dialog.

## Configuration

Set up the integration through **Configuration** -> **Integrations** -> **Syncthing**.
  
## Integration Entities

The Syncthing integration adds one sensor per syncing folder:

![Syncthing Sensors](/images/integrations/syncthing/sensors.png)

![Syncthing Sensors](/images/integrations/syncthing/sensor.png)
