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
---

The Twente Milieu {% term integration %} enables you to monitor the upcoming
waste collection schedules provided by
[Twente Milieu](https://www.twentemilieu.nl/) for various waste categories.
This integration helps you stay informed about the next pickup dates for
different types of waste, ensuring you never miss a collection day.

{% include integrations/config_flow.md %}

### Configuration parameters

{% configuration_basic %}
Postal code:
  description: The postal code of the address, for example "7500AA".
House number:
  description: The house number of the address.
House letter/additional:
  description: The house letter or additional information of the address.
{% endconfiguration_basic %}

## Use cases

The integration provides sensors for the next waste pickup dates. You can use
this information to create automations, for example, to remind you to put out
the waste bins the night before the pickup.

Besides the sensors, the integration also provides a calendar to Home Assistant.
Meaning you can view all upcoming waste pickups in the calendar dashboard.

## Supported functionality

### Calendar

The integration provides a calendar to Home Assistant. You can view
all upcoming waste pickups in the calender dashboard.

### Sensors

This integration provides sensors for the following waste pickup dates from
Twente Milieu:

- Next plastic waste pickup date.
- Next organic waste pickup date.
- Next paper waste pickup date.
- Next non-recyclable waste pickup date.
- Next Christmas Tree pickup date.

## Data updates

The integration will update its information by polling Twente Milieu every
hour. This ensures the data in Home Assistant is up to date.

## Actions

This integration does not provide additional actions.

## Examples

The following examples show how to use the Twente Milieu integration in Home
Assistant automations.

### Send notification the evening before the garbage pickup day

The following example sends a notification to your mobile device the evening
before the garbage pickup day. This ensures your bins are out on time.

```yaml
automation:
  - alias: "Reminder to put out the bin"
    triggers:
      - trigger: calendar
        event: start
        entity_id: calendar.twente_milieu
        offset: "-6:00:00"

    actions:
      - action: notify.mobile_app_your_device
        data:
          title: "Garbage day!"
          message: > 
            Reminder: Tomorrow is {{ trigger.calendar_event.summary }} pickup
            day. Don't forget to put out the bin!
```

### Send notification at the end of day to haul in the empty bin again

The following example sends a notification to your mobile device at the end of
the day to remind you to haul in the empty bin again.

```yaml
automation:
  - alias: "Reminder to haul in the bin"
    triggers:
      - trigger: calendar
        event: end 
        entity_id: calendar.twente_milieu
        offset: "-4:00:00"

    actions:
      - action: notify.mobile_app_your_device
        data:
          title: "Haul in the bin!"
          message: > 
            Reminder Garbage has been picked up today. Don't forget to haul in
            the bin!
```

## Known limitations

There are no known limitations for this integration.

## Troubleshooting

There are no commonly known issues with this integration.

## Removing the integration

This integration follows standard integration removal. No extra steps are
required.

{% include integrations/remove_device_service.md %}
