---
title: Uptime
description: Instructions on how to integrate an uptime sensor into Home Assistant.
ha_category:
  - Sensor
  - Utility
ha_iot_class: Local Push
ha_release: 0.56
ha_quality_scale: internal
ha_domain: uptime
ha_platforms:
  - sensor
ha_config_flow: true
ha_codeowners:
  - '@frenck'
ha_integration_type: service
---

The **Uptime** {% term integration %} provides a sensor that stores the timestamp
(date and time) when Home Assistant was last started.

{% include integrations/config_flow.md %}
