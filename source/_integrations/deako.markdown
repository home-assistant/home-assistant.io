---
title: Deako Smart Lighting
description: Instructions on how to integrate Deako Smart Lighting into Home Assistant.
ha_category:
  - Switch
ha_iot_class: Local Polling
ha_release: 2023.10.4
ha_domain: deako
ha_platforms:
  - light
ha_integration_type: integration
---

The `deako` platform allows you to control your [Deako](https://deako.com) devices from Home Assistant.

In order for this integration to work, your devices must be listed **online**, viewable in the Deako app.

Current devices supported:

- all smart Deako devices

Features not currently supported:

- Deako groups
- Deako scenes

This integration uses the [`pydeako`](https://pypi.org/project/pydeako/) library to connect to and interact with devices. Devices are automatically discovered via mDNS.