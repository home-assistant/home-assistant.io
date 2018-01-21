---
layout: page
title: "Yahoo Finance"
description: "Instructions how to setup Yahoo Finance within Home Assistant."
date: 2016-09-18 21:00
sidebar: true
comments: false
sharing: true
footer: true
logo: yahoo_finance.png
ha_category: Finance
ha_iot_class: "Cloud Polling"
featured: false
ha_release: 0.29
---

<p class='note warning'>
  This sensor doesn't work anymore as [Yahoo!](https://yahoo.uservoice.com/forums/382977-finance/suggestions/32103877-yahoo-stock-quote-api-please-bring-back) decommissioned the service in early November 2017. A repleacement is the [`alpha_vantage` sensor](/components/sensor.alpha_vantage/).
</p>

The `yahoo_finance` platform uses [Yahoo Finance](https://finance.yahoo.com/) to monitor the stock market.

To enable the `yahoo_finance` platform, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: yahoo_finance
```

{% configuration %}
name:
  description: The name of the sensor.
  required: false
  type: string
  default: Yahoo Stock
symbols:
  description: List of stock market symbols for given companies.
  required: false
  type: string, list
  default: YHOO
{% endconfiguration %}

## {% linkable_title Examples %}

In this section you find some real life examples of how to use this sensor.

### {% linkable_title Red Hat and Google %}

```yaml
sensor:
  - platform: yahoo_finance
    symbols:
      - RHT
      - GOOGL
```

