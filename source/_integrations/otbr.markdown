---
title: Open Thread Border Router
ha_category:
  - Other
ha_release: 2023.2
ha_codeowners:
  - '@home-assistant/core'
ha_domain: otbr
ha_iot_class: Local Polling
ha_integration_type: service
ha_config_flow: true
---

The Open Thread Border Router integration allows calling an Open Thread Border Router's REST API from Python and via WebSocket.

This integration is being installed automatically when the **Open Thread Border Router** add-on is installed. This happens for example as part of one of the following procedures:

- [Enabling Thread on Home Assistant Yellow](https://yellow.home-assistant.io/procedures/enable-thread/)
- [Enabling Thread on Home Assistant SkyConnect](https://skyconnect.home-assistant.io/procedures/enable-thread/)
- [Adding a HomeKit device via Thread](https://www.home-assistant.io/integrations/homekit_controller/)
- [Adding a Matter device via Thread](https://www.home-assistant.io/integrations/matter/#adding-a-matter-device-to-home-assistant)

The integration is automatically set up when the **Silicon Labs Multiprotocol** add-on is installed.

Installing this integration manually is an advanced use case, for example if ou run your own border router. If you do have such a use case, follow these steps:

{% include integrations/config_flow.md %}
