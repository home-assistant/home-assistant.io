---
title: Denon RS232
description: Instructions on how to integrate Denon receivers via their RS232 serial port into Home Assistant.
ha_category:
  - Media player
ha_iot_class: Local Push
ha_release: "2026.5.0"
ha_codeowners:
  - '@balloob'
ha_config_flow: true
ha_domain: denon_rs232
ha_platforms:
  - media_player
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Denon RS232** {% term integration %} lets you control Denon receivers by connecting to their RS232 serial port. By connecting the receiver to your Home Assistant server using a serial (RS232) cable or a USB-to-serial adapter, you get local control with push-based state updates.

{% include integrations/config_flow.md %}
