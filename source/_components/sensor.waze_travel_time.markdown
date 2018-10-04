---
layout: page
title: "Waze Travel Time"
description: "Instructions on how to add Waze travel time to Home Assistant."
date: 2018-01-23 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: waze.png
ha_category: Transport
ha_iot_class: "Cloud Polling"
ha_release: 0.67
---

The `waze_travel_time` sensor provides travel time from the [Waze](https://www.waze.com/).

Unit system is set to metric system.

## {% linkable_title Configuration %}

To use this sensor in your installation, add the following `sensor` section to your `configuration.yaml` file:

```yaml
# Example entry for configuration.yaml
sensor:
  - platform: waze_travel_time
    origin: Montréal, QC
    destination: Québec, QC
    region: 'US'
```

{% configuration %}
origin:
  description: Enter the starting address or the GPS coordinates of the location (GPS coordinates has to be separated by a comma). You can also enter the entity id of a sensor, device_tracker or zone, which provides this information in its state.
  required: true
  type: string
destination:
  description: Enter the destination address or the GPS coordinates of the location (GPS coordinates has to be separated by a comma). You can also enter the entity id of a sensor, device_tracker or zone, which provides this information in its state.
  required: true
  type: string
region:
  description: Choose one of the available regions from 'EU', 'US', 'NA' (equivalent to 'US') or 'IL'.
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
{% endconfiguration %}


## {% linkable_title Example using dynamic destination %}

Using the flexible option to set a sensor value to the `destination`, you can setup a single Waze component that will calculate travel time to multiple optional locations on demand. 

In the following example, the `Input Select` is converted into an address which is used to modify the destination for Waze route calculation from `device_tracker.myphone` location (It takes a few minutes for the value to update due to the interval set to fetch Waze data).

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
         
  - platform: waze_travel_time
    name: "Me to destination"
    origin: device_tracker.myphone
    destination: sensor.dest_address
    region: 'US'
```
{% endraw %}
