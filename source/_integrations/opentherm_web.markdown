---
title: OpenTherm Web
description: Instructions on how to set up the OpenTherm Web integration in Home Assistant.
ha_release: 2023.7.0
ha_category:
  - Climate
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: opentherm_web
ha_platforms:
  - climate
ha_codeowners:
  - '@Lake292'
ha_integration_type: integration
---

The OpenTherm Web integration allows you to integrate an OpenTherm Web into Home Assistant. This will allow you to monitor and set climate controls.

For configuration you need to provide an address to the OpenTherm Web host and API token.

{% include integrations/config_flow.md %}

## Climate

- Displays current and target temperature
- Allows to enable or disable heating
- Allows to set target temperature
