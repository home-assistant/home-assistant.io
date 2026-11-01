---
title: Lutron GRAFIK Eye
description: Instructions on how to integrate Lutron GRAFIK Eye lighting control systems with Home Assistant.
ha_categories:
  - lighting.lighting_systems
ha_release: '2026.12'
ha_iot_class: Local Push
ha_domain: lutron_grafik_eye
ha_config_flow: true
ha_platforms:
  - select
ha_integration_type: hub
---

The **Lutron GRAFIK Eye** {% term integration %} allows Home Assistant to monitor and control lighting scenes on GRAFIK Eye control units through a GRX-CI-NWK-E Ethernet interface.

The integration supports GRAFIK Eye 3000 and 4000 series control units. GRAFIK Eye QS systems are not supported.

## Prerequisites

Set **DIP switch 7** on the GRX-CI-NWK-E to the **ON** position to enable automatic scene status notifications. Without this, Home Assistant will not receive scene changes initiated outside Home Assistant.

For more information, refer to the official Lutron documentation:

- [GRAFIK Eye Control Interface Operating Instructions](https://assets.lutron.com/a/documents/040229aeng.pdf)
- [GRAFIK Eye RS232/Ethernet Protocol Reference](https://assets.lutron.com/a/documents/040196d.pdf)

{% include integrations/config_flow.md %}

During configuration, provide:

- **Host:** The IP address of the GRX-CI-NWK-E.
- **Port:** The Telnet port (default: `23`).
- **Password:** The Telnet login string (defaults: `nwk` for connection 1 and `nwk2` for connection 2).

## Lighting scenes

Each connected GRAFIK Eye control unit is represented by a `select` {% term entity %}, allowing you to view and change its active scene. Scenes can also be activated through {% term automations %} using the `select.select_option` {% term action %}.

The integration controls lighting scenes rather than individual lighting zones.

## Removing the integration

{% include integrations/remove_device_service.md %}
