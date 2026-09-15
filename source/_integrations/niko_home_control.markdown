---
title: Niko Home Control
description: Instructions on how to integrate Niko Home Control 1 lights into Home Assistant.
ha_codeowners:
  - '@VandeurenGlenn'
ha_config_flow: true
ha_category:
  - Climate
  - Cover
  - Light
  - Scene
ha_iot_class: Local Push
ha_release: 0.82
ha_domain: niko_home_control
ha_platforms:
  - climate
  - cover
  - light
  - scene
ha_integration_type: hub
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **Niko Home Control** {% term integration %} allows you to integrate your [Niko connected controller (with Home Control 1)](https://www.niko.eu/enus/products/niko-home-control) into Home Assistant.

{% include integrations/config_flow.md %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
