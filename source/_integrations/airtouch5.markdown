---
title: AirTouch 5
description: Instructions on how to integrate the AirTouch 5 A/C controller into Home Assistant.
ha_category:
  - Climate
ha_release: 2024.2
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@danzel'
ha_domain: airtouch5
ha_platforms:
  - binary_sensor
  - climate
  - cover
ha_integration_type: integration
---

The AirTouch 5 integration allows you to control Ducted Air Conditioning Systems that are using the [AirTouch 5](https://www.airtouch.net.au/smart-air-conditioning/airtouch-5/) Controller.

{% include integrations/config_flow.md %}

## Entities

### Climate

The integration will create a climate entity for each AC unit and each zone.

