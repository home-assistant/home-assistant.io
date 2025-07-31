---
title: GPSD
description: Instructions on how to integrate GPSD into Home Assistant.
ha_category:
  - Utility
ha_release: 0.26
ha_config_flow: true
ha_iot_class: Local Polling
ha_codeowners:
  - '@fabaff'
  - '@jrieger'
ha_domain: gpsd
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `gpsd` integration is using the GPS information collected by [gpsd](https://gpsd.gitlab.io/gpsd/index.html) and a GPS receiver.

{% include integrations/config_flow.md %}
