---
title: currencylayer
description: Instructions on integrating exchange rates from https://currencylayer.com/ within Home Assistant.
ha_category:
  - Finance
ha_iot_class: Cloud Polling
ha_release: 0.32
ha_domain: currencylayer
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `currencylayer` sensor will show you the current exchange rate from [Currencylayer](https://currencylayer.com/) that provides real-time exchange rates for [170 currencies](https://currencylayer.com/currencies). The free account is limited to only USD as a base currency, allows 250 requests per month and updates daily.

## Setup

Obtain your API key from [here](https://currencylayer.com/product).

## Configuration

To enable this sensor, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

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

{% configuration %}
api_key:
  description: "The API Key from [Currencylayer](https://currencylayer.com/)."
  required: true
  type: string
quote:
  description: The symbol(s) of the quote or target currencies.
  required: false
  type: [string, list]
  default: Exchange rate
base:
  description: The symbol of the base currency.
  required: false
  type: string
  default: USD
{% endconfiguration %}
