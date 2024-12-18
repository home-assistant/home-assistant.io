---
title: Peblar
description: Instructions on how to integrate Peblar Rocksolid EV Charger with Home Assistant.
ha_category:
  - Car
  - Energy
ha_release: 2025.1
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@frenck'
ha_domain: peblar
ha_platforms:
  - sensor
ha_integration_type: device
---

The Peblar {% term integration %} integrates your [Peblar Rocksolid EV Charger]
with Home Assistant. This integration allows you to monitor the charging status
of your Peblar charger.

[Peblar Rocksolid EV Charger]: https://peblar.com/

{% include integrations/config_flow.md %}

## Removing the integration

This integration follows standard integration removal. No extra steps are
required.

{% include integrations/remove_device_service.md %}
