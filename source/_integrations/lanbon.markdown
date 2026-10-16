---
title: LANBON
description: Instructions on how to integrate LANBON devices with Home Assistant.
ha_category:
  - Switch
ha_release: "2026.10"
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - "@LANBON2026"
ha_domain: lanbon
ha_zeroconf: true
ha_platforms:
  - switch
ha_integration_type: hub
ha_quality_scale: bronze
---

The **LANBON** {% term integration %} connects Home Assistant to a LANBON panel on your local network. You can turn its switches on and off, view their current state, and use them in automations.

## Prerequisites

- A LANBON panel with **Open Integration** enabled, on the same network as Home Assistant
- The token shown on the device screen after **Open Integration** is enabled

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The local IP address of the LANBON panel, not the Home Assistant address."
Port:
  description: "The local API port of the panel. The default is `8765`."
Token:
  description: "The token shown on the device screen after **Open Integration** is enabled. Copy this token from the panel."
{% endconfiguration_basic %}

### Automatic discovery

If Home Assistant discovers the panel on your local network, select the discovered device and enter the token shown on the panel. If the panel is not discovered, add the integration manually using its IP address.

## Supported functionality

The **LANBON** integration provides the following entities.

### Switches

- Panel switches
  - Name: Each switch uses the name reported by the panel. If no name is provided, the component ID is used instead. The names and number of switches depend on the panel configuration.
  - Description: One entity is created for each switch component that supports on/off control. It shows the current on/off state and lets you turn that switch on or off from Home Assistant or an automation.
  - Availability: A switch is unavailable when its device is offline, its component is disabled, or Home Assistant cannot communicate with the panel.

## Data updates

Home Assistant checks the panel every 15 seconds. Panels that support WebSocket events also send state changes between these checks.

## Troubleshooting

- Cannot connect: Enable **Open Integration** on the panel and confirm that the configured port (default 8765) is reachable on the local network.
- Invalid token: Enter the current token from the device screen.
- Open Integration is off: Enable it on the panel, then retry. This setting controls access for the integration; Home Assistant does not provide a separate enable switch.
- No discovery: Add the integration manually by IP address. Check that your network allows multicast discovery between Home Assistant and the panel, especially when using Docker, WSL2, or VLANs.

## Removing the integration

{% include integrations/remove_device_service.md %}

Turning off **Open Integration** on the device stops discovery and control. No factory reset is required.
