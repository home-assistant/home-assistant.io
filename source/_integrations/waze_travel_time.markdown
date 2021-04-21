---
title: Waze Travel Time
description: Instructions on how to add Waze travel time to Home Assistant.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.67
ha_config_flow: true
ha_domain: waze_travel_time
ha_platforms:
  - sensor
---

The `waze_travel_time` sensor provides travel time from the [Waze](https://www.waze.com/).

## Configuration

To set up a `waze_travel_time` sensor, go to the Integrations section in the Configuration tab of the Home Assistant UI, click the `+` button in the bottom right of the page, and search for `Waze Travel Time`.

Notes:
- If a unit system is not specified, the integration will use the unit system configured on your Home Assistant instance.
- Origin and Destination can be the address or the GPS coordinates of the location (GPS coordinates has to be separated by a comma). You can also enter an entity id which provides this information in its state, an entity id with latitude and longitude attributes, or zone friendly name.
- The string inputs for `Substring *` allow you to force the integration to use a particular route or avoid a particular route in its time travel calculation. These inputs are case insensitive matched against the description of the route.
- When using the `Avoid Toll Roads?`, `Avoid Subscription Roads?` and `Avoid Ferries?` options be aware that Waze will sometimes still route you over toll roads or ferries if a valid vignette/subscription is assumed. Default behavior is that Waze will route you over roads having subscription options, so best is to set both `Avoid Toll Roads?` and `Avoid Subscription Roads?` or `Avoid Ferries?` if needed and experiment to ensure the desired outcome. 

T
## Example using dynamic destination

Using the flexible option to set a sensor value to the `Destination`, you can setup a single Waze integration that will calculate travel time to multiple optional locations on demand.

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

```

{% endraw %}

### Various configurations that are supported
#### Tracking entity to entity
In this example we use a device_tracker entity ID as the origin and the sensor created above as the destination.
Name: "Me to destination"
Origin: "device_tracker.myphone"
Destination: "sensor.dest_address"
Region: "US"

#### Tracking entity to zone friendly name
In this example we are using the entity ID of a zone as the origin and the friendly name of a zone as the destination
Name: Home To Eddie's House
Origin: zone.home
Destination: Eddies House
Region: "US"

#### Tracking entity in Imperial Units
Origin: person.paulus
Destination: "725 5th Ave, New York, NY 10022, USA"
Region: "US"
Units: imperial
Vehicle Type: motorcycle

#### Avoiding toll, subscription
Name: Westerscheldetunnel
Origin: 51.330436, 3.802043
Destination: 51.445677, 3.749929
Region: "EU"
Avoid Toll Roads?: True
Avoid Subscription Roads?: True  

## Using the live map in an iFrame

If you plan to use [Waze's live map](https://developers.google.com/waze/iframe/)
in Lovelace [iframe](/lovelace/iframe/) then use
[https://embed.waze.com/iframe](https://embed.waze.com/iframe) and not the live map URL itself.
