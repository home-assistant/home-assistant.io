---
title: Alpha Vantage
description: Instructions on how to setup Alpha Vantage within Home Assistant.
ha_category:
  - Finance
ha_iot_class: Cloud Polling
ha_release: '0.60'
ha_domain: alpha_vantage
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `alpha_vantage` sensor platform uses [Alpha Vantage](https://www.alphavantage.co) to monitor the stock market. This platform also provides detail about exchange rates.

To enable the `alpha_vantage` platform, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: alpha_vantage
    api_key: YOUR_API_KEY
    symbols:
      - symbol: GOOGL
        name: Google
    foreign_exchange:
      - name: USD_EUR
        from: USD
        to: EUR
```

Either a symbol or a foreign exchange must be configured, otherwise you will not get any data.

{% configuration %}
api_key:
  description: "The API Key from [Alpha Vantage](https://www.alphavantage.co)."
  required: true
  type: string
symbols:
  description: List of stock market symbols for given companies.
  required: false
  type: map
  keys:
    name:
      description: The name of the sensor to use for the frontend.
      required: false
      type: string
    currency:
      description: The name of the sensor to use for the frontend.
      required: false
      type: string
      default: USD
    symbol:
      description: The stock market symbol for the given company.
      required: true
      type: string
foreign_exchange:
  description: List of currencies.
  type: map
  required: false
  keys:
    name:
      description: The name of the sensor to use for the frontend.
      required: false
      type: string
    from:
      description: The source currency.
      required: true
      type: string
    to:
      description: The target currency.
      required: true
      type: string
{% endconfiguration %}

## API information

Alpha Vantage offers two tiers of the API key, one free and one paid for. If you are using the free version, you will be limited to twenty-five queries per day. The sensor polls every 5 minutes, so you will only get data for the first two hours per day. This can be configured using the `scan_interval` variable.

The paid version starts at 75 queries per minute, increasing ticker quantity quite a bit.

## Examples

In this section you find some real-life examples of how to use this sensor.

### Google and the exchange rate for Bitcoin

```yaml
sensor:
  - platform: alpha_vantage
    api_key: YOUR_API_KEY
    symbols:
      - name: Google
        currency: USD
        symbol: GOOGL
    foreign_exchange:
      - from: BTC
        to: USD
        name: Bitcoin
```
