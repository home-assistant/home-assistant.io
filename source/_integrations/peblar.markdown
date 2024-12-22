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
  - select
  - sensor
  - update
ha_integration_type: device
---

The Peblar {% term integration %} integrates your [Peblar Rocksolid EV Charger]
with Home Assistant. This integration allows you to monitor the charging status
of your Peblar charger.

[Peblar Rocksolid EV Charger]: https://peblar.com/

{% include integrations/config_flow.md %}

### Configuration parameters

{% configuration_basic %}
Host:
  description: The hostname or IP address of your Peblar charger on your home network.
Password:
  description: The password as used to log in to the Peblar device' local web interface.
{% endconfiguration_basic %}

## Removing the integration

This integration follows standard integration removal. No extra steps are
required.

{% include integrations/remove_device_service.md %}
