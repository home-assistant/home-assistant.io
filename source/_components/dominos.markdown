---
layout: page
title: "Dominos Pizza"
description: "Instructions how to setup Dominos Pizza ordering within Home Assistant."
date: 2017-11-05 17:30
sidebar: true
comments: false
sharing: true
footer: true
logo: dominos.png
ha_category: Other
ha_version: 0.57
---

The `Dominos` component allows you to order Dominos Pizza from within your Home Assistant scripts and automations.

At present, this component only supports ordering within Canada and the US.

To enable the component, you need to set up your customer information and define some orders.

Orders are a group of product codes. You can get a panel with a list of codes of products offered by your closest Dominos by adding the `show_menu` variable.

Currently, there is no support in this component for toppings, coupons or order tracking.

```yaml
dominos:
  country_code: ca
  first_name: Justin
  last_name: Trudeau
  email: justin.trudeau@parl.gc.ca
  phone: 6139950253
  address: 24 Sussex Dr, Ottawa, ON, K1M1M4
  show_menu: 1
  orders:
  - name: Medium Pan
    codes:
      - P12IPAZA
```

Now you can use the Dominos service to order pizza within your automations:

```yaml
- service: dominos.order
  data:
    order_entity_id: dominos.medium_pan
```

Configuration variables:

- **country_code** (*Required*): 'ca' or 'us', depending on your location
- **first_name** (*Required*): Your first name
- **last_name** (*Required*): Your last name
- **email** (*Required*): Your email address
- **phone** (*Required*): Your phone number
- **address** (*Required*): Your delivery address
- **show_menu** (*Optional*): Dumps product codes from your nearest stor into your log
- **orders** (*Optional*): Sets of product codes to use for ordering


