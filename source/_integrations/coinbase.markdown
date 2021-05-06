---
title: Coinbase
description: Instructions for how to add Coinbase sensors to Home Assistant.
ha_category:
  - Finance
  - Sensor
ha_release: 0.61
ha_iot_class: Cloud Polling
ha_domain: coinbase
ha_platforms:
  - sensor
---

The `coinbase` integration lets you access account balances and exchange rates from [coinbase](https://coinbase.com).

You will need to obtain an API key from coinbase's [developer site](https://www.coinbase.com/settings/api) to use this component. You need to give read access to `wallet:accounts` in order for the integration to access relevant data.

## Configuration

To set it up, add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
coinbase:
  api_key: YOUR_API_KEY
  api_secret: YOUR_API_SECRET
```

{% configuration %}
api_key:
  description: Your API key to access coinbase.
  required: true
  type: string
api_secret:
  description: Your API secret to access coinbase.
  required: true
  type: string
account_balance_currencies:
  description: List of currencies to create account wallet sensors for.
  required: false
  type: list
  default: all account wallets
exchange_rate_currencies:
  description: List of currencies to create exchange rate sensors for.
  required: false
  type: list
{% endconfiguration %}

Possible currencies are codes that conform to the ISO 4217 standard where possible. Currencies which have or had no representation in ISO 4217 may use a custom code (e.g.,  BTC). A list of values can be obtained via https://api.coinbase.com/v2/currencies, for more information visit [the Coinbase API documentation](https://developers.coinbase.com/api/v2#get-currencies).

## Full configuration example

A full configuration sample including optional variables:

```yaml
# Example configuration.yaml entry
coinbase:
  api_key: YOUR_API_KEY
  api_secret: YOUR_API_SECRET
  account_balance_currencies:
    - EUR
    - BTC
  exchange_rate_currencies:
    - BTC
    - ETH
    - LTC
```
