---
title: LoRaWAN
description: Provide support for integrating LoRaWAN devices and backends into Home Assistant.
ha_category:
  - Network
ha_release: 2026.11
ha_iot_class: Local Push
ha_quality_scale: internal
ha_codeowners:
  - '@balloob'
ha_domain: lorawan
ha_integration_type: service
---

The **LoRaWAN** {% term integration %} connects LoRaWAN server integrations with device integrations in Home Assistant. Server integrations provide connections to your LoRaWAN networks. Device integrations use those connections to expose supported devices and their entities.

## Configuration

LoRaWAN loads automatically when an integration that depends on it is set up. It requires no separate configuration.

Configure each server connection through its server integration. LoRaWAN discovers matching device integrations from the devices available on those connections.
