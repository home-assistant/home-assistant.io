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

To add the Flexpool sensors to your installation, specify an Ethereum address to watch in the `configuration.yaml` file. You can also optionally provide a token name to retrieve and ERC-20 token balance. If no token is provided then the balance retrieved will be in ETH. You can also optionally provide the token contract address in case the token name is not found.

{% include integrations/config_flow.md %}

## Sensors

This integration currently provides the following sensors:

- Hashrate and shares for each worker.
- Pool stats like pool hashrate, luck, workers and your current unpaid balance.