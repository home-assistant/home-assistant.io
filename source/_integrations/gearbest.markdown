---
title: Gearbest
description: Instructions on how to integrate a Gearbest sensor into Home Assistant.
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: '0.60'
ha_codeowners:
  - '@HerrHofrat'
ha_domain: gearbest
---

The `gearbest` sensor will track the price of a product from [Gearbest](https://www.gearbest.com). This information can be used in, e.g., automations to notify you when a price drops. The update interval for every item is currently set to 2 hours.

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: gearbest
    currency: EUR
    items:
      - url: https://www.gearbest.com/....
```

{% configuration %}
currency:
  description: "The currency in which the products should be tracked. Currently supported: USD, EUR, GBP, AUD, CAD, CHF, HKD, CNY, NZD, JPY, RUB, BRL, CLP, NOK, DKK, SEK, KRW, ILS, COP, MXN, PEN, THB, IDR, UAH, PLN, INR, BGN, HUF, RON, TRY, CZK, HRK, MAD, AED, SAR, ZAR, SGD, MYR, TWD, RSD, NGN - if the currency could not be found in the conversion rate list, USD will be used as default. Either an ID or a URL must be present."
  required: true
  type: string
items:
  description: List of products that should be tracked.
  required: true
  type: map
  keys:
    id:
      description: The ID of the product.
      required: false
      type: integer
    url:
      description: The URL of the product.
      required: false
      type: string
    name:
      description: The name of the item. If not set, it is parsed from the website.
      required: false
      type: string
    currency:
      description: Overwrite the currency for the current item.
      required: false
      type: string
{% endconfiguration %}

### Extended example

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
