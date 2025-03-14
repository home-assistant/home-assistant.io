---
title: Waze Travel Time
description: Instructions on how to add Waze Travel Time to Home Assistant.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.67
ha_config_flow: true
ha_domain: waze_travel_time
ha_platforms:
  - sensor
ha_codeowners:
  - '@eifinger'
ha_integration_type: integration
---

The **Waze Travel Time** {% term integration %} provides travel time from the [Waze](https://www.waze.com/).

{% include integrations/config_flow.md %}

Notes:

- If a unit system is not specified, the {% term integration %} will use the unit system configured on your Home Assistant instance.
- **Origin** and **Destination** can be the address or the GPS coordinates of the location. For coordinates, use the following format: `52.5200, 13.4050`. Make sure the coordinates are separated by a comma. They must not include letters. You can also enter an entity id which provides this information in its state, an entity id with latitude and longitude attributes, or zone friendly name (case sensitive).
- The `incl_filter`/`excl_filter` allow you to force the {% term integration %} to use a particular route or avoid a particular route in its time travel calculation. These inputs must be an exact match to the street name including casing, spaces, and special characters. Use the service [`waze_travel_time.get_travel_times`](#action-waze_travel_timeget_travel_times) to get the exact street names for each route.
- When using the `Avoid Toll Roads?`, `Avoid Subscription Roads?` and `Avoid Ferries?` options, be aware that Waze will sometimes still route you over toll roads or ferries if a valid vignette/subscription is assumed. Default behavior is that Waze will route you over roads having subscription options. It is therefor best is to set both `Avoid Toll Roads?` and `Avoid Subscription Roads?` or `Avoid Ferries?` if needed and experiment to ensure the desired outcome.

## Action `waze_travel_time.get_travel_times`

This service populates [response data](/docs/scripts/perform-actions#use-templates-to-handle-response-data)
with route alternatives and travel times between two locations.

| Data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | --------|
| `origin` | no | The origin of the route | "51.330436, 3.802043", "person.fred" |
| `destination` | no | The destination of the route | "51.330436, 3.802043", "zone.work", "Work" |
| `region` | no | The region. Controls which waze server is used. | "us" |
| `units` | yes | Which unit system to use | metric |
| `vehicle_type` | yes | Which vehicle to use | "car" |
| `incl_filter` | yes | Exact streetname which must be part of the selected route | "L3482 - Wiesbadener Straße" |
| `excl_filter` | yes | Exact streetname which must NOT be part of the selected route | "L3482 - Wiesbadener Straße" |
| `realtime` | yes | Use real-time or statistical data | True |
| `avoid_toll_roads` | yes | Whether to avoid toll roads | True |
| `avoid_ferries` | yes | Whether to avoid ferries | True |
| `avoid_subscription_roads` | yes | Whether to avoid subscription roads | True |

```yaml
action: waze_travel_time.get_travel_times
data:
  origin: "51.330436, 3.802043"
  destination: "51.445677, 3.749929"
  region: "eu"
response_variable: routes
```

{% details "Example action response" %}

```yaml
waze_travel_time.get_travel_times:
  routes:
    - duration: 16.15
      distance: 13.942
      name: B455 - Boelckestraße Wiesbaden
      street_names:
        - Eleonorenstraße
        - Wiesbadener Straße
        - L3482 - Wiesbadener Straße
        - Otto-Suhr-Ring
        - Boelckestraße
        - B455 - Boelckestraße
        - A66 > Frankfurt am Main / Köln
        - A66
        - AS 8 Wallau
        - L3017
        - Diedenberger Straße
        - L3017 - Diedenberger Straße
        - K785 - Diedenberger Straße
        - Hessenstraße
        - Robert-Bosch-Straße
        - Nassaustraße
        - Johannes-Gutenberg-Straße
    - duration: 16.9
      distance: 15.319
      name: L3482 - Wiesbadener Landstraße Wiesbaden
      street_names:
        - Eleonorenstraße
        - Wiesbadener Straße
        - L3482 - Wiesbadener Straße
        - Wiesbadener Landstraße
        - L3482 - Wiesbadener Landstraße
        - Kasteler Straße
        - L3482 - Kasteler Straße
        - Mainzer Straße
        - K650 - Mainzer Straße
        - "> A66 / Wiesbaden-Stadtmitte"
        - A66 > Frankfurt / Hannover
        - A66
        - AS 8 Wallau
        - L3017
        - Diedenberger Straße
        - L3017 - Diedenberger Straße
        - K785 - Diedenberger Straße
        - Hessenstraße
        - Robert-Bosch-Straße
        - Nassaustraße
        - Johannes-Gutenberg-Straße
```

{% enddetails %}

## Defining a custom polling interval

{% include common-tasks/define_custom_polling.md %}

## Example using dynamic destination

Using the flexible option to set a sensor value to the `Destination`, you can setup a single Waze {% term integration %} that will calculate travel time to multiple optional locations on demand.

In the following example, the `Input Select` is converted into an address which is used to modify the destination for the Waze route calculation from the `device_tracker.myphone` location. It takes a few minutes for the value to update due to the interval of Waze data fetching.

{% raw %}

```yaml
input_select:
  destination:
    name: destination
    options:
      - Home
      - Work
      - Parents

template:
  - sensor:
     - name: "Destination address"
       state: >-
          {%- if is_state("input_select.destination", "Home")  -%}
            725 5th Ave, New York, NY 10022, USA
          {%- elif is_state("input_select.destination", "Work")  -%}
            767 5th Ave, New York, NY 10153, USA
          {%- elif is_state("input_select.destination", "Parents")  -%}
            178 Broadway, Brooklyn, NY 11211, USA
          {%- else -%}
            Unknown
          {%- endif %}

```

{% endraw %}

### Various configurations that are supported

#### Tracking entity to entity

In this example, we use a device_tracker entity ID as the origin and the sensor created above as the destination.

  - Name: "Me to some destination"
  - Origin: `device_tracker.myphone`
  - Destination: `sensor.dest_address`
  - Region: "US"

#### Tracking entity to zone friendly name

In this example we are using the entity ID of a zone as the origin and the friendly name of a zone as the destination.

  - Name: "Home to Eddie's house"
  - Origin: `zone.home`
  - Destination: "Eddies House"
  - Region: "US"

#### Tracking entity in imperial units

  - Name: "Somewhere in New York"
  - Origin: `person.paulus`
  - Destination: "725 5th Ave, New York, NY 10022, USA"
  - Region: "US"
  - Units: "imperial"
  - Vehicle Type: "motorcycle"

#### Avoiding toll, subscription

  - Name: "Westerscheldetunnel"
  - Origin: "51.330436, 3.802043"
  - Destination: "51.445677, 3.749929"
  - Region: "EU"
  - Avoid Toll Roads: `True`
  - Avoid Subscription Roads: `True`

## Using the live map in an iFrame

If you plan to use [Waze's live map](https://developers.google.com/waze/iframe/)
in a dashboard [iframe](/dashboards/iframe/), then use
[https://embed.waze.com/iframe](https://embed.waze.com/iframe) and not the live map URL itself.
