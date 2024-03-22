---
title: ArtSound
description: Connect and control your ArtSound media players using the ArtSound integration
ha_category:
  - Media player
ha_domain: artsound
ha_ssdp: true
ha_zeroconf: true
ha_integration_type: virtual
ha_supporting_domain: linkplay
ha_supporting_integration: linkplay
ha_release: 2024.x
ha_codeowners:
  - '@Velleman'
ha_config_flow: true
ha_platforms:
  - media_player
ha_iot_class: Local Polling
ha_dhcp: true
---

The ArtSound integration for Home Assistant allows you to control ArtSound media players. The integration supports auto-discovery on your local network through SSDP and Zeroconf.

{% include integrations/supported_brand.md %}