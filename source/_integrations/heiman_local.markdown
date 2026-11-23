---
title: Heiman Local
description: Control a Heiman Wi-Fi switch over your local network.
ha_release: "2026.12"
ha_categories:
  - plugs_switches
ha_iot_class: Local Polling
ha_codeowners:
  - "@Leo2442926161"
ha_config_flow: true
ha_domain: heiman_local
ha_integration_type: device
ha_platforms:
  - switch
ha_zeroconf: true
---

The **Heiman Local** {% term integration %} lets you turn a compatible Heiman Wi-Fi switch on and off from Home Assistant. The connection runs over your local network and requires no Heiman account.

## Supported devices

Use a single-channel Heiman Wi-Fi switch whose firmware supports the `heiman_wifi_v1` local HTTP API.

## Prerequisites

Connect the switch to Wi-Fi and make sure Home Assistant can reach it over the local network.

{% include integrations/config_flow.md %}

{% configuration_basic %}
IPv4 address:
  description: Find the switch’s IPv4 address in your router’s device list.
HTTP port:
  description: The port used by the switch’s local HTTP API. The default is `80`.
{% endconfiguration_basic %}

## Supported functionality

Each configured device provides one switch entity. Use it to turn the device on or off and check its current state.

## Data updates

Home Assistant reads the switch state every 30 seconds. When you turn the switch on or off from Home Assistant, it reads the state again immediately after the command.

## Troubleshooting

If setup cannot connect to the switch, check that it is powered on and connected to Wi-Fi. Confirm its IPv4 address and HTTP port, and make sure your network allows Home Assistant to reach that address.

## Removing the integration

{% include integrations/remove_device_service.md %}
