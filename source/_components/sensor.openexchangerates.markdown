---
layout: page
title: "Open Exchange Rates"
description: "Instructions on how to integrate exchange rates from https://openexchangerates.org within Home Assistant."
date: 2016-06-23 10:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Finance
logo: openexchangerates.png
ha_iot_class: "Cloud Polling"
ha_release: 0.23
---


The `openexchangerates` sensor will show you the current exchange rate from [Open Exchange Rates](https://openexchangerates.org) that provides realtime exchange rates for [170 currencies](https://openexchangerates.org/currencies). The free account is limited to only USD as a base currency, allows 1000 requests per month, and updates every hour. 

Obtain your API key [here](https://openexchangerates.org/signup)

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: openexchangerates
    api_key: YOUR_API_KEY
    quote: EUR
```

Configuration variables:

- **api_key** (*Required*): API Key for [Open Exchange Rates](https://openexchangerates.org).
- **quote** (*Required*): The symbol of the quote or target currency.
- **name** (*Optional*): Name to use in the frontend.
- **base** (*Optional*): The symbol of the base currency. Defaults to USD.
