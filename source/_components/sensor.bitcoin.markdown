---
layout: page
title: "Bitcoin"
description: "Instructions how to integrate Bitcoin data within Home Assistant."
date: 2015-05-08 17:15
sidebar: true
comments: false
sharing: true
footer: true
logo: bitcoin.png
ha_category: Finance
ha_release: pre 0.7
ha_iot_class: "Cloud Polling"
---


The `bitcoin` sensor platform displays various details about the [Bitcoin](https://bitcoin.org) network.

To add the Bitcoin sensor to your installation, add a selection of the available display options to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: bitcoin
  display_options:
    - exchangerate
    - trade_volume_btc
    - miners_revenue_usd
    - btc_mined
    - trade_volume_usd
    - difficulty
    - minutes_between_blocks
    - number_of_transactions
    - hash_rate
    - timestamp
    - mined_blocks
    - blocks_size
    - total_fees_btc
    - total_btc_sent
    - estimated_btc_sent
    - total_btc
    - total_blocks
    - next_retarget
    - estimated_transaction_volume_usd
    - miners_revenue_btc
    - market_price_usd
```

Configuration variables:

- **currency** (*Optional*): The currency to exchange to, eg. CHF, USD, EUR, etc. Default is USD.
- **display_options** array (*Required*): Options to display in the frontend.
  - **exchangerate**: Exchange rate of 1 BTC
  - **trade_volume_btc**: Trade volume
  - **miners_revenue_usd**: Miners revenue
  - **btc_mined**: BTC mined
  - **trade_volume_usd**: Trade volume in USD
  - **difficulty**: Difficulty
  - **minutes_between_blocks**: Time between blocks in minutes
  - **number_of_transactions**: Number of transactions
  - **hash_rate**: Hash rate in PH/s
  - **timestamp**: Timestamp
  - **mined_blocks**: Minded Blocks
  - **blocks_size**: Block size
  - **total_fees_btc**: Total fees in BTC
  - **total_btc_sent**: Total sent in BTC
  - **estimated_btc_sent**: Estimated sent in BTC
  - **total_btc**: Total of BTC
  - **total_blocks**: Total Blocks
  - **next_retarget**: Next retarget
  - **estimated_transaction_volume_usd**: Estimated transaction volume in BTC
  - **miners_revenue_btc**: Miners revenue in BTC
  - **market_price_usd**: Market price in USD

