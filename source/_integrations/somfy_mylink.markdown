---
title: Somfy MyLink
description: Instructions on how to integrate Somfy MyLink devices with Home Assistant.
ha_category:
  - Cover
  - Hub
ha_release: 0.92
ha_iot_class: Assumed State
ha_domain: somfy_mylink
ha_config_flow: true
ha_dhcp: true
ha_platforms:
  - cover
ha_integration_type: hub
ha_codeowners:
  - '@sslivins'
---

The **Somfy MyLink** {% term integration %} is used as an interface to a compatible Somfy MyLink hub utilizing the `Synergy` API. It allows the addition of covers from the Somfy MyLink platform to Home Assistant.

## Prerequisites

Before setting up the integration, find the IP address or hostname and **System ID** of your Somfy MyLink hub.

To find the System ID:

1. Open the MyLink mobile app.
2. Open **Integration**.
3. Select any integration that is not a Cloud service.
4. Note the **System ID** shown there. You need this value when adding the integration to Home Assistant.

{% include integrations/config_flow.md %}

If any of your devices are reversed, they can be adjusted in **Settings** > **Devices & services** > **Somfy MyLink** > **Options**.
