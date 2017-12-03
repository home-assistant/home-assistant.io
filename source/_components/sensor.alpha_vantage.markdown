---
layout: page
title: "Alpha Vantage"
description: "Instructions how to setup Alpha Vantage within Home Assistant."
date: 2017-12-02 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: alpha_vantage.png
ha_category: Finance
ha_iot_class: "Cloud Polling"
featured: false
ha_release: "0.60"
---

The `alpha_vantage` sensor platform uses [Alpha Vantage](https://www.alphavantage.co) to monitor the stock market.

To enable the `yahoo_finance` platform, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: alpha_vantage
    api_key: YOUR_API_KEY
```

{% configuration %}
api_key:
  description: "The API Key from [Alpha Vantage](https://www.alphavantage.co)."
  required: true
  type: string
symbols:
  description: List of stock market symbols for given companies.
  required: false
  type: string, list
  default: GOOGL
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

