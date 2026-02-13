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
ha_platforms:
  - sensor
ha_integration_type: integration
---

The **Sonarr** {% term integration %} pulls data from a given [Sonarr](https://sonarr.tv/) instance. This integration only supports Sonarr v3 instances.

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: The IP, FQDN, or URL of your Sonarr instance including the port number if you are not using port 8989 and your custom URL base if applicable.
API Key:
  description: To retrieve your API key, open your Sonarr web interface and navigate to Settings, then the General tab. Your Sonarr API Key will be listed on this page under the Security section.
{% endconfiguration_basic %}

## Sensors

The Sonarr integration will add the following sensors:

- **Upcoming**: The number of upcoming episodes. Attributes include series title and episode identifier for each upcoming episode (for example, `The Andy Griffith Show: "S01E01"`).
- **Commands**: The number of commands being run. Attributes include command name and status for each running command (for example, `RefreshSeries: "completed"`). (disabled by default)
- **Disk Space**: Available disk space in gigabytes across all storage locations. Attributes include detailed disk space information for each storage path showing free/total space and usage percentage (for example, `/mnt/storage1: "250.50/500.00GB (50.10%)"`). (disabled by default)
- **Queue**: The number of episodes in the download queue. Attributes include series title with episode identifier and download progress percentage for each queued item (for example, `The Andy Griffith Show S01E01: "45.32%"`). (disabled by default)
- **Shows**: The number of series in Sonarr. Attributes include series title and episode statistics for each show (for example, `The Andy Griffith Show: "120/249 Episodes"`). (disabled by default)
- **Wanted**: The number of episodes still wanted. Attributes include series title with episode identifier and air date for each wanted episode (for example, `The Andy Griffith Show S02E05: "2024-03-15T20:00:00-04:00"`). (disabled by default)
