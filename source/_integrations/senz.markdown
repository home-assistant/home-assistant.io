---
title: nVent RAYCHEM SENZ
description: Instructions how to integrate SENZ thermostats into Home Assistant.
ha_category:
  - Climate
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 2022.5
ha_config_flow: true
ha_codeowners:
  - '@milanmeu'
ha_domain: senz
ha_platforms:
  - climate
  - diagnostics
  - sensor
ha_integration_type: integration
---

The **nVent RAYCHEM SENZ** {% term integration %} allows you to control and monitor your nVent RAYCHEM SENZ-WIFI thermostats.

{% include integrations/config_flow.md %}

## Use cases

- Control and monitor the thermostat.
- Monitor the current temperature.

## Removing the integration

This integration follows standard integration removal. If you have entered your own credentials, you will be asked if you want to keep them or delete them. If you want to delete them later you can do that from the tree-dot menu in {% my integrations title="**Settings** > **Devices & services**" %}.

{% include integrations/remove_device_service.md %}
