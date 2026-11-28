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
Waste types to show:
    description: The waste types to include in the calendar and sensors.
Name:
    description: A custom name for each selected waste type. You are asked for it once per selected waste type.
{% endconfiguration_basic %}

## Configuration options

The waste types to show and their custom names can be changed at any time. The options are only available while the integration is loaded:

{% include integrations/option_flow.md %}

## Supported functionality

### Calendar

- **Collection schedule**: the collections of the selected waste types. The current event is the next collection, today's collection is not included.

### Sensors

- **Tomorrow collection**: the waste types collected tomorrow. It is unavailable if nothing is collected tomorrow. The `waste_types` attribute contains the list of waste types.
- **One sensor per selected waste type**: the number of days until the next collection of that waste type (1 means tomorrow). Today's collection is not counted. The sensor has no value if no future collection is scheduled.

## Data updates

The integration polls Junker's public calendar pages once a day. The entities are recalculated every midnight, without a new request.

## Junker automation examples

{% include docs/paste_yaml_tip.md %}

### Automation: Notify the evening before a collection

You can create this reminder in the [visual automation editor](/docs/automation/editor/):

1. Add a time trigger for `20:00:00`.
2. Add a **Not** condition containing two **State** conditions for your **Tomorrow collection** sensor: one for `unavailable` and one for `unknown`. This prevents notifications when the sensor has no usable value.
3. Add your notification action. For its message, use `Tomorrow: {{ states('sensor.home_tomorrow_collection') }}`, replacing the entity ID with your sensor's entity ID.

The optional YAML below is formatted for `configuration.yaml`, but you can also paste it directly into the visual automation editor without changing its structure. Replace both occurrences of `sensor.home_tomorrow_collection` with your sensor's entity ID, and replace `notify.notify` with your notification action.


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
            state:
              - "unavailable"
              - "unknown"
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
