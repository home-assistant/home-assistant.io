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
ha_codeowners:
  - "@LennP"
ha_quality_scale: bronze
---

The **[Lutron](https://www.lutron.com/) GRAFIK Eye** {% term integration %} allows Home Assistant to monitor and control lighting scenes on GRAFIK Eye control units through a GRX-CI-NWK-E or GRX-IA-CI-NWK-E Ethernet interface.

The integration supports GRAFIK Eye 3000 and 4000 series control units. GRAFIK Eye QS systems are not supported.

## Prerequisites

Set DIP switch 7 on the Ethernet interface to the ON position to enable automatic scene status notifications. Without this, Home Assistant will not receive scene changes initiated outside Home Assistant.

For more information, refer to the official Lutron documentation:

- [GRAFIK Eye Control Interface Operating Instructions](https://assets.lutron.com/a/documents/040229aeng.pdf)
- [GRAFIK Eye RS232/Ethernet Protocol Reference](https://assets.lutron.com/a/documents/040196d.pdf)

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The IP address or hostname of the Ethernet interface.
  required: true
  type: string
Port:
  description: The Telnet port of the Ethernet interface.
  required: true
  default: 23
  type: integer
Password:
  description: "The password for the Ethernet interface (defaults: `nwk` for connection 1 and `nwk2` for connection 2)."
  required: true
  type: string
{% endconfiguration_basic %}

## Supported functionality

### Selects

- **Scene**
  - **Description**: Displays and controls the active scene of a GRAFIK Eye control unit.
  - **Options**: Off and scenes 1–16.

## Removing the integration

{% include integrations/remove_device_service.md %}
