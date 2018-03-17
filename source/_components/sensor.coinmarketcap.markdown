---
layout: page
title: "CoinMarketCap"
description: "Instructions on how to integrate CoinMarketCap data within Home Assistant."
date: 2016-08-31 08:15
sidebar: true
comments: false
sharing: true
footer: true
logo: coinmarketcap.png
ha_category: Finance
ha_release: 0.28
ha_iot_class: "Cloud Polling"
---


The `coinmarketcap` sensor platform displays various details about a cryptocurrency provided by [CoinMarketCap](http://coinmarketcap.com/).

To add the CoinMarketCap sensor to your installation, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: coinmarketcap
```

{% configuration %}
currency:
  description: The cryptocurrency to use.
  required: false
  type: string
  default: Bitcoin
display_currency:
  description: The currency to display.
  required: false
  type: string
  default: USD
{% endconfiguration %}

All supported currencies can be found [here](https://coinmarketcap.com/api/).

