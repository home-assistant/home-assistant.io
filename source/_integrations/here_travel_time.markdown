---
title: HERE Travel Time
description: Instructions on how to add HERE travel time to Home Assistant.
ha_category:
  - Transport
  - Sensor
ha_iot_class: Cloud Polling
ha_release: '0.100'
ha_codeowners:
  - '@eifinger'
ha_domain: here_travel_time
ha_platforms:
  - sensor
---

The `here_travel_time` sensor provides travel time from the [HERE Routing API](https://developer.here.com/documentation/routing/topics/introduction.html).

## Setup

You need to register for an API key (REST & XYZ HUB API/CLI) by following the instructions [here](https://developer.here.com/documentation/routing/topics/introduction.html?create=Freemium-Basic&keepState=true&step=account).

HERE offers a Freemium Plan which includes 250,000 free Transactions per month. For the Routing API, one transaction equals one request with one starting point (no multi stop). More information can be found [here](https://developer.here.com/faqs#payment-subscription)

By default HERE will deactivate your account if you exceed the free Transaction limit for the month. You can add payment details to reenable your account as described [here](https://developer.here.com/faqs)

### Migrate from app_code to api_key

HERE has changed its authentication mechanism. It is no longer possible to use `app_id` and `app_code`. Existing users have to follow the [migration guide](https://developer.here.com/documentation/authentication/dev_guide/topics/api-key-credentials.html) in order to retrieve the now needed `api_key`.

## Configuration

To enable the sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example entry for configuration.yaml
sensor:
  - platform: here_travel_time
    api_key: "YOUR_API_KEY"
    origin_latitude: "51.222975"
    origin_longitude: "9.267577"
    destination_latitude: "51.257430"
    destination_longitude: "9.335892"
```

{% configuration %}
api_key:
  description: "Your application's API key (get one by following the instructions above)."
  required: true
  type: string
origin_latitude:
  description: "The starting latitude for calculating travel distance and time. Must be used in combination with origin_longitude. Cannot be used in combination with `origin_entity_id`."
  required: exclusive
  type: float
origin_longitude:
  description: "The starting longitude for calculating travel distance and time. Must be used in combination with origin_latitude. Cannot be used in combination with `origin_entity_id`."
  required: exclusive
  type: float
destination_latitude:
  description: "The finishing latitude for calculating travel distance and time. Must be used in combination with destination_longitude. Cannot be used in combination with `destination_entity_id`."
  required: exclusive
  type: float
destination_longitude:
  description: "The finishing longitude for calculating travel distance and time. Must be used in combination with destination_latitude. Cannot be used in combination with `destination_entity_id`."
  required: exclusive
  type: float
origin_entity_id:
  description: "The entity_id holding the starting point for calculating travel distance and time. Cannot be used in combination with `origin_latitude`/`origin_longitude`."
  required: exclusive
  type: string
destination_entity_id:
  description: "The entity_id holding the finishing point for calculating travel distance and time. Cannot be used in combination with `destination_latitude`/`destination_longitude`."
  required: exclusive
  type: string
name:
  description: A name to display on the sensor. The default is "HERE Travel Time".
  required: false
  type: string
  default: "HERE Travel Time"
mode:
  description: "You can choose between: `bicycle`, `car`, `pedestrian`, `publicTransport`, `publicTransportTimeTable` or `truck`. The default is `car`. For public transport `publicTransportTimeTable` is recommended. You can find more information on the modes [here](https://developer.here.com/documentation/routing/topics/transport-modes.html) and on the public modes [here](https://developer.here.com/documentation/routing/topics/public-transport-routing.html)"
  required: false
  type: string
  default: "car"
route_mode:
  description: "You can choose between: `fastest`, or `shortest`. This will determine whether the route is optimized to be the shortest and completely disregard traffic and speed limits or the fastest route according to the current traffic information. The default is `fastest`"
  required: false
  type: string
  default: "fastest"
traffic_mode:
  description: "You can choose between: `true`, or `false`. Decide whether you want to take the current traffic condition into account. Default is `false`."
  required: false
  type: boolean
  default: false
arrival:
  description: "Time when travel is expected to end. A 24 hour time string like `08:00:00`. On a sensor update it will be combined with the current date to get travel time for that moment. Cannot be used in combination with `departure`. Can only be used in combination with `mode: publicTransportTimeTable`"
  required: false
  type: time
departure:
  description: "Time when travel is expected to start. A 24 hour time string like `08:00:00`. On a sensor update it will be combined with the current date to get travel time for that moment. Cannot be used in combination with `arrival`. If departure is not provided each update of the sensor uses the current date and time." 
  required: false
  type: time
unit_system:
  description: "You can choose between `metric` or `imperial`."
  required: false
  default: Defaults to `metric` or `imperial` based on the Home Assistant configuration.
  type: string
scan_interval:
  description: "Defines the update interval of the sensor in seconds. Defaults to 300 (5 minutes)."
  required: false
  type: integer
  default: 300
{% endconfiguration %}

## Dynamic Configuration

Tracking can be set up to track entities of type `device_tracker`, `zone`, `sensor` and `person`. If an entity is placed in the origin or destination then every 5 minutes when the platform updates, it will use the latest location of that entity.

```yaml
# Example entry for configuration.yaml
sensor:
  # Tracking entity to entity
  - platform: here_travel_time
    api_key: "YOUR_API_KEY"
    name: Phone To Home
    origin_entity_id: device_tracker.mobile_phone
    destination_entity_id: zone.home
  # Full config
  - platform: here_travel_time
    api_key: "YOUR_API_KEY"
    name: Work to Home By Bike
    origin_entity_id: zone.work
    destination_latitude: 59.2842
    destination_longitude: 59.2642
    mode: bicycle
    route_mode: fastest
    traffic_mode: false
    unit_system: imperial
    departure: "17:00:00"
    scan_interval: 2678400 # 1 month
```

## Entity Tracking

- **device_tracker**
  - If the state is a zone, then the zone location will be used
  - If the state is not a zone, it will look for the longitude and latitude attributes
- **zone**
  - Uses the longitude and latitude attributes
- **sensor**
  - If the state is a zone, then will use the zone location
  - All other states will be passed directly into the HERE API
    - This includes all valid locations listed in the *Configuration Variables*

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
