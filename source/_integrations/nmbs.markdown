---
title: NMBS
description: Instructions on how to integrate timetable data for traveling on the NMBS/SNCB Belgian Railway within Home Assistant.
ha_categories:
  - vehicles_transport.public_transport
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
---

The **NMBS** {% term integration %} creates sensors for traveling by train with NMBS/SNCB, the Belgian national railway. It retrieves its data from the [iRail](https://irail.be) API.

The integration follows the connection between two stations of your choice. It shows the travel time of the next train between them, and the next train leaving each station.

You can show the travel time of your train on a dashboard, or build an automation that warns you when your train is delayed.

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

## Reconfiguration

To change **Direct connections only** or **Display on map**, go to **Settings** > **Devices & services**, select the **NMBS** integration, and select **Reconfigure** on the connection. The sensors keep their entity IDs and settings. If you already have the same route with the other **Direct connections only** setting, reconfiguration stops with an "already configured" message. The stations cannot be changed. To follow another route, select **Add service** on the **NMBS** integration page.

## Supported functionality

The **NMBS** integration provides the following entities.

### Sensors

- **Travel time** (named `Train from <departure station> to <arrival station>`): the expected total travel time of the next connection, in minutes, current delay included. The sensor gets an alert icon when the train is delayed by 1 minute or more. When no upcoming train is found, the state is unknown. The sensor then only keeps its location, when **Display on map** is selected.
- **Liveboard** (named `Trains in <station>`, one for each station): the track and destination of the next train leaving the station. These sensors are turned off by default. When no train is leaving, the state is unknown.

The travel time sensor has the following attributes:

- `destination`: the arrival station of the connection
- `direction`: the direction of the train
- `platform_departing` and `platform_arriving`: the track the train departs from and arrives at
- `vehicle_id`: the vehicle ID of the train, for example `BE.NMBS.IC1832`
- `departure_time`: the scheduled departure time of the train
- `departure_minutes`: how long until the scheduled departure, in minutes. The delay is not included, so for a delayed train this can reach zero or turn negative before it departs.
- `departure`: the same time in text form, for example `In 10 minutes`. No value when the train is canceled.
- `delay_seconds`: the current delay of the train, in seconds
- `delay_minutes`: the same delay as a number of minutes
- `delay`: the same delay in text form, for example `5 minutes`.
- `canceled`: whether the train from the departure station is canceled. When it is, `departure` and `departure_minutes` have no value.
- `via`: the station where you change trains. This and the next three attributes appear when the connection has a transfer and **Direct connections only** is not selected.
- `via_arrival_platform`: the track the train arrives at in the transfer station
- `via_transfer_platform`: the track the next train leaves from in the transfer station
- `via_transfer_time`: the time you have for the transfer, in minutes, delay included
- `latitude` and `longitude`: the coordinates of the departure station, when **Display on map** is selected.

Each liveboard sensor has the following attributes:

- `departure_time`: the scheduled departure time of the next train
- `departure_minutes`: how long until the scheduled departure, in minutes. The delay is not included, so it can turn negative for a delayed train.
- `departure`: the same time in text form, for example `In 10 minutes`.
- `vehicle_id`: the vehicle ID of the train
- `monitored_station`: the station the sensor watches
- `extra_train`: whether the train is an extra train outside the regular schedule
- `delay_seconds`: the current delay of the train, in seconds, only when it is delayed
- `delay_minutes` and `delay`: the same delay rounded to minutes, as a number and as text, only when it is 1 minute or more

A liveboard sensor gets an alert icon while its next train is delayed. Its state is the track and the destination of that train, for example `Track 5 - Antwerp-Central`.

## Data updates

The integration polls the iRail API every 60 seconds, and only fetches the data of sensors that are turned on. Each sensor has its own data feed. When one feed fails, for example the liveboard of one station, only that sensor becomes unavailable while the others keep updating.

## Known limitations

- Only the first transfer of a connection is shown. A connection with two or more transfers only shows the first transfer station.
- A liveboard sensor shows only the next train leaving its station.
- A canceled transfer train is not reported. The `canceled` attribute only covers the train from the departure station.

## Troubleshooting

### The departure and arrival stations cannot be the same

Select two different stations. To follow the departures of a single station, pick any second station for the connection and use the liveboard sensor for the station you want to monitor.

### The iRail API is unavailable

Setup stops when the iRail API cannot be reached. Wait a while and try again.

### Unable to fetch the NMBS station list

Home Assistant could not fetch the station list from the iRail API while starting the integration. Home Assistant retries automatically. When the API is back, the sensors load without any action from you.

### A configured station no longer exists

One of the stations you set up is no longer in the station list of the iRail API. On the **NMBS** integration page, delete the connection. Then select **Add service** and pick a station that exists.

## Removing the integration

This integration follows standard integration removal steps.

{% include integrations/remove_device_service.md %}
