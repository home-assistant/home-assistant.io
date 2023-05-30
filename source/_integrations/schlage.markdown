---
title: Schlage
description: Instructions on how to integrate Schlage WiFi smart locks into Home Assistant.
ha_category:
  - Lock
ha_release: 2023.7.0
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@dknowles2'
ha_platforms:
  - lock
ha_integration_type: integration
---

The Schlage integration provides connectivity with Schlage WiFi smart locks through Schlage's cloud API.

There is currently support for the following device types within Home Assistant:

- Lock

{% include integrations/config_flow.md %}
