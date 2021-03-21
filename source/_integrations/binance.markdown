---
title: Binance
description: Keep track of cryptocurrencies.
ha_category:
  - Finance
ha_release: 2021.02
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@DevSecNinja'
ha_domain: binance
ha_config_flow: true
---

With the Binance integration, you can keep track of cryptocurrencies from the [Binance](https://www.binance.com) exchange.

## Requirements

Setup requires an API Key and Secret Key from Binance with at least 'Read Info' permissions. Browse to [API Management](https://www.binance.com/en/my/settings/api-management) to generate your API Key and Secret Key.

<div class='note warning'>

A word of caution: It is highly recommended to use the IP whitelist, and always specify the lowest level of permissions you need ('Read Info' for this integration). Using an API will bypass Multi-Factor Authentication, keep your keys safe!

</div>

{% include integrations/config_flow.md %}

## Sensors

This integration currently provides the following sensors:

- The value of each of your assets, available, and in orders.
- Total value of your assets in BTC, EUR and USDT.
- All details and price of the trading pairs you have selected during setup.
- The number of open trading orders you may have.
