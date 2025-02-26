---
title: Happiest Baby Snoo
description: Instructions on how to integrate Snoo into Home Assistant
ha_category:
  - Sensor
ha_iot_class: Cloud Push
ha_release: 2025.3
ha_config_flow: true
ha_codeowners:
  - '@Lash-L'
ha_domain: snoo
ha_platforms:
  - sensor
ha_integration_type: integration
ha_quality_scale: bronze
---

The [Snoo](https://www.happiestbaby.com/products/snoo-smart-bassinet) is a smart bassinet made by [Happiest Baby](https://www.happiestbaby.com/) that helps get your baby to sleep and helps keep them asleep.


## Installing the integration
This integration follows standard integration installation. No extra steps are required.

{% include integrations/config_flow.md %}

## Sensors

### State

The Snoo can have one of 8 states
1. Baseline - This is the basic state the snoo starts with. It has not detected the need to do any further soothing.
2. Level 1 - This is the lowest level of soothing
3. Level 2
4. Level 3
5. Level 4
6. Stop - The snoo is no longer running
7. Pre-timeout - the snoo is preparing to go back to stop rotating
8. Timeout - the snoo is stopping rotating.

## Time left
This describes how long until the Snoo will change levels or it is Unknown if it is not currently planning to change levels.

## Removing the integration

{% include integrations/remove_device_service.md %}
