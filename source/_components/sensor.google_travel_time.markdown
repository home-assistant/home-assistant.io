---
layout: page
title: "Google Maps Travel Time"
description: "Instructions on how to add Google Maps travel time to Home Assistant."
date: 2016-03-28 10:19
sidebar: true
comments: false
sharing: true
footer: true
logo: google_maps.png
ha_category: Transport
ha_iot_class: "Cloud Polling"
ha_release: 0.19
---

The `google_travel_time` sensor provides travel time from the [Google Distance Matrix API](https://developers.google.com/maps/documentation/distance-matrix/).

## {% linkable_title Setup %}

You need to register for an API key by following the instructions [here](https://github.com/googlemaps/google-maps-services-python#api-keys). You only need to turn on the Distance Matrix API.

[Google now requires billing](https://mapsplatform.googleblog.com/2018/05/introducing-google-maps-platform.html) to be enabled (and a valid credit card loaded) to access Google Maps APIs. The Distance Matrix API is billed at US$10 per 1000 requests, however, a US$200 per month credit is applied (20,000 requests). By default, the sensor will update the travel time every 5 minutes, making approximately 288 calls per day. Note that at this rate, more than 2 sensors will likely exceed the free credit amount. If you need to run more than 2 sensors, consider changing the [scan interval](/docs/configuration/platform_options/#scan-interval) to something longer than 5 minutes to stay within the free credit limit or update the sensors on-demand using an automation (see example below).

A quota can be set against the API to avoid exceeding the free credit amount. Set the 'Elements per day' to a limit of 645 or less. Details on how to configure a quota can be found [here](https://developers.google.com/maps/documentation/distance-matrix/usage-and-billing#set-caps)

## {% linkable_title Configuration %}

To enable the sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example entry for configuration.yaml
sensor:
  - platform: google_travel_time
    api_key: XXXX_XXXXX_XXXXX
    origin: Trondheim, Norway
    destination: Paris, France
```

{% configuration %}
api_key:
  description: Your application's API key (get one by following the instructions above). This key identifies your application for purposes of quota management.
  required: true
  type: string
origin:
  description: "The starting point for calculating travel distance and time. You can supply one or more locations separated by the pipe character, in the form of an address, latitude/longitude coordinates, or a [Google place ID](https://developers.google.com/places/place-id). When specifying the location using a Google place ID, the ID must be prefixed with `place_id:`."
  required: true
  type: string
destination:
  description: One or more locations to use as the finishing point for calculating travel distance and time. The options for the destinations parameter are the same as for the origins parameter, described above.
  required: true
  type: string
name:
  description: A name to display on the sensor. The default is "Google Travel Time - [Travel Mode]" where [Travel Mode] is the mode set in options for the sensor (see option "mode" below).
  required: false
  type: string
travel_mode:
  description: "You can choose between: `driving`, `walking`, `bicycling` or `transit`."
  required: false
  type: string
options:
  description: "A dictionary containing parameters to add to all requests to the Distance Matrix API. A full listing of available options can be found [here](https://developers.google.com/maps/documentation/distance-matrix/intro#RequestParameters)."
  required: false
  type: list
  keys:
    mode:
      description: The travel mode used to calculate the directions/time. Can be `driving`, `bicycling`, `transit` or `walking`.
      required: false
      default: driving
      type: string
    language:
      description: "You can choose from a lot of languages: `ar`, `bg`, `bn`, `ca`, `cs`, `da`, `de`, `el`, `en`, `es`, `eu`, `fa`, `fi`, `fr`, `gl`, `gu`, `hi`, `hr`, `hu`, `id`, `it`, `iw`, `ja`, `kn`, `ko`, `lt`, `lv`, `ml`, `mr`, `nl`, `no`, `pl`, `pt`, `pt-BR`, `pt-PT`, `ro`, `ru`, `sk`, `sl`, `sr`, `sv`, `ta`, `te`, `th`, `tl`, `tr`, `uk`, `vi`, `zh-CN` and `zh-TW`."
      required: false
      type: string
    departure_time:
      description: Can be `now`, a Unix timestamp, or a 24 hour time string like `08:00:00`. If you provide a time string, it will be combined with the current date to get travel time for that moment.
      required: exclusive
      type: [time, string]
    arrival_time:
      description: See notes above for `departure_time`. `arrival_time` cannot be `now`, only a Unix timestamp or time string. You can not provide both `departure_time` and `arrival_time`. If you do provide both, `arrival_time` will be removed from the request.
      required: exclusive
      type: [time, string]
    avoid:
      description: "Indicate what google should avoid when calculating the travel time, you can choose from: `tolls`, `highways`, `ferries`, `indoor`."
      required: false
      type: string
    transit_mode:
      description: "If you opted for `transit` at `travel_mode`, you can use this variable to specify which public transport you want to use: `bus`, `subway`, `train`, `tram` or `rail`."
    transit_routing_preference:
      description: "for the travel time calculation for public transport you can also specify the preference for: `less_walking` or `fewer_transfers`."
      required: false
      type: string
    units:
      description: "Set the unit for the sensor in metric or imperial, otherwise the default unit the same as the unit set in `unit_system:`."
      required: false
      type: string
{% endconfiguration %}

## {% linkable_title Dynamic Configuration %}

Tracking can be setup to track entities of type `device_tracker`, `zone` and `sensor`. If an entity is placed in the origin or destination then every 5 minutes when the platform updates it will use the latest location of that entity.

```yaml
# Example entry for configuration.yaml
sensor:
  # Tracking entity to entity
  - platform: google_travel_time
    name: Phone To Home
    api_key: XXXX_XXXXX_XXXXX
    origin: device_tracker.mobile_phone
    destination: zone.home

  # Tracking entity to zone friendly name
  - platform: google_travel_time
    name: Home To Eddie's House
    api_key: XXXX_XXXXX_XXXXX
    origin: zone.home
    destination: Eddies House    # Friendly name of a zone

  # Tracking entity in imperial unit
  - platform: google_travel_time
    api_key: XXXX_XXXXX_XXXXX
    destination: zone.home
    options:
      units: imperial    # 'metric' for Metric, 'imperial' for Imperial
```

## {% linkable_title Entity Tracking %}

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

## {% linkable_title Updating sensors on-demand using Automation %}

You can also use the `sensor.google_travel_sensor_update` service to update the sensor on-demand. For example, if you want to update `sensor.morning_commute` every 2 minutes on weekday mornings, you can use the following automation:

```yaml
- id: update_morning_commute_sensor
  alias: "Commute - Update morning commute sensor"
  initial_state: 'on'
  trigger:
    - platform: time
      minutes: '/2'
      seconds: 00
  condition:
    - condition: time
      after: '08:00:00'
      before: '11:00:00'
    - condition: time
      weekday:
        - mon
        - tue
        - wed
        - thu
        - fri
  action:
    - service: sensor.google_travel_sensor_update
      data:
        entity_id: sensor.morning_commute
```
