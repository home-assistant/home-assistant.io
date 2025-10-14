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
ha_codeowners:
  - '@eifinger'
ha_integration_type: integration
---

The `google_travel_time` sensor provides travel time from the [Google Maps Routes API](https://developers.google.com/maps/documentation/routes/overview).

## Setup

You need to register for an API key by following the instructions [here](https://developers.google.com/maps/documentation/routes/get-api-key-v2). You only need to turn on the Routes API.

Google requires billing to be enabled (and a valid credit card loaded) to access Google Maps APIs. The Routes API currently provides 5,000 free requests that take the current traffic into account. The sensor will update the travel time every 10 minutes, making approximately 144 calls per day. Note that at this rate, using more than 1 sensor may exceed the free credit limit. As the update frequency cannot be decreased, if you require more frequent data updates, consider triggering on-demand updates (see the automation example below).

A quota can be set against the API to avoid exceeding the free credit amount. Set the 'Elements per day' to a limit of 161 or less. Details on how to configure a quota can be found [here](https://developers.google.com/maps/documentation/routes/report-monitor#quotas).

{% include integrations/config_flow.md %}

Notes:

- Origin and Destination can be the address or the GPS coordinates of the location (GPS coordinates have to be separated by a comma). You can also enter an entity ID that provides this information in its state, an entity ID with latitude and longitude attributes, or zone friendly name (case sensitive).

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

Using automatic polling can lead to calls that exceed your API limit, especially when you are tracking multiple travel times using the same API key. To use more granular polling, disable automated polling.

You can use the `homeassistant.update_entity` action to update the sensor on-demand. For example, if you want to update `sensor.morning_commute` every 2 minutes on weekday mornings, you can use the following automation:

```yaml
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

For more detailed steps on how to define a custom polling interval, follow the procedure below.

### Defining a custom polling interval

{% include common-tasks/define_custom_polling.md %}
