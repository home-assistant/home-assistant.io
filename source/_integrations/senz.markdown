---
title: nVent RAYCHEM SENZ
description: Instructions how to integrate SENZ thermostats into Home Assistant.
ha_categories:
  - climate.thermostats_heating
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
ha_integration_type: hub
---

The **nVent RAYCHEM SENZ** {% term integration %} allows you to control and monitor your nVent RAYCHEM SENZ-WIFI thermostats.

{% include integrations/config_flow.md %}

## Use cases

- Control and monitor the thermostat.
- Monitor the current temperature.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
