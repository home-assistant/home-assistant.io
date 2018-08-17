---
layout: page
title: "Geizhals"
description: "Instructions on how to integrate a Geizhals sensor into Home Assistant."
date: 2017-07-15 14:15
sidebar: true
comments: false
sharing: true
footer: true
logo: geizhals.png
ha_category: Sensor
ha_iot_class: "Cloud Polling"
ha_release: "0.51"
---

The `geizhals` sensor will give you the best price of a product from [Geizhals](https://geizhals.de) or related site. With this information can be used in e.g., automations to notify you when a price drops.

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: geizhals
    name: qc35
    product_id: 1696985
```

Configuration variables:

- **name** (*Required*): The internal name of the product in Home Assistant.
- **product_id** (*Required*): ID of the product. Get the ID from the Geizhals website of your chosen product by opening the *Price History* in a new browser tab (right-click on the price history > open in new tab).
The URL of this site reveals the ID, e.g. `https://geizhals.de/?phist=1696985` with a `product_id` of `1696985`.
- **description** (*Optional*): The name of the product in the front end.
- **locale** (*Optional*): Localisation which should be used for the request. Set this to `AT`, `EU`, `DE`, `UK` or `PL`. Defaults to `DE`.

#### {% linkable_title Extended example %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: geizhals
    name: qc35
    product_id: 1696985
    description: "Bose QC35"
    locale: "DE"
```
