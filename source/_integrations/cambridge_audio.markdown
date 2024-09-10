---
title: Cambridge Audio
description: Instructions on how to integrate Cambridge Audio Receivers into Home Assistant.
ha_category:
  - Media player
ha_release: '2024.10'
ha_iot_class: Local Push
ha_domain: cambridge_audio
ha_platforms:
  - media_player
ha_codeowners:
  - '@noahhusby'
ha_config_flow: true
ha_integration_type: integration
---

The `cambridge_audio` {% term integration %} allows you to connect to all Cambridge Audio receivers and streamers that support the StreamMagic application.

The platform automatically discovers all enabled zones and sources. Each zone is added as a media player device with the enabled sources available as inputs. Media information and transport controls are supported if the selected source reports it.

## Supported devices

This integration allows you to connect the following devices:

- Cambridge Audio Evo 75
- Cambridge Audio Evo 150
- Cambridge Audio CXN
- Cambridge Audio CXN (v2)
- Cambridge Audio CXR120
- Cambridge Audio CXR200
- Cambridge Audio 851N
- Cambridge Audio Edge NQ

{% include integrations/config_flow.md %}
