---
title: LG Netcast
description: Instructions on how to integrate a LG TV (Netcast 3.0 & 4.0) within Home Assistant.
ha_category:
  - Media player
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: '0.20'
ha_domain: lg_netcast
ha_platforms:
  - media_player
  - remote
ha_codeowners:
  - '@Drafteed'
  - '@splinter98'
ha_integration_type: device
---

The **LG Netcast** {% term integration %} allows you to control a LG Smart TV running NetCast 3.0 (LG Smart TV models released in 2012) and NetCast 4.0 (LG Smart TV models released in 2013).
For the new LG webOS TV's use the [LG webOS TV](/integrations/webostv#media-player) platform.

{% include integrations/config_flow.md %}

{% include integrations/triggers.md %}

{% include integrations/actions.md %}

## Remote

The LG Netcast remote platform creates a `Remote` entity for each configured TV. This entity allows you to send remote control commands. To power on the TV, use the [Device is requested to turn on](/triggers/lg_netcast.turn_on/) trigger.
