---
layout: page
title: "Currencylayer"
description: "Instructions on integrating exchange rates from https://currencylayer.com/ within Home Assistant."
date: 2016-10-26 10:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Finance
logo: currencylayer.png
ha_iot_class: "Cloud Polling"
ha_release: 0.32
---


The `currencylayer` sensor will show you the current exchange rate from [Currencylayer](https://currencylayer.com/) that provides realtime exchange rates for [170 currencies](https://currencylayer.com/currencies). The free account is limited to only USD as a base currency, allows 1000 requests per month, and updates every hour.

Obtain your API key [here](https://currencylayer.com/product)

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: currencylayer
    api_key: YOUR_API_KEY
    base: USD
    quote:
      - EUR
      - INR
```

Configuration variables:

- **api_key** (*Required*): API Key from [Currencylayer](https://currencylayer.com/).
- **base** (*Optional*): The symbol of the base currency. Defaults to USD.
- **quote** (*Required*): The symbol(s) of the quote or target currencies.
