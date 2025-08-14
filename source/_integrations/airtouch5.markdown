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
  - climate
  - cover
ha_integration_type: integration
---

The AirTouch 5 integration allows you to control ducted air conditioning systems that are using the [AirTouch 5](https://www.airtouch.net.au/smart-air-conditioning/airtouch-5/) controller.

{% include integrations/config_flow.md %}

## Entities

### Climate

The integration will create a climate entity for each AC unit and each zone.

### Cover

Each zone has a cover entity to represent the state of the damper.

{% note %}

Manual damper adjustments are not recommended in a zone with a temperature sensor, as the AirTouch 5 will automatically control the damper.

{% endnote %}
