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

[Google now requires billing](https://mapsplatform.googleblog.com/2018/05/introducing-google-maps-platform.html) to be enabled (and a valid credit card loaded) to access Google Maps APIs. The Distance Matrix API is billed at US$10 per 1000 requests, however, a US$200 per month credit is applied (20,000 requests). By default, the sensor will update the travel time every 5 minutes, making approximately 288 calls per day. Note that at this rate, more than 2 sensors will likely exceed the free credit amount. If you need to run more than 2 sensors, consider changing the [scan interval](/docs/configuration/platform_options/#scan-interval) to something longer than 5 minutes to stay within the free credit limit or update the sensors on-demand using an automation (see example below).

A quota can be set against the API to avoid exceeding the free credit amount. Set the 'Elements per day' to a limit of 645 or less. Details on how to configure a quota can be found [here](https://developers.google.com/maps/documentation/distance-matrix/usage-and-billing#set-caps)

## Configuration

To set up a `google_travel_time` sensor, go to the Integrations section in the Configuration tab of the Home Assistant UI, click the `+` button in the bottom right of the page, and search for `Google Travel Time`.

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

## Updating sensors on-demand using Automation

You can also use the `homeassistant.update_entity` service to update the sensor on-demand. For example, if you want to update `sensor.morning_commute` every 2 minutes on weekday mornings, you can use the following automation:

```yaml
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
