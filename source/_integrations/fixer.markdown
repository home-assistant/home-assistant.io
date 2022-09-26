---
title: Fixer
description: Instructions on how to integrate exchange rates from Fixer.io within Home Assistant.
ha_category:
  - Finance
ha_iot_class: Cloud Polling
ha_release: 0.23
ha_domain: fixer
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `fixer` sensor will show you the current exchange rate from [Fixer.io](https://fixer.io/) which is using data from the [European Central Bank (ECB)](https://www.ecb.europa.eu).

To get an overview about the available [currencies](https://fixer.io/symbols).

## Setup

You need to create an [API key](https://fixer.io/product). The free account is limited to only EUR as a base currency, allows 250 requests per month, and updates every hour.

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: fixer
    api_key: YOUR_API_KEY
    target: CHF
```

{% configuration %}
api_key:
  description: Your API key for [Fixer.io](https://fixer.io/).
  required: true
  type: string
target:
  description: The symbol of the target currency.
  required: true
  type: string
name:
  description: Name to use in the frontend.
  required: false
  type: string
  default: Exchange rate
{% endconfiguration %}

Details about the API are available in the [Fixer.io documentation](https://fixer.io/documentation).
