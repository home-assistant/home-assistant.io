---
title: Twente Milieu
description: Instructions on how to integrate Twente Milieu with Home Assistant.
ha_category:
  - Calendar
  - Environment
  - Sensor
ha_release: 0.97
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@frenck'
ha_domain: twentemilieu
ha_platforms:
  - calendar
  - diagnostics
  - sensor
ha_integration_type: service
ha_quality_scale: silver
---

The **Twente Milieu** {% term integration %} enables you to monitor the upcoming waste collection schedules provided by [Twente Milieu](https://www.twentemilieu.nl/), a waste collection company serving municipalities in the Twente region of the Netherlands, including Enschede, Hengelo, Almelo, Borne, Hof van Twente, Oldenzaal, and Losser. This integration helps you stay informed about the next pickup dates for different types of waste (like organic, paper, plastic, and non-recyclable), ensuring you never miss a collection day.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Postal code:
  description: The postal code of the address, for example "7500AA".
House number:
  description: The house number of the address.
House letter/additional:
  description: The house letter or additional information of the address, if applicable.
{% endconfiguration_basic %}

## Use cases

With the Twente Milieu integration, you can:

- Monitor upcoming waste collection dates for different waste types
- Create automations to remind you to put out your waste bins before collection day
- View all your upcoming waste pickups in the calendar dashboard
- See at a glance when your next waste collection is due

## Supported functionality

### Calendar

The integration provides a calendar entity that displays all upcoming waste collection dates from Twente Milieu. You can view this calendar in your {% my calendar title="Calendar dashboard" %}.

### Sensors

This integration creates the following sensors for upcoming waste collection dates:

- Next plastic waste pickup date
- Next organic waste pickup date
- Next paper waste pickup date
- Next non-recyclable waste pickup date
- Next Christmas tree pickup date (seasonal)

Each sensor provides the next scheduled date for its respective waste type, allowing you to track when to put out specific bins.

## Data updates

The integration updates its information by {% term polling %} the Twente Milieu service every hour. This ensures your waste collection schedule in Home Assistant stays current.

## Examples

Below are practical examples of how you can use the Twente Milieu integration in your automations.

### Send notification the evening before the garbage pickup day

This example sends a notification to your mobile device the evening before collection day, ensuring you remember to put out the correct bin.

```yaml
automation:
  - alias: "Reminder to put out the bin"
    triggers:
      - trigger: calendar
        event: start
        entity_id: calendar.twente_milieu
        offset: "-6:00:00"
        # This triggers 6 hours before the calendar event starts

    actions:
      - action: notify.mobile_app_your_device
        data:
          title: "Garbage day!"
          message: >
            Reminder: Tomorrow is {{ trigger.calendar_event.summary }} pickup
            day. Don't forget to put out the bin!
```

### Send notification at the end of day to bring in the empty bin

This example sends a notification to remind you to bring the empty bin back in after collection.

```yaml
automation:
  - alias: "Reminder to bring in the bin"
    triggers:
      - trigger: calendar
        event: end
        entity_id: calendar.twente_milieu
        offset: "-4:00:00"
        # This triggers 4 hours before the calendar event ends

    actions:
      - action: notify.mobile_app_your_device
        data:
          title: "Bring in the bin!"
          message: >
            Reminder: The waste has been collected today. Don't forget to
            bring in your empty bin!
```

## Known limitations

- Home Assistant currently doesn't support translating calendar items. Therefore, waste collection events in the calendar will always be displayed in English, regardless of your language settings.

## Troubleshooting

There are no commonly known issues with this integration.

## Removing the integration

This integration follows standard integration removal. No additional steps are required.

{% include integrations/remove_device_service.md %}
