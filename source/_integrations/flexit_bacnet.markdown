---
title: Flexit Nordic (BACnet)
description: Instructions on how to integrate Flexit air handling unit into Home Assistant.
ha_category:
  - Climate
ha_release: 2024.1
ha_iot_class: Local Polling
ha_domain: flexit_bacnet
ha_platforms:
  - climate
ha_integration_type: device
ha_codeowners:
  - '@lellky'
  - '@piotrbulinski'
ha_config_flow: true
---

Integrates [Flexit](https://www.flexit.no/en/) Nordic series air handling unit into Home Assistant.

## Prerequisites

To configure the integration, you need to obtain the IP address and Device ID for the unit.

1. Open the Flexit Go app on your mobile.
2. On the main screen, select the **Find product** button.
3. Select your device and select **Connect**.
4. Enter the installer code (default: 1000) and select **Login**.
5. Go to **More** > **Installer** > **Communication**  > **BACnet settings**.
6. Note down the **IP address** and **Device ID**.

### A note about shutting down the device
 
Flexit recommends that the function to turn off the unit is not made accessible in the interface for an ordinary user. It will therefore be removed from the integration in the future.

The consequences of shutting down the unit can be costly and extensive. For example, there can be condensation issues in freezing temperatures, and rotary heat exchangers can freeze.

If you need to shut down the unit, make sure to take all necessary precautions, such as securing the system with frost protection dampers.

Furthermore, Flexit recommends that filter replacement is made with the unit unplugged from the power socket. To prevent damage when unplugging the device, a controlled shutdown initiated from the control panel (or in the future, from a service call in Home Assistant) is required.

{% include integrations/config_flow.md %}
