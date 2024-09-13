---
title: Russound RIO
description: Instructions on how to integrate Russound RIO devices into Home Assistant.
ha_category:
  - Media player
ha_release: 0.49
ha_iot_class: Local Push
ha_domain: russound_rio
ha_quality_scale: silver
ha_platforms:
  - media_player
ha_codeowners:
  - '@noahhusby'
ha_config_flow: true
ha_integration_type: integration
---

The `russound_rio` {% term integration %} allows you to control Russound devices that make use of the RIO protocol.

The platform automatically discovers all enabled zones and sources. Each zone is added as a media player device with the enabled sources available as inputs. Media information is supported if the selected source reports it.

{% include integrations/config_flow.md %}
