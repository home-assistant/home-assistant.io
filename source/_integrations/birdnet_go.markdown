---
title: BirdNET-Go
description: Instructions on how to integrate BirdNET-Go with Home Assistant.
ha_category:
  - Sensor
ha_release: 2026.10
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@TN-1'
ha_domain: birdnet_go
ha_platforms:
  - sensor
ha_integration_type: service
ha_quality_scale: bronze
works_with:
  - local
---

The **BirdNET-Go** {% term integration %} allows you to monitor bird detections and headline statistics from your local [BirdNET-Go](https://github.com/tphakala/birdnet-go) station.

BirdNET-Go is an acoustic monitoring system that identifies bird species in real time from audio streams using AI classifier models.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address or hostname of the BirdNET-Go station."
Port:
  description: "The port BirdNET-Go is running on (default: 8080)."
Use SSL:
  description: "Whether to connect using HTTPS."
{% endconfiguration_basic %}

## Supported functionality

### Sensors

This integration provides the following sensors for your BirdNET-Go station:

- **Today detections**: Total number of bird vocalizations identified today.
- **Lifetime species**: Cumulative count of distinct bird species recorded by the station.
- **Detection streak**: Current streak of consecutive days with at least one bird detection.
- **Best day detections**: Highest single-day record for bird detections.

## Data updates

The integration {% term polling polls %} the BirdNET-Go station every 30 seconds for updated dashboard statistics.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
