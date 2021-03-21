---
title: Bittrex
description: Keep track of cryptocurrencies.
ha_category:
  - Finance
ha_release: 2021.02
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@DevSecNinja'
ha_domain: bittrex
ha_config_flow: true
---

With the Bittrex integration, you can keep track of cryptocurrencies from the [Bittrex](https://bittrex.com/) exchange.

## Requirements

Setup requires an API Key and Secret from Bittrex with at least 'Read Info' permissions. Browse to [Your Account](https://global.bittrex.com/Manage?view=api) to generate your API Key and Secret.

<div class='note warning'>

A word of caution: It is highly recommended to use the IP whitelist, and always specify the lowest level of permissions you need ('Read Info' for this integration). Using an API will bypass Multi-Factor Authentication, keep your keys safe!

</div>

{% include integrations/config_flow.md %}

## Sensors

This integration currently provides the following sensors:

- All details and price of the trading pairs you have selected during setup.
- The number of open & closed trading orders you may have.
