---
layout: page
title: "Bitcoin support"
description: "Instructions how to integrate Bitcoin data within Home Assistant."
date: 2015-05-08 17:15
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/bitcoin.png' class='brand pull-right' />
The bitcoin platform displays various details about the [Bitcoin](https://bitcoin.org) network.

If you have an online wallet from [Blockchain.info](https://blockchain.info/) the sensor is capable to show your current balance.

You need to enable the API access for your online wallet to get the balance. To do that log in and move to 'Account Setting', choose 'IP Restrictions', and check 'Enable Api Access'. You will get an email message from blockchain.info where you must authorize the API access.

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

Configuration variables:

- **wallet** (*Optional*): This is your wallet identifier from https://blockchain.info to access the online wallet.
- **password** (*Optional*): Password for your online wallet.
- **currency** (*Optional*): The currency to exchange to, eg. CHF, USD, EUR, etc. Default is USD.

- **display_options** array:
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

