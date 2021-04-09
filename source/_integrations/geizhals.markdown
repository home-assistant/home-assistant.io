---
title: Geizhals
description: Instructions on how to integrate a Geizhals sensor into Home Assistant.
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 0.51
ha_domain: geizhals
ha_platforms:
  - sensor
---

The `geizhals` sensor will give you the best price of a product from [Geizhals](https://geizhals.de) or related site. With this information can be used in e.g., automations to notify you when a price drops.

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: geizhals
    name: PRODUCT_NAME
    product_id: PRODUCT_ID
```

{% configuration %}
name:
  description: The internal name of the product in Home Assistant.
  required: true
  type: string
product_id:
  description: "ID of the product. Get the ID from the Geizhals website of your chosen product by opening the *Price History* in a new browser tab (right-click on the price history > open in new tab). The URL of this site reveals the ID, e.g., `https://geizhals.de/?phist=1696985` with a `product_id` of `1696985`."
  required: true
  type: integer
description:
  description: The name of the product in the front end.
  required: false
  default: price
  type: string
locale:
  description: Localisation which should be used for the request. Set this to `AT`, `EU`, `DE`, `UK` or `PL`.
  required: false
  default: DE
  type: string
{% endconfiguration %}

#### Extended example

```yaml
# Example configuration.yaml entry
sensor:
  - platform: geizhals
    name: qc35
    product_id: 1696985
    description: "Bose QC35"
    locale: "DE"
```
