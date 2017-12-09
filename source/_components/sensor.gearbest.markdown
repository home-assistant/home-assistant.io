---
layout: page
title: "Gearbest"
description: "Instructions on how to integrate a Gearbest sensor into Home Assistant."
date: 2017-11-13 09:08
sidebar: true
comments: false
sharing: true
footer: true
logo: gearbest.png
ha_category: Sensor
ha_iot_class: "Cloud Polling"
ha_release: "0.58"
---


The `gearbest` sensor will track price of a product from [Gearbest](https://www.gearbest.com). This information can be used in e.g. automations to notify you when a price drops. The update interval for every item is currently set to 2 hours.

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: gearbest
    currency: EUR
    items:
      - url: https://www.gearbest.com/....
```

Configuration variables:

- **currency** (*Required*): The currency in which the products should be tracked. Currently supported: USD, EUR, GBP, AUD, CAD, CHF, HKD, CNY, NZD, JPY, RUB, BRL, CLP, NOK, DKK, SEK, KRW, ILS, COP, MXN, PEN, THB, IDR, UAH, PLN, INR, BGN, HUF, RON, TRY, CZK, HRK, MAD, AED, SAR, ZAR, SGD, MYR, TWD, RSD, NGN - if the currency could not be found in the conversion rate list, USD will be used as default. Either an id or an url must be present.
- **items** (*Required*): List of products that should be tracked
  * **id** (*XOR*): The id of the product.
  * **url** (*XOR*): The url of the product.
  * **name** (*Optional*): The name of the item. If not set, it is parsed from the website
  * **currency** (*Optional*): Overwrite the currency for the current item

#### Extended example

```yaml
# Example configuration.yaml entry
sensor:
  - platform: gearbest
    currency: EUR
    items:
      - url: https://www.gearbest.com/3d-printers-3d-printer-kits/pp_779174.html?wid=21
        name: Creality CR-10 upgraded
        currency: USD
      - id: 779174
        name: Creality CR-10 upgraded #2
        currency: EUR
```
