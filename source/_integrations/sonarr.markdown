---
title: Sonarr
description: Instructions on how to integrate Sonarr with Home Assistant
ha_category:
  - Downloading
ha_release: 0.34
ha_iot_class: Local Polling
ha_domain: sonarr
ha_config_flow: true
ha_codeowners:
  - '@ctalkington'
ha_quality_scale: silver
---

The `Sonarr` integration pulls data from a given [Sonarr](https://sonarr.tv/) instance.

## Configuration

Go to the Configuration > Integrations page and click on the plus '+' to add a new integration. Select Sonarr. Enter your Sonarr connection information and click Submit. 

Host:
  Enter the host address. 
  Example: 192.168.0.1
  
API Key:
  Enter the API key found in Sonarr at Settings > General > Security. 

Path to API: 
  Default: /api
  
Port: 
  Enter the configured port for Sonarr. 
  Default: 8989

Sonarr uses a SSL certificate:
  Check the box if your Sonarr installation uses an SSL certificate. 
