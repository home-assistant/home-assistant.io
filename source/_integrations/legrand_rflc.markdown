---
title: Legrand RF Lighting Control
description: Instructions on setting up Legrand RF Lighting Control within Home Assistant.
ha_category:
  - Hub
  - Light
ha_iot_class: Local Push
featured: true
ha_release: '2021.8'
ha_config_flow: true
ha_quality_scale: platinum
ha_codeowners:
  - '@rtyle'
ha_domain: legrand_rflc
ha_dhcp: true
ha_platforms:
  - light
---

The Legrand RF Lighting Control integration allows you to control and monitor the lights connected to your Legrand|On-Q LC7001 Whole House Lighting Controller.

There is currently support for the following device types within Home Assistant:

- Lights
  - Legrand Adorne Wi-Fi Ready Dimmers
  - Legrand Adorne Wi-Fi Ready Switches
  - Legrand Radiant Smart Tru-Universal Dimmer, Wi-Fi
  - Legrand Radiant Smart Switch, Wi-Fi
  - Legrand Radiant Smart Plug-In Switch, Wi-Fi

{% include integrations/config_flow.md %}
