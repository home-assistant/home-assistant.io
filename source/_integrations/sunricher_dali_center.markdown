---
title: DALI Center
description: Instructions on how to integrate DALI Center with Home Assistant.
ha_category:
  - Light
ha_release: 2025.11
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@niracler'
ha_domain: sunricher_dali_center
ha_platforms:
  - light
ha_integration_type: hub
---

The **DALI Center** {% term integration %} connects Home Assistant to [Sunricher](https://www.sunricher.com/) SR-GW-EDA DALI gateways so you can manage DALI lighting from one place. Gateways are discovered on the local network and push updates keep entity state in sync.

## Requirements

- Sunricher SR-GW-EDA DALI gateway on the same network as Home Assistant
- Commissioned DALI lighting devices connected to that gateway (tested with DALI DT6 dimmable drivers and DT8 tunable white/RGBW drivers)

## Setup

Configure the integration from the Home Assistant user interface; discovery finds supported gateways automatically.

{% include integrations/config_flow.md %}

After setup, the gateway appears under **Devices & Services**. Multiple gateways are supported, each with its own set of entities.

## Lights

Each DALI device creates a light entity with on/off control and dimming. Depending on the hardware, lights may expose color temperature, HS color, or RGBW control. Grouped control and scenes are managed in the gateway; rename devices from the gateway interface and reload the integration to sync changes.

The integration listens for push updates from the gateway, so changes made outside Home Assistant are reflected immediately.

## Troubleshooting

- **Gateway not discovered:** Confirm the gateway and Home Assistant share the same network, the gateway is powered, and its web interface is reachable; restart the gateway if needed.
- **Devices missing:** Check DALI bus wiring, ensure devices are commissioned on the gateway, then reload the integration.
- **Entities unavailable:** Verify device power and addressing in the gateway before restarting the integration.

## Removing the integration

This integration follows standard integration removal; no extra steps are required.

{% include integrations/remove_device_service.md %}

