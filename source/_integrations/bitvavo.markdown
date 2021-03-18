---
title: Bitvavo
description: Keep track of cryptocurrencies.
ha_category:
  - Finance
ha_release: 2021.4
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@cyberjunky'
ha_domain: bitvavo
ha_config_flow: true
---

With the Bitvavo integration, you can keep track of cryptocurrencies from the [Bitvavo](https://bitvavo.com) exchange.

## Requirements

Setup requires an API Key and Secret Key from Bitvavo with at least 'Read' permissions. Browse to [API Settings](https://account.bitvavo.com/user/api) to generate your API Key and Secret Key.

<div class='note warning'>

A word of caution: It is highly recommended to use the IP whitelist, and specify the lowest level of permissions you need. Using an API will bypass 2FA, keep your keys safe!

</div>

{% include integrations/config_flow.md %}

## Sensors

This integration currently provides the following sensors:

- The value of each of your assets, available, and in orders.
- Total value of your assets in BTC, EUR and USDT.
- All details and price of the trading pairs you have selected during setup.
- The number of open trading orders you may have.
