---
title: Waze Travel Time
description: Instructions on how to add Waze travel time to Home Assistant.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.67
ha_domain: waze_travel_time
ha_platforms:
  - sensor
---

The `waze_travel_time` sensor provides travel time from the [Waze](https://www.waze.com/).

Unit system is by default set to the metric system.

## Configuration

To use this sensor in your installation, add the following `sensor` section to your `configuration.yaml` file:

```yaml
# Example entry for configuration.yaml
sensor:
  - platform: waze_travel_time
    origin: Montréal, QC
    destination: Québec, QC
    region: "US"
```

{% configuration %}
origin:
  description: Enter the starting address or the GPS coordinates of the location (GPS coordinates has to be separated by a comma). You can also enter an entity id which provides this information in its state, an entity id with latitude and longitude attributes, or zone friendly name.
  required: true
  type: string
destination:
  description: Enter the destination address or the GPS coordinates of the location (GPS coordinates has to be separated by a comma). You can also enter an entity id which provides this information in its state, an entity id with latitude and longitude attributes, or zone friendly name.
  required: true
  type: string
region:
  description: Choose one of the available regions from 'AU', 'EU', 'US', 'NA' (equivalent to 'US') or 'IL'.
  required: true
  type: string
name:
  description: A name to display on the sensor.
  required: false
  default: "Waze Travel Time"
  type: string
incl_filter:
  description: A substring that has to be present in the description of the selected route (a simple case-insensitive matching).
  required: false
  type: string
excl_filter:
  description: A substring that has to be NOT present in the description of the selected route (a simple case-insensitive matching).
  required: false
  type: string
realtime:
  description: If this is set to false, Waze returns the time estimate, not including current conditions, but rather the average travel time for the current time of day. The parameter defaults to true, meaning Waze will return real-time travel time.
  required: false
  type: boolean
  default: true
units:
  description: "Set the unit of measurement for the sensor in metric or imperial, otherwise the default unit of measurement is the same as the unit set in `unit_system:`."
  required: false
  type: string
vehicle_type:
  description: "Set the vehicle type for the sensor: car, taxi, or motorcycle, otherwise the default is car."
  required: false
  type: string
avoid_ferries:
  description: "If this is set to true, Waze will avoid ferries on your route."
  required: false
  type: boolean
  default: false
avoid_toll_roads:
  description: "If this is set to true, Waze will avoid toll roads on your route."
  required: false
  type: boolean
  default: false
avoid_subscription_roads:
  description: "If this is set to true, Waze will avoid roads needing a vignette / subscription on your route."
  required: false
  type: boolean
  default: false
{% endconfiguration %}

When using the `avoid_toll_roads`, `avoid_subscription_roads` and `avoid_ferries` options be aware that Waze will sometimes still route you over toll roads or ferries if a valid vignette/subscription is assumed. Default behavior is that Waze will route you over roads having subscription options, so best is to set both `avoid_toll_roads` and `avoid_subscription_roads` or `avoid_ferries` if needed and experiment to ensure the desired outcome. 

## Example using dynamic destination

Using the flexible option to set a sensor value to the `destination`, you can setup a single Waze integration that will calculate travel time to multiple optional locations on demand.

In the following example, the `Input Select` is converted into an address which is used to modify the destination for Waze route calculation from `device_tracker.myphone` location (It takes a few minutes for the value to update due to the interval of Waze data fetching).

{% raw %}

```yaml
input_select:
  destination:
    name: destination
    options:
      - Home
      - Work
      - Parents

sensor:
  - platform: template
    sensors:
       dest_address:
         value_template: >-
            {%- if is_state("input_select.destination", "Home")  -%}
              725 5th Ave, New York, NY 10022, USA
            {%- elif is_state("input_select.destination", "Work")  -%}
              767 5th Ave, New York, NY 10153, USA
            {%- elif is_state("input_select.destination", "Parents")  -%}
              178 Broadway, Brooklyn, NY 11211, USA
            {%- else -%}
              Unknown
            {%- endif %}
    
  # Tracking entity to entity
  - platform: waze_travel_time
    name: "Me to destination"
    origin: device_tracker.myphone
    destination: sensor.dest_address
    region: "US"

  # Tracking entity to zone friendly name
  - platform: waze_travel_time
    name: Home To Eddie's House
    origin: zone.home
    destination: Eddies House    # Friendly name of a zone
    region: "US"

  # Tracking entity in imperial unit
  - platform: waze_travel_time
    origin: person.paulus
    destination: "725 5th Ave, New York, NY 10022, USA"
    region: "US"
    units: imperial    # 'metric' for Metric, 'imperial' for Imperial
    vehicle_type: motorcycle  # vehicle type used for routing
  
  # Avoiding toll, subscription
  - platform: waze_travel_time
    name: Westerscheldetunnel
    origin: 51.330436, 3.802043
    destination: 51.445677, 3.749929
    region: "EU"
    avoid_toll_roads: true
    avoid_subscription_roads: true  
```

{% endraw %}

## Using the live map in an iFrame

If you plan to use [Waze's live map](https://developers.google.com/waze/iframe/)
in Lovelace [iframe](/lovelace/iframe/) then use
[https://embed.waze.com/iframe](https://embed.waze.com/iframe) and not the live map URL itself.
