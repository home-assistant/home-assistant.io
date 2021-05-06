---
title: Syncthing
description: Instructions on how to integrate Syncthing within Home Assistant.
logo: syncthing.png
ha_category:
  - Downloading
  - Sensor
ha_release: 0.115
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

To setup the monitoring you need to get the ***API key***. Open the syncthing web 
interface(eg: http://127.0.0.1:8384) in the browser and go to **Actions** -> **Settings**. You will find
the key on right of the settings dialog.

## Configuration

Set up the integration through **Configuration** -> **Integrations** -> **Syncthing**.
  
## Integration Entities

The Syncthing integration adds one sensor per syncing folder:

<p class='img'>
  <img src='{{site_root}}/images/integrations/syncthing/sensors.png' />
</p>

<p class='img'>
  <img src='{{site_root}}/images/integrations/syncthing/sensor.png' />
</p>
