---
description: Instructions on how to integrate Somfy MyLink devices with Home Assistant.
ha_release: 0.92
ha_domain: somfy_mylink
---

The **Somfy MyLink** {% term integration %} is used as an interface to a compatible Somfy MyLink hub utilizing the `Synergy` API. It allows the addition of covers from the Somfy MyLink platform to Home Assistant.

## Prerequisites

Before setting up the integration, find the **System ID** of your Somfy MyLink hub.

To find the System ID:

1. Open the MyLink mobile app.
2. Open **Integration**.
3. Select any integration that is not a cloud service.
4. Note the **System ID** shown there. You need this value when adding the integration to Home Assistant.

{% include integrations/config_flow.md %}

If any of your devices are reversed, they can be adjusted in **Settings** > **Devices & services** > **Somfy MyLink** > **Options**.
