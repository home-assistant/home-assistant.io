---
layout: page
title: "coinbase"
description: "Instructions for how to add Coinbase sensors to Home Assistant."
date: 2017-12-08 17:54
sidebar: true
comments: false
sharing: true
footer: true
logo: coinbase.png
ha_release: 0.61
ha_iot_class: "Cloud Polling"
---


The `coinbase` component lets you access account balances and exchange rates from [coinbase](https://coinbase.com).

You will need to obtain an API key from coinbase's [developer site](https://www.coinbase.com/settings/api) to use this component. You need to give read access to `wallet:accounts` in order for the component to access relevant data. 

To set it up, add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
coinbase:
  api_key: asdfghjklqwertyuiopzxcvbnm 
  api_secret: nkjnewncfghjklqwertyuiopzxcvbnm 
  exchange_rate_currencies:
    - BTC
    - ETH
    - LTC
=======
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
exchange_rate_currencies:
  description: List of currencies to create exchange rate sensors for.
  required: false
  type: list
{% endconfiguration %}
