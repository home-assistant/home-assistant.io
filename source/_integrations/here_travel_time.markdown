---
title: HERE Travel Time
description: Instructions on how to add HERE travel time to Home Assistant.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: '0.100'
ha_config_flow: true
ha_codeowners:
  - '@eifinger'
ha_domain: here_travel_time
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `here_travel_time` sensor provides travel time from the [HERE Routing API](https://www.here.com/docs/bundle/routing-api-developer-guide-v8/page/README.html).

## Setup

You need to register for an API key by following the instructions in the [API Developer Guide](https://www.here.com/docs/bundle/routing-api-developer-guide-v8/page/topics/send-request.html).

HERE offers a Limited Plan which includes 1000 free transactions per day. If you are not [updating sensors on demand](#updating-sensors-on-demand-using-automation), you can track 3 routes without exceeding the limit.

You can provide payment details if you want to pay for unlimited transactions. Be aware that the amount of transactions included for free in the paid plan might be _less_ than the 1000 transactions per day in the free plan. More information can be found [on the pricing page](https://www.here.com/get-started/pricing)

{% include integrations/config_flow.md %}

Notes:

- Origin and Destination can be the address or the GPS coordinates of the location. For a [dynamic configuration](#dynamic-configuration) you can also enter an entity id which provides this information in its state, an entity id with latitude and longitude attributes, or zone friendly name (case sensitive).

{% include integrations/option_flow.md %}

## Dynamic configuration

Tracking can be set up to track entities of type `device_tracker`, `zone`, `sensor`, `input_select`, `input_text` and `person`. If an entity is placed in the origin or destination then each time the platform updates, it will use the latest location of that entity. This means it will directly use its location if possible or try to resolve entity values until it finds a valid set of coordinates. You can put several destinations as options of an `input_select` and define that as the destination.

```yaml
# Example entry for configuration.yaml
input_select:
  here_destination_preset:
    options:
      - zone.home
      - zone.office
      - zone.somewheredefault
```

- **device_tracker**
  - If the state is a zone, then the zone location will be used
  - If the state is not a zone, it will look for the longitude and latitude attributes
- **person**
  - If the state is a zone, then the zone location will be used
  - If the state is not a zone, it will look for the longitude and latitude attributes
- **zone**
  - Uses the longitude and latitude attributes
- **sensor**
  - If the state is a zone, then will use the zone location
  - If the state is a name of another entity it will recursively resolve entity states until if finds a valid set of coordinates
- **input_select**
  - If the state is a zone, then will use the zone location
  - If the state is a name of another entity it will recursively resolve entity states until if finds a valid set of coordinates
- **input_text**
  - If the state is a zone, then will use the zone location
  - If the state is a name of another entity it will recursively resolve entity states until if finds a valid set of coordinates

## Updating sensors on-demand using Automation

You can also use the `homeassistant.update_entity` action to update the sensor on-demand. For example, if you want to update `sensor.morning_commute` every 2 minutes on weekday mornings, you can use the following automation:

```yaml
automation:
- alias: "Commute - Update morning commute sensor"
  initial_state: "on"
  triggers:
    - trigger: time_pattern
      minutes: "/2"
  conditions:
    - condition: time
      after: "08:00:00"
      before: "11:00:00"
    - condition: time
      weekday:
        - mon
        - tue
        - wed
        - thu
        - fri
  actions:
    - action: homeassistant.update_entity
      target:
        entity_id: sensor.morning_commute
```
