---
title: Epic Games Store
description: Instructions on how to integrate Epic Games Store service into Home Assistant.
ha_category:
  - Sensor
ha_release: 2022.12
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@Quentame'
ha_domain: epic_games_store
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: service
---

Integrates [Epic Games Store](https://store.epicgames.com/) service into Home Assistant.

The integration adds sensors to follow current & upcoming [Epic Games Store free games](https://store.epicgames.com/free-games).

{% include integrations/config_flow.md %}


## Sensors

The following sensors will be created :

|Entity|Description|
|------|-----------|
|`free_games`|Current free games|
|`next_free_games`|Upcoming free games|
