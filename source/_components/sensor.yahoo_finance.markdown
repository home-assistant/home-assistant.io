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

The `yahoo_finance` platform uses [Yahoo Finance](https://finance.yahoo.com/) to monitor the stock market.

To enable the `yahoo_finance` platform, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: yahoo_finance
```

Configuration variables:

- **name** (*Optional*): The name of the sensor. If not specified, it defaults to *Yahoo Stock*.
- **symbols** array (*Optional*): List of stock market symbols for given companies. If not specified, it defaults to *Yahoo (YHOO)*.

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

