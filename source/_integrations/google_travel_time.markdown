---
title: Google Maps Travel Time
description: Instructions on how to add Google Maps travel time to Home Assistant.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.19
ha_config_flow: true
ha_domain: google_travel_time
ha_platforms:
  - sensor
---

The `google_travel_time` sensor provides travel time from the [Google Distance Matrix API](https://developers.google.com/maps/documentation/distance-matrix/).

## Setup

You need to register for an API key by following the instructions [here](https://github.com/googlemaps/google-maps-services-python#api-keys). You only need to turn on the Distance Matrix API.

### Billing & quota

[Google requires billing](https://mapsplatform.googleblog.com/2018/05/introducing-google-maps-platform.html) to be enabled (and a valid credit card loaded) to access Google Maps APIs. The Distance Matrix API is billed at US$10 per 1000 requests, however, a US$200 per month credit is applied (20,000 requests). By default, the sensor will update the travel time every 5 minutes, making approximately 288 calls per day. Note that at this rate more than 2 sensors will likely exceed the free credit amount. A quota can be set against the API to avoid exceeding the free credit amount: set the 'Elements per day' to a limit of 645 or less. Details on how to configure a quota can be found [here](https://developers.google.com/maps/documentation/distance-matrix/usage-and-billing#set-caps)

## Disabling automatic updates and update manually

You can disable automatic updates in the configuration settings after which the sensor **will not update automatically at all**. This can be useful if you are using multiple sensors that need throttling to stay within the free credit, or if you are only interested in updates during your commute or specific days of the week. When automatic updates are disabled the travel time sensor can be updated by calling the `homeassistant.update_entity` service on-demand (see automation example below).

{% include integrations/config_flow.md %}

## Dynamic Configuration

Tracking can be setup to track entities of type `device_tracker`, `zone`, `sensor` and `person`. If an entity is placed in the Origin or Destination then every 5 minutes when the platform updates it will use the latest location of that entity.

### Examples

#### Tracking entity to entity

Origin: device_tracker.mobile_phone
Destination: zone.home

#### Tracking entity to zone friendly name (e.g. "Eddies House")

Origin: zone.home
Destination: Eddies House

## Entity Tracking

- **device_tracker**
  - If state is a zone then the zone location will be used
  - If state is not a zone it will look for the longitude and latitude attributes
- **zone**
  - Uses the longitude and latitude attributes
  - Can also be referenced by just the zone's friendly name found in the attributes.
- **sensor**
  - If state is a zone or zone friendly name then will use the zone location
  - All other states will be passed directly into the Google API
    - This includes all valid locations listed in the *Configuration Variables*

## Updating sensors on-demand using automation

You can use the `homeassistant.update_entity` service to update the sensor on-demand. For example, if you want to update `sensor.morning_commute` every 2 minutes on weekday mornings, you can use the following automation:

```yaml
- id: update_morning_commute_sensor
  alias: "Commute - Update morning commute sensor"
  trigger:
    - platform: time_pattern
      minutes: "/2"
  condition:
    - condition: time
      after: "08:00:00"
      before: "11:00:00"
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
