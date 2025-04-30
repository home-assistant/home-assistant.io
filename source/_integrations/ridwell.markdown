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
  - calendar
  - diagnostics
  - sensor
  - switch
ha_integration_type: service
---

The Ridwell integration allows users to track waste recycling pickups scheduled with [Ridwell](https://www.ridwell.com).

{% include integrations/config_flow.md %}

## Calendar

The calendar sensor contains a `calendar` state attribute, which contains:

- The name of the Ridwell Calendar.
- If the event is an all-day event (Boolean).
- The start time of the calendar event. Starts at midnight.
- The end time of the event. Ends at midnight.
- The location of the event.
- The description of the items being picked up.
- Friendly name of the calendar event.

For example:

```yaml
message: Ridwell Pickup (scheduled)
all_day: true
start_time: 2024-07-26 00:00:00
end_time: 2024-07-27 00:00:00
location: 
description: Pickup types: Light Bulbs (quantity: 1), Hand Tools (quantity: 1), Batteries (quantity: 1), Threads (quantity: 1), Plastic Film (quantity: 1)
friendly_name: Ridwell
```

## Pickup types

The pickup sensor contains a `pickup_types` state attribute, which contains:

- The items being picked up during this particular event
- The category of each item
- The quantity of each item

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
