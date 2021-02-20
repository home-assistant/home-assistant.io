---
title: Open Exchange Rates
description: Instructions on how to integrate exchange rates from https://openexchangerates.org within Home Assistant.
ha_category:
  - Finance
ha_iot_class: Cloud Polling
ha_release: 0.23
ha_domain: openexchangerates
ha_platforms:
  - sensor
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

{% configuration %}
name:
  description: The name of the sensor.
  required: false
  type: string
  default: Exchange Rate Sensor
api_key:
  description: "The API Key for [Open Exchange Rates](https://openexchangerates.org)."
  required: true
  type: string
quote:
  description: The symbol of the quote or target currency.
  required: true
  type: string
base:
  description: The symbol of the base currency.
  required: false
  type: string
  default: USD
{% endconfiguration %}
