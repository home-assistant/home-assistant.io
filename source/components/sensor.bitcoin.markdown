---
layout: page
title: "Bitcoin support"
description: "Instructions how to integrate the time and the date within Home Assistant."
date: 2015-05-08 17:15
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/bitcoin.png' class='brand pull-right' />
The bitcoin platform displays various details about the [Bitcoin](https://bitcoin.org) network.

If you have an online wallet from [Blockchain.info](https://blockchain.info/) the sensor is capable to show your current balance.

To add the Bitcoin sensor to your installation, add a selection of the available display options to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: bitcoin
  wallet: 'YOUR WALLET_ID'
  password: YOUR_ACCOUNT_PASSWORD
  currency: YOUR CURRENCY
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


