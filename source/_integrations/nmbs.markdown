---
title: NMBS
description: Instructions on how to integrate timetable data for traveling on the NMBS/SNCB Belgian Railway within Home Assistant.
ha_categories:
  - vehicles_transport.public_transport
ha_config_flow: true
ha_iot_class: Cloud Polling
ha_release: 0.85
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@DaanVervacke'
ha_domain: nmbs
ha_platforms:
  - sensor
ha_integration_type: service
ha_quality_scale: bronze
related:
  - url: https://developers.home-assistant.io/docs/documenting/standards
    title: Documentation standard
  - url: https://developers.home-assistant.io/docs/core/integration-quality-scale/rules/
    title: Integration Quality Scale - Rules
  - docs: /docs/glossary/
    title: Glossary
  - docs: /docs/tools/quick-search/#my-links
    title: My link
---

The **NMBS** {% term integration %} creates sensors for traveling by train with NMBS/SNCB, the Belgian national railway. It retrieves its data from the [iRail](https://irail.be) API.

The integration follows the connection between two stations of your choice. It shows the travel time of the next train between them, and the next trains leaving either station.

Use case: See the travel time of your train on a dashboard, and get a notification when your connection is delayed or canceled.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Departure station:
  description: The station where the train departs.
Arrival station:
  description: The station where the train arrives.
Direct connections only:
  description: Exclude connections with transfers.
Display on map:
  description: Add the departure station's coordinates to the travel time sensor, so the sensor can be placed on a map at that station. This does not track the train's location.
{% endconfiguration_basic %}

You pick both stations from a dropdown that lists the stations of the Belgian railway.

Once the connection is set up, the integration creates a travel time sensor for it, and a liveboard sensor for each of the two stations.

## Supported functionality

The **NMBS** integration provides the following entities.

### Sensors

- **Travel time** (named `Train from <departure station> to <arrival station>`): the expected total travel time of the next connection, in minutes, current delay included. The sensor gets an alert icon while the train is delayed.
- **Liveboard** (named `Trains in <station>`, one for each station): the track and destination of the next train leaving the station. These sensors are turned off by default.

The travel time sensor has the following attributes:

- `destination`: the arrival station of the connection
- `direction`: the direction of the train
- `platform_departing` and `platform_arriving`: the track the train departs from and arrives at
- `vehicle_id`: the vehicle ID of the train, for example `BE.NMBS.IC1832`
- `departure`: how long until the scheduled departure of the train, for example `In 12 minutes`. The delay is not included, so for a delayed train this can reach zero or turn negative before it departs.
- `departure_minutes`: the same time as a number of minutes
- `delay`: the current delay of the train, for example `5 minutes`
- `delay_minutes`: the same delay as a number of minutes
- `canceled`: whether the train from the departure station is canceled. When it is, `departure` and `departure_minutes` have no value. A canceled transfer train is not reported.
- `via`: the station where you change trains, together with `via_arrival_platform`, `via_transfer_platform` and `via_transfer_time` (the time you have for the transfer, delay included). These attributes appear when the connection has a transfer and **Direct connections only** is not selected.
- `latitude` and `longitude`: the coordinates of the departure station, when **Display on map** is selected.

Each liveboard sensor has the following attributes:

- `departure`: how long until the scheduled departure of the next train. The delay is not included, so it can turn negative for a delayed train.
- `departure_minutes`: the same time as a number of minutes
- `vehicle_id`: the vehicle ID of the train
- `monitored_station`: the station the sensor watches
- `extra_train`: whether the train is an extra train outside the regular schedule
- `delay` and `delay_minutes`: the current delay of the train, only when it is delayed

A liveboard sensor gets an alert icon while its next train is delayed. Its state is the track and the destination of that train, for example `Track 5 - Antwerp-Central`.

## Data updates

The integration polls the iRail API every 60 seconds, and only fetches the data of sensors that are turned on. Each sensor has its own data feed. When one feed fails, for example the liveboard of one station, only that sensor becomes unavailable while the others keep updating.

## Known limitations

- The two liveboard sensors are turned off by default. You can turn them on from the entity settings to see the next trains leaving your stations.

## Troubleshooting

### The departure and arrival station cannot be the same

Select two different stations. To follow the departures of a single station, pick any second station for the connection and use the liveboard sensor for the station you want to monitor.

### The API is currently unavailable

Setup stops when the iRail API cannot be reached. Wait a while and try again.

### A configured station no longer exists

One of the stations you set up is no longer in the station list of the iRail API. Delete the integration and set it up again with a station that exists.

## Removing the integration

This integration follows standard integration removal steps.

{% include integrations/remove_device_service.md %}
