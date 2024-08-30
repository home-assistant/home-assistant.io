---
title: Deako Smart Lighting
description: Instructions on how to integrate Deako Smart Lighting into Home Assistant.
ha_category:
  - Switch
ha_iot_class: Local Polling
ha_release: 2024.10
ha_domain: deako
ha_config_flow: true
ha_platforms:
  - light
ha_integration_type: integration
---

The **Deako Smart Lighting** integration allows you to control your [Deako](https://deako.com) devices from Home Assistant.

## Prerequisites

For this integration to work, your devices must be listed **online**, viewable in the Deako app.

{% include integrations/config_flow.md %}

Current devices supported:

- all smart Deako devices

Features not currently supported:

- Deako groups
- Deako scenes

This integration uses the [`pydeako`](https://pypi.org/project/pydeako/) library to connect to and interact with devices. One device is selected as the bridge over the local network to the Deako BLE mesh network, allowing for discovery of all devices and control.

The bridge device can be discovered automatically through mDNS in Home Assistant, or a bridge can be selected manually through manual setup of the Deako integration.
