---
title: Nuki Matter
description: Control your Nuki Matter devices using the Matter integration.
ha_category:
  - Lock
ha_domain: nuki_matter
ha_release: '2025.5'
ha_codeowners:
  - '@home-assistant/matter'
ha_config_flow: true
ha_platforms:
  - lock
ha_iot_class: Local Push
ha_integration_type: virtual
ha_iot_standard:
  - matter
---

[Nuki](https://nuki.io) is committed to making sure their products are up-to-date and ready to use in Home Assistant.

Nuki Matter devices work locally and integrate seamlessly with the Matter integration in Home Assistant. As all connectivity is happening locally, status updates and controlling your devices happen instantly in Home Assistant.

{% my add_matter_device badge domain=page.ha_domain %}

[Learn more about Matter in Home Assistant.](/integrations/matter/)
