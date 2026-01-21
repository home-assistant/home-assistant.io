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

The **Ridwell** {% term integration %} allows users to track waste recycling pickups scheduled with [Ridwell](https://www.ridwell.com).

{% include integrations/config_flow.md %}

{% include integrations/option_flow.md %}

### Event summary details

The calendar event summary can be customized to display different details about a given pickup.

The following choices are available for customizing the text. Each option is also detailed more in separate sections below.

{% configuration_basic %}
Pickup status:
    description: The current state of the individual pickup occurring that day _(Default option)_
Rotating category:
    description: The name of the rotating category selected for that pickup
No details:
    description: No text will be displayed after the event title
{% endconfiguration_basic %}

#### Pickup status

Common statuses for an individual pickup include:
- `initialized`: Available for customers to opt-in for pickup
- `scheduled`: Opted-into; Ridwell will include you in their route that day
- `notified`: Ridwell has attempted to contact customers who have not opted-in to pickups happening soon
- `skipped`: Previously scheduled but then later unscheduled (canceled)

#### Rotating category

The rotating category will be displayed once a pickup has been scheduled successfully. 

If a pickup does not have the `scheduled` status, the calendar event will display the **Pickup status** values described under [Pickup status](#pickup-status) until the pickup has a `scheduled` status.

#### No details

The calendar title will show "Ridwell Pickup" only, but full details on the various pickup types will still be included in the description of the event.

{% note %}
The Ridwell integration will reload after changing this option.

You may notice the Ridwell calendar disappear briefly before reappearing with the newly formatted calendar events.
{% endnote %}

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

## Troubleshooting

{% tip %}
The Ridwell integration checks for updated information from your Ridwell account about once every hour. 

**Changes to pickups may take up to 60 minutes appear in Home Assistant.**
{% endtip %}

If pickup information in Home Assistant does not match recent changes to your Ridwell account, you can manually trigger a check for new details by reloading the Ridwell integration. On the integration overview page, choose **Reload** from the options menu on the specific account instance you want refreshed.

## Removing the integration

This integration follows standard integration removal steps.

{% note %}
Removing this integration from Home Assistant will not end or disrupt your paid subscription.
{% endnote %}

Any pickups scheduled or modified by this integration will persist after removing the integration, and they can continue to be managed using the Ridwell site or app.

{% include integrations/remove_device_service.md %}
