---
title: Sunricher DALI
description: Instructions on how to integrate Sunricher DALI with Home Assistant.
ha_category:
  - Light
ha_release: 2025.11
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@niracler'
ha_domain: sunricher_dali
ha_platforms:
  - light
  - scene
ha_integration_type: integration
ha_quality_scale: silver
related:
  - url: https://www.sunricher.com/din-rail-ethernet-dali-gateway-sr-gw-eda.html
    title: SR-GW-EDA DALI Gateway
ha_dhcp: true
---

The **Sunricher DALI** {% term integration %} allows you to control and monitor DALI lighting devices connected to [Sunricher](https://www.sunricher.com/) gateways. The integration receives real-time push updates to keep entity states synchronized.

## Prerequisites

This integration communicates with DALI lighting devices through a Sunricher gateway. You will need:

- Sunricher SR-GW-EDA DALI gateway on the same network as Home Assistant
- DALI lighting devices connected to and configured on the gateway

{% include integrations/config_flow.md %}

To add the Sunricher DALI integration to your Home Assistant instance:

1. Ensure the gateway is powered on and connected to the same network as Home Assistant.
2. Select **Submit** to start discovery. Home Assistant will search for gateways for up to 3 minutes.
3. While discovery is in progress, press the **Reset** button on your DALI gateway device once. The gateway will respond immediately after the button press.
   ![Press the Reset button on the DALI gateway](/images/integrations/sunricher_dali_center/gateway_reset_button.png)

After setup, the gateway appears under {% my integrations title="**Settings** > **Devices & services**" %}. Multiple gateways are supported, each with its own set of entities.

## Supported functionality

The **Sunricher DALI** integration provides the following entities.

### Lights

Each DALI lighting device connected to the gateway is represented as a light entity in Home Assistant. Supported features depend on the device type:

- On/off and brightness control (all DALI DT6 and DT8 devices)
- Color temperature (DALI DT8 Tc devices)
- Color control (DALI DT8 RGB, XY, RGBW, and RGBWA devices)

### Scenes

DALI scenes configured on the gateway are automatically imported into Home Assistant as scene entities. Each scene can be activated to apply pre-configured lighting settings to the associated DALI devices. Scenes must be created and edited on the Sunricher DALI gateway; creating or editing scenes from Home Assistant is not supported.

## Data updates

The integration receives real-time push updates from the gateway, ensuring changes made outside Home Assistant are reflected immediately.

## Removing the integration

This integration follows standard integration removal; no extra steps are required.

{% include integrations/remove_device_service.md %}
