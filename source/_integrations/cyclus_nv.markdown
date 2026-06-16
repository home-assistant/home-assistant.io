---
title: Cyclus NV
description: Instructions on how to integrate Cyclus NV with Home Assistant.
ha_category:
  - Calendar
  - Environment
ha_release: 2026.7
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@joostlek'
ha_domain: cyclus_nv
ha_platforms:
  - calendar
ha_integration_type: service
ha_quality_scale: bronze
---

The **Cyclus NV** {% term integration %} lets you monitor upcoming waste collection schedules from [Cyclus NV](https://www.cyclusnv.nl/), a waste collection company serving municipalities in the central Netherlands, including Bodegraven-Reeuwijk, Gouda, Krimpen aan den IJssel, Krimpenerwaard, and Waddinxveen. With this integration, you can stay informed about pickup dates for different types of waste, like organic, paper, plastic (PMD), and residual waste, so you never miss a collection day.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Zip code:
  description: "The zip code of the address, for example `1234AB`."
House number:
  description: "The house number of the address."
{% endconfiguration_basic %}

## Use cases

With the Cyclus NV integration, you can:

- Track upcoming waste collection dates for different waste types.
- Create automations to remind you to put out your waste bins before pickup day.
- View all your upcoming waste pickups in the calendar dashboard.
- See at a glance when your next waste collection is due.

## Supported functionality

### Calendar

The integration provides a {% term calendar %} entity that displays all upcoming waste collection dates from Cyclus NV. You can view this calendar in your {% my calendar title="Calendar dashboard" %}.

The calendar includes events for the following waste types when they apply to your address:

- GFT (organic) waste pickup
- Residual waste pickup
- Paper waste pickup
- PMD (plastic, metal, and drink cartons) waste pickup
- Glass waste pickup
- Textiles pickup
- Garden waste pickup
- Christmas tree pickup
- Large household waste pickup
- Construction waste pickup
- Electrical appliances pickup
- Hazardous waste pickup
- Recycling center events
- And more, depending on what Cyclus NV offers in your municipality.

## Data updates

The integration updates its information by {% term polling %} the Cyclus NV service every 4 hours. This keeps your waste collection schedule in Home Assistant up to date.

## Examples

Below are practical examples of how you can use the Cyclus NV integration in your automations.

### Send a notification the evening before pickup day

This example sends a notification to your mobile device the evening before pickup day, so you remember to put out the correct bin.

```yaml
automation:
  - alias: "Reminder to put out the bin"
    triggers:
      - trigger: calendar
        event: start
        entity_id: calendar.cyclus_nv
        # Fire 12 hours before the calendar event starts,
        # so you get notified the evening before pickup day.
        offset: "-12:00:00"
    actions:
      - action: notify.send_message
        target:
          entity_id: notify.my_device
        data:
          title: "Garbage day!"
          message: >
            Reminder: Tomorrow is {{ trigger.calendar_event.summary }}.
            Don't forget to put out the bin!
```

### Send a notification at the end of the day to bring in the empty bin

This example sends a notification to remind you to bring the empty bin back in after collection.

```yaml
automation:
  - alias: "Reminder to bring in the bin"
    triggers:
      - trigger: calendar
        event: end
        entity_id: calendar.cyclus_nv
        # Fire 4 hours before the calendar event ends,
        # so you get notified in the evening of pickup day.
        offset: "-4:00:00"
    actions:
      - action: notify.send_message
        target:
          entity_id: notify.my_device
        data:
          title: "Bring in the bin!"
          message: >
            Reminder: The waste has been collected today.
            Don't forget to bring in your empty bin!
```

## Known limitations

There are no known limitations for this integration.

## Troubleshooting

There are no commonly known issues with this integration.

## Removing the integration

This integration follows standard integration removal. No additional steps are required.

{% include integrations/remove_device_service.md %}
