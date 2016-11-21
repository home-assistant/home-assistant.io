---
layout: page
title: "Fixer.io"
description: "Instructions how to integrate exchange rates from Fixer.io within Home Assistant."
date: 2016-06-20 10:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Finance
logo: fixer-io.png
ha_iot_class: "Cloud Polling"
ha_release: 0.23
---


The `fixer` sensor will show you the current exchange rate from [Fixer.io](http://fixer.io/) which is using data from the [European Central Bank (ECB)](https://www.ecb.europa.eu).

To get an overview about the available [currencies](http://api.fixer.io/latest).

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: fixer
    target: CHF
```

Configuration variables:

- **target** (*Required*): The symbol of the target currency.
- **name** (*Optional*): Name to use in the frontend.
- **base** (*Optional*): The symbol of the base currency. Default to USD 

