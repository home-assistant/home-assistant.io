---
title: Junker
description: Instructions on how to integrate Junker waste collection schedules into Home Assistant.
ha_categories:
  - local_services
ha_release: 2026.12
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Jump-333'
ha_domain: junker
ha_platforms:
  - calendar
  - sensor
ha_integration_type: service
ha_quality_scale: silver
---

The **Junker** {% term integration %} provides the waste collection schedule published by [Junker](https://www.junker.app/) for your municipality. It adds a calendar, a sensor showing what to put out tomorrow, and a sensor for each waste type showing the days left until its next collection.

## Use cases

- Get a notification the evening before a collection, based on the tomorrow sensor.
- Show the days left until each collection on a dashboard.
- Add the collection calendar to your calendar dashboard.

## Prerequisites

Your municipality must publish its collection calendar through Junker.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Municipality:
    description: The municipality name as it appears in Junker.
Area:
    description: The collection area. Only requested if Junker provides different schedules for separate areas of your municipality.
Name:
    description: The name of the device.
Waste types to show:
    description: The waste types to include in the calendar and sensors.
Waste type name:
    description: A custom name for each selected waste type. You are asked for it once per selected waste type.
{% endconfiguration_basic %}

## Configuration options

The name, the waste types to show, and their custom names can be changed at any time:

{% include integrations/option_flow.md %}

## Supported functionality

### Calendar

- **Collection schedule**: the collections of the selected waste types. The current event is the next collection, today's collection is not included.

### Sensors

- **Tomorrow's collection**: the waste types collected tomorrow. It is unavailable if nothing is collected tomorrow. The `waste_types` attribute contains the list of waste types.
- **One sensor per selected waste type**: the number of days until the next collection of that waste type (1 means tomorrow). Today's collection is not counted. The sensor has no value if no future collection is scheduled.

## Data updates

The integration polls Junker's public calendar pages once a day. The entities are recalculated every midnight, without a new request.

## Examples

### Notify the evening before a collection

```yaml
automation:
  - alias: "Waste collection reminder"
    triggers:
      - trigger: time
        at: "20:00:00"
    conditions:
      - condition: not
        conditions:
          - condition: state
            entity_id: sensor.home_tomorrow_collection
            state: unavailable
    actions:
      - action: notify.notify
        data:
          message: "Tomorrow: {{ states('sensor.home_tomorrow_collection') }}"
```

## Known limitations

- The municipality must exist on Junker and publish a calendar.
- Deselecting a waste type does not remove its sensor automatically; delete it from the entities list.
- The integration relies on Junker's public web pages, which may change without notice.

## Troubleshooting

### The municipality is not found

Check the name on [Junker](https://junkerapp.it/cerca-il-tuo-comune/) and enter it exactly as it appears there.

### The integration cannot connect

Junker's servers must be reachable from Home Assistant. Check your internet and DNS configuration, then reload the integration.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}