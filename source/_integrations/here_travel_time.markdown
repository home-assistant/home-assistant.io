---
title: HERE Travel Time
description: Instructions on how to add HERE travel time to Home Assistant.
ha_category:
  - Sensor
  - Transport
ha_iot_class: Cloud Polling
ha_release: '0.100'
ha_config_flow: true
ha_quality_scale: silver
ha_codeowners:
  - '@eifinger'
ha_domain: here_travel_time
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `here_travel_time` sensor provides travel time from the [HERE Routing API](https://developer.here.com/documentation/routing/topics/introduction.html).

## Setup

You need to register for an API key (REST & XYZ HUB API/CLI) by following the instructions [here](https://developer.here.com/documentation/routing/topics/introduction.html?create=Freemium-Basic&keepState=true&step=account).

HERE offers a Freemium Plan which includes 250,000 free Transactions per month. For the Routing API, one transaction equals one request with one starting point (no multi stop). More information can be found [here](https://developer.here.com/faqs#payment-subscription)

By default HERE will deactivate your account if you exceed the free Transaction limit for the month. You can add payment details to re-enable your account as described [here](https://developer.here.com/faqs)

### Migrate from app_code to api_key

HERE has changed its authentication mechanism. It is no longer possible to use `app_id` and `app_code`. Existing users have to follow the [migration guide](https://developer.here.com/documentation/authentication/dev_guide/topics/api-key-credentials.html) in order to retrieve the now needed `api_key`.

## Configuration

{% include integrations/config_flow.md %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
Travel Mode:
  description: "You can choose between: `bicycle`, `car`, `pedestrian`, `publicTransport`, `publicTransportTimeTable` or `truck`. The default is `car`. For public transport `publicTransportTimeTable` is recommended. You can find more information on the modes [here](https://developer.here.com/documentation/routing/topics/transport-modes.html) and on the public modes [here](https://developer.here.com/documentation/routing/topics/public-transport-routing.html)"
Route Mode:
  description: "You can choose between: `fastest`, or `shortest`. This will determine whether the route is optimized to be the shortest and completely disregard traffic and speed limits or the fastest route according to the current traffic information. The default is `fastest`"
Traffic Mode:
  description: "You can choose between: `true`, or `false`. Decide whether you want to take the current traffic condition into account. Default is `false`."
Time Type:
  description: "You can choose between `arrival_time`, the time travel is expected to end and `departure_time`, the time travel is expected to start. A 24 hour time string like `08:00:00`. On a sensor update it will be combined with the current date to get travel time for that moment. `arrival_time` can only be used in combination with Travel Mode `publicTransportTimeTable`"
Unit System:
  description: "You can choose between `metric` or `imperial`."
{% endconfiguration_basic %}

## Dynamic Configuration

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

## Entity Tracking

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

You can also use the `homeassistant.update_entity` service to update the sensor on-demand. For example, if you want to update `sensor.morning_commute` every 2 minutes on weekday mornings, you can use the following automation:

```yaml
automation:
- id: update_morning_commute_sensor
  alias: "Commute - Update morning commute sensor"
  initial_state: "on"
  trigger:
    - platform: time_pattern
      minutes: "/2"
  condition:
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
  action:
    - service: homeassistant.update_entity
      target:
        entity_id: sensor.morning_commute
```
