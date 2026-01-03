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

This integration is installed automatically when the **Open Thread Border Router** add-on is installed. For  Home Assistant Yellow or Connect&nbsp;ZBT-1 refer to the following procedures:

- [Enabling Thread on Home Assistant Yellow](https://yellow.home-assistant.io/procedures/enable-thread/)
- [Enabling Thread on Home Assistant Connect ZBT-1](https://connectzbt1.home-assistant.io/procedures/enable-thread/)

The integration is also installed automatically when enabling the experimental **Silicon Labs Multiprotocol** support.

Installing this integration manually is an advanced use case, for example if you run your own border router. If you do have such a use case, follow these steps:

{% include integrations/config_flow.md %}
