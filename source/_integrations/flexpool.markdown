---
title: Flexpool
description: Monitor your workers and pool stats in Home Assistant.
ha_category:
  - Finance
ha_release: 2021.02
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@DatDraggy'
ha_domain: flexpool
ha_config_flow: true
---

The Flexpool integration allows you to keep track of your miner details page by adding sensors for workers and pool statistics.

{% include integrations/config_flow.md %}

## Sensors

This integration currently provides the following sensors:

- Hashrate and shares for each worker.
- Pool stats like pool hashrate, luck, workers and your current unpaid balance.