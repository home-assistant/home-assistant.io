---
title: Chess.com
description: Instructions on how to integrate Chess.com with Home Assistant.
ha_category:
  - Sensor
ha_release: 2026.4
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@joostlek'
ha_domain: chess_com
ha_platforms:
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
- **Daily chess rating**: The current daily chess rating of your Chess.com account.
- **Total chess games won**: The total number of chess games won.
- **Total chess games lost**: The total number of chess games lost.
- **Total chess games drawn**: The total number of chess games drawn.

## Data updates

The integration {% term polling polls %} the Chess.com API every hour to update sensor data.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
