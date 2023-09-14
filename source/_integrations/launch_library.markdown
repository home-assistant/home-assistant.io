---
title: Launch Library
description: Instructions on how to integrate space launch information within Home Assistant.
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 0.83
ha_codeowners:
  - '@ludeeus'
  - '@DurgNomis-drol'
ha_domain: launch_library
ha_platforms:
  - diagnostics
  - sensor
ha_config_flow: true
ha_integration_type: service
---

The `launch_library` sensor will provide you with information about the next planned space launch and SpaceX Starship event.

{% include integrations/config_flow.md %}

The data this platform presents comes from [launchlibrary.net][launchlibrary].

[launchlibrary]: https://launchlibrary.net/
