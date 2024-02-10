---
title: WireGuard
description: Instructions on how to integrate WireGuard with Home Assistant.
ha_category:
  - Sensor
ha_release: 2024.3
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@niro1987'
ha_domain: wireguard
ha_platforms:
  - sensor
ha_integration_type: hub
---

[WireGuard®](https://www.wireguard.com) is an extremely simple yet fast and
modern VPN that utilizes state-of-the-art cryptography. The **WireGuard**
integration allows you to monitor the WireGuard status provided by the WireGuard
add-on in Home Assistant.

Please be aware that this integration is only compatible by the WireGuard
add-on in Home Assistant that have the WireGuard peers status API enabled
in the add-on configuration.

{% include integrations/config_flow.md %}

## Sensors

This integration provides {% term sensors %} for the following information from
each configured peer from WireGuard:

- Latest handshake.
- Transferred bytes received.
- Transferred bytes sent.
