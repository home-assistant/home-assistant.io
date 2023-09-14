---
title: Evil Genius Labs
description: Instructions on setting up Evil Genius Labs products within Home Assistant.
ha_category:
  - Light
ha_iot_class: Local Polling
ha_release: '2021.12'
ha_config_flow: true
ha_codeowners:
  - '@balloob'
ha_domain: evil_genius_labs
ha_platforms:
  - diagnostics
  - light
ha_integration_type: integration
---

This integration allows you to control and monitor the artworks by [Evil Genius Labs](https://www.evilgeniuslabs.org/). Tested with the Fibonacci256.

If the integration is unable to connect, make sure the firmware is up to date.

{% include integrations/config_flow.md %}
