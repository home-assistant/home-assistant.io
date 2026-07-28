---
title: IntelliDwell Sprinkler Controller
description: Instructions on how to integrate an IntelliDwell Sprinkler Controller with Home Assistant.
ha_category:
  - Switch
ha_config_flow: true
ha_release: '2026.8'
ha_iot_class: Local Polling
ha_codeowners:
  - '@TannerNelson16'
ha_domain: intellidwell
ha_platforms:
  - switch
ha_integration_type: device
---

The **IntelliDwell Sprinkler Controller** integration allows you to control and monitor your 10-zone local-first smart sprinkler controller directly within Home Assistant.

## Configuration

To add the **IntelliDwell Sprinkler Controller** integration to your Home Assistant instance, use the following button:

{% include integrations/config_flow.md %}

Alternatively, manual setup:
1. Go to **Settings** > **Devices & Services**.
2. Select **Add Integration**.
3. Choose **IntelliDwell Sprinkler Controller** from the list and enter the hostname or IP address of your controller.

## Switches

The integration exposes 10 individual zone switch entities corresponding to the relay outputs on the controller:
- `Zone 1` through `Zone 10`

Toggling any zone switch sends immediate commands to start or stop watering for that zone over your local network.

## Removal

To remove the integration:
1. Go to **Settings** > **Devices & Services**.
2. Select **IntelliDwell Sprinkler Controller**.
3. Click the three dots menu and select **Delete**.
