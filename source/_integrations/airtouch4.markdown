---
title: AirTouch 4
description: Instructions on how to integrate the AirTouch 4 A/C controller into Home Assistant.
ha_category:
  - Climate
ha_release: 2021.9
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@LonePurpleWolf'
ha_domain: airtouch4
ha_platforms:
  - climate
ha_integration_type: integration
---

The AirTouch 4 integration allows you to control Ducted Air Conditioning Systems that are using the [AirTouch 4](https://www.airtouch.net.au/airtouch/airtouch-4/) Controller. Currently, this integration only supports AirTouch 4 controllers with the Individual Temperature Control (ITC) modules.

{% include integrations/config_flow.md %}

## Entities

### Climate

The integration will create a climate entity for each zone that is temperature-controlled.
