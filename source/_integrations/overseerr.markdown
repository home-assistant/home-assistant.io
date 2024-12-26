---
title: Overseerr
description: Instructions on how to set up Overseerr with Home Assistant.
ha_category:
  - Sensor
ha_release: 2025.2
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@joostlek'
ha_domain: overseerr
ha_integration_type: service
ha_platforms:
  - sensor
---

Overseerr is a service that allows you to manage media requests and to integrate those with Plex, Radarr and Sonarr. The **Overseerr** {% term integration %} allows you to see statistics of your [Overseerr](https://overseerr.dev/) instance.

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
    description: "The URL of your overseerr instance."
    required: true
    type: string
API key:
    description: "The API key of your overseerr instance, which can be found in the Overseerr settings."
    required: true
    type: string
{% endconfiguration_basic %}

## Remove integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
