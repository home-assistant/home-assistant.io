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

The **Open Thread Border Router** {% term integration %} allows calling an Open Thread Border Router's REST API from Python and via WebSocket.

This integration is installed automatically when the **Open Thread Border Router** add-on is installed. For Home Assistant Yellow, Connect&nbsp;ZBT-1, or Connect&nbsp;ZBT-2 refer to the following procedures:

- [Enabling Thread on Home Assistant Yellow](https://support.nabucasa.com/hc/articles/25742476767517)
- [Enabling Thread on Home Assistant Connect ZBT-1](https://support.nabucasa.com/hc/sections/26122472719517)
- [Enabling Thread on Home Assistant Connect ZBT-2](https://support.nabucasa.com/hc/sections/31260019451421)

Installing this integration manually is an advanced use case, for example if you run your own border router. If you do have such a use case, follow these steps:

{% include integrations/config_flow.md %}

To view the add-on documentation, go to {% my supervisor_addon title="**Settings** > **Add-ons** > **OpenThread Border Router**" addon="core_openthread_border_router" %} and select the **Documentation** tab.
