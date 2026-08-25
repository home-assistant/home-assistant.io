---
title: Sonarr
description: Instructions on how to integrate Sonarr with Home Assistant.
ha_category:
  - Downloading
ha_release: 0.34
ha_iot_class: Local Polling
ha_domain: sonarr
ha_config_flow: true
ha_codeowners:
  - '@ctalkington'
ha_platforms:
  - calendar
  - sensor
ha_integration_type: service
---

The **Sonarr** {% term integration %} pulls data from a given [Sonarr](https://sonarr.tv/) instance.

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: The URL of your Sonarr instance, including the port number and base path if applicable (for example, `http://localhost:8989` or `http://192.168.1.100:8989/sonarr`).
API Key:
  description: Your Sonarr API key. To find it, open your Sonarr web interface and navigate to **Settings** > **General**. The API key is listed under the **Security** section.
{% endconfiguration_basic %}

## Calendar

A {% term calendar %} entity is created that shows your upcoming episodes. Each event is titled with the series name, the season and episode number, and the episode title, such as `Bob's Burgers - S04E11 - Easy Com-mercial, Easy Go-mercial`. Events are timed using the episode's air time and the series runtime.

## Sensors

The Sonarr integration will add the following sensors:

- **Upcoming**: The number of upcoming episodes.
- **Commands**: The number of commands being run. (disabled by default)
- **Disk space**: Available disk space in gigabytes. (disabled by default)
- **Queue**: The number of episodes in the download queue. (disabled by default)
- **Shows**: The number of series in Sonarr. (disabled by default)
- **Wanted**: The number of episodes still wanted. (disabled by default)

The sensors provide summary counts. For detailed information about each item, such as series details or download progress, use the corresponding {% term actions %} described below.

{% include integrations/actions.md %}
