---
title: Epic Games Store
description: Instructions on how to integrate Epic Games Store service into Home Assistant.
ha_category:
  - Calendar
ha_release: 2024.5
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@hacf-fr'
  - '@Quentame'
ha_domain: epic_games_store
ha_config_flow: true
ha_platforms:
  - calendar
ha_integration_type: service
---

The **Epic Games Store** {% term integration %} integrates the [Epic Games Store](https://store.epicgames.com/) service into Home Assistant.

The integration adds calendars to follow [discounts & free games](https://store.epicgames.com/free-games).

{% include integrations/config_flow.md %}


## Calendars

The following calendars will be created:

|Entity|Description|
|------|-----------|
|`epic_games_store_discount_games`|Current and upcoming discounts on games, one calendar event per game|
|`epic_games_store_free_games`|Free games for the current and upcoming week, one calendar event per game|

### Video tutorial

This video tutorial explains how to show the two free games from the Epic Games Store on your dashboard using a custom template sensor.

<lite-youtube videoid="fwpdi-Ua46A" videotitle="Get FREE GAMES with Home Assistant!" posterquality="maxresdefault"></lite-youtube>
