---
title: Motionblinds Matter
description: Control your Motionblinds Matter devices using the Matter integration.
ha_category:
  - Cover
ha_brand: true
ha_domain: motionblinds
ha_release: '2025.4'
ha_codeowners:
  - '@home-assistant/matter'
ha_config_flow: true
ha_platforms:
  - cover
ha_iot_class: Local Push
ha_integration_type: virtual
works_with:
  - matter
ha_iot_standard:
  - matter
---


Motionblinds Matter devices work locally and integrate seamlessly with the Matter integration in Home Assistant. As all connectivity is happening locally, status updates and controlling your devices happen instantly in Home Assistant.

{% my add_matter_device badge domain=page.ha_domain %}

[Learn more about Matter in Home Assistant.](/integrations/matter/)
