---
title: Flexit BACnet
description: Instructions on how to integrate Flexit air handling unit into Home Assistant.
ha_category:
  - Climate
ha_release: 2022.10
ha_iot_class: Local Polling
ha_domain: flexit_bacnet
ha_platforms:
  - climate
ha_integration_type: integration
---

Integrates [Flexit](https://www.flexit.no/en/) Nordic series air handling unit into Home Assistant.

## Prerequisites

To configure the integration, you need to obtain IP address and Device ID for the unit.

1. Open Flexit Go app on your mobile.
2. Use "Find product" button on tha main screen.
3. Select your device and press "Connect".
4. Enter installer code (default: 1000) and press "Login".
5. Open "More" menu -> Installer -> Communication -> BACnet settings.
6. Note down "IP address" and "Device ID".

{% include integrations/config_flow.md %}
