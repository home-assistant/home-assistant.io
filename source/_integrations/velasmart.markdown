---
title: VelaSmart
description: Instructions on how to integrate VelaSmart smart curtains with Home Assistant.
ha_category:
  - Cover
ha_iot_class: Cloud Polling
ha_release: "2026.9"
ha_config_flow: true
ha_domain: velasmart
ha_codeowners:
  - "@liulijun2019"
ha_platforms:
  - cover
ha_integration_type: device
ha_quality_scale: bronze
---

The VelaSmart integration allows you to control VelaSmart smart curtains and blinds from Home Assistant.

## Prerequisites

- A VelaSmart account with at least one paired curtain or blind.

{% include integrations/config_flow.md %}

## Data updates

The integration polls the VelaSmart cloud every 30 seconds to update the state of your curtains.

