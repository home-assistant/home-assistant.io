---
title: Traccar Server
description: Documentation for the Traccar Server integration.
ha_release: 2024.2
ha_category:
  - Car
  - Presence detection
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@ludeeus'
ha_domain: traccar_server
ha_platforms:
  - device_tracker
ha_integration_type: integration
---

Traccar uses GPS for tracking and has support for over 1500 different types of devices. You can use the Traccar Server integration to communicate with your own [Traccar Server](https://www.traccar.org/server/), which is also available as [Home Assistant add-on](https://my.home-assistant.io/redirect/supervisor_addon/?addon=a0d7b954_traccar).

{% include integrations/config_flow.md %}
