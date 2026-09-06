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

## Prerequisites

This integration connects to BirdNET-Go version 2.0 or newer and requires the `/api/v2/dashboard/kpis` endpoint. Ensure your BirdNET-Go station is running with the V2 database manager and has completed any pending database migrations.

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

- **Today's detections**: Total number of bird vocalizations identified today.
- **Lifetime species**: Cumulative count of distinct bird species recorded by the station.
- **Detection streak**: Current streak of consecutive days with at least one bird detection.
- **Best day detections (past year)**: Highest single-day record for bird detections within the past year.

## BirdNET-Go automation examples

Here are a few automation examples to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Notification when a new bird species is detected

Send a notification whenever your BirdNET-Go station records a new bird species.

{% details "Example YAML configuration" %}

{% example %}
automation: |
  alias: "Notify when a new bird species is detected"
  description: "Send a notification when the lifetime species counter increases."
  triggers:
    - trigger: state
      entity_id: sensor.your_birdnet_go_lifetime_species
    - condition: template
      value_template: >-
        {{
          trigger.from_state is not none
          and trigger.to_state is not none
          and (trigger.to_state.state | int(0)) > (trigger.from_state.state | int(0))
        }}
  actions:
    - action: notify.persistent_notification
      data:
        title: "New bird species identified"
        message: "A new bird species was recorded! Total lifetime species: {{ trigger.to_state.state }}."
{% endexample %}

{% enddetails %}

### Automation: Notification when reaching a detection streak milestone

Send a notification when your BirdNET-Go station reaches a 7-day detection streak.

{% details "Example YAML configuration" %}

{% example %}
automation: |
  alias: "Notify on 7-day detection streak"
  description: "Send a notification when the detection streak reaches 7 consecutive days."
  triggers:
    - trigger: numeric_state
      entity_id: sensor.birdnet_go_station_detection_streak
      above: 6
  actions:
    - action: notify.persistent_notification
      data:
        title: "BirdNET-Go streak milestone"
        message: "Your BirdNET-Go station has reached a 7-day bird detection streak!"
{% endexample %}

{% enddetails %}

## Data updates

The integration {% term polling polls %} the BirdNET-Go station every 30 seconds for updated dashboard statistics.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
