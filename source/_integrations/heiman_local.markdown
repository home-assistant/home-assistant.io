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
ha_quality_scale: bronze
ha_zeroconf: true
---

The **Heiman Local** {% term integration %} lets you turn a compatible [Heiman](https://www.heimantech.com/) Wi-Fi switch on and off from Home Assistant. The connection runs over your local network and requires no Heiman account.

## Supported devices

Use a single-channel Heiman Wi-Fi switch whose firmware supports the `heiman_wifi_v1` local HTTP API.

## Prerequisites

1. Connect the switch to Wi-Fi.
2. Make sure Home Assistant can reach the switch using its IPv4 address.

{% include integrations/config_flow.md %}

For manual setup, enter the following values.

{% configuration_basic %}
IPv4 address:
  description: The switch’s IPv4 address on your local network. You can find it in your router’s device list.
HTTP port:
  description: The port used by the switch’s local HTTP API. The default is `80`.
{% endconfiguration_basic %}

## Supported functionality

### Switches

Each configured device provides one switch entity. Use it to turn the device on or off and check its current state.

## Data updates

Home Assistant polls the switch every 30 seconds. After the switch accepts an on or off command, Home Assistant reads the state immediately to confirm the result.

## Troubleshooting

{% details "Home Assistant cannot connect during setup" %}

### Could not connect to the switch or read its power state.

#### Description

Home Assistant needs to reach the switch’s local HTTP API and read its power state before it can add the device.

#### Resolution

1. Make sure the switch is powered on and connected to Wi-Fi.
2. Verify that Home Assistant can reach the switch’s IPv4 address.
3. If you are setting up the switch manually, check that you entered the correct HTTP port.

{% enddetails %}

## Removing the integration

{% include integrations/remove_device_service.md %}
