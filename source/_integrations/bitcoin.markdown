---
title: Bitcoin
description: Instructions on how to integrate Bitcoin data within Home Assistant.
ha_category:
  - Finance
ha_release: pre 0.7
ha_iot_class: Cloud Polling
ha_domain: bitcoin
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `bitcoin` sensor platform displays various details about the [Bitcoin](https://bitcoin.org) network.

To add the Bitcoin sensor to your installation, add a selection of the available display options to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: bitcoin
    display_options:
      - exchangerate
      - trade_volume_btc
```

{% configuration %}
currency:
  description: The currency to exchange to, e.g., CHF, USD, EUR, etc.
  required: false
  type: string
  default: USD
display_options:
  description: Options to display in the frontend.
  required: true
  type: list
  keys:
    exchangerate:
      description: Exchange rate of 1 BTC
    trade_volume_btc:
      description: Trade volume
    miners_revenue_usd:
      description: Miners revenue
    btc_mined:
      description: BTC mined
    trade_volume_usd:
      description: Trade volume in USD
    difficulty:
      description: Difficulty
    minutes_between_blocks:
      description: Time between blocks in minutes
    number_of_transactions:
      description: Number of transactions
    hash_rate:
      description: Hash rate in PH/s
    timestamp:
      description: Timestamp
    mined_blocks:
      description: Mined Blocks
    blocks_size:
      description: Block size
    total_fees_btc:
      description: Total fees in BTC
    total_btc_sent:
      description: Total sent in BTC
    estimated_btc_sent:
      description: Estimated sent in BTC
    total_btc:
      description: Total of BTC
    total_blocks:
      description: Total Blocks
    next_retarget:
      description: Next retarget
    estimated_transaction_volume_usd:
      description: Estimated transaction volume in BTC
    miners_revenue_btc:
      description: Miners revenue in BTC
    market_price_usd:
      description: Market price in USD
{% endconfiguration %}
