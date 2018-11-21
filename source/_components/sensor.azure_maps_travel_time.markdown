---
layout: page
title: "Azure Maps Travel Time"
description: "Instructions on how to add Azure Maps travel time to Home Assistant."
date: 2018-11-20 18:10
sidebar: true
comments: false
sharing: true
footer: true
logo: azure_maps.png
ha_category: Transport
ha_iot_class: "Cloud Polling"
ha_release: 0.83
---

The `azure_maps_travel_time` sensor provides travel time from the [Azure Maps Route Directions API](https://docs.microsoft.com/en-us/rest/api/maps/route/getroutedirections).

## {% linkable_title Setup %}

You need to register for an API key by following the instructions [here](https://docs.microsoft.com/en-us/azure/azure-maps/how-to-manage-account-keys). There are two keys there, both will work.

Azure Maps is a paid Azure service, [pricing details here](https://azure.microsoft.com/en-us/pricing/details/azure-maps/). But you do get 25000 free API calls per month, so if you do not exceed 33 calls per hour then you incur no costs, if you want to have many travel times visible, consider changing the [scan interval](/docs/configuration/platform_options/#scan-interval) to something longer than 5 minutes to stay within the free credit limit or update the sensors on-demand using an automation (see example below).

## {% linkable_title Configuration %}

To enable the sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example entry for configuration.yaml
sensor:
  - platform: azure_maps_travel_time
    api_key: XXXX_XXXXX_XXXXX
    name: Home to Work
    origin: zone.home
    destination: zone.work
```

{% configuration %}
api_key:
  description: Your application's API key (get one by following the instructions above). This key identifies your application for purposes of quota management.
  required: true
  type: string
origin:
  description: "The starting point for calculating travel distance and time. You can supply a location in the form of a zone, device tracker or latitude/longitude coordinates
  required: true
  type: string
destination:
  description: One or more locations to use as the finishing point for calculating travel distance and time. The options for the destinations parameter are the same as for the origins parameter, described above.
  required: true
  type: string
name:
  description: A name to display on the sensor. The default is "Azure Maps Travel Time - [Travel Mode]" where [Travel Mode] is the mode set in options for the sensor (see option "travelMode" below).
  required: false
  type: string
options:
  description: "A dictionary containing parameters to add to all requests to the Route Directions API. A full listing of available options can be found [here](https://docs.microsoft.com/en-us/rest/api/maps/route/getroutedirections#uri-parameters)."
  required: false
  type: list
  keys:
    travelMode:
      description: The travel mode used to calculate the directions/time. Can be `car`, `pedestrian` or `bicycle`.
      required: false
      default: car
      type: string
    departAt:
      description: Can be iso timestamp, or a 24 hour time string like `08:00`. If you provide a time string, it will be combined with the current date to get travel time for that moment or the next day.
      required: exclusive
      type: [time, string]
    arriveAt:
      description: See notes above for `departure_time`. `arrival_time` can be specified in the same way. You can not provide both `departure_time` and `arrival_time`. If you do provide both, `arrival_time` will be removed from the request.
      required: exclusive
      type: [time, string]
    avoid:
      description: "Indicate what Azure should avoid when calculating the travel time, you can choose from: `tollRoads`, `motorways`, `ferries`, `unpavedRoads`."
      required: false
      type: string
    RouteType:
      description: "for the travel time calculation for the car you can also specify the preference for: `eco`, `fastest`, `shortest` or `thrilling`."
      required: false
      type: string
{% endconfiguration %}

## {% linkable_title Dynamic Configuration %}

Tracking can be setup to track entities of type `device_tracker`, `zone` and `sensor`. If an entity is placed in the origin or destination then every 5 minutes when the platform updates it will use the latest location of that entity.

```yaml
# Example entry for configuration.yaml
sensor:
  # Tracking entity to entity
  - platform: azure_maps_travel_time
    name: Phone To Home
    api_key: XXXX_XXXXX_XXXXX
    origin: device_tracker.mobile_phone
    destination: zone.home

  # Tracking entity to zone friendly name
  - platform: azure_maps_travel_time
    name: Home To Eddie's House
    api_key: XXXX_XXXXX_XXXXX
    origin: zone.home
    destination: Eddies House    # Friendly name of a zone
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
  - All other states will be passed directly into the API
    - This includes all valid locations listed in the *Configuration Variables*

## {% linkable_title Updating sensors on-demand using Automation %}

You can also use the `sensor.azure_maps_travel_sensor_update` service to update the sensor on-demand. For example, if you want to update `sensor.morning_commute` every 2 minutes on weekday mornings, you can use the following automation:

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
    - service: sensor.azure_maps_travel_sensor_update
      data:
        entity_id: sensor.morning_commute
```
