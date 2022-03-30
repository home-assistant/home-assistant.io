---
title: Ridwell
description: Instructions on how to set up the Ridwell
ha_category:
  - Sensor
ha_release: 2021.12
ha_iot_class: Cloud Polling
ha_domain: ridwell
ha_codeowners:
  - '@bachya'
ha_config_flow: true
ha_platforms:
  - diagnostics
  - sensor
  - switch
ha_integration_type: integration
---

The Ridwell integration allows users to track waste recycling pickups scheduled with [Ridwell](https://www.ridwell.com).

{% include integrations/config_flow.md %}

## Pickup Types

The pickup sensor contains a `pickup_types` state attribute, which contains:

* The items being picked up during this particular event
* The category of each item
* The quantity of each item

For example:

```json
{
  "Latex Paint": {
    "category": "add_on",
    "quantity": 7
  },
  "Beyond the Bin": {
    "category": "add_on",
    "quantity": 2
  },
  "Fluorescent Light Tubes": {
    "category": "add_on",
    "quantity": 1
  },
  "Winter Coats and Jackets": {
    "category": "rotating",
    "quantity": 1
  },
  "Light Bulbs": {
    "category": "standard",
    "quantity": 1
  },
  "Batteries": {
    "category": "standard",
    "quantity": 1
  },
  "Threads": {
    "category": "standard",
    "quantity": 1
  },
  "Plastic Film": {
    "category": "standard",
    "quantity": 1
  }
}
```
