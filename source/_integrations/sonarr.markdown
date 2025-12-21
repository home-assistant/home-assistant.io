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

The Sonarr integration pulls data from a given [Sonarr](https://sonarr.tv/) instance. This integration only supports Sonarr v3 instances.

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: The IP, FQDN, or URL of your Sonarr instance including the port number if you are not using port 8989 and your custom URL base if applicable.
API Key:
  description: To retrieve your API key, open your Sonarr web interface and navigate to Settings, then the General tab. Your Sonarr API Key will be listed on this page under the Security section.
{% endconfiguration_basic %}

## Sensors

The Sonarr integration will add the following sensors:

`sensor.sonarr_upcoming`: The number of upcoming episodes.

The remaining five sensors are disabled by default and can be enabled on the device page.

- `sensor.sonarr_commands`: The number of commands being run.
- `sensor.sonarr_disk_space`: Available disk space.
- `sensor.sonarr_queue`: The number of episodes in the queue.
- `sensor.sonarr_shows`: The number of series in Sonarr.
- `sensor.sonarr_wanted`: The number of episodes still wanted.
