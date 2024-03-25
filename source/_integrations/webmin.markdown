---
title: Webmin
description: Instructions on how to set up Webmin with Home Assistant.
ha_category:
  - System monitor
ha_release: 2024.3
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@autinerd'
ha_domain: webmin
ha_integration_type: device
ha_platforms:
  - sensor
---

[Webmin](https://webmin.com) is a web-based interface for the system administration of Unix-like servers.

This {% term integration %} provides sensors for monitoring the CPU and memory usage of your server.

{% include integrations/config_flow.md %}

## Sensors

**All entities are disabled by default, you need to enable the entities that you wish to use.**

Following sensors will be added:

- Load (1m)
- Load (5m)
- Load (15m)
- Memory total
- Memory free
- Swap total
- Swap free
