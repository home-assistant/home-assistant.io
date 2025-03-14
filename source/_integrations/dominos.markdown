---
title: Dominos Pizza
description: Instructions on how to setup Dominos Pizza ordering within Home Assistant.
ha_category:
  - Other
ha_iot_class: Cloud Polling
ha_release: 0.59
ha_domain: dominos
ha_integration_type: integration
ha_quality_scale: legacy
---

The **Dominos Pizza** {% term integration %} allows you to order Dominos Pizza from within your Home Assistant scripts and automations.

At present, this integration only supports ordering within Canada and the US.

## Configuration

To enable the {% term integration %}, you need to set up your customer information and define some orders.

Orders are a group of product codes. You can get these product codes by inspecting an order request from the Dominos web app, or you can [add this custom panel by following this readme](https://github.com/craigjmidwinter/hass-dominos-panel) to see the available product codes in a separate panel in your install.

Currently, there is no support in this integration for toppings, coupons, or order tracking.

```yaml
dominos:
  country_code: ca
  first_name: John
  last_name: Smith
  email: john.smith@example.com
  phone: 123456789
  address: 24 Housten Dr, Ottawa, ON, K2M2M2
  orders:
  - name: Medium Pan
    codes:
      - P12IPAZA
```

Now you can use the Dominos {% term action %} to order pizza within your automations:

```yaml
- action: dominos.order
  data:
    order_entity_id: dominos.medium_pan
```

{% configuration %}
  country_code:
    required: true
    description: \'ca\' or \'us\', depending on your location
    type: string
  first_name:
    required: true
    description: Your first name
    type: string
  last_name:
    required: true
    description: Your last name
    type: string
  email:
    required: true
    description: Your email address
    type: string
  phone:
    required: true
    description: Your phone number
    type: string
  address:
    required: true
    description: Your delivery address
    type: string
  show_menu:
    required: false
    description: Dumps product codes from your nearest store into your log (for use in with the custom panel)
    type: integer
  orders:
    required: false
    description: Sets of product codes to use for ordering
    type: list
{% endconfiguration %}
