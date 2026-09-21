---
title: Chess.com
description: Instructions on how to integrate Chess.com with Home Assistant.
ha_category:
  - Gaming
  - Sensor
ha_release: 2026.4
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@joostlek'
ha_domain: chess_com
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
ha_quality_scale: bronze
---

The **Chess.com** {% term integration %} allows you to monitor your [Chess.com](https://chess.com/) statistics in Home Assistant.


{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
    description: "The username of your Chess.com account"
{% endconfiguration_basic %}

## Supported functionality

### Entities

The **Chess.com** integration provides the following entities.

#### Sensors

- **Followers**: The number of followers of your Chess.com account.

For each game mode you have played (daily, rapid, bullet, blitz, and daily Chess960), the following sensors are provided:

- **Rating**: The current rating for that game mode.
- **Games won**: The total number of games won in that game mode.
- **Games lost**: The total number of games lost in that game mode.
- **Games drawn**: The total number of games drawn in that game mode.

Sensors for game modes that you have not played yet are not created.

## Data updates

The integration {% term polling polls %} the Chess.com API every hour to update sensor data.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
