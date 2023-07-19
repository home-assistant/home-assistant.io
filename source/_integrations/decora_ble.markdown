---
title: Decora BLE
description: Instructions on how to integrate Decora BLE devices into Home Assistant.
ha_category:
  - Light
ha_bluetooth: true
ha_release: 2023.9
ha_iot_class: Local Polling
ha_codeowners:
  - "@ColinCampbell"
ha_domain: decora_ble
ha_config_flow: true
ha_platforms:
  - light
ha_integration_type: integration
---

Integrates Bluetooth Low Energy (BLE) Leviton Decora devices into Home Assistant.

{% include integrations/config_flow.md %}

This integration has been confirmed to work with the following devices:

- DD710 0-10v dimmer

It's likely that other Leviton Decora BLE dimmers will work with this integration. There is some additional work to support non-dimmable switches like the DDS15 model.
