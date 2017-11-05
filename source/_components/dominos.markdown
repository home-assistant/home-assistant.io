---
layout: page
title: "Dominos"
description: "Instructions how to setup the Wink garage doors within Home Assistant."
date: 2017-11-05 17:30
sidebar: true
comments: false
sharing: true
footer: true
logo: dominos.png
ha_release: 0.58
---

The `Dominos` component allows you to order Dominos Pizza from within your Home Assistant scripts and automations.

At present, this component only supports ordering within Canada and the US.

To enable the component, you need to set up your customer information and define some orders.

Orders are a group of product codes. You can get a list of codes of products offered by your closest dominos dumped into your log by adding the `dump_menu` variable.

Currently, there is no support in this component for toppings, coupons or order tracking.

```yaml
dominos:
  country_code: ca
  first_name: Justin
  last_name: Trudeau
  email: justin.trudeau@parl.gc.ca
  phone: 6139950253
  address: 24 Sussex Dr, Ottawa, ON, K1M1M4
  dump_menu: 1
  orders:
  - name: Medium Pan
    codes:
      - code: P12IPAZA
```

Configuration variables:

- **country_code** (*Required*): 'ca' or 'us', depending on your location
- **first_name** (*Required*): Your first name
- **last_name** (*Required*): Your last name
- **email** (*Required*): Your email address
- **phone** (*Required*): Your phone number
- **address** (*Required*): Your delivery address
- **dump_menu** (*Optional*): Dumps product codes from your nearest stor into your log
- **orders** (*Optional*): Sets of product codes to use for ordering


