---
title: Aqvify
description: Instructions on how to setup Aqvify devices within Home Assistant.
ha_category:
  - Sensor
ha_release: 2026.7
ha_iot_class: Cloud Polling
ha_domain: aqvify
ha_codeowners:
  - '@astrandb'
ha_platforms:
  - sensor
ha_config_flow: true
ha_dhcp: false
ha_integration_type: hub
related:
  - url: https://www.aqvify.com/
    title: Aqvify web
  - url: https://app.aqvify.com/
    title: Aqvify user account
ha_quality_scale: bronze
---
The **Aqvify** {% term integration %} allows users to integrate their [Aqvify](https://www.aqvify.com) water well and tank sensors using the [official public API](https://public.aqvify.com/swagger/index.html).

## Use case

- Monitor the water level in a water well and trigger automations based on these sensor values.

## Supported sensors

There is currently support for the sensor measuring well water level.

{% include integrations/config_flow.md %}

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
