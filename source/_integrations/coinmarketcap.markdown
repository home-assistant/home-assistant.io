---
title: CoinMarketCap
description: Instructions on how to integrate CoinMarketCap data within Home Assistant.
ha_category:
  - Finance
ha_release: 0.28
ha_iot_class: Cloud Polling
ha_domain: coinmarketcap
---

The `coinmarketcap` sensor platform displays various details about a cryptocurrency provided by [CoinMarketCap](https://coinmarketcap.com/).

To add the CoinMarketCap sensor to your installation, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: coinmarketcap
```

{% configuration %}
currency_id:
  description: The ID of the cryptocurrency to use, default is the ID of Bitcoin.
  required: false
  type: integer
  default: 1
display_currency:
  description: The currency to display.
  required: false
  type: string
  default: USD
display_currency_decimals:
  description: The amount of decimals to round to.
  required: false
  type: integer
  default: 2
{% endconfiguration %}

All supported currencies can be found [here](https://coinmarketcap.com/api/documentation/v1/#section/Standards-and-Conventions), a list of currency IDs can be found [here](https://api.coinmarketcap.com/v2/ticker/).
