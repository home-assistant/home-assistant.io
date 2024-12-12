---
title: Deako
description: Instructions on how to integrate Deako Smart Lighting into Home Assistant.
ha_category:
  - Switch
ha_iot_class: Local Polling
ha_release: '2024.10'
ha_domain: deako
ha_config_flow: true
ha_platforms:
  - light
ha_codeowners:
  - '@sebirdman'
  - '@balake'
  - '@deakolights'
ha_zeroconf: true
ha_integration_type: integration
---

The **Deako Smart Lighting** integration allows you to control your [Deako](https://deako.com) devices from Home Assistant.

## Prerequisites

For this integration to work, your devices must be listed **online**, viewable in the Deako app. Once devices have been onboarded and are online, the Deako app is no longer needed. Devices will continue to work without the app.

{% include integrations/config_flow.md %}

## Supported devices

- all smart Deako devices

Features not currently supported:

- Deako groups
- Deako scenes
