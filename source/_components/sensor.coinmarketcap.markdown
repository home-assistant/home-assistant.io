---
layout: page
title: "CoinMarketCap"
description: "Instructions how to integrate CoinMarketCap data within Home Assistant."
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


The `coinmarketcap` sensor platform displays various details about a crypto currency provided by [CoinMarketCap](http://coinmarketcap.com/).

To add the CoinMarketCap sensor to your installation, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: coinmarketcap
```

Configuration variables:

- **currency** (*Optional*): The currency to display, eg. `bitcoin`, `litecoin`, `steem`, etc. Default is `bitcoin`.

