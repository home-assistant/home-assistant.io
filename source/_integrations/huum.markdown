---
title: Huum
description: Instructions on how to integrate a Huum saunas into Home Assistant.
ha_category:
  - Climate
ha_release: 2022.6
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@frwickst'
ha_domain: huum
ha_config_flow: true
ha_platforms:
  - climate
ha_integration_type: integration
---

Integrates Huum saunas into Home Assistant.

The sauna can only be controlled through Huum’s Cloud API; no local connection is available.

You’ll need your username (which is usually your email) and password for the integration.

The integration takes the same security measures regarding an open sauna door as the Huum app.
If the sauna door is open, the sauna will not turn on.

{% include integrations/config_flow.md %}
