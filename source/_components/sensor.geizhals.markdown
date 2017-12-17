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


The `geizhals` sensor will give you the best price of a product from [Geizhals](https://geizhals.de) or related site. With this information can be used in e.g. automations to notify you when a price drops.

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: geizhals
    name: qc35
    product_id: 1453021
```

Configuration variables:

- **name** (*Required*): The internal name of the product in Home Assistant.
- **product_id** (*Required*): ID of the product. Get the ID from the geizhals website of your chosen product by clicking on the *Price History* tab, e.g. [here](https://geizhals.de/?phist=1453021). The URL of this site reveals the ID, e.g. <https://geizhals.de/?phist=1453021> with `product_id: 1453021`.
- **description** (*Optional*): The name of the product in the front end.
- **domain** (*Optional*): Domain which should be used for the request. Set this to `geizhals.at`, `geizhals.eu`, `geizhals.de`, `skinflint.co.uk` or `cenowarka.pl`. Defaults to `geizhals.de`.
- **regex** (*Optional*): Regular expression to parse the price. Default: `\D\s(\d*)[\,|\.](\d*)`.

#### {% linkable_title Extended example %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: geizhals
    name: qc35
    product_id: 1453021
    description: "Bose QC35"
    domain: 'geizhals.de'
    regex: '\D\s(\d*)[\,|\.](\d*)'
```
