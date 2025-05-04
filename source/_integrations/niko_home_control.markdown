---
title: Niko Home Control
description: Instructions on how to integrate Niko Home Control lights into Home Assistant.
ha_codeowners:
  - '@VandeurenGlenn'
ha_config_flow: true
ha_category:
  - Cover
  - Light
ha_iot_class: Local Push
ha_release: 0.82
ha_domain: niko_home_control
ha_platforms:
  - cover
  - light
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The `niko_home_control` {% term integration %} allows you to integrate your [Niko Home Control](https://www.niko.eu/enus/products/niko-home-control) into Home Assistant.

{% include integrations/config_flow.md %}
