---
title: LinkPlay
description: Connect and control your LinkPlay media players using the LinkPlay integration
ha_category:
  - Media player
ha_domain: linkplay
ha_ssdp: true
ha_zeroconf: true
ha_integration_type: integration
ha_release: 2024.x
ha_codeowners:
  - '@Velleman'
ha_config_flow: true
ha_platforms:
  - media_player
ha_iot_class: Local Polling
ha_dhcp: true
---

The LinkPlay integration for Home Assistant allows you to control various media players based on the LinkPlay protocol. The integration supports auto-discovery on your local network through SSDP and Zeroconf.

{% include integrations/supported_brand.md %}